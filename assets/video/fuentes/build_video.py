#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Pipeline del VIDEO DEMO del Sistema MBK (vertical 1080x1920 y horizontal 1920x1080).

Regenera TODO desde cero:  python build_video.py            (ambos formatos)
                           python build_video.py V          (solo vertical)
                           python build_video.py H          (solo horizontal)
                           python build_video.py --only-assets   (voz + overlays, sin video)

Pasos
  1. VOZ       edge-tts (es-AR-ElenaNeural) -> un MP3 por escena + los tiempos de cada palabra.
  2. FUENTES   recortes/costuras de las capturas de assets/capturas (sin sidebar, sin el
               cartel amarillo de costos, sin el pie con nombres reales).
  3. OVERLAYS  titulares, chips y botones: HTML con Poppins -> PNG transparentes (Playwright).
  4. VIDEO     cada cuadro se compone con Pillow (zoom/paneo suave sobre la captura + overlays
               con fundidos) y se manda por pipe a ffmpeg (H.264 yuv420p, AAC, faststart, 30 fps).
  5. SRT y guion.md.

Para cambiar el contenido editá SCENES (texto hablado, texto en pantalla, tomas y camaras).
Los "cues" son frases del texto hablado: la animacion se dispara cuando la voz dice esa frase
(se usan los tiempos reales de edge-tts, asi nada queda desfasado si se cambia el texto).

Dependencias:  pip install imageio-ffmpeg edge-tts pillow numpy   +   Node con Playwright
(ver render_overlays.mjs).  Todo lo intermedio va a MBK_VIDEO_WORK (por defecto %TEMP%/mbk-video).
"""
import asyncio
import html as htmllib
import json
import math
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

import imageio_ffmpeg
import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageFilter

import edge_tts

# --------------------------------------------------------------------------- rutas
HERE = Path(__file__).resolve().parent
OUT = HERE.parent                       # assets/video
WEB = OUT.parent.parent                 # mbk-web
CAP = WEB / "assets" / "capturas"
LOGO = WEB / "public" / "logo.png"
MARK = WEB / "public" / "logo-mark.png"
FONTS = WEB / "node_modules" / "@fontsource" / "poppins" / "files"
WORK = Path(os.environ.get("MBK_VIDEO_WORK", Path(tempfile.gettempdir()) / "mbk-video"))
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

# --------------------------------------------------------------------------- voz
VOICE = "es-AR-ElenaNeural"
RATE = "+6%"
LEAD = 0.30          # silencio antes de la voz en cada escena (s)
TAIL = 0.35          # silencio despues de la voz (s)
TAIL_LAST = 1.4      # la ultima escena respira mas
XF = 0.30            # duracion del fundido entre tomas (s)
FPS = 30

# --------------------------------------------------------------------------- marca
INK, CREAM, LINE, MUTED = "#0a0a0a", "#faf9f6", "#e8e3dc", "#4b4640"
PINK, PINK_S, PINK_SOFT = "#e42e9a", "#c4187e", "#fce4f1"
COLORS = {
    "pink": (PINK_S, PINK_SOFT), "blue": ("#175f99", "#dcebf7"), "green": ("#0b7a3f", "#d9f1e4"),
    "orange": ("#b93a0a", "#fde6db"), "violet": ("#6236e0", "#e9e0ff"),
}

FORMATS = {
    "V": dict(W=1080, H=1920, name="vertical", file="mbk-demo-vertical-1080x1920",
              card=(60, 640, 960, 880), head=(60, 190, 960), h1=78, sub=36, tag=30, chip=(34, 1550, 60, 960),
              mark=(1080 - 60 - 96, 100, 96)),
    "H": dict(W=1920, H=1080, name="horizontal", file="mbk-demo-horizontal-1920x1080",
              card=(730, 95, 1150, 890), head=(90, 150, 590), h1=64, sub=30, tag=26, chip=(30, 610, 90, 590),
              mark=(90, 44, 96)),
}

# =========================================================================== GUION
# spoken = lo que dice la voz (pronunciacion ajustada); display = el mismo texto como se lee (SRT).
# parts  = juegos de texto en pantalla (titular + chips); shots = tomas de camara (V / H).
# cam = (cx, cy, ancho) en pixeles de la fuente; se interpola de cam0 a cam1 durante la toma.
S = {}  # alias de fuentes (ver SOURCES mas abajo)

SCENES = [
    dict(id=1,
         spoken="¿Vendés todos los días y no sabés cuánto ganás? Con el Sistema eme be ká lo ves: "
                "ventas, cobros, gastos y resultado.",
         display="¿Vendés todos los días y no sabés cuánto ganás? Con el Sistema MBK lo ves: "
                 "ventas, cobros, gastos y resultado.",
         mark=False,
         parts=[dict(cue=None, tag="Sistema MBK", title="¿Vendés todos los días y no sabés *cuánto ganás*?",
                     sub="Todo tu negocio en una sola pantalla",
                     chips=[("Ventas", "violet", "ventas"), ("Cobros", "blue", "cobros"),
                            ("Gastos", "orange", "gastos"), ("Resultado", "green", "resultado")])],
         shots=[dict(cue=None,
                     V=("dashboard-movil", (585, 620, 1170), (585, 1100, 1170)),
                     H=("dash_d", (1184, 927, 2368), (1184, 1100, 2368)))],
         toma="Dashboard completo con zoom suave."),
    dict(id=2,
         spoken="Cargás una venta en segundos: elegís el cliente, tocás los productos, sumás un descuento, "
                "y confirmás.",
         display="Cargás una venta en segundos: elegís el cliente, tocás los productos, sumás un descuento, "
                 "y confirmás.",
         mark=True,
         parts=[dict(cue=None, tag=None, title="Cargá una venta en *segundos*", sub="Desde el celular o la computadora",
                     chips=[("Cliente", "blue", "cliente"), ("Productos", "violet", "productos"),
                            ("Descuento", "orange", "descuento"), ("Confirmar", "green", "confirmás")])],
         shots=[dict(cue=None,
                     V=("nueva-venta-movil-inicio", (585, 1000, 1170), (585, 1250, 1170)),
                     H=("nv_modal", (672, 560, 1345), (672, 1060, 1345))),
                dict(cue="sumás",
                     V=("nueva-venta-movil", (585, 1500, 1170), (585, 1950, 1170)),
                     H=None)],
         toma="Pantalla de nueva venta: cliente y productos; luego descuento y confirmar."),
    dict(id=3,
         spoken="Mirá cuánto vendiste, cuánto cobraste, aunque te paguen por partes, y cuánto te deben. "
                "Y tu resultado del mes, siempre a la vista.",
         display="Mirá cuánto vendiste, cuánto cobraste, aunque te paguen por partes, y cuánto te deben. "
                 "Y tu resultado del mes, siempre a la vista.",
         mark=True,
         parts=[dict(cue=None, tag=None, title="Mirá cuánto *cobraste* y cuánto te deben", sub="Ventas, cobros y resultado del mes",
                     chips=[("Vendido", "violet", "vendiste"), ("Cobrado", "blue", "cobraste"),
                            ("Cobros parciales", "green", "partes"), ("Pendiente a cobrar", "orange", "deben"),
                            ("Resultado del mes", "pink", "resultado")])],
         shots=[dict(cue=None,
                     V=("dashboard-movil", (585, 1400, 1170), (585, 1500, 1170)),
                     H=("dash_d", (607, 702, 1155), (607, 730, 1155))),
                dict(cue="deben",
                     V=("dashboard-movil-completo", (585, 3128, 1170), (585, 3300, 1170)),
                     H=("dash_d", (1762, 702, 1155), (1762, 730, 1155))),
                dict(cue="resultado",
                     V=("dashboard-movil-completo", (585, 3990, 1170), (585, 4030, 1170)),
                     H=("dash_d", (607, 1040, 1155), (607, 1090, 1155)))],
         toma="Tarjetas de vendido/cobrado, pendiente a cobrar y resultado neto."),
    dict(id=4,
         spoken="Cargá tus gastos mes a mes, y en cada producto ves el costo y el margen.",
         display="Cargá tus gastos mes a mes, y en cada producto ves el costo y el margen.",
         mark=True,
         parts=[dict(cue=None, tag=None, title="Costos y *márgenes* a la vista", sub="Sabés qué te conviene vender",
                     chips=[("Costos y gastos", "orange", "gastos"), ("Costo por producto", "blue", "cada"),
                            ("Margen de ganancia", "green", "margen")])],
         shots=[dict(cue=None,
                     V=("costos_m", (585, 536, 1170), (585, 540, 1170)),
                     H=("costos_d", (1184, 927, 2368), (1184, 927, 2368))),
                dict(cue="cada",
                     V=("prod_stitch", (490, 520, 980), (490, 740, 980)),
                     H=("prod_stitch", (490, 430, 980), (490, 640, 980)))],
         toma="Costos y gastos del mes (sin el cartel amarillo) y tabla de productos con costo y margen."),
    dict(id=5,
         spoken="Tus clientes ordenados, y los turnos con seña: ves cuánto cobraste y cuánto falta.",
         display="Tus clientes ordenados, y los turnos con seña: ves cuánto cobraste y cuánto falta.",
         mark=True,
         parts=[dict(cue=None, tag=None, title="Clientes y turnos con *seña*", sub="Cada cliente con lo que compró",
                     chips=[("Clientes", "green", "clientes"), ("Turnos con seña", "blue", "turnos"),
                            ("Cuánto falta cobrar", "orange", "falta")])],
         shots=[dict(cue=None,
                     V=("cli_stitch", (585, 540, 1170), (585, 540, 1170)),
                     H=("cli_stitch", (585, 470, 1170), (585, 560, 1170))),
                dict(cue="turnos",
                     V=("tur_m", (585, 505, 1100), (585, 620, 1100)),
                     H=("tur_stitch", (695, 538, 1390), (695, 575, 1390)))],
         toma="Lista de clientes y turnos con seña y saldo pendiente."),
    dict(id=6,
         spoken="Fijá una meta, y compará cada mes con el anterior.",
         display="Fijá una meta, y compará cada mes con el anterior.",
         mark=True,
         parts=[dict(cue=None, tag=None, title="Tu *meta* del mes, siempre a la vista", sub="Y comparada con el mes anterior",
                     chips=[("Meta del mes", "violet", "meta"), ("Contra el mes anterior", "blue", "anterior")])],
         shots=[dict(cue=None,
                     V=("dashboard-movil-grafico", (585, 700, 1170), (585, 730, 1170)),
                     H=("dash_d", (1184, 960, 2368), (1184, 900, 2300))),
                dict(cue="anterior",
                     V=("dashboard-movil", (585, 1250, 1170), (585, 1450, 1170)),
                     H=None)],
         toma="Meta del mes con avance y variaciones contra el mes anterior."),
    dict(id=7,
         spoken="Y ahora, las novedades: control de stock, con avisos para reponer. Y caja por medio de pago: "
                "efectivo, transferencia, tarjeta o Mercado Pago.",
         display="Y ahora, las novedades: control de stock, con avisos para reponer. Y caja por medio de pago: "
                 "efectivo, transferencia, tarjeta o Mercado Pago.",
         mark=True,
         parts=[dict(cue=None, tag="NOVEDAD", tagstrong=True, title="Control de *stock* con avisos",
                     sub="Novedades del Sistema MBK",
                     chips=[("Avisos para reponer", "orange", "avisos"), ("Nunca frena una venta", "green", "reponer")]),
                dict(cue="caja", tag="NOVEDAD", tagstrong=True, title="*Caja* por medio de pago",
                     sub="Cuánta plata tenés en cada lugar",
                     chips=[("Efectivo", "green", "efectivo"), ("Transferencia", "violet", "transferencia"),
                            ("Tarjeta", "orange", "tarjeta"), ("Mercado Pago", "blue", "mercado")])],
         shots=[dict(cue=None,
                     V=("blk_stock", (740, 420, 1480), (740, 450, 1400)),
                     H=("blk_stock", (740, 560, 1480), (740, 640, 1480))),
                dict(cue="avisos",
                     V=("blk_stock", (650, 1060, 1300), (650, 1100, 1300)),
                     H=None),
                dict(cue="caja",
                     V=("blk_caja", (640, 587, 1280), (640, 587, 1240)),
                     H=("blk_caja", (640, 495, 1280), (640, 500, 1240)))],
         toma="NOVEDADES: Stock (con aviso de reposición) y Caja por medio de pago."),
    dict(id=8,
         spoken="Belén te lo muestra funcionando. Solicitá tu demo. Escribinos por Instagram: "
                "arroba eme be ká consultoría a erre ge.",
         display="Belén te lo muestra funcionando. Solicitá tu demo. Escribinos por Instagram: @mbkconsultoriaarg.",
         mark=False, closing=True,
         parts=[dict(cue=None, tag=None, title="Belén te lo muestra *funcionando*.", sub=None, chips=[])],
         closing_items=[("logo", None), ("title", None), ("cta", "solicitá"), ("handle", "instagram")],
         shots=[dict(cue=None, V=None, H=None)],
         toma="Cierre: logo, llamado a la acción y usuario de Instagram."),
]

# --------------------------------------------------------------------------- fuentes (recortes)
_cache = {}


def _open(name):
    return Image.open(CAP / (name + ".png")).convert("RGB")


def _hstack(parts):
    w = sum(p.width for p in parts)
    h = max(p.height for p in parts)
    im = Image.new("RGB", (w, h), (248, 250, 252))
    x = 0
    for p in parts:
        im.paste(p, (x, 0))
        x += p.width
    return im


def _vstack(parts):
    h = sum(p.height for p in parts)
    w = max(p.width for p in parts)
    im = Image.new("RGB", (w, h), (248, 250, 252))
    y = 0
    for p in parts:
        im.paste(p, (0, y))
        y += p.height
    return im


def source(name):
    """Devuelve la imagen fuente (capturas o derivadas). Las derivadas sacan sidebar, pie y avisos."""
    if name in _cache:
        return _cache[name]
    if name == "dash_d":            # dashboard sin sidebar (la captura -contenido)
        im = _open("dashboard-escritorio-contenido")
    elif name == "nv_modal":        # solo el modal de nueva venta (sin sidebar de fondo)
        im = _open("nueva-venta-escritorio").crop((767, 89, 2112, 1709))
    elif name == "prod_stitch":     # Nombre + Precio/Costo/Margen (sin categoria ni acciones)
        p = _open("productos-escritorio-contenido")
        im = _hstack([p.crop((40, 310, 470, 1800)), p.crop((1010, 310, 1560, 1800))])
    elif name == "cli_stitch":      # Nombre + total gastado/compras/ultima actividad (sin email ni telefono)
        c = _open("clientes-escritorio-contenido")
        im = _hstack([c.crop((40, 310, 500, 1330)), c.crop((1270, 310, 2010, 1330))])
        pad = Image.new("RGB", (im.width, 1100), (248, 250, 252))   # relleno: que entre el ancho completo en vertical
        pad.paste(im, (0, 0))
        im = pad
    elif name == "tur_stitch":      # turnos: fecha+cliente y precio/sena/pendiente/estado (sin servicio ni titulo)
        t = _open("turnos-escritorio-contenido")
        im = _hstack([t.crop((40, 310, 640, 1700)), t.crop((1200, 310, 1990, 1700))])
    elif name == "tur_m":           # turnos celular: solo las tarjetas
        im = _open("turnos-movil").crop((0, 950, 1170, 2532))
    elif name == "costos_d":        # costos sin el cartel amarillo ("no puede editarse...")
        c = _open("costos-escritorio-contenido")
        im = _vstack([c.crop((0, 0, 2368, 515)), c.crop((0, 680, 2368, 1800))])
        pad = Image.new("RGB", (2368, 1900), (248, 250, 252))   # relleno para que entre el ancho completo
        pad.paste(im, (0, 0))
        im = pad
    elif name == "costos_m":        # idem celular, sin la barra superior
        c = _open("costos-movil")
        im = _vstack([c.crop((0, 640, 1170, 1137)), c.crop((0, 1520, 1170, 2532))])
    elif name == "stock_v":         # stock: las 3 tarjetas (con "Para reponer") + pastillas + tabla, en una sola columna
        c = source("stock_c")
        top = c.crop((644, 198, 2290, 392)).resize((1400, int(194 * 1400 / 1646)), Image.LANCZOS)
        im = _vstack([top, Image.new("RGB", (1400, 36), (248, 250, 252)), c.crop((20, 560, 1420, 1800))])
    elif name in ("blk_stock", "blk_caja"):   # bloques 4:3 ya recortados (assets/capturas/bloques), con relleno abajo
        b = Image.open(CAP / "bloques" / ("bloque-stock.png" if name == "blk_stock" else "bloque-caja.png")).convert("RGB")
        bg = b.getpixel((3, b.height - 3))
        im = Image.new("RGB", (b.width, int(b.width / 1.09) + 1), bg)
        im.paste(b, (0, 0))
    elif name in ("stock_c", "caja_c"):   # sin sidebar (y sin el pie con nombres)
        im = _open("novedad-stock-escritorio" if name == "stock_c" else "novedad-caja-escritorio").crop((530, 0, 2880, 1800))
    else:
        im = _open(name)
    _cache[name] = im
    return im


def cam_box(size, cam, aspect):
    W, H = size
    cx, cy, w = cam
    w = min(w, W, H * aspect)
    h = w / aspect
    x0 = max(0.0, min(cx - w / 2, W - w))
    y0 = max(0.0, min(cy - h / 2, H - h))
    return (x0, y0, x0 + w, y0 + h)


# --------------------------------------------------------------------------- voz
def probe_duration(path):
    r = subprocess.run([FFMPEG, "-i", str(path)], capture_output=True, text=True, encoding="utf-8", errors="replace")
    m = re.search(r"Duration: (\d+):(\d+):(\d+\.\d+)", r.stderr)
    return int(m[1]) * 3600 + int(m[2]) * 60 + float(m[3])


async def _synth(text, path):
    comm = edge_tts.Communicate(text, VOICE, rate=RATE, boundary="WordBoundary")
    words = []
    with open(path, "wb") as f:
        async for ch in comm.stream():
            if ch["type"] == "audio":
                f.write(ch["data"])
            elif ch["type"] == "WordBoundary":
                words.append((ch["offset"] / 1e7, ch["text"], ch["duration"] / 1e7))
    return words


def make_voice():
    d = WORK / "audio"
    d.mkdir(parents=True, exist_ok=True)
    for sc in SCENES:
        mp3 = d / f"escena{sc['id']}.mp3"
        meta = d / f"escena{sc['id']}.json"
        key = {"text": sc["spoken"], "voice": VOICE, "rate": RATE}
        if mp3.exists() and meta.exists() and json.loads(meta.read_text("utf-8")).get("key") == key:
            m = json.loads(meta.read_text("utf-8"))
        else:
            words = asyncio.run(_synth(sc["spoken"], mp3))
            # recorta el silencio final que agrega el TTS: la escena dura hasta la ultima palabra + un respiro
            m = {"key": key, "words": words, "dur": min(probe_duration(mp3), words[-1][0] + words[-1][2] + 0.2)}
            meta.write_text(json.dumps(m, ensure_ascii=False), "utf-8")
        sc["mp3"] = mp3
        sc["words"] = m["words"]
        sc["dur"] = m["dur"]


def _norm(w):
    return re.sub(r"[¿?¡!.,:;]", "", w.lower())


def cue_time(sc, cue):
    """Segundo (relativo al inicio de la voz) en que se dice la frase `cue`."""
    if cue is None:
        return 0.0
    toks = [_norm(t) for t in cue.split()]
    ws = [_norm(w[1]) for w in sc["words"]]
    for i in range(len(ws) - len(toks) + 1):
        if ws[i:i + len(toks)] == toks:
            return sc["words"][i][0]
    raise ValueError(f"cue '{cue}' no aparece en la escena {sc['id']}: {sc['spoken']}")


def build_timeline():
    t = 0.0
    for sc in SCENES:
        sc["t0"] = t
        sc["voice_t0"] = t + LEAD
        sc["len"] = LEAD + sc["dur"] + (TAIL_LAST if sc is SCENES[-1] else TAIL)
        t += sc["len"]
    return t


def build_audio(total):
    sr = 44100
    track = np.zeros(int(round(total * sr)) + sr, dtype=np.float32)
    for sc in SCENES:
        raw = subprocess.run([FFMPEG, "-v", "error", "-i", str(sc["mp3"]), "-f", "s16le", "-ac", "1", "-ar", str(sr), "-"],
                             capture_output=True).stdout
        a = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768
        a = a[: int(sc["dur"] * sr)]
        n = len(a); a[-int(0.05 * sr):] *= np.linspace(1, 0, int(0.05 * sr))
        i = int(round(sc["voice_t0"] * sr))
        track[i:i + len(a)] += a
    track = track[: int(round(total * sr))]
    peak = float(np.abs(track).max())
    track *= 0.89 / peak                                # normaliza a -1 dBFS aprox
    fade = int(0.25 * sr)
    track[-fade:] *= np.linspace(1, 0, fade)
    import wave
    wav = WORK / "voz.wav"
    with wave.open(str(wav), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(sr)
        w.writeframes((track * 32767).astype(np.int16).tobytes())
    return wav


# --------------------------------------------------------------------------- overlays (HTML -> PNG)
def font_css():
    out = ""
    for wgt in (400, 600, 800):
        out += (f"@font-face{{font-family:'Poppins';font-weight:{wgt};"
                f"src:url('{(FONTS / f'poppins-latin-{wgt}-normal.woff').as_uri()}') format('woff');}}\n")
    return out


def md(text):
    """*palabra* -> resaltada en rosa."""
    return re.sub(r"\*(.+?)\*", r'<span class="hl">\1</span>', htmllib.escape(text))


def overlay_html(fk, sc, part):
    f = FORMATS[fk]
    hx, hy, hw = f["head"]
    cf, cy, cx, cw = f["chip"]
    css = f"""{font_css()}
*{{box-sizing:border-box;margin:0;padding:0}}
html,body{{background:transparent;width:{f['W']}px;height:{f['H']}px;font-family:'Poppins',sans-serif;overflow:hidden}}
.hl{{color:{PINK}}}
#head{{position:absolute;left:{hx}px;top:{hy}px;width:{hw}px}}
.tag{{display:inline-block;font-weight:600;font-size:{f['tag']}px;letter-spacing:.14em;text-transform:uppercase;
  color:{PINK_S};background:{PINK_SOFT};padding:.42em 1em;border-radius:999px;margin-bottom:{int(f['tag']*.7)}px}}
.tag.strong{{background:{PINK_S};color:#fff;font-weight:800;font-size:{int(f['tag']*1.25)}px}}
h1{{font-weight:800;font-size:{f['h1']}px;line-height:1.06;letter-spacing:-.02em;color:{INK}}}
.sub{{margin-top:{int(f['sub']*.5)}px;font-weight:400;font-size:{f['sub']}px;line-height:1.3;color:{MUTED}}}
#chips{{position:absolute;left:{cx}px;top:{cy}px;width:{cw}px;display:flex;flex-wrap:wrap;gap:16px}}
.chip{{display:inline-flex;align-items:center;gap:.55em;font-weight:600;font-size:{cf}px;padding:.45em 1em;border-radius:999px}}
.chip i{{width:.5em;height:.5em;border-radius:50%;display:block}}
"""
    body = '<div id="head">'
    if part.get("tag"):
        body += f'<span class="tag{" strong" if part.get("tagstrong") else ""}" id="tagx">{htmllib.escape(part["tag"])}</span><br>'
    body += f'<h1>{md(part["title"])}</h1>'
    if part.get("sub"):
        body += f'<p class="sub">{htmllib.escape(part["sub"])}</p>'
    body += "</div><div id='chips'>"
    ids = ["head"]
    for i, (txt, col, _) in enumerate(part["chips"]):
        strong, soft = COLORS[col]
        body += f'<span class="chip" id="chip{i}" style="background:{soft};color:{strong}"><i style="background:{strong}"></i>{htmllib.escape(txt)}</span>'
        ids.append(f"chip{i}")
    body += "</div>"
    return f"<!doctype html><meta charset=utf-8><style>{css}</style>{body}", ids


def closing_html(fk):
    f = FORMATS[fk]
    v = fk == "V"
    logo_w, h1, cta, hand, top = (560, 92, 54, 52, 470) if v else (330, 84, 46, 44, 215)
    gap = 56 if v else 40
    css = f"""{font_css()}
*{{box-sizing:border-box;margin:0;padding:0}}
html,body{{background:transparent;width:{f['W']}px;height:{f['H']}px;font-family:'Poppins',sans-serif;overflow:hidden}}
.hl{{color:{PINK}}}
#wrap{{position:absolute;left:0;top:{top}px;width:{f['W']}px;display:flex;flex-direction:column;align-items:center;gap:{gap}px}}
#logo{{width:{logo_w}px;display:block}}
#title{{font-weight:800;font-size:{h1}px;line-height:1.06;letter-spacing:-.02em;text-align:center;width:{int(f['W']*.82)}px;color:{INK}}}
#cta{{font-weight:800;font-size:{cta}px;color:#fff;background:{PINK_S};padding:.55em 1.6em;border-radius:999px}}
#handle{{font-weight:600;font-size:{hand}px;color:{INK};display:flex;align-items:center;gap:.5em}}
#handle svg{{width:1.1em;height:1.1em}}
"""
    ig = ('<svg viewBox="0 0 24 24" fill="none" stroke="%s" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
          '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="%s"/></svg>') % (PINK_S, PINK_S)
    body = (f'<div id="wrap"><img id="logo" src="{LOGO.as_uri()}">'
            f'<div id="title">{md(SCENES[-1]["parts"][0]["title"])}</div>'
            f'<div id="cta">Solicitá tu demo</div>'
            f'<div id="handle">{ig}@mbkconsultoriaarg</div></div>')
    return f"<!doctype html><meta charset=utf-8><style>{css}</style>{body}", ["logo", "title", "cta", "handle"]


def make_overlays(formats):
    d = WORK / "overlays"
    jobs = []
    for fk in formats:
        f = FORMATS[fk]
        for sc in SCENES:
            for pi, part in enumerate(sc["parts"]):
                out = d / fk / f"s{sc['id']}p{pi}"
                htm, ids = closing_html(fk) if sc.get("closing") else overlay_html(fk, sc, part)
                p = d / fk / f"s{sc['id']}p{pi}.html"
                p.parent.mkdir(parents=True, exist_ok=True)
                p.write_text(htm, "utf-8")
                jobs.append(dict(html=str(p), out=str(out), ids=ids, w=f["W"], h=f["H"]))
    jf = d / "jobs.json"
    jf.write_text(json.dumps(jobs), "utf-8")
    subprocess.run(["node", str(HERE / "render_overlays.mjs"), str(jf)], check=True)


def load_overlays(fk):
    """Por escena: lista de elementos {img, x, y, on, off} en segundos relativos al inicio de la escena."""
    d = WORK / "overlays" / fk
    res = {}
    for sc in SCENES:
        els = []
        nparts = len(sc["parts"])
        starts = [LEAD + cue_time(sc, p["cue"]) if p["cue"] else 0.0 for p in sc["parts"]]
        for pi, part in enumerate(sc["parts"]):
            od = d / f"s{sc['id']}p{pi}"
            boxes = json.loads((od / "boxes.json").read_text())
            off = starts[pi + 1] - 0.05 if pi + 1 < nparts else None
            on_head = (0.15 if pi == 0 else starts[pi] + 0.15)
            if sc.get("closing"):
                for name, cue in sc["closing_items"]:
                    t_on = 0.2 if cue is None and name == "logo" else (0.55 if cue is None else LEAD + cue_time(sc, cue) - 0.1)
                    els.append(dict(img=Image.open(od / f"{name}.png").convert("RGBA"), x=boxes[name]["x"], y=boxes[name]["y"],
                                    on=t_on, off=None, rise=26))
                continue
            els.append(dict(img=Image.open(od / "head.png").convert("RGBA"), x=boxes["head"]["x"], y=boxes["head"]["y"],
                            on=on_head, off=off, rise=26))
            for i, (_, _, cue) in enumerate(part["chips"]):
                els.append(dict(img=Image.open(od / f"chip{i}.png").convert("RGBA"), x=boxes[f"chip{i}"]["x"],
                                y=boxes[f"chip{i}"]["y"], on=LEAD + cue_time(sc, cue) - 0.05, off=off, rise=18))
        res[sc["id"]] = els
    return res


# --------------------------------------------------------------------------- composicion de cuadros
def smooth(u):
    u = min(max(u, 0.0), 1.0)
    return u * u * (3 - 2 * u)


def rounded_mask(size, r):
    k = 3
    m = Image.new("L", (size[0] * k, size[1] * k), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, size[0] * k - 1, size[1] * k - 1), r * k, fill=255)
    return m.resize(size, Image.LANCZOS)


def make_bg(fk, card, mark):
    f = FORMATS[fk]
    W, H = f["W"], f["H"]
    bg = Image.new("RGB", (W, H), CREAM)
    blobs = Image.new("RGB", (W, H), CREAM)
    d = ImageDraw.Draw(blobs)
    if fk == "V":
        spec = [(W - 120, 120, 420, PINK_SOFT), (80, H - 200, 520, "#dcebf7"), (W - 40, H * 0.55, 300, "#e9e0ff")]
    else:
        spec = [(W - 100, 80, 420, PINK_SOFT), (120, H - 80, 460, "#dcebf7"), (W * 0.45, 40, 260, "#e9e0ff")]
    for x, y, r, c in spec:
        d.ellipse((x - r, y - r, x + r, y + r), fill=c)
    bg = blobs.filter(ImageFilter.GaussianBlur(110))
    if card:
        cx, cy, cw, ch = f["card"]
        sh = Image.new("L", (W, H), 0)
        ImageDraw.Draw(sh).rounded_rectangle((cx, cy + 22, cx + cw, cy + ch + 22), 30, fill=95)
        sh = sh.filter(ImageFilter.GaussianBlur(32))
        bg.paste(Image.new("RGB", (W, H), (60, 30, 10)), (0, 0), sh)
        # borde fino de la tarjeta
        border = Image.new("L", (W, H), 0)
        ImageDraw.Draw(border).rounded_rectangle((cx - 2, cy - 2, cx + cw + 2, cy + ch + 2), 32, fill=255)
        bg.paste(Image.new("RGB", (W, H), (232, 227, 220)), (0, 0), border)
    if mark:
        mk = Image.open(MARK).convert("RGBA")
        mx, my, mw = f["mark"]
        mk = mk.resize((mw, int(mk.height * mw / mk.width)), Image.LANCZOS)
        bg.paste(mk, (mx, my), mk)
    return bg


class Renderer:
    def __init__(self, fk):
        self.fk = fk
        self.f = FORMATS[fk]
        cx, cy, cw, ch = self.f["card"]
        self.cardpos, self.cardsize = (cx, cy), (cw, ch)
        self.aspect = cw / ch
        self.mask = rounded_mask((cw, ch), 28)
        self.bgs = {(c, m): make_bg(fk, c, m) for c in (True, False) for m in (True, False)}
        self.overlays = load_overlays(fk)
        # tomas globales
        self.shots = []
        for sc in SCENES:
            starts = []
            for sh in sc["shots"]:
                starts.append(sc["t0"] if sh["cue"] is None else sc["voice_t0"] + cue_time(sc, sh["cue"]) - 0.12)
            # solo las tomas que tienen camara en este formato
            items = [(s, sh) for s, sh in zip(starts, sc["shots"]) if sh[fk] is not None or sc.get("closing")]
            for i, (s, sh) in enumerate(items):
                self.shots.append(dict(scene=sc, start=s, spec=sh[fk], xf=(XF if i == 0 else 0.0),
                                       end=(items[i + 1][0] if i + 1 < len(items) else sc["t0"] + sc["len"])))
        for k, sh in enumerate(self.shots):     # cuanto sigue moviendose la camara bajo el fundido siguiente
            sh["tail"] = self.shots[k + 1]["xf"] if k + 1 < len(self.shots) else 0.0
        self.total = SCENES[-1]["t0"] + SCENES[-1]["len"]

    def alpha_el(self, el, t_rel):
        a = smooth((t_rel - el["on"]) / 0.40)
        if el["off"] is not None:
            a = min(a, 1 - smooth((t_rel - el["off"]) / 0.25))
        return a

    def compose(self, k, t):
        sh = self.shots[k]
        sc = sh["scene"]
        card = sh["spec"] is not None
        base = self.bgs[(card, bool(sc.get("mark")))].copy()
        if card:
            name, c0, c1 = sh["spec"]
            im = source(name)
            u = smooth((t - sh["start"]) / max(sh["end"] + sh["tail"] - sh["start"], 0.01))
            cam = tuple(a + (b - a) * u for a, b in zip(c0, c1))
            box = cam_box(im.size, cam, self.aspect)
            crop = im.resize(self.cardsize, Image.BICUBIC, box=box)
            base.paste(crop, self.cardpos, self.mask)
        trel = t - sc["t0"]
        for el in self.overlays[sc["id"]]:
            a = self.alpha_el(el, trel)
            if a <= 0.003:
                continue
            img = el["img"]
            alpha = img.getchannel("A").point(lambda v, a=a: int(v * a))
            dy = int(round((1 - a) * el["rise"]))
            base.paste(img.convert("RGB"), (el["x"], el["y"] + dy), alpha)
        return base

    def frame(self, t):
        k = max(i for i, s in enumerate(self.shots) if s["start"] <= t + 1e-9) if t >= self.shots[0]["start"] else 0
        fr = self.compose(k, t)
        if k > 0:
            xf = self.shots[k]["xf"]
            u = (t - self.shots[k]["start"]) / xf if xf > 0 else 1
            if 0 <= u < 1:
                fr = Image.blend(self.compose(k - 1, t), fr, smooth(u))
        return fr


def render_video(fk, wav):
    f = FORMATS[fk]
    r = Renderer(fk)
    out = OUT / (f["file"] + ".mp4")
    n = int(round(r.total * FPS))
    cmd = [FFMPEG, "-y", "-v", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{f['W']}x{f['H']}", "-r", str(FPS),
           "-i", "-", "-i", str(wav),
           "-vf", "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p",
           "-c:v", "libx264", "-preset", "medium", "-crf", "17", "-pix_fmt", "yuv420p",
           "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-r", str(FPS),
           "-c:a", "aac", "-b:a", "160k", "-ar", "44100", "-t", f"{r.total:.3f}", "-movflags", "+faststart", str(out)]
    p = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    for i in range(n):
        p.stdin.write(r.frame(i / FPS).tobytes())
        if i % 300 == 0:
            print(f"  [{fk}] cuadro {i}/{n}", flush=True)
    p.stdin.close()
    p.wait()
    print("OK", out)


# --------------------------------------------------------------------------- SRT y guion
def srt_time(t):
    ms = int(round(t * 1000))
    return f"{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d},{ms % 1000:03d}"


def chunks(text, maxlen=46):
    parts = re.split(r"(?<=[.?!:,;])\s+", text.strip())
    out = []
    for p in parts:                      # junta trocitos cortos con el siguiente
        if out and (len(out[-1]) < 22 or len(out[-1]) + len(p) < 30):
            out[-1] += " " + p
        else:
            out.append(p)
    final = []
    for c in out:                        # parte los largos por la mitad
        if len(c) > maxlen:
            w = c.split()
            mid = len(w) // 2
            final += [" ".join(w[:mid]), " ".join(w[mid:])]
        else:
            final.append(c)
    return final


def write_srt():
    lines, n = [], 1
    for sc in SCENES:
        ch = chunks(sc["display"])
        tot = sum(len(c) for c in ch)
        t = sc["voice_t0"]
        for c in ch:
            d = sc["dur"] * len(c) / tot
            lines.append(f"{n}\n{srt_time(t)} --> {srt_time(t + d - 0.02)}\n{c}\n")
            n += 1
            t += d
    txt = "\n".join(lines)
    for fk in FORMATS.values():
        (OUT / (fk["file"] + ".es.srt")).write_text(txt, "utf-8")


def write_guion():
    L = ["# Guion — Video demo Sistema MBK", "",
         f"Voz: `{VOICE}` (edge-tts), velocidad `{RATE}`. Sin música. Duración total: **{SCENES[-1]['t0'] + SCENES[-1]['len']:.1f} s**.",
         "Formatos: vertical 1080x1920 (reels) y horizontal 1920x1080 (YouTube/web), 30 fps, H.264 + AAC.",
         "Negocio de ejemplo ficticio: Estilo Sur. Cierre: «Solicitá tu demo» + @mbkconsultoriaarg (sin dominio ni WhatsApp, sin precios).", ""]
    for sc in SCENES:
        L += [f"## Escena {sc['id']}  ({sc['t0']:.1f}–{sc['t0'] + sc['len']:.1f} s)", ""]
        L.append(f"**Voz (texto que se lee):** {sc['display']}")
        if sc["spoken"] != sc["display"]:
            L.append(f"**Voz (texto ajustado para pronunciar):** {sc['spoken']}")
        L.append("")
        for p in sc["parts"]:
            L.append("**En pantalla:**")
            if p.get("tag"):
                L.append(f"- Etiqueta: {p['tag']}")
            L.append(f"- Titular: {p['title'].replace('*', '')}")
            if p.get("sub"):
                L.append(f"- Subtítulo: {p['sub']}")
            if p["chips"]:
                L.append("- Chips: " + " · ".join(c[0] for c in p["chips"]))
            if sc.get("closing"):
                L.append("- Botón: Solicitá tu demo · Usuario: @mbkconsultoriaarg · Logo MBK")
            L.append("")
        L += [f"**Toma:** {sc['toma']}", ""]
    (OUT / "guion.md").write_text("\n".join(L), "utf-8")


# --------------------------------------------------------------------------- main
def main():
    args = [a for a in sys.argv[1:]]
    only_assets = "--only-assets" in args
    fmts = [a for a in args if a in FORMATS] or list(FORMATS)
    WORK.mkdir(parents=True, exist_ok=True)
    print("1/5 voz...")
    make_voice()
    total = build_timeline()
    wav = build_audio(total)
    print(f"   duracion total {total:.2f}s")
    print("3/5 overlays...")
    make_overlays(fmts)
    write_srt()
    write_guion()
    if only_assets:
        return
    print("4/5 video...")
    for fk in fmts:
        render_video(fk, wav)


if __name__ == "__main__":
    main()

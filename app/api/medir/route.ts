import { NextResponse } from "next/server";
import { z } from "zod";
import {
  borrarCookieVisitante,
  cookieVisitante,
  dentroDelTope,
  dispositivoDe,
  esBot,
  ipDe,
  medicionAceptada,
  nuevoVisitante,
  visitanteDe,
} from "@/lib/medicion-servidor";
import { llamarRpc } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Medición propia y anónima de la web. Solo funciona si la persona aceptó la medición en el
 * aviso de cookies (la cookie `mbk_cookies` lo dice y acá se comprueba). Guarda en el Supabase
 * del sistema, y la asesora lo ve en su panel ("Visitas de la web").
 *
 *  POST   → registra un evento (visita o clic). Responde 204 siempre: medir nunca rompe la web.
 *  DELETE → borra el identificador anónimo (al retirar el permiso de medición). */

const EVENTOS = ["page_view", "clic_whatsapp", "clic_demo", "clic_iniciar_sesion", "clic_tienda", "reproduce_video", "envio_formulario"] as const;

const esquema = z.object({
  evento: z.enum(EVENTOS),
  ruta: z.string().max(200).regex(/^\//),
  referrer: z.string().max(100).optional(),
  utm_source: z.string().max(60).optional(),
  utm_medium: z.string().max(60).optional(),
  utm_campaign: z.string().max(60).optional(),
});

const sinContenido = (cookie?: string) => {
  const res = new NextResponse(null, { status: 204 });
  if (cookie) res.headers.append("Set-Cookie", cookie);
  return res;
};

export async function POST(req: Request) {
  // Sin permiso de medición, o bot, o fuera de tope: no se guarda nada ni se crea ninguna cookie.
  if (!medicionAceptada(req) || esBot(req) || !dentroDelTope(ipDe(req))) return sinContenido();

  let cuerpo: unknown;
  try {
    const bruto = await req.text();
    if (bruto.length > 2_000) return sinContenido();
    cuerpo = JSON.parse(bruto);
  } catch {
    return sinContenido();
  }
  const p = esquema.safeParse(cuerpo);
  if (!p.success) return sinContenido();
  const d = p.data;

  const existente = visitanteDe(req);
  const visitante = existente ?? nuevoVisitante();

  await llamarRpc("track_web_event", {
    p_visitor: visitante,
    p_event: d.evento,
    p_path: d.ruta,
    p_referrer_host: d.referrer ?? null,
    p_utm_source: d.utm_source ?? null,
    p_utm_medium: d.utm_medium ?? null,
    p_utm_campaign: d.utm_campaign ?? null,
    p_device: dispositivoDe(req),
  });

  return sinContenido(existente ? undefined : cookieVisitante(visitante));
}

export async function DELETE() {
  return sinContenido(borrarCookieVisitante());
}

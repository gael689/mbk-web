import { NextResponse } from "next/server";
import { esquemaContacto, etiquetaInteres, type DatosContacto, type ErroresContacto } from "@/lib/contacto";
import { medicionAceptada, visitanteDe } from "@/lib/medicion-servidor";
import { llamarRpc, supabaseConfigurado } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Límite de envíos por IP.
 *
 * En memoria, a propósito: no hace falta montar Redis para arrancar. LIMITACIÓN:
 * en Vercel cada instancia de la función lleva su propia cuenta y se reinicia
 * cuando la instancia se recicla, así que frena el abuso casual (que es contra
 * lo que hay que protegerse acá), no un ataque sostenido. Si el formulario se
 * vuelve blanco de spam, mover la cuenta a un store compartido (Upstash Redis)
 * o activar las reglas de rate limiting del Firewall de Vercel.
 */
const VENTANA_MS = 10 * 60_000;
const MAX_POR_VENTANA = 4;
const visitas = new Map<string, number[]>();

function permitido(ip: string): boolean {
  const ahora = Date.now();
  const previas = (visitas.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  previas.push(ahora);
  visitas.set(ip, previas);

  // Poda para que el Map no crezca sin techo.
  if (visitas.size > 5000) {
    for (const [k, v] of visitas) {
      if (v.every((t) => ahora - t >= VENTANA_MS)) visitas.delete(k);
    }
  }
  return previas.length <= MAX_POR_VENTANA;
}

function ipDe(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "desconocida";
}

const escapar = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const MAX_BYTES = 8_000;
// Solo para probar contra un servidor de mentira; en producción no se define.
const RESEND_URL = process.env.RESEND_API_URL ?? "https://api.resend.com/emails";

export async function POST(req: Request) {
  if (!permitido(ipDe(req))) {
    return NextResponse.json(
      { ok: false, error: "limite", mensaje: "Enviaste varias consultas seguidas. Probá de nuevo en unos minutos." },
      { status: 429 },
    );
  }

  let bruto: string;
  try {
    bruto = await req.text();
  } catch {
    return NextResponse.json({ ok: false, error: "cuerpo", mensaje: "No se pudo leer el envío." }, { status: 400 });
  }
  if (bruto.length > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: "grande", mensaje: "El envío es demasiado grande." }, { status: 413 });
  }

  let cuerpo: unknown;
  try {
    cuerpo = JSON.parse(bruto);
  } catch {
    return NextResponse.json({ ok: false, error: "cuerpo", mensaje: "No se pudo leer el envío." }, { status: 400 });
  }

  const parsed = esquemaContacto.safeParse(cuerpo);
  if (!parsed.success) {
    const campos: ErroresContacto = {};
    for (const issue of parsed.error.issues) {
      const k = String(issue.path[0] ?? "") as keyof ErroresContacto;
      if (k && !campos[k]) campos[k] = issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "validacion", mensaje: "Revisá los datos marcados.", campos },
      { status: 400 },
    );
  }
  const d = parsed.data;

  // Honeypot: un campo oculto que una persona nunca completa. Se rechaza sin
  // enviar nada (y sin decir por qué).
  if (d.sitio_web) {
    return NextResponse.json({ ok: false, error: "rechazado", mensaje: "No pudimos procesar el envío." }, { status: 400 });
  }

  // Sin conexión a la base NO se simula un envío: se dice la verdad.
  if (!supabaseConfigurado()) {
    console.error("[contacto] Faltan SUPABASE_URL y/o SUPABASE_PUBLISHABLE_KEY: el formulario no puede guardar la consulta.");
    return NextResponse.json({ ok: false, error: "no_configurado", mensaje: MENSAJE_NO_DISPONIBLE }, { status: 503 });
  }

  // Si la persona aceptó la medición, la consulta se asocia a su visita anónima (para saber de dónde vino).
  const visitante = medicionAceptada(req) ? visitanteDe(req) : null;

  const r = await llamarRpc("submit_web_lead", {
    p_name: d.nombre,
    p_business: d.negocio,
    p_whatsapp: d.whatsapp,
    p_interest: d.interes,
    p_email: d.email || null,
    p_accompaniment: d.acompanamiento,
    p_visitor: visitante,
  });

  if (!r.ok) {
    console.error("[contacto] Supabase respondió", r.estado, r.mensaje);
    if (/demasiadas consultas/i.test(r.mensaje)) {
      return NextResponse.json({ ok: false, error: "limite", mensaje: "Recibimos muchas consultas seguidas. Probá de nuevo en un rato o escribinos por WhatsApp." }, { status: 429 });
    }
    if (r.estado === 400 || r.estado === 409) {
      return NextResponse.json({ ok: false, error: "validacion", mensaje: "Revisá los datos que cargaste." }, { status: 400 });
    }
    return NextResponse.json({ ok: false, error: "envio", mensaje: "No pudimos enviar tu consulta. Probá de nuevo o escribinos por WhatsApp." }, { status: 502 });
  }

  // Aviso por mail a MBK: opcional y de apoyo. La consulta ya quedó guardada y le llega a la
  // asesora a su panel; si el mail falla o no está configurado, no pasa nada.
  void avisarPorMail(d);

  return NextResponse.json({ ok: true });
}

const MENSAJE_NO_DISPONIBLE = "El formulario no está disponible en este momento. Escribinos por WhatsApp y te respondemos enseguida.";

async function avisarPorMail(d: DatosContacto): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return;

  const digitos = d.whatsapp.replace(/\D/g, "");
  const enlaceWa = digitos.startsWith("54") ? `https://wa.me/${digitos}` : null;
  const filas: [string, string][] = [
    ["Nombre", d.nombre],
    ["Negocio / rubro", d.negocio],
    ["WhatsApp", d.whatsapp],
    ["Mail", d.email || "—"],
    ["Quiere resolver", etiquetaInteres(d.interes)],
    ["Quiere acompañamiento", d.acompanamiento ? "Sí" : "No"],
  ];
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#0A0A0A;max-width:560px">
      <h2 style="margin:0 0 12px">Nueva consulta desde la web de MBK</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${filas.map(([k, v]) => `<tr><td style="color:#555"><strong>${escapar(k)}</strong></td><td>${escapar(v)}</td></tr>`).join("")}
      </table>
      ${enlaceWa ? `<p><a href="${enlaceWa}">Abrir WhatsApp con ${escapar(d.nombre)}</a></p>` : ""}
      <p style="color:#555">También la ves en el panel de asesora, en “Consultas web”.</p>
    </div>`;
  const text = filas.map(([k, v]) => `${k}: ${v}`).join("\n") + (enlaceWa ? `\n${enlaceWa}` : "");

  try {
    const res = await fetch(RESEND_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((x) => x.trim()).filter(Boolean),
        subject: `Nueva consulta web: ${d.nombre} (${d.negocio})`,
        html,
        text,
        ...(d.email ? { reply_to: d.email } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) console.error("[contacto] Resend respondió", res.status);
  } catch (e) {
    console.error("[contacto] falló el aviso por mail", e);
  }
}

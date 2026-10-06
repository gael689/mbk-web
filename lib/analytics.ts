"use client";

import { leerConsentimiento } from "./consentimiento";

/* Eventos que dicen si la web vende. Van a /api/medir, que los guarda en el Supabase del
 * sistema y la asesora los ve en su panel. Solo si la persona aceptó la medición (el
 * servidor lo vuelve a comprobar). Envueltos en try/catch: medir nunca rompe la web. */
export type EventoWeb =
  | "page_view"
  | "clic_whatsapp"
  | "envio_formulario"
  | "clic_iniciar_sesion"
  | "clic_tienda"
  | "reproduce_video";

function origenDeLaVisita(): { referrer?: string; utm_source?: string; utm_medium?: string; utm_campaign?: string } {
  const out: { referrer?: string; utm_source?: string; utm_medium?: string; utm_campaign?: string } = {};
  try {
    const q = new URLSearchParams(window.location.search);
    for (const k of ["utm_source", "utm_medium", "utm_campaign"] as const) {
      const v = q.get(k)?.trim().slice(0, 60);
      if (v) out[k] = v;
    }
    if (document.referrer) {
      const host = new URL(document.referrer).hostname.replace(/^www\./, "");
      if (host && host !== window.location.hostname.replace(/^www\./, "")) out.referrer = host.slice(0, 100);
    }
  } catch {
    /* sin origen no pasa nada */
  }
  return out;
}

export function registrar(evento: EventoWeb, _datos?: Record<string, string>) {
  try {
    if (!leerConsentimiento()?.medicion) return;
    void fetch("/api/medir", {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ evento, ruta: window.location.pathname, ...origenDeLaVisita() }),
    }).catch(() => {});
  } catch {
    /* sin medición no pasa nada */
  }
}

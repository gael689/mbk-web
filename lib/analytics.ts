"use client";

import { track } from "@vercel/analytics";
import { leerConsentimiento } from "./consentimiento";

/* Eventos que dicen si la web vende. Envueltos en try/catch: fuera de Vercel
 * (o con un bloqueador de anuncios) no tienen que romper nada. */
export type EventoWeb =
  | "clic_whatsapp"
  | "envio_formulario"
  | "clic_iniciar_sesion"
  | "clic_tienda"
  | "reproduce_video";

export function registrar(evento: EventoWeb, datos?: Record<string, string>) {
  try {
    // Solo si la persona aceptó la medición de visitas.
    if (!leerConsentimiento()?.medicion) return;
    track(evento, datos);
  } catch {
    /* sin analytics no pasa nada */
  }
}

"use client";

import { useMemo, useSyncExternalStore } from "react";

/* Elección de cookies de la persona. Se guarda en UNA cookie propia (`mbk_cookies`, 180 días,
 * necesaria para recordar la elección), con dos permisos por separado:
 *   · medicion → medición de visitas (Vercel Web Analytics). Apagado por defecto.
 *   · terceros → reproductores de YouTube e Instagram. Apagado por defecto.
 * Sin elección guardada, no se carga nada de eso. Formato de la cookie: "m1t0". */
export type Consentimiento = { medicion: boolean; terceros: boolean };

const COOKIE = "mbk_cookies";
const CAMBIO = "mbk-cookies";
const ABRIR = "mbk-cookies-abrir";
const SEIS_MESES = 60 * 60 * 24 * 180;

function crudo(): string | null {
  try {
    const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]*)`));
    return m ? decodeURIComponent(m[1]) : null;
  } catch {
    return null;
  }
}

function interpretar(v: string | null | undefined): Consentimiento | null {
  const m = v ? /^m([01])t([01])$/.exec(v) : null;
  return m ? { medicion: m[1] === "1", terceros: m[2] === "1" } : null;
}

/** Lectura puntual (para código que no es un componente). */
export function leerConsentimiento(): Consentimiento | null {
  return interpretar(crudo());
}

export function guardarConsentimiento(c: Consentimiento) {
  try {
    const seguro = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${COOKIE}=m${c.medicion ? 1 : 0}t${c.terceros ? 1 : 0}; Max-Age=${SEIS_MESES}; Path=/; SameSite=Lax${seguro}`;
  } catch {
    /* sin cookies no se puede recordar: el aviso vuelve a aparecer */
  }
  // Sin permiso de medición, el servidor borra el identificador anónimo del visitante.
  if (!c.medicion) void fetch("/api/medir", { method: "DELETE", keepalive: true }).catch(() => {});
  window.dispatchEvent(new Event(CAMBIO));
}

/** Vuelve a mostrar el panel de cookies (botón "Configurar cookies" del pie). */
export function abrirPreferenciasCookies() {
  window.dispatchEvent(new Event(ABRIR));
}

export function alAbrirPreferencias(fn: () => void) {
  window.addEventListener(ABRIR, fn);
  return () => window.removeEventListener(ABRIR, fn);
}

function suscribir(fn: () => void) {
  window.addEventListener(CAMBIO, fn);
  return () => window.removeEventListener(CAMBIO, fn);
}

/** `undefined` = todavía no se sabe (servidor o primer render); `null` = sin elección guardada. */
export function useCrudoConsentimiento(): string | null | undefined {
  return useSyncExternalStore(suscribir, crudo, () => undefined);
}

export function useConsentimiento(): Consentimiento | null {
  const v = useCrudoConsentimiento();
  return useMemo(() => interpretar(v), [v]);
}

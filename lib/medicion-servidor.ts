/* Lado servidor de la medición propia.
 *
 * Reglas:
 *  · Solo se mide si el navegador mandó la cookie de elección `mbk_cookies` con la medición
 *    aceptada (m1…). El servidor lo comprueba: no depende de que el navegador "se porte bien".
 *  · El identificador anónimo del visitante (`mbk_vid`, un UUID al azar) lo crea el servidor,
 *    HttpOnly, 13 meses. No guarda IP, ni nombre, ni nada que identifique a la persona.
 *  · Los bots no se cuentan. */
import { randomUUID } from "node:crypto";

export const COOKIE_VISITANTE = "mbk_vid";
export const TRECE_MESES = 60 * 60 * 24 * 395;

export function leerCookie(req: Request, nombre: string): string | null {
  const crudo = req.headers.get("cookie");
  if (!crudo) return null;
  for (const parte of crudo.split(";")) {
    const i = parte.indexOf("=");
    if (i > 0 && parte.slice(0, i).trim() === nombre) return decodeURIComponent(parte.slice(i + 1).trim());
  }
  return null;
}

export function medicionAceptada(req: Request): boolean {
  return /^m1t[01]$/.test(leerCookie(req, "mbk_cookies") ?? "");
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function visitanteDe(req: Request): string | null {
  const v = leerCookie(req, COOKIE_VISITANTE);
  return v && UUID.test(v) ? v : null;
}

export function nuevoVisitante(): string {
  return randomUUID();
}

export function cookieVisitante(id: string): string {
  const seguro = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_VISITANTE}=${id}; Max-Age=${TRECE_MESES}; Path=/; HttpOnly; SameSite=Lax${seguro}`;
}

export function borrarCookieVisitante(): string {
  const seguro = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_VISITANTE}=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax${seguro}`;
}

const BOTS = /bot|crawl|spider|slurp|facebookexternalhit|preview|monitor|headless|lighthouse|pingdom|uptime|curl|wget|python-requests|axios|node-fetch|go-http/i;

export function esBot(req: Request): boolean {
  const ua = req.headers.get("user-agent") ?? "";
  return ua.length < 10 || BOTS.test(ua);
}

export function dispositivoDe(req: Request): "mobile" | "tablet" | "desktop" {
  const ua = req.headers.get("user-agent") ?? "";
  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) return "tablet";
  if (/mobi|iphone|android/i.test(ua)) return "mobile";
  return "desktop";
}

/* Tope por IP en memoria (misma limitación que el del formulario: frena el abuso casual). */
const ventanas = new Map<string, number[]>();
export function dentroDelTope(ip: string, maxPorMinuto = 90): boolean {
  const ahora = Date.now();
  const previas = (ventanas.get(ip) ?? []).filter((t) => ahora - t < 60_000);
  previas.push(ahora);
  ventanas.set(ip, previas);
  if (ventanas.size > 5000) {
    for (const [k, v] of ventanas) if (v.every((t) => ahora - t >= 60_000)) ventanas.delete(k);
  }
  return previas.length <= maxPorMinuto;
}

export function ipDe(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "desconocida";
}

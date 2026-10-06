/* Conexión de la web al Supabase del sistema (proyecto mbk-system). SOLO se usa desde el
 * servidor (rutas /api/*): el navegador nunca habla con Supabase.
 *
 * Se usa la clave "publishable" (la de anon), que es pública por diseño: lo único que
 * permite es llamar a dos funciones de la base (submit_web_lead y track_web_event), que
 * validan todo y tienen tope. Las tablas no se pueden leer ni escribir directo desde acá
 * (RLS + sin permisos para anon). Ver system-mbk/supabase/migrations/v1_7_web_consultas_visitas.sql.
 *
 * Variables (en .env.local y en Vercel):
 *   SUPABASE_URL              https://<proyecto>.supabase.co
 *   SUPABASE_PUBLISHABLE_KEY  sb_publishable_…  (o la anon key legacy)
 */
export type ResultadoRpc = { ok: true; data: unknown } | { ok: false; estado: number; mensaje: string; configurado: boolean };

export function supabaseConfigurado(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_PUBLISHABLE_KEY);
}

export async function llamarRpc(funcion: string, args: Record<string, unknown>): Promise<ResultadoRpc> {
  const url = process.env.SUPABASE_URL;
  const clave = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !clave) {
    return { ok: false, estado: 503, mensaje: "supabase_no_configurado", configurado: false };
  }
  try {
    const res = await fetch(`${url.replace(/\/+$/, "")}/rest/v1/rpc/${funcion}`, {
      method: "POST",
      headers: { apikey: clave, Authorization: `Bearer ${clave}`, "Content-Type": "application/json" },
      body: JSON.stringify(args),
      signal: AbortSignal.timeout(8_000),
      cache: "no-store",
    });
    if (!res.ok) {
      const cuerpo = (await res.json().catch(() => null)) as { message?: string } | null;
      return { ok: false, estado: res.status, mensaje: cuerpo?.message ?? `HTTP ${res.status}`, configurado: true };
    }
    const texto = await res.text();
    return { ok: true, data: texto ? JSON.parse(texto) : null };
  } catch (e) {
    return { ok: false, estado: 502, mensaje: e instanceof Error ? e.message : "error", configurado: true };
  }
}

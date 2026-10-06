/* Fecha de la última vez que cambió el contenido de cada página (YYYY-MM-DD).
 * Alimenta el sitemap. Se actualiza a mano cuando se edita el contenido de esa página:
 * declarar "cambió hoy" en cada build le enseña a Google a ignorar el dato. */
export const ULTIMA_MODIFICACION = {
  home: "2026-10-06",
  sistema: "2026-10-06",
  consultoria: "2026-10-06",
  planillas: "2026-10-06",
  preguntas: "2026-10-06",
  cookies: "2026-10-06",
  privacidad: "2026-10-06",
} as const;

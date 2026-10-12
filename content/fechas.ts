/* Fecha de la última vez que cambió el contenido de cada página (YYYY-MM-DD).
 * Alimenta el sitemap. Se actualiza a mano cuando se edita el contenido de esa página:
 * declarar "cambió hoy" en cada build le enseña a Google a ignorar el dato. */
/* Lanzamiento de stock, caja y costo en cinco partes (sistema v1.8.0). 2026-10-13 es
 * provisoria: ajustarla al día real en que sale el front 1.8.0. */
const LANZAMIENTO_V1_8 = "2026-10-13";

export const ULTIMA_MODIFICACION = {
  home: LANZAMIENTO_V1_8,
  sistema: LANZAMIENTO_V1_8,
  consultoria: "2026-10-06",
  planillas: "2026-10-06",
  preguntas: LANZAMIENTO_V1_8,
  cookies: "2026-10-06",
  privacidad: "2026-10-06",
} as const;

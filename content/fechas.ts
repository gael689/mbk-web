/* Fecha de la última vez que cambió el contenido de cada página (YYYY-MM-DD).
 * Alimenta el sitemap. Se actualiza a mano cuando se edita el contenido de esa página:
 * declarar "cambió hoy" en cada build le enseña a Google a ignorar el dato. */
/* Menú, tildes y animaciones, con lo nuevo de la v1.10.0 del sistema. */
const WEB_V1_10 = "2026-11-05";

export const ULTIMA_MODIFICACION = {
  home: WEB_V1_10,
  sistema: WEB_V1_10,
  consultoria: "2026-10-06",
  planillas: "2026-10-06",
  preguntas: WEB_V1_10,
  cookies: "2026-10-06",
  privacidad: "2026-10-06",
  rubros: WEB_V1_10,
  guias: "2026-10-14",
  bahiaBlanca: "2026-10-14",
  versiones: WEB_V1_10,
  herramientas: "2026-11-21",
} as const;

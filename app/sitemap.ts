import type { MetadataRoute } from "next";
import { ULTIMA_MODIFICACION as F } from "@/content/fechas";
import { GUIAS } from "@/content/guias";
import { RUBROS } from "@/content/rubros";
import { SITE_URL } from "@/content/site";

/* Home + páginas internas + rubros, guías y Bahía Blanca. No se listan las anclas (#probar, #belen…): Google las
 * descarta y las trata como duplicados. Sin changeFrequency ni priority (Google los ignora)
 * y con la fecha real de cada página (content/fechas.ts). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: F.home },
    { url: `${SITE_URL}/sistema`, lastModified: F.sistema },
    { url: `${SITE_URL}/consultoria`, lastModified: F.consultoria },
    { url: `${SITE_URL}/planillas`, lastModified: F.planillas },
    { url: `${SITE_URL}/preguntas`, lastModified: F.preguntas },
    { url: `${SITE_URL}/bahia-blanca`, lastModified: F.bahiaBlanca },
    { url: `${SITE_URL}/rubros`, lastModified: F.rubros },
    ...RUBROS.map((r) => ({ url: `${SITE_URL}/rubros/${r.slug}`, lastModified: F.rubros })),
    { url: `${SITE_URL}/guias`, lastModified: F.guias },
    ...GUIAS.map((g) => ({ url: `${SITE_URL}/guias/${g.slug}`, lastModified: g.fecha })),
  ];
}

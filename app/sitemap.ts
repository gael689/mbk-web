import type { MetadataRoute } from "next";
import { ULTIMA_MODIFICACION as F } from "@/content/fechas";
import { SITE_URL } from "@/content/site";

/* Home + 4 páginas internas. No se listan las anclas (#probar, #belen…): Google las
 * descarta y las trata como duplicados. Sin changeFrequency ni priority (Google los ignora)
 * y con la fecha real de cada página (content/fechas.ts). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: F.home },
    { url: `${SITE_URL}/sistema`, lastModified: F.sistema },
    { url: `${SITE_URL}/consultoria`, lastModified: F.consultoria },
    { url: `${SITE_URL}/planillas`, lastModified: F.planillas },
    { url: `${SITE_URL}/preguntas`, lastModified: F.preguntas },
  ];
}

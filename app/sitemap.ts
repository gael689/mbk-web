import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/* Home + 4 páginas internas. No se listan las anclas (#probar, #belen…): Google las
 * descarta y las trata como duplicados. */
export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  return [
    { url: SITE_URL, lastModified: ahora, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/sistema`, lastModified: ahora, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/consultoria`, lastModified: ahora, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/planillas`, lastModified: ahora, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/preguntas`, lastModified: ahora, changeFrequency: "monthly", priority: 0.8 },
  ];
}

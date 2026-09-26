import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/* Una sola página larga: solo se lista la raíz. No se listan las anclas (#preguntas,
 * #belen…): Google las descarta y las trata como duplicados de "/". */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}

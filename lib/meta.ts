import type { Metadata } from "next";
import { SITE_NAME, SITE_SUFFIX } from "@/content/site";

/* Metadata de cada página. Se arma completa (canónico, Open Graph y Twitter) porque en Next
 * un `openGraph` propio de una página REEMPLAZA al del layout. La imagen no se declara acá:
 * cada página tiene su propio `opengraph-image.tsx` / `twitter-image.tsx` en su carpeta y
 * Next agrega los meta (con tamaño y alt) solos. */
export function metaPagina({ titulo, descripcion, ruta }: { titulo: string; descripcion: string; ruta: string }): Metadata {
  const completo = `${titulo} | ${SITE_SUFFIX}`;
  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: ruta },
    openGraph: {
      type: "website",
      locale: "es_AR",
      url: ruta,
      siteName: SITE_NAME,
      title: completo,
      description: descripcion,
    },
    twitter: { card: "summary_large_image", title: completo, description: descripcion },
  };
}

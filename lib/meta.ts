import type { Metadata } from "next";
import { SITE_NAME } from "@/content/site";

/* Metadata de cada página. Se arma completa (canónico, Open Graph y Twitter con
 * la imagen) porque en Next un `openGraph` propio de una página REEMPLAZA al del
 * layout: si no repetimos la imagen, se pierde al compartir. */
export function metaPagina({ titulo, descripcion, ruta }: { titulo: string; descripcion: string; ruta: string }): Metadata {
  const completo = `${titulo} | ${SITE_NAME}`;
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
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Sistema MBK: sistema de gestión para emprendedores y pymes" }],
    },
    twitter: { card: "summary_large_image", title: completo, description: descripcion, images: ["/twitter-image"] },
  };
}

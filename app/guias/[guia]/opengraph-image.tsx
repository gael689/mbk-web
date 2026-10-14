import { GUIAS, guiaPorSlug } from "@/content/guias";
import { OG_SIZE, renderOg } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Guía de MBK para emprendedores";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return GUIAS.map((g) => ({ guia: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ guia: string }> }) {
  const g = guiaPorSlug((await params).guia);
  return renderOg({
    etiqueta: "Guía",
    antes: g?.h1[0] ?? "Guía para",
    resaltado: g?.h1[1] ?? "emprendedores",
    despues: "",
    bajada: "Paso a paso, con la mirada de una economista.",
  });
}

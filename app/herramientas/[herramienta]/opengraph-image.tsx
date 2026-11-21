import { HERRAMIENTAS, herramientaPorSlug } from "@/content/herramientas";
import { OG_SIZE, renderOg } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Calculadora gratis de MBK para emprendedores";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return HERRAMIENTAS.map((h) => ({ herramienta: h.slug }));
}

export default async function Image({ params }: { params: Promise<{ herramienta: string }> }) {
  const h = herramientaPorSlug((await params).herramienta);
  return renderOg({
    etiqueta: "Calculadora gratis",
    antes: h?.h1[0] ?? "Hacé la cuenta",
    resaltado: h?.h1[1] ?? "en un minuto",
    despues: "",
    bajada: "Hacé la cuenta en un minuto, desde el celular.",
  });
}

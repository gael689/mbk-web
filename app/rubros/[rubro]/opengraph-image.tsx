import { RUBROS, rubroPorSlug } from "@/content/rubros";
import { OG_SIZE, renderOg } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Sistema MBK: sistema de gestión para tu rubro";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return RUBROS.map((r) => ({ rubro: r.slug }));
}

export default async function Image({ params }: { params: Promise<{ rubro: string }> }) {
  const r = rubroPorSlug((await params).rubro);
  return renderOg({
    etiqueta: r?.nombre ?? "Sistema MBK",
    antes: r?.h1[0] ?? "Sistema para tu",
    resaltado: r?.h1[1] ?? "negocio",
    despues: "",
    bajada: "Ventas, cobros, stock y caja. Desde el celular.",
  });
}

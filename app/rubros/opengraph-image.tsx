import { OG_SIZE, renderOg } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Sistema MBK para cada rubro de negocio";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    etiqueta: "Para tu rubro",
    antes: "El sistema, pensado para",
    resaltado: "tu negocio",
    despues: "",
    bajada: "Indumentaria, pastelerías, estética, comercios y más.",
  });
}

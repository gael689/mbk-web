import { OG_SIZE, renderOg } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "MBK Consultoría: consultoría y sistema de gestión en Bahía Blanca";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    etiqueta: "Bahía Blanca",
    antes: "Consultoría y sistema de gestión",
    resaltado: "en Bahía Blanca",
    despues: "",
    bajada: "Para emprendedores y pymes de la ciudad.",
  });
}

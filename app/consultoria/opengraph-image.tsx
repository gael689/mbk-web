import { OG_SIZE, renderOg } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "MBK Consultoría: consultoría económica para emprendedores y pymes de Bahía Blanca";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    etiqueta: "Consultoría",
    antes: "Un equipo mirando",
    resaltado: "tu negocio",
    despues: "",
    bajada: "Belén Klundt y su equipo. Bahía Blanca.",
  });
}

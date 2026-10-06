import { OG_SIZE, renderOg } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Sistema MBK: sistema de gestión para emprendedores y pymes";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    etiqueta: "Sistema MBK",
    antes: "¿Vendés todos los días y no sabés",
    resaltado: "cuánto ganás",
    despues: "?",
    bajada: "Ventas, cobros, costos y turnos en un solo lugar.",
  });
}

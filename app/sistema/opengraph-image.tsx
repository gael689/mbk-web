import { OG_SIZE, renderOg } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Sistema MBK: ventas, cobros, costos y turnos en un solo lugar";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    etiqueta: "Sistema MBK",
    antes: "Todo tu negocio en",
    resaltado: "un solo lugar",
    despues: "",
    bajada: "Ventas, cobros, costos y turnos. Desde el celular.",
  });
}

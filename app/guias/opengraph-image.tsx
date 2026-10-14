import { OG_SIZE, renderOg } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Guías de MBK para emprendedores y pymes";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    etiqueta: "Guías",
    antes: "Para ordenar tu negocio,",
    resaltado: "paso a paso",
    despues: "",
    bajada: "Precios, ganancia, stock, caja y turnos.",
  });
}

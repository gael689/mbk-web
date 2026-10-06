import { OG_SIZE, renderOg } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Planillas de Excel de gestión para emprendedores, de MBK Consultoría";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    etiqueta: "Planillas",
    antes: "Planillas de gestión",
    resaltado: "listas para usar",
    despues: "",
    bajada: "Ventas, precios, caja, stock y punto de equilibrio.",
  });
}

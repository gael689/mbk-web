import { OG_SIZE, renderOg } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Calculadoras gratis de MBK para emprendedores";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    etiqueta: "Herramientas gratis",
    antes: "Hacé la cuenta",
    resaltado: "en un minuto",
    despues: "",
    bajada: "Precio de venta, punto de equilibrio y cuánto te queda.",
  });
}

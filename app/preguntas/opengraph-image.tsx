import { OG_SIZE, renderOg } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Preguntas frecuentes del Sistema MBK";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    etiqueta: "Preguntas frecuentes",
    antes: "Lo que más nos preguntan sobre",
    resaltado: "el sistema",
    despues: "",
    bajada: "Respuestas claras, sin vueltas.",
  });
}

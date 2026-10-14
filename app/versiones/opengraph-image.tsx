import { VERSION_ACTUAL } from "@/content/versiones";
import { OG_SIZE, renderOg } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Versiones del Sistema MBK";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    etiqueta: "Versiones",
    antes: "Cómo fue creciendo",
    resaltado: "el Sistema MBK",
    despues: "",
    bajada: `Versión actual: ${VERSION_ACTUAL.version}.`,
  });
}

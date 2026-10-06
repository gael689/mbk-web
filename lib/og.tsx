import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

type Og = {
  /** La etiqueta rosa de arriba. */
  etiqueta: string;
  /** Titular: primera parte, parte resaltada en rosa y cierre (puede ser vacío). */
  antes: string;
  resaltado: string;
  despues?: string;
  /** Una línea de apoyo. */
  bajada: string;
};

/* Imagen que se ve al compartir un link por WhatsApp, Instagram o LinkedIn.
 * Una sola plantilla para la home y las 4 páginas: logo + titular con la frase clave
 * en rosa + una línea de apoyo, con la paleta de MBK. */
export async function renderOg({ etiqueta, antes, resaltado, despues = "", bajada }: Og) {
  const [bold, xbold, logo] = await Promise.all([
    readFile(join(process.cwd(), "node_modules/@fontsource/poppins/files/poppins-latin-700-normal.woff")),
    readFile(join(process.cwd(), "node_modules/@fontsource/poppins/files/poppins-latin-800-normal.woff")),
    readFile(join(process.cwd(), "public/logo.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#FFF8F1",
          fontFamily: "Poppins",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* círculos de color, como en la fila de íconos de sus posts */}
        <div style={{ position: "absolute", right: -70, top: -70, width: 300, height: 300, borderRadius: 300, background: "#FCE4F1", display: "flex" }} />
        <div style={{ position: "absolute", right: 150, bottom: -90, width: 200, height: 200, borderRadius: 200, background: "#DCEBF7", display: "flex" }} />
        <div style={{ position: "absolute", right: 130, top: 350, width: 70, height: 70, borderRadius: 70, background: "#F15825", display: "flex" }} />
        <div style={{ position: "absolute", right: 300, top: 90, width: 60, height: 60, borderRadius: 60, background: "#039145", display: "flex" }} />
        <div style={{ position: "absolute", right: 60, top: 250, width: 50, height: 50, borderRadius: 50, background: "#7C4DFF", display: "flex" }} />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 70px", width: 1060 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              background: "#C4187E",
              color: "#fff",
              fontSize: 30,
              fontWeight: 700,
              padding: "8px 30px",
              borderRadius: 999,
            }}
          >
            {etiqueta}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: 28, fontSize: 66, fontWeight: 800, lineHeight: 1.06, letterSpacing: -2, color: "#0A0A0A", maxWidth: 940 }}>
            <span>{antes}&nbsp;</span>
            <span style={{ color: "#E42E9A" }}>{resaltado}</span>
            {despues ? <span>&nbsp;{despues}</span> : null}
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 28, fontWeight: 700, color: "#4B4640", maxWidth: 760 }}>{bajada}</div>
        </div>

        <div style={{ position: "absolute", right: 56, bottom: 44, display: "flex", background: "#fff", borderRadius: 28, padding: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" width={188} height={150} />
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Poppins", data: bold, weight: 700, style: "normal" },
        { name: "Poppins", data: xbold, weight: 800, style: "normal" },
      ],
    },
  );
}

import { Demo } from "@/components/Demo";
import { Formas } from "@/components/Formas";
import { Instagram } from "@/components/Instagram";
import { ParaQuien } from "@/components/ParaQuien";
import { Pasos } from "@/components/Pasos";
import { Soluciones } from "@/components/Soluciones";
import { CtaCierre, SubHero } from "@/components/SubPagina";
import { JsonLdMigas } from "@/components/JsonLd";
import { metaPagina } from "@/lib/meta";

export const metadata = metaPagina({
  titulo: "Sistema de gestión: ventas, cobros, costos y turnos",
  descripcion:
    "Registrá ventas y cobros, calculá costos y controlá clientes y turnos desde el celular. Un sistema creado por una economista de Bahía Blanca.",
  ruta: "/sistema",
});

// Se regenera cada 6 h para traer los videos nuevos de YouTube (tiene que ser un literal: 21600 s).
export const revalidate = 21600;

export default function Sistema() {
  return (
    <>
      <SubHero
        etiqueta="Sistema MBK"
        tono="pink"
        titulo={
          <>
            Todo tu negocio en <span className="hl">un solo lugar</span>
          </>
        }
        bajada="Cómo el Sistema MBK resuelve los problemas de todos los días de un emprendimiento, y lo que ganás con cada uno."
      />
      <Soluciones />
      <ParaQuien />
      <Formas />
      <Demo />
      <Pasos />
      <Instagram />
      <CtaCierre />
      <JsonLdMigas nombre="Sistema MBK" ruta="/sistema" />
    </>
  );
}

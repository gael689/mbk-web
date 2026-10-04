import { Belen } from "@/components/Belen";
import { Consultoria } from "@/components/Consultoria";
import { CtaCierre, SubHero } from "@/components/SubPagina";
import { metaPagina } from "@/lib/meta";

export const metadata = metaPagina({
  titulo: "Consultoría económica en Bahía Blanca",
  descripcion:
    "Belén Klundt, Licenciada y Profesora en Economía, y su equipo acompañan a emprendimientos y pymes en el día a día: rentabilidad y costos, precios, competidores y proveedores, mercados y más. Bahía Blanca.",
  ruta: "/consultoria",
});

export default function ConsultoriaPagina() {
  return (
    <>
      <SubHero
        etiqueta="Consultoría"
        tono="blue"
        titulo={
          <>
            Una economista mirando <span className="hl">tu negocio</span>
          </>
        }
        bajada="Quién está detrás de MBK y los ocho servicios de consultoría para emprendimientos y pymes."
      />
      <Belen />
      <Consultoria />
      <CtaCierre titulo="¿Querés que Belén y su equipo miren tu negocio?" texto="Contanos qué querés resolver y te escribimos por WhatsApp. Sin compromiso." />
    </>
  );
}

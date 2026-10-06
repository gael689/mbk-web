import { Planillas } from "@/components/Planillas";
import { CtaCierre, SubHero } from "@/components/SubPagina";
import { JsonLdMigas } from "@/components/JsonLd";
import { metaPagina } from "@/lib/meta";

export const metadata = metaPagina({
  titulo: "Planillas de Excel para emprendedores",
  descripcion:
    "Planillas de Excel listas para usar: control de ventas, cálculo de precios, flujo de caja, stock y punto de equilibrio para emprendedores y pymes.",
  ruta: "/planillas",
});

export default function PlanillasPagina() {
  return (
    <>
      <SubHero
        etiqueta="Planillas de Excel"
        tono="orange"
        titulo={
          <>
            Planillas de Excel para <span className="hl">ordenar tu negocio</span>
          </>
        }
        bajada="Para arrancar sin sistema: controlá ventas, precios, caja y stock con planillas de Excel hechas por una economista."
      />
      <Planillas />
      <CtaCierre
        titulo="¿Querés algo más completo?"
        texto="El Sistema MBK reúne ventas, cobros, costos y turnos en un solo lugar, desde el celular."
        ctaTexto="Conocer el sistema"
        ctaHref="/sistema"
      />
      <JsonLdMigas nombre="Planillas" ruta="/planillas" />
    </>
  );
}

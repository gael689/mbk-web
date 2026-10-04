import { Faq } from "@/components/Faq";
import { JsonLdFaq } from "@/components/JsonLd";
import { CtaCierre, SubHero } from "@/components/SubPagina";
import { metaPagina } from "@/lib/meta";

export const metadata = metaPagina({
  titulo: "Preguntas frecuentes del Sistema MBK",
  descripcion:
    "¿Cómo sé cuánto gano? ¿Cómo calculo el margen de mis productos? ¿Sirve si no sé de computación? ¿Funciona en el celular? ¿Mis datos son míos? Respuestas claras sobre el sistema de gestión para emprendedores y pymes de MBK.",
  ruta: "/preguntas",
});

export default function Preguntas() {
  return (
    <>
      <SubHero
        etiqueta="Preguntas frecuentes"
        tono="green"
        titulo={
          <>
            Todo lo que querés saber <span className="hl">antes de probar</span>
          </>
        }
        bajada="Respuestas cortas y claras sobre cómo funciona el Sistema MBK."
      />
      <Faq />
      <CtaCierre titulo="¿Te quedó alguna duda?" texto="Escribinos y te respondemos. O dejá tus datos y te contactamos." />
      <JsonLdFaq />
    </>
  );
}

import Link from "next/link";
import { Actualizado } from "@/components/Actualizado";
import { JsonLdMigasN, JsonLdPreguntas } from "@/components/JsonLd";
import { EncabezadoSeccion } from "@/components/Piezas";
import { PreguntasLista } from "@/components/PreguntasLista";
import { CtaCierre, SubHero } from "@/components/SubPagina";
import { SERVICIOS_CONSULTORIA } from "@/content/consultoria";
import { ULTIMA_MODIFICACION } from "@/content/fechas";
import { Check } from "@/content/iconos";
import { RUBROS } from "@/content/rubros";
import { metaPagina } from "@/lib/meta";

export const metadata = metaPagina({
  titulo: "Consultoría y sistema de gestión en Bahía Blanca",
  descripcion:
    "MBK Consultoría trabaja en Bahía Blanca con emprendedores y pymes: consultoría económica y financiera, planillas y el Sistema MBK para llevar ventas, cobros, stock y caja.",
  ruta: "/bahia-blanca",
});

const PREGUNTAS = [
  {
    q: "¿Dónde trabaja MBK Consultoría?",
    a: "MBK Consultoría trabaja desde Bahía Blanca, Buenos Aires, con emprendedores y pymes de la ciudad. El Sistema MBK es online, así que también se usa desde cualquier otro lugar del país.",
  },
  {
    q: "¿Quién está detrás de MBK?",
    a: "Belén Klundt, Licenciada y Profesora en Economía, y su equipo. El Sistema MBK nació de su trabajo diario asesorando emprendedores y pymes de Bahía Blanca.",
  },
  {
    q: "¿Cómo pido una consultoría o una demo del sistema en Bahía Blanca?",
    a: "Escribiendo por WhatsApp o dejando tus datos en el formulario de la web. Te respondemos por WhatsApp, sin compromiso, y coordinamos una demo del sistema o una primera charla sobre tu negocio.",
  },
  {
    q: "¿Necesito ser de Bahía Blanca para usar el sistema?",
    a: "No. El sistema funciona desde el navegador, con tu cuenta y tus datos, en cualquier ciudad. La consultoría y el acompañamiento son desde Bahía Blanca; si estás en otra ciudad, escribinos y vemos cómo hacerlo.",
  },
];

export default function BahiaBlanca() {
  return (
    <>
      <SubHero
        etiqueta="Bahía Blanca"
        tono="blue"
        titulo={
          <>
            Consultoría y sistema de gestión <span className="hl">en Bahía Blanca</span>
          </>
        }
        bajada="Una economista de Bahía Blanca y su equipo, para que emprendedores y pymes de la ciudad sepan cuánto ganan y decidan con números."
      />

      <section className="pb-6 md:pb-10" aria-label="Resumen">
        <div className="wrap">
          <p className="max-w-3xl rounded-3xl bg-blue-soft p-5 text-[1.15rem] leading-relaxed sm:p-7">
            MBK Consultoría es un estudio de Bahía Blanca, Buenos Aires, que ofrece consultoría económica y financiera para emprendimientos y pymes, planillas de gestión en Excel y el Sistema MBK, un sistema online para llevar ventas, cobros, costos, stock, caja, clientes y turnos desde el celular. Lo dirige Belén Klundt, Licenciada y Profesora en Economía.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="t-bb-que">
        <div className="wrap grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <EncabezadoSeccion id="t-bb-que" etiqueta="Lo que hacemos" titulo={<>Tres formas de <span className="hl">ordenar tu negocio</span></>} />
            <ul className="space-y-5 text-[1.1rem] leading-relaxed">
              <li>
                <strong>El Sistema MBK.</strong> Ventas, cobros, costos, stock, caja, clientes y turnos en un solo lugar.{" "}
                <Link href="/sistema" className="font-bold underline underline-offset-2">
                  Cómo funciona
                </Link>
                .
              </li>
              <li>
                <strong>Consultoría económica.</strong> Belén y su equipo miran tu negocio con números y te ayudan a decidir.{" "}
                <Link href="/consultoria" className="font-bold underline underline-offset-2">
                  Qué incluye
                </Link>
                .
              </li>
              <li>
                <strong>Planillas de Excel.</strong> Archivos listos para usar si recién estás empezando a ordenarte.{" "}
                <Link href="/planillas" className="font-bold underline underline-offset-2">
                  Ver planillas
                </Link>
                .
              </li>
            </ul>
          </div>
          <div>
            <h2 className="h3">Servicios de consultoría</h2>
            <ul className="mt-5 space-y-2.5">
              {SERVICIOS_CONSULTORIA.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-[1.05rem]">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-green-strong" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="t-bb-rubros">
        <div className="wrap">
          <h2 id="t-bb-rubros" className="h2 max-w-3xl">
            Para los negocios de <span className="hl">la ciudad</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[1.1rem] text-muted">Comercios, servicios y emprendimientos de todos los rubros. Mirá cómo se aplica al tuyo:</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {RUBROS.map((r) => (
              <li key={r.slug}>
                <Link href={`/rubros/${r.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-line bg-cream px-4 font-semibold hover:bg-blue-soft">
                  {r.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PreguntasLista
        id="t-faq-bb"
        titulo={
          <>
            Preguntas sobre <span className="hl">MBK en Bahía Blanca</span>
          </>
        }
        preguntas={PREGUNTAS}
      />

      <Actualizado fecha={ULTIMA_MODIFICACION.bahiaBlanca} />
      <CtaCierre titulo="¿Tenés un negocio en Bahía Blanca?" texto="Contanos qué querés resolver y te escribimos por WhatsApp. Sin compromiso." />
      <JsonLdPreguntas ruta="/bahia-blanca" preguntas={PREGUNTAS} />
      <JsonLdMigasN migas={[{ nombre: "Bahía Blanca", ruta: "/bahia-blanca" }]} />
    </>
  );
}

import Link from "next/link";
import { Actualizado } from "@/components/Actualizado";
import { TarjetaHerramienta } from "@/components/Herramienta";
import { JsonLdListaHerramientas, JsonLdMigasN } from "@/components/JsonLd";
import { OrbIcono } from "@/components/Piezas";
import { CtaCierre, SubHero } from "@/components/SubPagina";
import { ULTIMA_MODIFICACION } from "@/content/fechas";
import { HERRAMIENTAS, ICONO_HERRAMIENTA } from "@/content/herramientas";
import { ArrowRight } from "@/content/iconos";
import { TONO } from "@/content/modulos";
import { metaPagina } from "@/lib/meta";

export const metadata = metaPagina({
  titulo: "Calculadoras gratis para emprendedores",
  descripcion:
    "Seis calculadoras gratis para tu negocio: precio de venta, punto de equilibrio, cuánto te queda, costo de un producto, valor de la hora y margen y markup.",
  ruta: "/herramientas",
});

export default function Herramientas() {
  return (
    <>
      <SubHero
        etiqueta="Herramientas gratis"
        tono="orange"
        titulo={
          <>
            Hacé la cuenta <span className="hl">en un minuto</span>
          </>
        }
        bajada="Seis calculadoras para ponerle números a tu negocio. Sin registrarte: lo que escribís queda en tu celular."
      />

      <nav className="pb-4" aria-label="Calculadoras">
        <div className="wrap">
          <ul className="flex flex-wrap gap-2">
            {HERRAMIENTAS.map((h) => (
              <li key={h.slug}>
                <a href={`#${h.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 font-semibold hover:bg-blue-soft">
                  {h.nombre}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {HERRAMIENTAS.map((h) => (
        <section key={h.slug} id={h.slug} className="scroll-mt-24 py-8 md:py-12" aria-labelledby={`t-${h.slug}`}>
          <div className="wrap">
            <div className="mb-5 flex items-start gap-4">
              <OrbIcono Icon={ICONO_HERRAMIENTA[h.slug]} tono={h.tono} size={52} />
              <div>
                <h2 id={`t-${h.slug}`} className="h3">
                  {h.h1.join(" ")}
                </h2>
                <p className="mt-1.5 text-muted">{h.bajada}</p>
              </div>
            </div>
            <TarjetaHerramienta h={h} />
            <Link href={`/herramientas/${h.slug}`} className={`mt-4 inline-flex min-h-11 items-center gap-1.5 font-bold ${TONO[h.tono].text}`}>
              Abrir sola, para guardarla o compartirla
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      ))}

      <Actualizado fecha={ULTIMA_MODIFICACION.herramientas} />
      <CtaCierre titulo="¿Y si la cuenta se hiciera sola?" texto="Te mostramos el Sistema MBK funcionando con un ejemplo de tu rubro. Sin compromiso." />
      <JsonLdListaHerramientas />
      <JsonLdMigasN migas={[{ nombre: "Herramientas", ruta: "/herramientas" }]} />
    </>
  );
}

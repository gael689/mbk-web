import Link from "next/link";
import { notFound } from "next/navigation";
import { Actualizado } from "@/components/Actualizado";
import { JsonLdMigasN, JsonLdPreguntas, JsonLdRubro } from "@/components/JsonLd";
import { EncabezadoSeccion, OrbIcono } from "@/components/Piezas";
import { PreguntasLista } from "@/components/PreguntasLista";
import { CtaCierre, SubHero } from "@/components/SubPagina";
import { ULTIMA_MODIFICACION } from "@/content/fechas";
import { ArrowRight, Check } from "@/content/iconos";
import { GUIAS } from "@/content/guias";
import { TONO } from "@/content/modulos";
import { RUBROS, rubroPorSlug } from "@/content/rubros";
import { metaPagina } from "@/lib/meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return RUBROS.map((r) => ({ rubro: r.slug }));
}

export async function generateMetadata({ params }: PageProps<"/rubros/[rubro]">) {
  const r = rubroPorSlug((await params).rubro);
  if (!r) return {};
  return metaPagina({ titulo: r.titulo, descripcion: r.descripcion, ruta: `/rubros/${r.slug}` });
}

export default async function RubroPagina({ params }: PageProps<"/rubros/[rubro]">) {
  const r = rubroPorSlug((await params).rubro);
  if (!r) notFound();
  const ruta = `/rubros/${r.slug}`;
  const t = TONO[r.tono];
  const guias = GUIAS.filter((g) => r.guias.includes(g.slug));
  const parecidos = RUBROS.filter((x) => r.parecidos.includes(x.slug));

  return (
    <>
      <SubHero
        etiqueta={r.nombre}
        tono={r.tono}
        titulo={
          <>
            {r.h1[0]} <span className="hl">{r.h1[1]}</span>
          </>
        }
        bajada={r.bajada}
        volver={{ href: "/rubros", texto: "Todos los rubros" }}
      />

      {/* Definición que se entiende sola: lo primero que lee una persona y lo que cita un buscador. */}
      <section className="pb-6 md:pb-10" aria-label="Resumen">
        <div className="wrap">
          <p className={`max-w-3xl rounded-3xl ${t.soft} p-5 text-[1.15rem] leading-relaxed sm:p-7`}>{r.citable}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="t-problemas">
        <div className="wrap">
          <EncabezadoSeccion
            id="t-problemas"
            etiqueta="Lo que te pasa y lo que cambia"
            titulo={
              <>
                Los problemas de {r.tuNegocio}, <span className="hl">uno por uno</span>
              </>
            }
          />
          <div className="space-y-5">
            {r.problemas.map((p) => (
              <article key={p.problema} data-reveal className="card grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_1fr_0.8fr] lg:gap-10">
                <div>
                  <span className={`chip ${t.soft}`}>{p.modulo}</span>
                  <p className="mt-4 text-[1.2rem] italic leading-snug text-muted">{p.problema}</p>
                </div>
                <div>
                  <p className="text-[0.85rem] font-bold uppercase tracking-[0.14em] text-muted">Lo que hace el sistema</p>
                  <p className="mt-1.5 text-[1.05rem] leading-relaxed">{p.hace}</p>
                </div>
                <div className={`rounded-3xl ${t.soft} p-5`}>
                  <p className={`text-[0.85rem] font-bold uppercase tracking-[0.14em] ${t.text}`}>Lo que ganás</p>
                  <p className="mt-1.5 text-[1.15rem] font-extrabold leading-snug tracking-tight">{p.gana}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="t-dia">
        <div className="wrap grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 id="t-dia" className="h2">
              {r.diaTitulo}
            </h2>
            <p className="mt-4 text-[1.05rem] text-muted">Un ejemplo de cómo se usa el sistema en un día común. No es un caso real: es para que lo imagines en tu negocio.</p>
            <p className="mt-6 text-[0.85rem] font-bold uppercase tracking-[0.14em] text-muted">Lo que más vas a usar</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {r.usa.map((x) => (
                <li key={x} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-cream px-3.5 py-1.5 text-[0.95rem] font-medium">
                  <Check className="h-4 w-4 text-green-strong" aria-hidden="true" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <ol className="space-y-4">
            {r.dia.map((paso, i) => (
              <li key={paso} className="flex gap-4" data-reveal>
                <OrbIcono Icon={r.Icon} tono={r.tono} size={40} />
                <p className="pt-1.5 text-[1.1rem] leading-relaxed">
                  <span className="sr-only">Paso {i + 1}: </span>
                  {paso}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <PreguntasLista
        id="t-faq-rubro"
        titulo={
          <>
            Preguntas de <span className="hl">{r.nombre.toLowerCase()}</span>
          </>
        }
        preguntas={r.faq}
      />

      {guias.length > 0 && (
        <section className="pb-14 md:pb-20" aria-labelledby="t-guias-rubro">
          <div className="wrap">
            <h2 id="t-guias-rubro" className="h3">
              Guías que te pueden servir
            </h2>
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {guias.map((g) => (
                <li key={g.slug}>
                  <Link href={`/guias/${g.slug}`} className="card tono-card flex items-center justify-between gap-4 p-5">
                    <span className="font-bold leading-snug">{g.titulo}</span>
                    <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="pb-14 md:pb-20" aria-labelledby="t-otros">
        <div className="wrap">
          <h2 id="t-otros" className="text-[1.05rem] font-bold uppercase tracking-[0.12em] text-muted">
            Otros rubros
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {parecidos.map((x) => (
              <li key={x.slug}>
                <Link href={`/rubros/${x.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 font-semibold hover:bg-blue-soft">
                  {x.nombre}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/rubros" className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 font-semibold hover:bg-blue-soft">
                Ver todos
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <Actualizado fecha={ULTIMA_MODIFICACION.rubros} />
      <CtaCierre titulo={`¿Querés ver cómo queda en ${r.tuNegocio}?`} texto="Dejanos tus datos y te mostramos el sistema funcionando con un ejemplo de tu rubro. Sin compromiso." />
      <JsonLdRubro ruta={ruta} nombre={r.nombre} descripcion={r.descripcion} />
      <JsonLdPreguntas ruta={ruta} preguntas={r.faq} />
      <JsonLdMigasN
        migas={[
          { nombre: "Rubros", ruta: "/rubros" },
          { nombre: r.nombre, ruta },
        ]}
      />
    </>
  );
}

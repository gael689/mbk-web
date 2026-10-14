import Link from "next/link";
import { notFound } from "next/navigation";
import { Actualizado } from "@/components/Actualizado";
import { JsonLdArticulo, JsonLdMigasN, JsonLdPreguntas } from "@/components/JsonLd";
import { PreguntasLista } from "@/components/PreguntasLista";
import { CtaCierre, SubHero } from "@/components/SubPagina";
import { GUIAS, guiaPorSlug } from "@/content/guias";
import { TONO } from "@/content/modulos";
import { RUBROS } from "@/content/rubros";
import { metaPagina } from "@/lib/meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIAS.map((g) => ({ guia: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guias/[guia]">) {
  const g = guiaPorSlug((await params).guia);
  if (!g) return {};
  return metaPagina({ titulo: g.titulo, descripcion: g.descripcion, ruta: `/guias/${g.slug}` });
}

export default async function GuiaPagina({ params }: PageProps<"/guias/[guia]">) {
  const g = guiaPorSlug((await params).guia);
  if (!g) notFound();
  const ruta = `/guias/${g.slug}`;
  const t = TONO[g.tono];
  const rubros = RUBROS.filter((r) => g.rubros.includes(r.slug));
  const otras = GUIAS.filter((x) => x.slug !== g.slug);

  return (
    <>
      <SubHero
        etiqueta="Guía"
        tono={g.tono}
        titulo={
          <>
            {g.h1[0]} <span className="hl">{g.h1[1]}</span>
          </>
        }
        bajada={g.bajada}
        volver={{ href: "/guias", texto: "Todas las guías" }}
      />

      <article className="pb-10 md:pb-16">
        <div className="wrap max-w-3xl">
          <p className={`rounded-3xl ${t.soft} p-5 text-[1.15rem] leading-relaxed sm:p-7`}>
            <strong className="font-extrabold">En pocas palabras: </strong>
            {g.respuesta}
          </p>

          {g.secciones.map((s) => (
            <section key={s.h} className="mt-10" aria-label={s.h}>
              <h2 className="h3">{s.h}</h2>
              {s.p.map((p) => (
                <p key={p} className="mt-4 text-[1.1rem] leading-relaxed">
                  {p}
                </p>
              ))}
              {s.lista && (
                <ul className="mt-4 list-disc space-y-2 pl-6 text-[1.1rem] leading-relaxed marker:text-pink">
                  {s.lista.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section className={`mt-12 rounded-3xl ${t.soft} p-6 sm:p-8`} aria-label={g.sistema.titulo}>
            <h2 className="h3">{g.sistema.titulo}</h2>
            <p className="mt-3 text-[1.1rem] leading-relaxed">{g.sistema.texto}</p>
            <Link href="/sistema" className="mt-4 inline-block font-bold underline underline-offset-2">
              Mirá todo lo que hace el Sistema MBK
            </Link>
          </section>
        </div>
      </article>

      <PreguntasLista
        id="t-faq-guia"
        titulo={
          <>
            Para <span className="hl">aclarar dudas</span>
          </>
        }
        preguntas={g.faq}
      />

      <section className="pb-14 md:pb-20" aria-labelledby="t-mas">
        <div className="wrap grid gap-8 md:grid-cols-2">
          <div>
            <h2 id="t-mas" className="text-[1.05rem] font-bold uppercase tracking-[0.12em] text-muted">
              Si tenés uno de estos rubros
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {rubros.map((r) => (
                <li key={r.slug}>
                  <Link href={`/rubros/${r.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 font-semibold hover:bg-blue-soft">
                    {r.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[1.05rem] font-bold uppercase tracking-[0.12em] text-muted">Otras guías</h2>
            <ul className="mt-4 space-y-2">
              {otras.map((x) => (
                <li key={x.slug}>
                  <Link href={`/guias/${x.slug}`} className="font-semibold underline underline-offset-2">
                    {x.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Actualizado fecha={g.fecha} />
      <CtaCierre />
      <JsonLdArticulo ruta={ruta} titulo={g.titulo} descripcion={g.descripcion} fecha={g.fecha} />
      <JsonLdPreguntas ruta={ruta} preguntas={g.faq} />
      <JsonLdMigasN
        migas={[
          { nombre: "Guías", ruta: "/guias" },
          { nombre: g.h1.join(" "), ruta },
        ]}
      />
    </>
  );
}

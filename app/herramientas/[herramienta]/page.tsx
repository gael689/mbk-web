import Link from "next/link";
import { notFound } from "next/navigation";
import { Actualizado } from "@/components/Actualizado";
import { TarjetaHerramienta } from "@/components/Herramienta";
import { JsonLdHerramienta, JsonLdMigasN } from "@/components/JsonLd";
import { CtaCierre, SubHero } from "@/components/SubPagina";
import { guiaPorSlug } from "@/content/guias";
import { HERRAMIENTAS, herramientaPorSlug } from "@/content/herramientas";
import { metaPagina } from "@/lib/meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return HERRAMIENTAS.map((h) => ({ herramienta: h.slug }));
}

export async function generateMetadata({ params }: PageProps<"/herramientas/[herramienta]">) {
  const h = herramientaPorSlug((await params).herramienta);
  if (!h) return {};
  return metaPagina({ titulo: h.titulo, descripcion: h.descripcion, ruta: `/herramientas/${h.slug}` });
}

export default async function HerramientaPagina({ params }: PageProps<"/herramientas/[herramienta]">) {
  const h = herramientaPorSlug((await params).herramienta);
  if (!h) notFound();
  const ruta = `/herramientas/${h.slug}`;
  const guia = guiaPorSlug(h.guia);
  const otras = HERRAMIENTAS.filter((x) => x.slug !== h.slug);

  return (
    <>
      <SubHero
        etiqueta="Calculadora gratis"
        tono={h.tono}
        titulo={
          <>
            {h.h1[0]} <span className="hl">{h.h1[1]}</span>
          </>
        }
        bajada={h.bajada}
        volver={{ href: "/herramientas", texto: "Todas las herramientas" }}
      />

      <section className="pb-10 md:pb-14" aria-label={`Calculadora: ${h.nombre}`}>
        <div className="wrap">
          <TarjetaHerramienta h={h} />
        </div>
      </section>

      <section className="pb-14 md:pb-20" aria-labelledby="t-mas">
        <div className="wrap grid gap-8 md:grid-cols-2">
          <div>
            <h2 id="t-mas" className="text-[1.05rem] font-bold uppercase tracking-[0.12em] text-muted">
              Otras calculadoras
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {otras.map((x) => (
                <li key={x.slug}>
                  <Link href={`/herramientas/${x.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 font-semibold hover:bg-blue-soft">
                    {x.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {guia ? (
            <div>
              <h2 className="text-[1.05rem] font-bold uppercase tracking-[0.12em] text-muted">Para entender la cuenta</h2>
              <p className="mt-4">
                <Link href={`/guias/${guia.slug}`} className="font-semibold underline underline-offset-2">
                  {guia.titulo}
                </Link>
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <Actualizado fecha={h.fecha} />
      <CtaCierre />
      <JsonLdHerramienta ruta={ruta} nombre={h.titulo} descripcion={h.descripcion} fecha={h.fecha} />
      <JsonLdMigasN
        migas={[
          { nombre: "Herramientas", ruta: "/herramientas" },
          { nombre: h.nombre, ruta },
        ]}
      />
    </>
  );
}

import Link from "next/link";
import { Actualizado } from "@/components/Actualizado";
import { JsonLdMigasN } from "@/components/JsonLd";
import { EncabezadoSeccion, OrbIcono } from "@/components/Piezas";
import { CtaCierre, SubHero } from "@/components/SubPagina";
import { ULTIMA_MODIFICACION } from "@/content/fechas";
import { ArrowRight } from "@/content/iconos";
import { TONO } from "@/content/modulos";
import { RUBROS } from "@/content/rubros";
import { metaPagina } from "@/lib/meta";

export const metadata = metaPagina({
  titulo: "Sistema de gestión para cada rubro de negocio",
  descripcion:
    "El Sistema MBK para indumentaria, pastelerías, gastronomía, estética, peluquerías, comercios, servicios, veterinarias y emprendimientos artesanales. Elegí tu rubro.",
  ruta: "/rubros",
});

export default function Rubros() {
  return (
    <>
      <SubHero
        etiqueta="Para tu rubro"
        tono="orange"
        titulo={
          <>
            El sistema, <span className="hl">pensado para tu negocio</span>
          </>
        }
        bajada="Cada rubro tiene sus propios problemas de todos los días. Elegí el tuyo y mirá cómo los resuelve el Sistema MBK."
      />
      <section className="section pt-4 md:pt-4" aria-labelledby="t-rubros">
        <div className="wrap">
          <EncabezadoSeccion id="t-rubros" etiqueta="Rubros" titulo={<>¿Qué <span className="hl">vendés</span> o qué servicio das?</>} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RUBROS.map((r) => {
              const t = TONO[r.tono];
              return (
                <li key={r.slug} data-reveal>
                  <Link href={`/rubros/${r.slug}`} className="card tono-card flex h-full flex-col gap-4 p-6">
                    <OrbIcono Icon={r.Icon} tono={r.tono} size={52} />
                    <div className="flex-1">
                      <h3 className="text-[1.2rem] font-extrabold leading-tight tracking-tight">{r.nombre}</h3>
                      <p className="mt-1.5 text-muted">{r.bajada}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 font-bold ${t.text}`}>
                      Ver cómo te ayuda
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-10 text-muted">
            ¿No ves tu rubro? El sistema muestra las secciones que corresponden a cómo trabajás: productos, servicios o ambas cosas.{" "}
            <Link href="/sistema" className="font-bold underline underline-offset-2">
              Mirá todo lo que hace
            </Link>{" "}
            o{" "}
            <Link href="/?demo=1#probar" className="font-bold underline underline-offset-2">
              pedí una demo
            </Link>
            .
          </p>
        </div>
      </section>
      <Actualizado fecha={ULTIMA_MODIFICACION.rubros} />
      <CtaCierre titulo="¿No sabés por dónde empezar?" texto="Contanos qué vendés y te mostramos el sistema con un ejemplo de tu rubro." />
      <JsonLdMigasN migas={[{ nombre: "Rubros", ruta: "/rubros" }]} />
    </>
  );
}

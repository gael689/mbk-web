import Link from "next/link";
import { Actualizado } from "@/components/Actualizado";
import { JsonLdMigasN } from "@/components/JsonLd";
import { CtaCierre, SubHero } from "@/components/SubPagina";
import { ULTIMA_MODIFICACION } from "@/content/fechas";
import { VERSIONES, VERSION_ACTUAL } from "@/content/versiones";
import { metaPagina } from "@/lib/meta";

export const metadata = metaPagina({
  titulo: `Versiones del Sistema MBK (actual: ${VERSION_ACTUAL.version})`,
  descripcion: `Cómo fue creciendo el Sistema MBK, versión por versión. Versión actual: ${VERSION_ACTUAL.version}, ${VERSION_ACTUAL.titulo.toLowerCase()}.`,
  ruta: "/versiones",
});

const fechaLarga = (f: string) => {
  const [y, m, d] = f.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
};

export default function Versiones() {
  return (
    <>
      <SubHero
        etiqueta="Versiones"
        tono="green"
        titulo={
          <>
            Cómo fue creciendo <span className="hl">el sistema</span>
          </>
        }
        bajada="El Sistema MBK se actualiza seguido, a partir de lo que piden los emprendedores que lo usan. Acá está cada versión, en pocas palabras."
      />

      <section className="pb-6 md:pb-10" aria-label="Versión actual">
        <div className="wrap">
          <p className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-3xl bg-green-soft px-5 py-4 text-[1.1rem]">
            <span className="font-extrabold">Versión actual: {VERSION_ACTUAL.version}</span>
            {VERSION_ACTUAL.fecha && <span className="text-muted">desde el {fechaLarga(VERSION_ACTUAL.fecha)}</span>}
          </p>
        </div>
      </section>

      <section className="section pt-4 md:pt-6" aria-label="Historial de versiones">
        <div className="wrap max-w-3xl">
          <ol className="relative border-l-2 border-line pl-6 sm:pl-8">
            {VERSIONES.map((v, i) => (
              <li key={v.version} className="relative pb-10 last:pb-0" data-reveal>
                <span
                  className={`absolute -left-[33px] top-1.5 h-4 w-4 rounded-full border-2 border-cream sm:-left-[41px] ${i === 0 ? "bg-green" : "bg-line"}`}
                  aria-hidden="true"
                />
                <h2 className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-[1.35rem] font-extrabold tracking-tight">Versión {v.version}</span>
                  <span className="text-[1.05rem] font-bold text-muted">{v.titulo}</span>
                </h2>
                <p className="mt-1 text-[0.95rem] text-muted">
                  {v.fecha ? <time dateTime={v.fecha}>{fechaLarga(v.fecha)}</time> : "2026"}
                  {i === 0 && <span className="ml-2 rounded-full bg-green-soft px-2.5 py-0.5 text-[0.8rem] font-bold text-green-strong">Actual</span>}
                </p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[1.05rem] leading-relaxed marker:text-green">
                  {v.cambios.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <p className="mt-12 text-muted">
            ¿Querés ver cómo funciona hoy?{" "}
            <Link href="/sistema" className="font-bold underline underline-offset-2">
              Todo lo que hace el sistema
            </Link>
            .
          </p>
        </div>
      </section>

      <Actualizado fecha={ULTIMA_MODIFICACION.versiones} />
      <CtaCierre />
      <JsonLdMigasN migas={[{ nombre: "Versiones", ruta: "/versiones" }]} />
    </>
  );
}

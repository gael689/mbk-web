import Image from "next/image";
import { BELEN_PHOTO } from "@/content/site";
import { TESTIMONIOS } from "@/content/testimonios";
import { SHOW_TESTIMONIALS } from "@/content/site";
import { EncabezadoSeccion } from "./Piezas";

const VALORES = [
  { t: "Compromiso", c: "bg-pink-soft" },
  { t: "Innovación", c: "bg-blue-soft" },
  { t: "Transparencia", c: "bg-green-soft" },
];

/* 4 · Pensado desde la experiencia (lo que pidió Belén). */
export function Belen() {
  return (
    <section id="belen" className="bg-sand py-16 md:py-24" aria-labelledby="t-belen">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div data-reveal className="mx-auto w-full max-w-sm">
          {BELEN_PHOTO ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-[var(--shadow-lift)]">
              <Image src={BELEN_PHOTO} alt="Belén Klundt, Licenciada y Profesora en Economía" fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover" />
            </div>
          ) : (
            <div className="card flex aspect-[4/5] flex-col items-center justify-center gap-6 rounded-[2.5rem] p-8 text-center">
              <Image src="/logo.png" alt="MBK Consultoría" width={395} height={314} className="h-auto w-44" />
              <div>
                <p className="text-2xl font-extrabold tracking-tight">Belén Klundt</p>
                <p className="mt-1 text-muted">Lic. y Prof. en Economía</p>
                <p className="text-muted">Bahía Blanca</p>
              </div>
            </div>
          )}
        </div>

        <div>
          <EncabezadoSeccion
            id="t-belen"
            etiqueta="Pensado desde la experiencia"
            titulo={
              <>
                Lo pensó <span className="hl">una economista</span> que trabaja con emprendedores
              </>
            }
          />
          <div className="-mt-4 space-y-4 text-[1.12rem] leading-relaxed md:-mt-8" data-reveal>
            <p>
              Soy Belén Klundt, Licenciada y Profesora en Economía, de Bahía Blanca. Con MBK Consultoría acompaño a emprendimientos y
              pequeñas pymes, y en cada negocio veía lo mismo: ventas anotadas en cuadernos, costos que nunca se calculaban y plata que nadie
              sabía dónde estaba.
            </p>
            <p>
              Por eso armé el Sistema MBK: para que cualquiera pueda llevar su negocio en orden, con lo que aprendí trabajando con
              emprendedores todos los días.
            </p>
            <p className="rounded-3xl bg-white p-5 font-semibold sm:p-6">
              Mi misión: impulsar el éxito y el crecimiento sostenible de emprendimientos y pequeñas pymes, con asesoramiento económico integral.
            </p>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="Valores" data-reveal>
            {VALORES.map((v) => (
              <li key={v.t} className={`chip ${v.c} !px-5 !py-2 !text-[1.05rem] font-bold`}>
                {v.t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Testimonios: solo con testimonios reales y con permiso. Apagado por el flag. */}
      {SHOW_TESTIMONIALS && TESTIMONIOS.length > 0 ? (
        <div className="wrap mt-14">
          <ul className="grid gap-4 md:grid-cols-3">
            {TESTIMONIOS.map((t) => (
              <li key={t.nombre} className="card p-6">
                <blockquote className="text-[1.1rem]">“{t.texto}”</blockquote>
                <p className="mt-4 font-bold">
                  {t.nombre} <span className="font-normal text-muted">· {t.rubro}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

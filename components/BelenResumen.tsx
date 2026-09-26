import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/content/iconos";
import { BELEN_PHOTO } from "@/content/site";
import { BarrasLogo } from "./Decoracion";

const VALORES = [
  { t: "Compromiso", c: "bg-pink-soft" },
  { t: "Innovación", c: "bg-blue-soft" },
  { t: "Transparencia", c: "bg-orange-soft" },
];

/* Versión corta de "Pensado desde la experiencia". La completa está en /consultoria. */
export function BelenResumen() {
  return (
    <section id="belen-resumen" className="relative overflow-hidden bg-green-soft py-14 md:py-20" aria-labelledby="t-belen-resumen">
      <BarrasLogo className="absolute -right-4 bottom-0 hidden h-56 w-52 opacity-[0.16] md:flex" animar={false} />
      <div className="wrap relative grid items-center gap-8 md:grid-cols-[auto_1fr] md:gap-12">
        <div data-reveal className="mx-auto">
          {BELEN_PHOTO ? (
            <Image
              src={BELEN_PHOTO}
              alt="Belén Klundt, Licenciada y Profesora en Economía"
              width={220}
              height={220}
              className="h-44 w-44 rounded-full object-cover shadow-[var(--shadow-lift)] md:h-52 md:w-52"
            />
          ) : (
            <div className="grid h-44 w-44 place-items-center rounded-full bg-white shadow-[var(--shadow-lift)] md:h-52 md:w-52">
              <Image src="/logo.png" alt="MBK Consultoría" width={395} height={314} className="h-auto w-32 md:w-36" />
            </div>
          )}
        </div>
        <div data-reveal>
          <span className="tag !bg-green-strong">Pensado desde la experiencia</span>
          <h2 id="t-belen-resumen" className="h2 mt-4">
            Lo pensó <span className="text-green-strong">una economista</span> que trabaja con emprendedores
          </h2>
          <p className="mt-4 max-w-2xl text-[1.12rem] leading-relaxed">
            Belén Klundt, Licenciada y Profesora en Economía de Bahía Blanca, armó el sistema con lo que veía repetirse en cada negocio que
            asesoraba.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2.5" aria-label="Valores">
            {VALORES.map((v) => (
              <li key={v.t} className={`chip ${v.c} !px-5 !py-2 !text-[1.02rem] font-bold`}>
                {v.t}
              </li>
            ))}
          </ul>
          <Link href="/consultoria#belen" className="btn btn-line mt-7">
            Conocé a Belén
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

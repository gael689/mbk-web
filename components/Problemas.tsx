import { ArrowRight, BarChart3, CalendarDays, FileText, Package, Users } from "@/content/iconos";
import { TONO, type Tono } from "@/content/modulos";
import { PROBLEMAS } from "@/content/soluciones";
import { EncabezadoSeccion } from "./Piezas";

const ICONO: Record<Tono, typeof Users> = {
  blue: BarChart3,
  pink: Users,
  orange: Package,
  violet: FileText,
  green: CalendarDays,
};

/* 2 · Los problemas de todos los días, como los dice el emprendedor. */
export function Problemas() {
  return (
    <section id="problemas" className="bg-white py-16 md:py-24" aria-labelledby="t-problemas">
      <div className="wrap">
        <EncabezadoSeccion
          id="t-problemas"
          etiqueta="Los problemas de todos los días"
          titulo={
            <>
              ¿Te suena alguna de <span className="hl">estas frases</span>?
            </>
          }
          bajada="Son las que escucha Belén en cada negocio que asesora. Todas tienen arreglo, y no hace falta saber de números."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMAS.map((p, i) => {
            const t = TONO[p.tono];
            const Icon = ICONO[p.tono];
            return (
              <li key={p.ir} data-reveal style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
                <a
                  href={`#${p.ir}`}
                  className={`group flex h-full flex-col rounded-[1.75rem] border-2 ${t.border} ${t.soft} p-6 transition-transform hover:-translate-y-1`}
                >
                  <span className={`orb ${t.solid} h-12 w-12`}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-[1.3rem] font-bold leading-snug tracking-tight">“{p.texto}”</p>
                  <span className={`mt-auto inline-flex items-center gap-2 pt-5 font-bold ${t.text}`}>
                    Mirá cómo se resuelve
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

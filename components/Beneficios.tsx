import Link from "next/link";
import { ArrowRight } from "@/content/iconos";
import { TONO } from "@/content/modulos";
import { SOLUCIONES } from "@/content/soluciones";
import { EncabezadoSeccion, OrbIcono } from "./Piezas";

/* Cada tarjeta es "lo que te pasa hoy" -> "lo que ganás". El detalle de cómo lo
 * resuelve el sistema está en /sistema (se abre solo si la persona lo pide). */
const GLOW: Record<string, string> = {
  blue: "rgb(27 115 185 / 0.45)",
  pink: "rgb(228 46 154 / 0.4)",
  orange: "rgb(241 88 37 / 0.4)",
  green: "rgb(3 145 69 / 0.4)",
  violet: "rgb(124 77 255 / 0.4)",
};

export function Beneficios() {
  const items = SOLUCIONES.slice(0, 6);
  return (
    <section id="beneficios" className="section bg-white" aria-labelledby="t-beneficios">
      <div className="wrap">
        <EncabezadoSeccion
          id="t-beneficios"
          etiqueta="Lo que ganás"
          titulo={
            <>
              Lo que te pasa hoy, y <span className="hl">lo que cambia</span>
            </>
          }
          bajada="Son las frases que Belén escucha en cada negocio que asesora."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => {
            const t = TONO[s.tono];
            return (
              <li key={s.id} data-reveal style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
                <Link
                  href={`/sistema#${s.id}`}
                  style={{ ["--glow" as string]: GLOW[s.tono] }}
                  className={`tono-card group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border ${t.border} bg-white p-6 pt-7 shadow-[var(--shadow-soft)]`}
                >
                  <span className={`absolute inset-x-0 top-0 h-1.5 ${t.solid}`} aria-hidden="true" />
                  <OrbIcono Icon={s.Icon} tono={s.tono} size={48} />
                  <p className="mt-4 italic text-muted">{s.problema}</p>
                  <p className="mt-3 text-[1.2rem] font-extrabold leading-snug tracking-tight">{s.gana}</p>
                  <span className={`mt-auto inline-flex items-center gap-1.5 pt-4 font-bold ${t.text}`}>
                    Ver cómo
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-10 text-center" data-reveal>
          <Link href="/sistema" className="btn btn-line">
            Ver todo lo que hace el sistema
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

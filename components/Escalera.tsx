import Link from "next/link";
import { ArrowRight, BarChart3, Lightbulb, Store, type LucideIcon } from "@/content/iconos";
import { TONO, type Tono } from "@/content/modulos";
import { EncabezadoSeccion, OrbIcono } from "./Piezas";

/* La escalera: una puerta para cada visitante. Cada tarjeta lleva a su página. */
const PUERTAS: { n: string; t: string; d: string; cta: string; href: string; tono: Tono; Icon: LucideIcon; principal?: boolean }[] = [
  { n: "1", t: "Planillas", d: "Para ordenarte ya, sin sistema. Listas para usar, en la tienda.", cta: "Ver planillas", href: "/planillas", tono: "orange", Icon: Store },
  {
    n: "2",
    t: "Sistema MBK",
    d: "Todo tu negocio en un solo lugar, desde el celular. Solo o con el acompañamiento de Belén.",
    cta: "Conocer el sistema",
    href: "/sistema",
    tono: "pink",
    Icon: BarChart3,
    principal: true,
  },
  { n: "3", t: "Consultoría", d: "Belén mira tu negocio con lupa y te arma un análisis a medida.", cta: "Ver consultoría", href: "/consultoria", tono: "blue", Icon: Lightbulb },
];

export function Escalera() {
  return (
    <section id="empezar" className="section" aria-labelledby="t-escalera">
      <div className="wrap">
        <EncabezadoSeccion
          id="t-escalera"
          etiqueta="Tres puertas"
          titulo={
            <>
              Empezá por <span className="hl">donde estés</span>
            </>
          }
          bajada="No todos están en el mismo momento. Elegí la que te sirve hoy; después podés pasar a la siguiente."
          centrado
        />
        <ol className="mx-auto grid max-w-5xl items-stretch gap-5 md:grid-cols-3">
          {PUERTAS.map((p, i) => {
            const t = TONO[p.tono];
            return (
              <li key={p.n} data-reveal style={{ transitionDelay: `${i * 80}ms` }} className={p.principal ? "md:-my-4" : ""}>
                <div
                  className={`tono-card flex h-full flex-col rounded-[2rem] border-2 ${t.border} ${t.soft} p-7 ${p.principal ? "shadow-[var(--shadow-lift)]" : ""}`}
                  style={{ ["--glow" as string]: "rgb(60 30 10 / 0.3)" }}
                >
                  <div className="flex items-center justify-between">
                    <OrbIcono Icon={p.Icon} tono={p.tono} size={56} />
                    <span className="text-[0.85rem] font-bold uppercase tracking-[0.14em] text-muted">Puerta {p.n}</span>
                  </div>
                  <h3 className="mt-5 text-[1.6rem] font-extrabold leading-tight tracking-tight">{p.t}</h3>
                  {p.principal ? (
                    <span className="mt-2 inline-block self-start rounded-full bg-ink px-3 py-1 text-[0.78rem] font-bold uppercase tracking-wider text-white">
                      El principal
                    </span>
                  ) : null}
                  <p className="mt-3 text-[1.05rem] leading-relaxed">{p.d}</p>
                  <Link href={p.href} className={`btn mt-6 self-start ${p.principal ? "btn-pink" : "btn-ink"}`}>
                    {p.cta}
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

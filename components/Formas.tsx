import { ArrowRight, Check } from "@/content/iconos";
import { EncabezadoSeccion } from "./Piezas";

/* 6 · Dos formas de usarlo, dentro de la escalera "Empezá por donde estés". */
const ESCALERA = [
  { n: "1", t: "Planillas", d: "Para ordenarte ya, sin sistema", href: "#planillas" },
  { n: "2", t: "Sistema MBK", d: "Todo tu negocio en un lugar", href: "#formas-uso" },
  { n: "3", t: "Consultoría", d: "Belén mira tu negocio con lupa", href: "#consultoria" },
];

const FORMAS = [
  {
    id: "solo",
    titulo: "Solo el sistema",
    lema: "Lo usás por tu cuenta, a tu ritmo.",
    items: [
      "Tenés tu propia cuenta y cargás tu negocio a tu manera",
      "Tutoriales en video para cada paso",
      "Todo desde el celular o la computadora",
    ],
    acomp: false,
    borde: "border-blue/40",
    fondo: "bg-blue-soft",
  },
  {
    id: "acompanado",
    titulo: "Sistema + acompañamiento",
    lema: "Además, Belén te acompaña.",
    items: [
      "Todo lo del sistema",
      "Belén ve tu negocio desde su panel de asesora",
      "Te acompaña a entender tus números",
      "La forma del acompañamiento se define en conjunto, según tu negocio",
    ],
    acomp: true,
    borde: "border-pink/50",
    fondo: "bg-pink-soft",
  },
];

export function Formas() {
  return (
    <section id="formas" className="bg-white py-16 md:py-24" aria-labelledby="t-formas">
      <div className="wrap">
        <EncabezadoSeccion
          id="t-formas"
          etiqueta="Dos formas de usarlo"
          titulo={
            <>
              Empezá por <span className="hl">donde estés</span>
            </>
          }
          bajada="No todos están en el mismo momento. Hay una puerta para cada uno, y podés pasar de una a otra cuando quieras."
        />

        <ol className="mb-12 grid gap-3 sm:grid-cols-3" aria-label="Escalera de productos" data-reveal>
          {ESCALERA.map((e) => (
            <li key={e.n}>
              <a href={e.href} className="group flex h-full items-center gap-4 rounded-3xl border border-line bg-cream p-4 hover:border-ink">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-lg font-extrabold text-white">{e.n}</span>
                <span>
                  <span className="block text-[1.1rem] font-extrabold leading-tight">{e.t}</span>
                  <span className="block text-[0.95rem] text-muted">{e.d}</span>
                </span>
                <ArrowRight className="ml-auto h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>

        <div id="formas-uso" className="grid gap-5 md:grid-cols-2 md:gap-6">
          {FORMAS.map((f) => (
            <article key={f.id} data-reveal className={`flex flex-col rounded-[2rem] border-2 ${f.borde} ${f.fondo} p-7 sm:p-9`}>
              <h3 className="h3">{f.titulo}</h3>
              <p className="mt-2 text-[1.15rem] font-semibold">{f.lema}</p>
              <ul className="mt-6 space-y-3">
                {f.items.map((i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-white">
                      <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
              <a href="#probar" data-acomp={f.acomp ? "1" : "0"} className="btn btn-pink mt-8 self-start">
                Quiero probar MBK
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

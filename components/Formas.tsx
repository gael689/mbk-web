import Link from "next/link";
import { ArrowRight, Check } from "@/content/iconos";
import { EncabezadoSeccion } from "./Piezas";

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
    lema: "Además, te acompañamos.",
    items: [
      "Todo lo del sistema",
      "Nuestro equipo ve tu negocio desde el panel de asesoría",
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
    <section id="formas" className="bg-blue-soft/50 py-16 md:py-24" aria-labelledby="t-formas">
      <div className="wrap">
        <EncabezadoSeccion
          id="t-formas"
          etiqueta="Dos formas de usarlo"
          titulo={
            <>
              Solo el sistema, o con <span className="hl">acompañamiento</span>
            </>
          }
          bajada="Dos formas de usarlo. Elegí la que va con tu momento; se puede pasar de una a otra cuando quieras."
        />

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
              <Link href={f.acomp ? "/?acomp=1&demo=1#probar" : "/?demo=1#probar"} className="btn btn-pink mt-8 self-start">
                Solicitar demo
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

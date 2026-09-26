import { ChevronDown } from "@/content/iconos";
import { FAQ } from "@/content/faq";
import { EncabezadoSeccion } from "./Piezas";

/* 12 · Preguntas frecuentes. <details> nativo: accesible, sin JS, y las
 * respuestas están en el HTML para Google y para los buscadores con IA. */
export function Faq() {
  return (
    <section id="preguntas" className="py-16 md:py-24" aria-labelledby="t-faq">
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <EncabezadoSeccion
            id="t-faq"
            etiqueta="Preguntas frecuentes"
            titulo={
              <>
                Lo que casi todos <span className="hl">preguntan</span>
              </>
            }
            bajada="Si te queda alguna duda, escribinos y te respondemos."
          />
        </div>
        <div className="space-y-3" data-reveal>
          {FAQ.map((f) => (
            <details key={f.q} className="group rounded-3xl border border-line bg-cream open:bg-white open:shadow-[var(--shadow-soft)]">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-3xl px-5 py-4 text-[1.1rem] font-bold leading-snug marker:hidden [&::-webkit-details-marker]:hidden">
                <h3 className="text-[1.1rem] font-bold">{f.q}</h3>
                <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="px-5 pb-5 text-[1.05rem] leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

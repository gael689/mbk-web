import { ChevronDown } from "@/content/iconos";
import { EncabezadoSeccion } from "./Piezas";

/* Preguntas de una página de rubro, guía o ciudad. <details> nativo: las respuestas están
 * en el HTML y se pueden declarar en el JSON-LD FAQPage (JsonLdPreguntas) porque se ven. */
export function PreguntasLista({ id, titulo, preguntas }: { id: string; titulo: React.ReactNode; preguntas: { q: string; a: string }[] }) {
  return (
    <section className="py-14 md:py-20" aria-labelledby={id}>
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <EncabezadoSeccion id={id} etiqueta="Preguntas frecuentes" titulo={titulo} />
        <div className="space-y-3" data-reveal>
          {preguntas.map((f) => (
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

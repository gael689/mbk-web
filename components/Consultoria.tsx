import { SERVICIOS_CONSULTORIA } from "@/content/consultoria";
import { whatsappUrl } from "@/content/site";
import { IconWhatsApp } from "./Marcas";
import { EncabezadoSeccion } from "./Piezas";

/* 9 · Consultoría, compacta: ocho servicios en grilla y un CTA a WhatsApp. */
export function Consultoria() {
  return (
    <section id="consultoria" className="section" aria-labelledby="t-consultoria">
      <div className="wrap">
        <EncabezadoSeccion
          id="t-consultoria"
          etiqueta="Consultoría"
          titulo={
            <>
              ¿Querés que alguien mire tu negocio <span className="hl">con lupa</span>?
            </>
          }
          bajada="Además del sistema, Belén y su equipo hacen consultoría para pymes y emprendimientos desde Bahía Blanca: asesoramiento económico a medida de tu negocio."
        />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICIOS_CONSULTORIA.map((s, i) => (
            <li key={s} data-reveal style={{ transitionDelay: `${(i % 4) * 60}ms` }} className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4">
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-[0.8rem] font-bold text-white">{i + 1}</span>
              <span className="font-semibold leading-snug">{s}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8" data-reveal>
          <a href={whatsappUrl()} data-track="clic_whatsapp" target="_blank" rel="noopener noreferrer" className="btn btn-ink">
            <IconWhatsApp className="h-6 w-6" />
            Consultá por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

import { whatsappUrl } from "@/content/site";
import { ContactForm } from "./ContactForm";
import { IconWhatsApp } from "./Marcas";

/* CTA final + formulario: la única banda de color fuerte de la home, para que
 * la acción se vea sin competir con nada. */
export function CtaFinal() {
  return (
    <section id="probar" className="relative isolate overflow-hidden bg-blue-strong py-16 text-white md:py-24" aria-labelledby="t-probar">
      <span className="blob -bottom-24 -left-16 -z-10 h-80 w-80" style={{ background: "radial-gradient(circle, rgb(255 255 255 / 0.1), transparent 65%)" }} aria-hidden="true" />
      <span className="blob -right-24 -top-24 -z-10 h-96 w-96" style={{ background: "radial-gradient(circle, rgb(255 255 255 / 0.14), transparent 65%)" }} aria-hidden="true" />
      <div className="wrap grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div data-reveal>
          <span className="inline-flex min-h-9 items-center rounded-full bg-white px-4 py-1 text-[1.05rem] font-bold text-ink">Quiero probar MBK</span>
          <h2 id="t-probar" className="h2 mt-5">
            ¿Listo para saber <span className="text-[#ffd0ea]">cuánto ganás</span> de verdad?
          </h2>
          <p className="mt-4 text-[1.2rem] leading-relaxed text-white/90">
            Dejanos tus datos y Belén te escribe por WhatsApp para contarte cómo empezar. Sin compromiso.
          </p>
          <a
            href={whatsappUrl()}
            data-track="clic_whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex min-h-12 items-center gap-2.5 rounded-full border-2 border-white/70 px-6 py-2 font-bold hover:bg-white hover:text-ink"
          >
            <IconWhatsApp className="h-6 w-6" />
            Prefiero escribir por WhatsApp
          </a>
        </div>

        <div data-reveal className="card p-6 text-ink sm:p-9">
          <ContactForm />
          <noscript>
            <p className="mt-4 font-semibold">
              Para enviar el formulario necesitás activar JavaScript. También podés{" "}
              <a href={whatsappUrl()} className="underline">
                escribirnos por WhatsApp
              </a>
              .
            </p>
          </noscript>
        </div>
      </div>
    </section>
  );
}

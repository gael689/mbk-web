import { whatsappUrl } from "@/content/site";
import { ContactForm } from "./ContactForm";
import { IconWhatsApp } from "./Marcas";

/* 13 · CTA final + formulario. */
export function CtaFinal() {
  return (
    <section id="probar" className="section bg-sand" aria-labelledby="t-probar">
      <div className="wrap grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div data-reveal>
          <span className="tag">Quiero probar MBK</span>
          <h2 id="t-probar" className="h2 mt-5">
            ¿Listo para saber <span className="hl">cuánto ganás</span> de verdad?
          </h2>
          <p className="lead mt-4">
            Dejanos tus datos y Belén te escribe por WhatsApp para contarte cómo empezar. Sin compromiso.
          </p>
          <div className="mt-8 rounded-3xl bg-white p-5">
            <p className="font-bold">¿Preferís escribir directamente?</p>
            <a href={whatsappUrl()} data-track="clic_whatsapp" target="_blank" rel="noopener noreferrer" className="btn btn-ink mt-3">
              <IconWhatsApp className="h-6 w-6" />
              Escribir por WhatsApp
            </a>
          </div>
        </div>

        <div data-reveal className="card p-6 sm:p-9">
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

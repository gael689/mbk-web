import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@/content/iconos";
import { TONO, type Tono } from "@/content/modulos";
import { whatsappUrl } from "@/content/site";
import { BarrasLogo, Manchas } from "./Decoracion";
import { IconWhatsApp } from "./Marcas";

const TAG: Record<Tono, string> = {
  pink: "!bg-pink-strong",
  blue: "!bg-blue-strong",
  orange: "!bg-orange-strong",
  green: "!bg-green-strong",
  violet: "!bg-violet-strong",
};

/* Encabezado de las páginas internas: una etiqueta, el único h1 y una bajada. */
export function SubHero({ etiqueta, titulo, bajada, tono = "pink" }: { etiqueta: string; titulo: ReactNode; bajada: string; tono?: Tono }) {
  const t = TONO[tono];
  return (
    <section className="relative isolate overflow-hidden pb-10 pt-8 md:pb-14 md:pt-14" aria-labelledby="t-pagina">
      <Manchas className="opacity-80" />
      <div className="wrap">
        <Link href="/" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-muted hover:text-ink">
          <ArrowRight className="h-4 w-4 rotate-180" aria-hidden="true" />
          Volver al inicio
        </Link>
        <div className="mt-4 flex items-start justify-between gap-6">
          <div className="max-w-3xl">
            <span className={`tag ${TAG[tono]}`}>{etiqueta}</span>
            <h1 id="t-pagina" className="display mt-5 text-[clamp(2.1rem,6.5vw,3.9rem)]">
              {titulo}
            </h1>
            <p className="lead mt-4">{bajada}</p>
            <span className={`mt-6 block h-1.5 w-20 rounded-full ${t.solid}`} aria-hidden="true" />
          </div>
          <BarrasLogo className="hidden h-28 w-24 shrink-0 md:flex" />
        </div>
      </div>
    </section>
  );
}

/* Cierre de cada página interna: una sola acción principal, más WhatsApp. */
export function CtaCierre({
  titulo = "¿Querés probar MBK en tu negocio?",
  texto = "Dejanos tus datos y Belén te escribe por WhatsApp. Sin compromiso.",
  ctaTexto = "Quiero probar MBK",
  ctaHref = "/#probar",
}: {
  titulo?: string;
  texto?: string;
  ctaTexto?: string;
  ctaHref?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-blue-strong py-14 text-white md:py-20" aria-label="Llamado a la acción">
      <span className="blob -right-20 -top-24 -z-10 h-80 w-80" style={{ background: "radial-gradient(circle, rgb(255 255 255 / 0.14), transparent 65%)" }} aria-hidden="true" />
      <div className="wrap flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="h3">{titulo}</p>
          <p className="mt-3 text-[1.15rem] text-white/90">{texto}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href={ctaHref} className="btn whitespace-nowrap bg-white text-ink hover:bg-pink-soft">
            {ctaTexto}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          <a href={whatsappUrl()} data-track="clic_whatsapp" target="_blank" rel="noopener noreferrer" className="btn border-white/70 text-white hover:bg-white hover:text-ink">
            <IconWhatsApp className="h-5 w-5" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

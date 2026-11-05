import Link from "next/link";
import { ArrowRight } from "@/content/iconos";
import { ANUNCIO_VERSION, ANUNCIO_VERSION_CORTO, VERSION_ACTUAL } from "@/content/versiones";

/* Franja de arriba de todo: qué salió en la versión actual. Sin cuenta regresiva ni urgencia:
 * es información. Sale de content/versiones.ts. */
export function AvisoVersion() {
  if (!ANUNCIO_VERSION) return null;
  return (
    <aside aria-label="Novedades del sistema" className="on-dark bg-ink text-white">
      <Link href="/versiones" className="group flex min-h-11 items-center justify-center gap-x-1.5 px-4 py-1 text-center text-[0.86rem] leading-snug sm:text-[0.92rem]">
        <span className="mr-0.5 rounded-full bg-pink-strong px-2 py-0.5 text-[0.72rem] font-bold uppercase tracking-wider">Nuevo</span>
        <span className="whitespace-nowrap font-semibold">
          <span className="hidden sm:inline">Versión </span>
          {VERSION_ACTUAL.version}:
        </span>
        <span className="hidden text-white/85 sm:inline">{ANUNCIO_VERSION}</span>
        <span className="text-white/85 sm:hidden">{ANUNCIO_VERSION_CORTO}</span>
        <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </aside>
  );
}

import Link from "next/link";
import { ArrowRight } from "@/content/iconos";
import type { Herramienta } from "@/content/herramientas";
import { Calculadora } from "./Calculadora";

/* Una herramienta completa: la calculadora, la cuenta en una línea y el cierre que lleva a la demo.
 * La usan el índice (/herramientas, las tres juntas) y la página propia de cada una. */
export function TarjetaHerramienta({ h }: { h: Herramienta }) {
  return (
    <div className="card overflow-hidden">
      <div className="p-4 sm:p-8">
        <Calculadora slug={h.slug} />
        <p className="mt-5 text-[0.95rem] text-muted">
          <strong className="font-bold text-ink">La cuenta: </strong>
          {h.formula}
        </p>
      </div>
      <div className="flex flex-col gap-4 border-t border-line bg-cream p-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-5">
        <p className="max-w-xl text-[1.05rem] font-bold leading-snug">{h.cierre}</p>
        <Link href="/?demo=1#probar" className="btn btn-pink shrink-0 whitespace-nowrap">
          Solicitar demo
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

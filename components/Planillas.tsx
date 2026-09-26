import { ArrowUpRight, Store } from "@/content/iconos";
import { PLANILLAS } from "@/content/planillas";
import { tiendaHref } from "@/content/site";
import { EncabezadoSeccion } from "./Piezas";

const COLORES = ["bg-blue-soft", "bg-orange-soft", "bg-green-soft", "bg-pink-soft", "bg-blue-soft", "bg-green-soft"];

/* 10 · Planillas (escalón 1). Sin precio: lo ve en la tienda. Cada link con utm. */
export function Planillas() {
  return (
    <section id="planillas" className="py-16 md:py-24" aria-labelledby="t-planillas">
      <div className="wrap">
        <EncabezadoSeccion
          id="t-planillas"
          etiqueta="Planillas"
          titulo={
            <>
              ¿Todavía no estás para un sistema? <span className="hl">Empezá con una planilla</span>
            </>
          }
          bajada="Las planillas de MBK para llevar tu negocio en orden, listas para usar. Las encontrás en la tienda."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PLANILLAS.map((p, i) => (
            <li key={p.nombre} data-reveal style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
              <a
                href={p.href}
                data-track="clic_tienda"
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex h-full flex-col rounded-[1.75rem] ${COLORES[i % COLORES.length]} p-6 transition-transform hover:-translate-y-1`}
              >
                <h3 className="text-[1.25rem] font-extrabold leading-tight tracking-tight">{p.nombre}</h3>
                <p className="mt-2 text-ink/80">{p.texto}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-bold">
                  Verla en la tienda
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center" data-reveal>
          <a href={tiendaHref()} data-track="clic_tienda" target="_blank" rel="noopener noreferrer" className="btn btn-line">
            <Store className="h-5 w-5" aria-hidden="true" />
            Ver todas las planillas
          </a>
        </div>
      </div>
    </section>
  );
}

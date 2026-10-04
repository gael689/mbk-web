import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Lightbulb } from "@/content/iconos";
import { BELEN_PHOTO } from "@/content/site";
import { TONO } from "@/content/modulos";
import { AcompanamientoInfo } from "./AcompanamientoInfo";
import { EncabezadoSeccion, OrbIcono } from "./Piezas";

/* Cómo se ofrece MBK en la home, para entenderse de un vistazo y con poco texto: el Sistema MBK es
 * lo principal y se usa de dos formas, y la diferencia se VE (el sistema solo, o el sistema + la
 * foto de Belén). La consultoría (análisis a medida, sin sistema) y las planillas de Excel están
 * debajo como otras salidas, mostradas por lo que hacen y no por su nombre. */

const CONSULTORIA = ["Rentabilidad y costos", "Precios", "Competidores y proveedores", "Mercados"];
const PLANILLAS = ["Control de ventas", "Cálculo de precios", "Flujo de caja", "Punto de equilibrio"];

/** El dibujo de la segunda forma: se lee sin leer nada. */
function Foto() {
  return BELEN_PHOTO ? (
    <Image src={BELEN_PHOTO} alt="Belén Klundt" width={120} height={120} className="h-[4.5rem] w-[4.5rem] rounded-full object-cover object-[50%_40%] ring-4 ring-white" />
  ) : (
    <OrbIcono Icon={Lightbulb} tono="pink" size={72} />
  );
}

/** Una planilla dibujada con celdas: da la pista de "Excel" sin usar una imagen. */
function MiniPlanilla() {
  return (
    <div className="grid w-28 shrink-0 grid-cols-4 gap-1 rounded-xl bg-white p-2 shadow-[var(--shadow-soft)]" aria-hidden="true">
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={`h${i}`} className="h-2 rounded-sm bg-orange/80" />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i} className={`h-2 rounded-sm ${i % 5 === 0 ? "bg-green/40" : "bg-line"}`} />
      ))}
    </div>
  );
}

export function Escalera() {
  return (
    <section id="empezar" className="section" aria-labelledby="t-escalera">
      <div className="wrap">
        <EncabezadoSeccion
          id="t-escalera"
          etiqueta="Cómo trabajamos"
          titulo={
            <>
              Dos formas de usar el <span className="hl">Sistema MBK</span>
            </>
          }
          bajada="El sistema es lo principal. Nuestro equipo se suma si querés."
          centrado
        />

        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          <div data-reveal className={`tono-card flex flex-col items-center rounded-[2rem] border-2 ${TONO.blue.border} ${TONO.blue.soft} p-7 text-center`}>
            <div className="flex h-[4.5rem] items-center justify-center">
              <OrbIcono Icon={BarChart3} tono="blue" size={72} />
            </div>
            <h3 className="mt-5 text-[1.6rem] font-extrabold leading-tight tracking-tight">Solo el sistema</h3>
            <p className="mt-1 text-[1.1rem] font-semibold">Lo usás vos, a tu ritmo.</p>
            <p className="mb-auto mt-3 text-muted">Con tutoriales en video, desde el celular o la computadora.</p>
            <Link href="/?demo=1#probar" className="btn btn-ink mt-6 self-center">
              Solicitar demo
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>

          <div
            data-reveal
            style={{ transitionDelay: "90ms" }}
            className={`tono-card relative flex flex-col items-center rounded-[2rem] border-2 ${TONO.pink.border} ${TONO.pink.soft} p-7 text-center shadow-[var(--shadow-lift)]`}
          >
            <span className="absolute -top-3 right-6 rounded-full bg-ink px-3 py-1 text-[0.78rem] font-bold uppercase tracking-wider text-white">Con acompañamiento</span>
            <div className="flex h-[4.5rem] items-center justify-center gap-3">
              <OrbIcono Icon={BarChart3} tono="pink" size={72} />
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-[1.4rem] font-extrabold leading-none text-white" aria-hidden="true">
                +
              </span>
              <Foto />
            </div>
            <h3 className="mt-5 text-[1.6rem] font-extrabold leading-tight tracking-tight">Sistema + acompañamiento</h3>
            <p className="mt-1 text-[1.1rem] font-semibold">Belén y su equipo, a tu lado.</p>
            <p className="mb-auto mt-3 text-muted">Todo lo del sistema, y ayuda para decidir.</p>
            <AcompanamientoInfo />
          </div>
        </div>

        <p data-reveal className="mx-auto mb-4 mt-12 max-w-4xl text-center text-[1.05rem] font-bold">
          ¿No buscás el sistema todavía?
        </p>
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
          <Link href="/consultoria" data-reveal className={`tono-card group relative flex flex-col overflow-hidden rounded-[2rem] ${TONO.green.soft} p-6`}>
            <Lightbulb className="pointer-events-none absolute -right-4 -top-4 h-28 w-28 text-green-strong/10" aria-hidden="true" />
            <span className="text-[0.8rem] font-bold uppercase tracking-[0.14em] text-green-strong">Consultoría</span>
            <h3 className="mt-2 text-[1.35rem] font-extrabold leading-tight tracking-tight">Que Belén y su equipo analicen tu negocio</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {CONSULTORIA.map((c) => (
                <li key={c} className="rounded-full bg-white px-3 py-1 text-[0.92rem] font-semibold">
                  {c}
                </li>
              ))}
            </ul>
            <span className="mt-5 inline-flex items-center gap-1.5 font-bold">
              Conocer la consultoría
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>

          <Link
            href="/planillas"
            data-reveal
            style={{ transitionDelay: "90ms" }}
            className={`tono-card group relative flex flex-col overflow-hidden rounded-[2rem] ${TONO.orange.soft} p-6`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[0.8rem] font-bold uppercase tracking-[0.14em] text-orange-strong">Planillas de Excel</span>
                <h3 className="mt-2 text-[1.35rem] font-extrabold leading-tight tracking-tight">Ordená tu negocio hoy, sin sistema</h3>
              </div>
              <MiniPlanilla />
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {PLANILLAS.map((c) => (
                <li key={c} className="rounded-full bg-white px-3 py-1 text-[0.92rem] font-semibold">
                  {c}
                </li>
              ))}
            </ul>
            <span className="mt-5 inline-flex items-center gap-1.5 font-bold">
              Ver las planillas
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

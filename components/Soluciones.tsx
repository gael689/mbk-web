import Image from "next/image";
import { Check } from "@/content/iconos";
import { INCLUYE_HOY, NOVEDADES, TONO } from "@/content/modulos";
import { SOLUCIONES, type MockId, type Solucion } from "@/content/soluciones";
import { Celular } from "./Dispositivos";
import { MockCaja, MockCobros, MockCostos, MockResultado, MockStock, MockTurnos } from "./mockups/Pantallas";
import { EncabezadoSeccion, OrbIcono, TagNovedad } from "./Piezas";

const MOCKS: Record<Exclude<MockId, "celular">, () => React.JSX.Element> = {
  resultado: MockResultado,
  cobros: MockCobros,
  costos: MockCostos,
  stock: MockStock,
  caja: MockCaja,
  turnos: MockTurnos,
};

const EPIGRAFE: Record<MockId, string> = {
  resultado: "Así se ve el resultado del mes en el sistema.",
  cobros: "Así se ven las ventas pendientes de cobro en el sistema.",
  costos: "Así se ve el costo de un producto dividido en cinco partes.",
  stock: "Así se ve el stock con su aviso.",
  caja: "Así se ve la caja por medio de pago.",
  turnos: "Así se ven los turnos con su estado y lo que falta cobrar.",
  celular: "Así se ve el Dashboard en el celular.",
};

/* Capturas reales del sistema (negocio de ejemplo, datos ficticios), una por bloque. Si un bloque no
 * tiene captura, se muestra el dibujo de respaldo. Se generan con scripts/capturas-sistema. */
type Captura = { src: string; alt: string; w: number; h: number };
const CAPTURAS: Partial<Record<MockId, Captura>> = {
  resultado: { src: "/capturas/bloques/bloque-gano-plata.webp", w: 1200, h: 1119, alt: "El Dashboard del Sistema MBK: ventas, cobrado, gastos, resultado neto del mes y meta mensual (datos de ejemplo)" },
  cobros: { src: "/capturas/bloques/bloque-cobros.webp", w: 1200, h: 975, alt: "La lista de ventas filtrada por pendientes de cobro, con cliente e importe (datos de ejemplo)" },
  costos: { src: "/capturas/bloques/bloque-precios.webp", w: 1200, h: 917, alt: "Editar un producto con el costo dividido en cinco partes, el costo total y el margen (datos de ejemplo)" },
  stock: { src: "/capturas/bloques/bloque-stock.webp", w: 1200, h: 1026, alt: "Control de stock con productos para reponer, sin stock y con stock bajo (datos de ejemplo)" },
  caja: { src: "/capturas/bloques/bloque-caja.webp", w: 1200, h: 883, alt: "La caja separada por medio de pago: efectivo, transferencia, tarjeta y Mercado Pago (datos de ejemplo)" },
  turnos: { src: "/capturas/bloques/bloque-turnos.webp", w: 1200, h: 868, alt: "La lista de turnos con su cliente, servicio, estado y lo que resta cobrar (datos de ejemplo)" },
  celular: { src: "/capturas/bloques/bloque-todo-en-uno.webp", w: 585, h: 1114, alt: "El Dashboard del Sistema MBK en el celular (datos de ejemplo)" },
};

/** Marco de ventana de navegador para una captura de escritorio. */
function Ventana({ c }: { c: Captura }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-lift)]">
      <div className="flex items-center gap-1.5 border-b border-line bg-cream px-3.5 py-2.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffc94d]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#4cd08a]/80" />
      </div>
      <Image src={c.src} alt={c.alt} width={c.w} height={c.h} sizes="(min-width: 1024px) 28rem, 90vw" className="block h-auto w-full" />
    </div>
  );
}

/** Marco de celular para una captura vertical. */
function MarcoCelular({ c }: { c: Captura }) {
  return (
    <div className="mx-auto w-[15rem] rounded-[2.1rem] border-[5px] border-[#1c1a19] bg-[#1c1a19] shadow-[var(--shadow-lift)] sm:w-[17rem]">
      <div className="overflow-hidden rounded-[1.7rem] bg-white">
        <Image src={c.src} alt={c.alt} width={c.w} height={c.h} sizes="17rem" className="block h-auto w-full" />
      </div>
    </div>
  );
}

function Bloque({ s, invertido }: { s: Solucion; invertido: boolean }) {
  const t = TONO[s.tono];
  const Mock = s.mock === "celular" ? null : MOCKS[s.mock];
  const captura = CAPTURAS[s.mock];

  return (
    <article id={s.id} data-reveal className="card grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-12">
      <div className={invertido ? "lg:order-2" : ""}>
        <div className="flex flex-wrap items-center gap-3">
          <OrbIcono Icon={s.Icon} tono={s.tono} size={44} />
          <span className={`chip ${t.soft}`}>{s.modulo}</span>
          {s.novedad ? <TagNovedad /> : null}
        </div>
        <h3 className="h3 mt-5">{s.titulo}</h3>
        <p className="mt-4 text-[1.15rem] italic text-muted">{s.problema}</p>

        <div className="mt-6">
          <p className="text-[0.85rem] font-bold uppercase tracking-[0.14em] text-muted">Lo que hace el sistema</p>
          <p className="mt-1.5 text-[1.1rem] leading-relaxed">{s.hace}</p>
        </div>

        <div className={`mt-6 rounded-3xl ${t.soft} p-5 sm:p-6`}>
          <p className={`text-[0.85rem] font-bold uppercase tracking-[0.14em] ${t.text}`}>Lo que ganás</p>
          <p className="mt-1.5 text-[1.3rem] font-extrabold leading-snug tracking-tight">{s.gana}</p>
        </div>
      </div>

      <figure className={`${invertido ? "lg:order-1" : ""} mx-auto w-full max-w-[28rem]`}>
        {captura ? (
          s.mock === "celular" ? (
            <MarcoCelular c={captura} />
          ) : (
            <Ventana c={captura} />
          )
        ) : Mock ? (
          <Mock />
        ) : (
          <Celular className="mx-auto w-[15rem] sm:w-[17rem]" />
        )}
        <figcaption className="mt-4 text-center text-[0.9rem] text-muted">
          {EPIGRAFE[s.mock]} <span className="whitespace-nowrap">Datos de ejemplo.</span>
        </figcaption>
      </figure>
    </article>
  );
}

/* 3 · Cómo lo resuelve MBK: problema -> qué hace -> lo que ganás. */
export function Soluciones() {
  return (
    <section id="como-funciona" className="section" aria-labelledby="t-soluciones">
      <div className="wrap">
        <EncabezadoSeccion
          id="t-soluciones"
          etiqueta="Cómo lo resuelve el Sistema MBK"
          titulo={
            <>
              Un problema, una solución y <span className="hl">lo que ganás</span>
            </>
          }
          bajada="Por cada frase de arriba: qué hace el sistema y qué cambia en tu día a día."
        />

        <div className="space-y-6 md:space-y-8">
          {SOLUCIONES.map((s, i) => (
            <Bloque key={s.id} s={s} invertido={i % 2 === 1} />
          ))}
        </div>

        {/* Lo que incluye: abajo y en chico, como respaldo para quien quiere el detalle. */}
        <div className="mt-14 border-t border-line pt-10" data-reveal>
          <h3 className="text-[1.05rem] font-bold uppercase tracking-[0.12em] text-muted">Todo lo que incluye</h3>
          <ul className="mt-5 flex flex-wrap gap-2">
            {INCLUYE_HOY.map((x) => (
              <li key={x} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-[0.95rem] font-medium">
                <Check className="h-4 w-4 text-green-strong" aria-hidden="true" />
                {x}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[0.95rem] font-semibold text-muted">Novedades que se vienen:</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {NOVEDADES.map((x) => (
              <li key={x} className="inline-flex items-center gap-2 rounded-full bg-blue-soft px-3.5 py-1.5 text-[0.95rem] font-medium">
                <TagNovedad className="!px-2 !py-0.5 !text-[0.68rem]" />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

import { Check } from "@/content/iconos";
import { INCLUYE_HOY, MODULOS, NOVEDADES, TONO } from "@/content/modulos";
import { SOLUCIONES, type MockId, type Solucion } from "@/content/soluciones";
import { Celular } from "./Dispositivos";
import { MockCaja, MockCobros, MockCostos, MockResultado, MockStock, MockTurnos } from "./mockups/Pantallas";
import { EncabezadoSeccion, Orb, TagNovedad } from "./Piezas";

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
  cobros: "Así se ven los cobros pendientes en el sistema.",
  costos: "Así se ve el costo de un producto dividido en cinco partes.",
  stock: "Así se ve el stock con su aviso.",
  caja: "Así se ve la caja por medio de pago.",
  turnos: "Así se ve la agenda de turnos con su recordatorio.",
  celular: "Así se ve el Dashboard en el celular.",
};

function Bloque({ s, invertido }: { s: Solucion; invertido: boolean }) {
  const t = TONO[s.tono];
  const modulo = MODULOS.find((m) => m.tono === s.tono) ?? MODULOS[0];
  const Mock = s.mock === "celular" ? null : MOCKS[s.mock];

  return (
    <article id={s.id} data-reveal className="card grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-12">
      <div className={invertido ? "lg:order-2" : ""}>
        <div className="flex flex-wrap items-center gap-3">
          <Orb modulo={modulo} size={44} />
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
        {Mock ? (
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
              <li key={x} className="inline-flex items-center gap-2 rounded-full bg-sand px-3.5 py-1.5 text-[0.95rem] font-medium">
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

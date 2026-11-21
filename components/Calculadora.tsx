"use client";

import { useId, useState, type ReactNode } from "react";
import type { SlugHerramienta } from "@/content/herramientas";
import {
  DIAS_DEL_MES,
  cuantoTeQueda,
  numero,
  pesos,
  precioDeVenta,
  puntoDeEquilibrio,
  type BaseGanancia,
  type Falla,
} from "@/lib/calculadoras";

/* Las tres calculadoras de /herramientas. Acá solo hay campos y dibujo: las cuentas están en
 * `lib/calculadoras.ts`. Nada sale del navegador: lo que la persona escribe no se guarda ni se mide.
 * Los campos son de texto con teclado numérico (`inputMode="decimal"`) para aceptar coma y punto. */

type Tono = "orange" | "blue" | "green";
const PANEL: Record<Tono, { soft: string; text: string }> = {
  orange: { soft: "bg-orange-soft", text: "text-orange-strong" },
  blue: { soft: "bg-blue-soft", text: "text-blue-strong" },
  green: { soft: "bg-green-soft", text: "text-green-strong" },
};

function Campo({
  etiqueta,
  valor,
  alCambiar,
  signo,
  ejemplo,
  ayuda,
}: {
  etiqueta: string;
  valor: string;
  alCambiar: (v: string) => void;
  signo: "$" | "%";
  ejemplo: string;
  ayuda?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-[1.05rem] font-bold leading-snug">
        {etiqueta}
      </label>
      <div className="relative mt-1.5">
        <span
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-[1.25rem] font-bold text-muted ${signo === "$" ? "left-4" : "right-4"}`}
          aria-hidden="true"
        >
          {signo}
        </span>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          enterKeyHint="done"
          maxLength={16}
          value={valor}
          onChange={(e) => alCambiar(e.target.value)}
          placeholder={ejemplo}
          aria-describedby={ayuda ? `${id}-ayuda` : undefined}
          className={`block min-h-14 w-full rounded-2xl border-2 border-line bg-white py-2.5 text-[1.3rem] font-bold text-ink placeholder:font-medium placeholder:text-ink/35 focus:border-ink ${
            signo === "$" ? "pl-10 pr-4" : "pl-4 pr-11"
          }`}
        />
      </div>
      {ayuda ? (
        <p id={`${id}-ayuda`} className="mt-1 text-[0.92rem] text-muted">
          {ayuda}
        </p>
      ) : null}
    </div>
  );
}

/** Barra que reparte un total en partes de color (decorativa: los números están al lado, en texto). */
function Barra({ partes }: { partes: { nombre: string; valor: number; color: string }[] }) {
  const visibles = partes.filter((p) => p.valor > 0);
  const total = visibles.reduce((s, p) => s + p.valor, 0);
  if (total <= 0) return null;
  return (
    <div className="mt-5" aria-hidden="true">
      <div className="flex h-4 overflow-hidden rounded-full bg-white">
        {visibles.map((p) => (
          <span key={p.nombre} className={`calc-parte ${p.color}`} style={{ width: `${(p.valor / total) * 100}%` }} />
        ))}
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.88rem] font-semibold">
        {visibles.map((p) => (
          <li key={p.nombre} className="inline-flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${p.color}`} />
            {p.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Fila({ nombre, valor, fuerte = false }: { nombre: string; valor: string; fuerte?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-ink/10 py-2.5">
      <dt className="text-[1rem] leading-snug">{nombre}</dt>
      <dd className={`whitespace-nowrap text-[1.15rem] ${fuerte ? "font-extrabold" : "font-bold"}`}>{valor}</dd>
    </div>
  );
}

/** El panel del resultado. Es una región viva: el lector de pantalla anuncia el resultado al cambiar. */
function Resultado({ tono, falla, children }: { tono: Tono; falla: Falla | null; children?: ReactNode }) {
  return (
    <div aria-live="polite" aria-atomic="true" className={`flex min-h-56 flex-col justify-center rounded-3xl p-5 sm:p-7 ${PANEL[tono].soft}`}>
      {falla === null ? (
        children
      ) : falla.motivo === "error" ? (
        <p className="text-[1.1rem] font-bold leading-snug">{falla.mensaje}</p>
      ) : (
        <p className="text-[1.1rem] font-semibold text-muted">Completá los datos y el resultado aparece acá.</p>
      )}
    </div>
  );
}

function Principal({ tono, nombre, valor }: { tono: Tono; nombre: string; valor: string }) {
  return (
    <p>
      <span className="block text-[1rem] font-bold">{nombre}</span>
      {/* La clave cambia con el valor: el número "salta" cada vez que se recalcula (globals.css). */}
      <span key={valor} className={`calc-pop mt-1 block text-[clamp(2.1rem,10vw,3.2rem)] font-extrabold leading-none tracking-tight ${PANEL[tono].text}`}>
        {valor}
      </span>
    </p>
  );
}

const grilla = "grid gap-5 md:grid-cols-2 md:gap-8";
const campos = "space-y-4";

function PrecioDeVenta() {
  const [costo, setCosto] = useState("");
  const [ganancia, setGanancia] = useState("");
  const [comision, setComision] = useState("");
  const [base, setBase] = useState<BaseGanancia>("costo");
  const nombreBase = useId();
  const r = precioDeVenta(costo, ganancia, comision, base);

  return (
    <div className={grilla}>
      <div className={campos}>
        <Campo etiqueta="Costo por unidad" valor={costo} alCambiar={setCosto} signo="$" ejemplo="Ej.: 10.000" />
        <Campo etiqueta="Ganancia que querés" valor={ganancia} alCambiar={setGanancia} signo="%" ejemplo="Ej.: 50" />
        <fieldset>
          <legend className="text-[0.95rem] font-semibold text-muted">Ese porcentaje es…</legend>
          <div className="mt-1.5 grid grid-cols-2 gap-1 rounded-2xl border-2 border-line bg-white p-1">
            {(
              [
                ["costo", "sobre el costo"],
                ["precio", "sobre el precio"],
              ] as const
            ).map(([valor, texto]) => (
              <label
                key={valor}
                className="flex min-h-11 cursor-pointer items-center justify-center rounded-xl px-2 text-center text-[0.98rem] font-bold leading-tight transition-colors has-[:checked]:bg-ink has-[:checked]:text-white has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink"
              >
                <input type="radio" name={nombreBase} value={valor} checked={base === valor} onChange={() => setBase(valor)} className="sr-only" />
                {texto}
              </label>
            ))}
          </div>
        </fieldset>
        <Campo
          etiqueta="Comisión del medio de cobro"
          valor={comision}
          alCambiar={setComision}
          signo="%"
          ejemplo="La que te cobran"
          ayuda="Si cobrás en efectivo, dejala vacía."
        />
      </div>
      <Resultado tono="orange" falla={r.ok ? null : r}>
        {r.ok ? (
          <>
            <Principal tono="orange" nombre="Precio sugerido" valor={pesos(r.precio)} />
            <Barra
              partes={[
                { nombre: "Costo", valor: r.costo, color: "bg-blue" },
                { nombre: "Tu ganancia", valor: r.ganancia, color: "bg-green" },
                { nombre: "Comisión", valor: r.comision, color: "bg-orange" },
              ]}
            />
            <dl className="mt-4">
              <Fila nombre="Ganás por unidad" valor={pesos(r.ganancia)} fuerte />
              <Fila nombre="Se lleva la comisión" valor={pesos(r.comision)} />
            </dl>
          </>
        ) : null}
      </Resultado>
    </div>
  );
}

function PuntoDeEquilibrio() {
  const [fijos, setFijos] = useState("");
  const [precio, setPrecio] = useState("");
  const [costo, setCosto] = useState("");
  const r = puntoDeEquilibrio(fijos, precio, costo);

  return (
    <div className={grilla}>
      <div className={campos}>
        <Campo etiqueta="Gastos fijos del mes" valor={fijos} alCambiar={setFijos} signo="$" ejemplo="Ej.: 500.000" ayuda="Alquiler, servicios, sueldos: lo que pagás vendas o no." />
        <Campo etiqueta="Precio promedio de venta" valor={precio} alCambiar={setPrecio} signo="$" ejemplo="Ej.: 15.000" />
        <Campo etiqueta="Costo por unidad" valor={costo} alCambiar={setCosto} signo="$" ejemplo="Ej.: 9.000" />
      </div>
      <Resultado tono="blue" falla={r.ok ? null : r}>
        {r.ok ? (
          <>
            <Principal tono="blue" nombre="Para no perder, por mes vendé" valor={`${numero(r.unidades)} ${r.unidades === 1 ? "unidad" : "unidades"}`} />
            <dl className="mt-5">
              <Fila nombre="En plata, por mes" valor={pesos(r.ventas)} fuerte />
              <Fila nombre={`Por día (mes de ${DIAS_DEL_MES} días)`} valor={`${numero(r.unidadesPorDia, 1)} u. · ${pesos(Math.round(r.ventasPorDia))}`} />
              <Fila nombre="Te deja cada venta" valor={pesos(r.porUnidad)} />
            </dl>
          </>
        ) : null}
      </Resultado>
    </div>
  );
}

function CuantoTeQueda() {
  const [precio, setPrecio] = useState("");
  const [costo, setCosto] = useState("");
  const [comision, setComision] = useState("");
  const r = cuantoTeQueda(precio, costo, comision);

  return (
    <div className={grilla}>
      <div className={campos}>
        <Campo etiqueta="Precio que cobrás" valor={precio} alCambiar={setPrecio} signo="$" ejemplo="Ej.: 20.000" />
        <Campo etiqueta="Costo" valor={costo} alCambiar={setCosto} signo="$" ejemplo="Ej.: 12.000" />
        <Campo etiqueta="Comisión del medio de pago" valor={comision} alCambiar={setComision} signo="%" ejemplo="La que te cobran" />
      </div>
      <Resultado tono="green" falla={r.ok ? null : r}>
        {r.ok ? (
          <>
            <Principal tono="green" nombre="Te acreditan" valor={pesos(r.acreditado)} />
            <Barra
              partes={[
                { nombre: "Te acreditan", valor: r.acreditado, color: "bg-green" },
                { nombre: "Comisión", valor: r.comision, color: "bg-orange" },
              ]}
            />
            <dl className="mt-4">
              <Fila nombre={r.ganancia < 0 ? "Perdés en esta venta" : "Ganás en esta venta"} valor={pesos(Math.abs(r.ganancia))} fuerte />
              <Fila nombre={r.gananciaEfectivo < 0 ? "En efectivo perderías" : "En efectivo ganarías"} valor={pesos(Math.abs(r.gananciaEfectivo))} />
              <Fila nombre="La diferencia es la comisión" valor={pesos(r.comision)} />
            </dl>
          </>
        ) : null}
      </Resultado>
    </div>
  );
}

export function Calculadora({ slug }: { slug: SlugHerramienta }) {
  if (slug === "precio-de-venta") return <PrecioDeVenta />;
  if (slug === "punto-de-equilibrio") return <PuntoDeEquilibrio />;
  return <CuantoTeQueda />;
}

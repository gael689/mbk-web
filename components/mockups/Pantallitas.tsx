import type { ReactNode } from "react";
import { Bell, Check } from "@/content/iconos";

/* Pantallitas animadas de lo nuevo de la v1.10: entran por los ojos y dan ganas de pedir la demo. Son
 * ilustraciones decorativas (aria-hidden), con datos de ejemplo y sin signo de pesos. Las animaciones son
 * CSS puro (globals.css, "Pantallitas"): con "reducir movimiento" quedan quietas en su estado final. */
function Pantalla({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div aria-hidden="true" className={`select-none overflow-hidden rounded-2xl border border-black/5 bg-white p-3 text-[0.8rem] leading-snug text-ink shadow-[var(--shadow-soft)] ${className}`}>
      {children}
    </div>
  );
}

const BARRAS = [2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 2];

/** La línea del escáner baja por el código y aparece el producto. */
export function PantallaEscaner({ className = "" }: { className?: string }) {
  return (
    <Pantalla className={className}>
      <div className="relative overflow-hidden rounded-xl bg-[#14171a] px-4 py-4">
        <span className="absolute left-2 top-2 h-4 w-4 rounded-tl-md border-l-2 border-t-2 border-white/80" />
        <span className="absolute right-2 top-2 h-4 w-4 rounded-tr-md border-r-2 border-t-2 border-white/80" />
        <span className="absolute bottom-2 left-2 h-4 w-4 rounded-bl-md border-b-2 border-l-2 border-white/80" />
        <span className="absolute bottom-2 right-2 h-4 w-4 rounded-br-md border-b-2 border-r-2 border-white/80" />
        <div className="flex h-14 items-stretch justify-center gap-[2px] rounded bg-white px-2 py-1.5">
          {BARRAS.map((b, i) => (
            <span key={i} className="bg-ink" style={{ width: b * 1.5 }} />
          ))}
        </div>
        <span className="an-escaner absolute inset-x-3 top-3 h-[3px] rounded-full bg-pink shadow-[0_0_12px_2px_rgb(228_46_154/0.8)]" />
      </div>
      <div className="an-leido mt-2.5 flex items-center gap-2 rounded-xl bg-green-soft px-2.5 py-2 font-semibold">
        <Check className="h-4 w-4 shrink-0 text-green-strong" strokeWidth={3} />
        <span className="min-w-0 truncate">Remera lisa · M negro</span>
      </div>
    </Pantalla>
  );
}

const TALLES = ["S", "M", "L", "XL"];
const FILAS = [
  { color: "Negro", punto: "bg-ink", u: [4, 7, 2, 0] },
  { color: "Blanco", punto: "bg-white ring-1 ring-black/25", u: [3, 5, 6, 1] },
  { color: "Rosa", punto: "bg-pink", u: [0, 2, 4, 3] },
];

/** La grilla de talles y colores: se vende una y el número baja. */
export function PantallaVariantes({ className = "" }: { className?: string }) {
  return (
    <Pantalla className={className}>
      <p className="font-bold">Remera lisa</p>
      <div className="mt-2 grid grid-cols-[1fr_repeat(4,2rem)] items-center gap-1 text-center">
        <span />
        {TALLES.map((t) => (
          <span key={t} className="font-bold text-muted">
            {t}
          </span>
        ))}
        {FILAS.map((f, fila) => (
          <div key={f.color} className="contents">
            <span className="flex items-center gap-1.5 text-left font-semibold">
              <span className={`h-3 w-3 shrink-0 rounded-full ${f.punto}`} />
              {f.color}
            </span>
            {f.u.map((n, i) =>
              fila === 0 && i === 1 ? (
                <span key={i} className="an-celda relative h-[1.65rem] overflow-hidden rounded-md bg-cream font-semibold">
                  <span className="an-cuenta absolute inset-x-0 top-0 flex flex-col">
                    <span className="block h-[1.65rem] leading-[1.65rem]">7</span>
                    <span className="block h-[1.65rem] leading-[1.65rem]">6</span>
                  </span>
                </span>
              ) : (
                <span key={i} className={`h-[1.65rem] rounded-md font-semibold leading-[1.65rem] ${n === 0 ? "bg-orange-soft text-orange-strong" : "bg-cream"}`}>
                  {n}
                </span>
              ),
            )}
          </div>
        ))}
      </div>
    </Pantalla>
  );
}

/** Una orden de trabajo que pasa de Creada a Enviada. */
export function PantallaOrden({ className = "" }: { className?: string }) {
  return (
    <Pantalla className={className}>
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-end gap-[2px]" style={{ height: 22 }}>
          <span className="w-1.5 rounded-t bg-green" style={{ height: "46%" }} />
          <span className="w-1.5 rounded-t bg-orange" style={{ height: "74%" }} />
          <span className="w-1.5 rounded-t bg-pink" style={{ height: "58%" }} />
          <span className="w-1.5 rounded-t bg-blue" style={{ height: "96%" }} />
        </span>
        <span className="font-bold">OT-128</span>
        <span className="relative inline-grid text-center text-[0.7rem] font-bold">
          <span className="an-estado-a col-start-1 row-start-1 rounded-full bg-blue-soft px-2 py-0.5 text-blue-strong">Creada</span>
          <span className="an-estado-b col-start-1 row-start-1 rounded-full bg-green-soft px-2 py-0.5 text-green-strong">Enviada</span>
        </span>
      </div>
      <dl className="mt-2.5 space-y-1 border-t border-line pt-2">
        {[
          ["Entrega", "Viernes 14"],
          ["Total", "48.000"],
          ["Seña", "20.000"],
        ].map(([a, b]) => (
          <div key={a} className="flex justify-between gap-3">
            <dt className="text-muted">{a}</dt>
            <dd className="font-semibold">{b}</dd>
          </div>
        ))}
        <div className="flex justify-between gap-3 rounded-lg bg-orange-soft px-2 py-1 font-bold">
          <dt>Saldo</dt>
          <dd>28.000</dd>
        </div>
      </dl>
    </Pantalla>
  );
}

/** Un gasto por vencer que se paga. */
export function PantallaPorPagar({ className = "" }: { className?: string }) {
  return (
    <Pantalla className={className}>
      <p className="flex items-center gap-1.5 font-bold">
        <Bell className="an-campana h-4 w-4 text-orange-strong" strokeWidth={2.4} />
        Por pagar
      </p>
      <ul className="mt-2 space-y-1.5">
        <li className="flex items-center justify-between gap-2 rounded-lg bg-cream px-2 py-1.5">
          <span>
            <span className="block font-semibold">Alquiler</span>
            <span className="block text-[0.72rem] font-semibold text-orange-strong">Vence hoy</span>
          </span>
          <span className="inline-grid text-center text-[0.7rem] font-bold">
            <span className="an-estado-a col-start-1 row-start-1 rounded-full bg-ink px-2.5 py-1 text-white">Pagar</span>
            <span className="an-estado-b col-start-1 row-start-1 rounded-full bg-green-soft px-2.5 py-1 text-green-strong">Pagado</span>
          </span>
        </li>
        <li className="flex items-center justify-between gap-2 rounded-lg bg-cream px-2 py-1.5">
          <span>
            <span className="block font-semibold">Luz</span>
            <span className="block text-[0.72rem] font-semibold text-orange-strong">Vence mañana</span>
          </span>
          <span className="rounded-full bg-ink px-2.5 py-1 text-[0.7rem] font-bold text-white">Pagar</span>
        </li>
      </ul>
    </Pantalla>
  );
}

/** La meta del mes, que se va llenando. */
export function PantallaRecomendacion({ className = "" }: { className?: string }) {
  return (
    <Pantalla className={className}>
      <p className="text-[0.72rem] font-bold uppercase tracking-wider text-green-strong">Meta del mes</p>
      <p className="mt-1 text-[1.5rem] font-extrabold leading-none tracking-tight">68%</p>
      <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-green-soft">
        <span className="an-meta block h-full w-[68%] origin-left rounded-full bg-green" />
      </div>
      <p className="mt-2.5 font-semibold">Te faltan 12.000 por día.</p>
    </Pantalla>
  );
}

/** El buscador de Ctrl+K: se escribe y aparecen los resultados. */
export function PantallaBuscador({ className = "" }: { className?: string }) {
  return (
    <Pantalla className={className}>
      <div className="flex items-center justify-between gap-2 rounded-lg border border-line px-2 py-1.5">
        <span className="flex items-center font-semibold">
          <span className="an-tipeo inline-block overflow-hidden whitespace-nowrap">remera</span>
          <span className="an-cursor ml-px inline-block h-3.5 w-px bg-ink" />
        </span>
        <kbd className="rounded border border-line bg-cream px-1.5 py-0.5 font-sans text-[0.68rem] font-bold">Ctrl K</kbd>
      </div>
      <ul className="an-resultados mt-1.5 space-y-0.5">
        {[
          ["Remera lisa", "Producto"],
          ["Venta de hoy", "Venta"],
          ["Ana R.", "Cliente"],
        ].map(([a, b], i) => (
          <li key={a} className={`flex justify-between gap-2 rounded-lg px-2 py-1 ${i === 0 ? "bg-blue-soft" : ""}`}>
            <span className="font-semibold">{a}</span>
            <span className="text-muted">{b}</span>
          </li>
        ))}
      </ul>
    </Pantalla>
  );
}

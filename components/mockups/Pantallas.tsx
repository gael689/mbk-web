import { Banknote, Bell, CalendarDays, Clock, CreditCard, Landmark, Package, Users, BarChart3 } from "@/content/iconos";
import { Mock, Money } from "./Mock";

/* Mockups chicos, uno por problema. Datos de ejemplo obviamente ficticios
 * (nombres genéricos, "Producto A"). Stock, caja y costo en cinco partes son
 * novedades: en la web se rotulan como tales. */

function Encabezado({ Icon, tono, titulo, sub }: { Icon: typeof Users; tono: string; titulo: string; sub?: string }) {
  return (
    <div className="mb-[0.9em] flex items-center gap-[0.8em]">
      <span className={`mk-ico ${tono}`}>
        <Icon />
      </span>
      <div>
        <div className="text-[1.15em] font-extrabold leading-tight tracking-tight">{titulo}</div>
        {sub ? <div className="mk-muted text-[0.8em]">{sub}</div> : null}
      </div>
    </div>
  );
}

/* 1 · Resultado del mes */
export function MockResultado() {
  return (
    <Mock w={34} fluid>
      <div className="mk-panel p-[1.5em]">
        <Encabezado Icon={BarChart3} tono="bg-blue text-white" titulo="Resultado del mes" sub="Septiembre" />
        <div className="grid grid-cols-3 gap-[0.8em]">
          <div className="mk-card !p-[0.9em]">
            <div className="mk-muted text-[0.75em] font-semibold">Ventas</div>
            <div className="text-[1.15em] font-extrabold text-blue-strong">
              <Money>184.300</Money>
            </div>
          </div>
          <div className="mk-card !p-[0.9em]">
            <div className="mk-muted text-[0.75em] font-semibold">Gastos</div>
            <div className="text-[1.15em] font-extrabold text-orange-strong">
              <Money>62.900</Money>
            </div>
          </div>
          <div className="rounded-[1em] bg-green-soft p-[0.9em]">
            <div className="text-[0.75em] font-semibold text-green-strong">Te quedó</div>
            <div className="text-[1.15em] font-extrabold text-green-strong">
              <Money>121.400</Money>
            </div>
          </div>
        </div>
        <div className="mt-[1.2em] space-y-[0.7em]">
          {[
            ["Semana 1", 62, 24],
            ["Semana 2", 78, 18],
            ["Semana 3", 54, 22],
            ["Semana 4", 90, 20],
          ].map(([s, v, g]) => (
            <div key={s as string} className="flex items-center gap-[0.8em] text-[0.78em]">
              <span className="mk-muted w-[5.5em] font-semibold">{s}</span>
              <span className="flex h-[0.9em] flex-1 overflow-hidden rounded-full bg-[#f1ece6]">
                <span className="h-full rounded-full bg-blue" style={{ width: `${v}%` }} />
              </span>
              <span className="h-[0.9em] rounded-full bg-orange" style={{ width: `${(g as number) * 0.5}%`, minWidth: "1.4em" }} />
            </div>
          ))}
        </div>
      </div>
    </Mock>
  );
}

/* 2 · Cobros pendientes */
export function MockCobros() {
  const filas = [
    ["AR", "Ana R.", "Venta del 12/09", "18.000", "bg-blue-soft text-blue-strong"],
    ["LM", "Lucas M.", "Venta del 09/09", "12.500", "bg-pink-soft text-pink-strong"],
    ["ST", "Sofi T.", "Venta del 03/09", "16.000", "bg-green-soft text-green-strong"],
  ];
  return (
    <Mock w={34} fluid>
      <div className="mk-panel p-[1.5em]">
        <Encabezado Icon={Users} tono="bg-pink text-white" titulo="Pendientes de cobro" sub="Lo que te deben tus clientes" />
        <div className="mb-[0.6em] flex items-baseline justify-between rounded-[1em] bg-pink-soft px-[1em] py-[0.8em]">
          <span className="text-[0.85em] font-semibold text-pink-strong">Total por cobrar</span>
          <span className="text-[1.5em] font-extrabold text-pink-strong">
            <Money>46.500</Money>
          </span>
        </div>
        {filas.map(([ini, n, d, m, t]) => (
          <div key={ini} className="mk-row">
            <span className={`mk-av ${t}`}>{ini}</span>
            <span className="flex-1 text-[0.9em] font-semibold leading-tight">
              {n}
              <span className="mk-muted block text-[0.85em] font-normal">{d}</span>
            </span>
            <span className="text-right">
              <Money className="block text-[0.95em] font-bold">{m}</Money>
              <span className="mk-badge bg-orange-soft text-orange-strong">Pendiente</span>
            </span>
          </div>
        ))}
      </div>
    </Mock>
  );
}

/* 3 · Costo del producto en cinco partes (novedad) */
export function MockCostos() {
  const partes = [
    ["Insumos", 2400, "bg-orange"],
    ["Mano de obra", 1800, "bg-pink"],
    ["Packaging", 450, "bg-blue"],
    ["Inversión", 600, "bg-green"],
    ["Otros", 150, "bg-ink/60"],
  ] as const;
  return (
    <Mock w={34} fluid>
      <div className="mk-panel p-[1.5em]">
        <Encabezado Icon={Package} tono="bg-orange text-white" titulo="Costo del producto" sub="Producto de ejemplo" />
        <div className="space-y-[0.85em]">
          {partes.map(([t, v, c]) => (
            <div key={t}>
              <div className="mb-[0.25em] flex justify-between text-[0.85em] font-semibold">
                <span>{t}</span>
                <Money className="font-bold">{v.toLocaleString("es-AR")}</Money>
              </div>
              <div className="h-[0.7em] overflow-hidden rounded-full bg-[#f1ece6]">
                <div className={`h-full rounded-full ${c}`} style={{ width: `${(v / 2400) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-[1.1em] flex items-baseline justify-between rounded-[1em] bg-orange-soft px-[1em] py-[0.8em]">
          <span className="text-[0.85em] font-semibold text-orange-strong">Costo total</span>
          <span className="text-[1.5em] font-extrabold text-orange-strong">
            <Money>5.400</Money>
          </span>
        </div>
      </div>
    </Mock>
  );
}

/* 4 · Alerta de stock (novedad) */
export function MockStock() {
  const filas = [
    ["Producto A", "24 u.", 80, "Bien", "bg-green-soft text-green-strong", "bg-green"],
    ["Producto B", "3 u.", 14, "Bajo", "bg-orange-soft text-orange-strong", "bg-orange"],
    ["Producto C", "0 u.", 2, "Agotado", "bg-[#fde3e3] text-[#b42318]", "bg-[#d92d20]"],
  ] as const;
  return (
    <Mock w={34} fluid>
      <div className="mk-panel p-[1.5em]">
        <Encabezado Icon={Package} tono="bg-orange text-white" titulo="Stock" sub="Lo que te queda" />
        <div className="mb-[0.7em] flex items-center gap-[0.8em] rounded-[1em] bg-orange-soft px-[1em] py-[0.8em]">
          <Bell className="h-[1.3em] w-[1.3em] flex-none text-orange-strong" />
          <span className="text-[0.85em] font-semibold text-orange-strong">Quedan pocas unidades de Producto B</span>
        </div>
        {filas.map(([n, q, p, e, t, c]) => (
          <div key={n} className="mk-row">
            <span className="flex-1">
              <span className="block text-[0.9em] font-semibold">{n}</span>
              <span className="mt-[0.35em] block h-[0.6em] overflow-hidden rounded-full bg-[#f1ece6]">
                <span className={`block h-full rounded-full ${c}`} style={{ width: `${p}%` }} />
              </span>
            </span>
            <span className="w-[3.4em] text-right text-[0.9em] font-bold">{q}</span>
            <span className={`mk-badge w-[5em] text-center ${t}`}>{e}</span>
          </div>
        ))}
      </div>
    </Mock>
  );
}

/* 5 · Caja por medio de pago (novedad) */
export function MockCaja() {
  const filas = [
    ["Efectivo", "85.000", Banknote, "bg-green-soft text-green-strong"],
    ["Cuenta bancaria", "142.500", Landmark, "bg-blue-soft text-blue-strong"],
    ["Mercado Pago", "85.000", CreditCard, "bg-orange-soft text-orange-strong"],
  ] as const;
  return (
    <Mock w={34} fluid>
      <div className="mk-panel p-[1.5em]">
        <Encabezado Icon={Landmark} tono="bg-blue text-white" titulo="Caja" sub="Por medio de pago" />
        <div className="mb-[0.6em] rounded-[1em] bg-blue-soft px-[1em] py-[0.8em]">
          <div className="text-[0.8em] font-semibold text-blue-strong">Tenés en total</div>
          <div className="text-[1.7em] font-extrabold text-blue-strong">
            <Money>312.500</Money>
          </div>
        </div>
        {filas.map(([n, m, I, t]) => (
          <div key={n} className="mk-row">
            <span className={`mk-ico ${t}`}>
              <I />
            </span>
            <span className="flex-1 text-[0.95em] font-semibold">{n}</span>
            <Money className="text-[1em] font-bold">{m}</Money>
          </div>
        ))}
      </div>
    </Mock>
  );
}

/* 6 · Agenda de turnos con recordatorio */
export function MockTurnos() {
  const filas = [
    ["10:00", "Ana R.", "Servicio de ejemplo"],
    ["11:30", "Lucas M.", "Servicio de ejemplo"],
    ["15:00", "Sofi T.", "Servicio de ejemplo"],
  ];
  return (
    <Mock w={34} fluid>
      <div className="mk-panel p-[1.5em]">
        <Encabezado Icon={CalendarDays} tono="bg-green text-white" titulo="Turnos de hoy" sub="Tu agenda" />
        {filas.map(([h, n, s]) => (
          <div key={h} className="mk-row">
            <span className="flex w-[4.4em] items-center gap-[0.35em] text-[0.9em] font-extrabold text-green-strong">
              <Clock className="h-[1em] w-[1em]" />
              {h}
            </span>
            <span className="flex-1 text-[0.9em] font-semibold leading-tight">
              {n}
              <span className="mk-muted block text-[0.85em] font-normal">{s}</span>
            </span>
          </div>
        ))}
        <div className="mt-[0.8em] flex items-center gap-[0.8em] rounded-[1em] bg-green-soft px-[1em] py-[0.8em]">
          <Bell className="h-[1.3em] w-[1.3em] flex-none text-green-strong" />
          <span className="text-[0.85em] font-semibold text-green-strong">Recordatorio: mañana 10:00 con Ana R.</span>
        </div>
      </div>
    </Mock>
  );
}

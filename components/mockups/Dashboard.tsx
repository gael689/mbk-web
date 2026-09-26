import Image from "next/image";
import {
  Bell,
  CalendarDays,
  Clock,
  FileText,
  LayoutDashboard,
  MessageCircle,
  Package,
  Settings,
  ShoppingCart,
  TrendingUp,
  Users,
  BarChart3,
} from "@/content/iconos";
import { Mock, Money } from "./Mock";

/* El Dashboard del sistema, dibujado en HTML/CSS con datos de ejemplo
 * obviamente ficticios. Imita la pantalla real (saludo, cuatro tarjetas,
 * ventas recientes, menú lateral) para usarla dentro de la notebook o del
 * celular. No son capturas: cuando Belén pase las reales se reemplazan. */

const RECIENTES = [
  { ini: "AR", nombre: "Ana R.", detalle: "Servicio de ejemplo", monto: "18.000", fecha: "12/09", tono: "bg-blue-soft text-blue-strong" },
  { ini: "LM", nombre: "Lucas M.", detalle: "Producto de ejemplo", monto: "12.500", fecha: "12/09", tono: "bg-pink-soft text-pink-strong" },
  { ini: "ST", nombre: "Sofi T.", detalle: "Producto de ejemplo", monto: "9.800", fecha: "11/09", tono: "bg-green-soft text-green-strong" },
];

const MENU = [
  { t: "Dashboard", Icon: LayoutDashboard, c: "text-blue", activo: true },
  { t: "Clientes", Icon: Users, c: "text-pink" },
  { t: "Productos", Icon: Package, c: "text-orange" },
  { t: "Servicios", Icon: CalendarDays, c: "text-green" },
  { t: "Ventas", Icon: BarChart3, c: "text-blue" },
  { t: "Costos/Gastos", Icon: FileText, c: "text-violet" },
  { t: "Mensajes", Icon: MessageCircle, c: "text-green" },
  { t: "Notificaciones", Icon: Bell, c: "text-orange" },
  { t: "Configuración", Icon: Settings, c: "text-[#6b6560]" },
];

function Kpi({
  titulo,
  valor,
  delta,
  Icon,
  tono,
  rojo,
}: {
  titulo: string;
  valor: React.ReactNode;
  delta: string;
  Icon: typeof Clock;
  tono: string;
  rojo?: boolean;
}) {
  return (
    <div className="mk-card">
      <div className="flex items-center justify-between">
        <span className="mk-muted text-[0.85em] font-semibold">{titulo}</span>
        <span className={`mk-ico !h-[1.9em] !w-[1.9em] ${tono}`}>
          <Icon />
        </span>
      </div>
      <div className={`mt-[0.35em] text-[1.85em] font-extrabold tracking-tight ${rojo ? "text-[#d92d20]" : "text-blue-strong"}`}>{valor}</div>
      <span className={`mk-badge mt-[0.3em] ${rojo ? "bg-[#fde3e3] text-[#b42318]" : "bg-green-soft text-green-strong"}`}>{delta}</span>
    </div>
  );
}

/* Versión de escritorio (la que va adentro de la notebook). */
export function DashboardEscritorio() {
  return (
    <Mock w={64} ratio="16 / 10" className="bg-[#f5f6f8]">
      <div className="grid h-full grid-cols-[11.5em_1fr]">
        <aside className="border-r border-black/[0.06] bg-white px-[1em] py-[1.1em]">
          <Image src="/logo.png" alt="" width={395} height={314} className="mx-auto mb-[1.1em] h-auto w-[6.5em]" />
          <ul className="space-y-[0.15em]">
            {MENU.map(({ t, Icon, c, activo }) => (
              <li
                key={t}
                className={`flex items-center gap-[0.7em] rounded-[0.6em] px-[0.8em] py-[0.55em] text-[0.88em] font-semibold ${activo ? "bg-blue-soft text-blue-strong" : ""}`}
              >
                <Icon className={`h-[1.15em] w-[1.15em] ${activo ? "" : c}`} />
                {t}
              </li>
            ))}
          </ul>
        </aside>
        <div className="px-[1.7em] py-[1.5em]">
          <div className="text-[1.85em] font-extrabold tracking-tight">¡Buenas tardes!</div>
          <div className="mk-muted mb-[1.1em] text-[0.95em]">Tu negocio en un solo lugar</div>
          <div className="grid grid-cols-2 gap-[0.9em]">
            <Kpi titulo="Ventas del mes" valor={<Money>184.300</Money>} delta="↑ +12,4% vs ant." Icon={ShoppingCart} tono="bg-green-soft text-green-strong" />
            <Kpi titulo="Gastos del mes" valor={<Money>62.900</Money>} delta="↑ +3,1% vs ant." Icon={TrendingUp} tono="bg-[#fde3e3] text-[#b42318]" rojo />
            <Kpi titulo="Turnos" valor="4" delta="hoy" Icon={CalendarDays} tono="bg-blue-soft text-blue-strong" />
            <Kpi titulo="Servicios activos" valor="6" delta="en el mes" Icon={Clock} tono="bg-orange-soft text-orange-strong" />
          </div>
          <div className="mk-card mt-[0.9em] !py-[0.7em]">
            <div className="mb-[0.2em] text-[0.95em] font-extrabold">Ventas recientes</div>
            {RECIENTES.map((r) => (
              <div key={r.ini} className="mk-row !py-[0.5em]">
                <span className={`mk-av ${r.tono}`}>{r.ini}</span>
                <span className="flex-1 text-[0.85em] font-semibold">
                  {r.nombre}
                  <span className="mk-muted ml-[0.7em] font-normal">{r.detalle}</span>
                </span>
                <Money className="text-[0.85em] font-bold">{r.monto}</Money>
                <span className="mk-muted w-[3em] text-right text-[0.78em]">{r.fecha}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Mock>
  );
}

/* Versión de celular. */
export function DashboardCelular() {
  return (
    <Mock w={24} ratio="9 / 18" className="bg-[#f5f6f8]">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between bg-white px-[1.3em] pb-[0.9em] pt-[1.6em]">
          <Image src="/logo.png" alt="" width={395} height={314} className="h-auto w-[3.6em]" />
          <span className="mk-ico !h-[2em] !w-[2em] bg-orange-soft text-orange-strong">
            <Bell />
          </span>
        </div>
        <div className="flex-1 space-y-[0.7em] px-[1.1em] py-[1em]">
          <div>
            <div className="text-[1.45em] font-extrabold leading-tight tracking-tight">¡Buenas tardes!</div>
            <div className="mk-muted text-[0.82em]">Tu negocio en un solo lugar</div>
          </div>
          <div className="grid grid-cols-2 gap-[0.6em]">
            {[
              ["Ventas del mes", "184.300", "text-blue-strong"],
              ["Gastos del mes", "62.900", "text-[#d92d20]"],
            ].map(([t, v, c]) => (
              <div key={t} className="mk-card !p-[0.75em]">
                <div className="mk-muted text-[0.7em] font-semibold">{t}</div>
                <div className={`text-[1.05em] font-extrabold ${c}`}>
                  <Money>{v}</Money>
                </div>
              </div>
            ))}
            {[
              ["Turnos", "4"],
              ["Servicios", "6"],
            ].map(([t, v]) => (
              <div key={t} className="mk-card !p-[0.75em]">
                <div className="mk-muted text-[0.7em] font-semibold">{t}</div>
                <div className="text-[1.3em] font-extrabold text-blue-strong">{v}</div>
              </div>
            ))}
          </div>
          <div className="mk-card !p-[0.8em]">
            <div className="flex items-center justify-between text-[0.75em] font-bold">
              <span>Meta del mes</span>
              <span className="text-green-strong">62%</span>
            </div>
            <div className="mt-[0.5em] h-[0.6em] overflow-hidden rounded-full bg-[#eceff3]">
              <div className="h-full w-[62%] rounded-full bg-green" />
            </div>
          </div>
          <div className="mk-card !p-[0.8em]">
            <div className="mb-[0.1em] text-[0.8em] font-extrabold">Ventas recientes</div>
            {RECIENTES.map((r) => (
              <div key={r.ini} className="mk-row !gap-[0.6em] !py-[0.45em]">
                <span className={`mk-av !h-[2.1em] !w-[2.1em] ${r.tono}`}>{r.ini}</span>
                <span className="flex-1 text-[0.72em] font-semibold leading-tight">
                  {r.nombre}
                  <span className="mk-muted block font-normal">{r.detalle}</span>
                </span>
                <Money className="text-[0.72em] font-bold">{r.monto}</Money>
              </div>
            ))}
          </div>
        </div>
        <nav className="grid grid-cols-5 border-t border-black/[0.06] bg-white px-[0.6em] pb-[1em] pt-[0.8em] text-center">
          {[
            [LayoutDashboard, "text-blue"],
            [Users, "text-pink"],
            [Package, "text-orange"],
            [BarChart3, "text-blue"],
            [FileText, "text-violet"],
          ].map(([I, c], i) => {
            const Ic = I as typeof Users;
            return (
              <span key={i} className="grid place-items-center">
                <Ic className={`h-[1.5em] w-[1.5em] ${c as string}`} />
              </span>
            );
          })}
        </nav>
      </div>
    </Mock>
  );
}

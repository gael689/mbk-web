import { Bell, BarChart3, CalendarDays, Clock, FileText, Package, Plus, Sparkles, Users, type LucideIcon } from "./iconos";

/* Un color por módulo, el que Belén ya usa en sus piezas de Instagram.
 * Las clases van completas (no armadas con template strings) para que Tailwind
 * las detecte. */
export type Tono = "pink" | "orange" | "green" | "blue" | "violet";

export const TONO: Record<Tono, { solid: string; soft: string; text: string; ring: string; border: string }> = {
  pink: { solid: "bg-pink", soft: "bg-pink-soft", text: "text-pink-strong", ring: "ring-pink/30", border: "border-pink/30" },
  orange: { solid: "bg-orange", soft: "bg-orange-soft", text: "text-orange-strong", ring: "ring-orange/30", border: "border-orange/30" },
  green: { solid: "bg-green", soft: "bg-green-soft", text: "text-green-strong", ring: "ring-green/30", border: "border-green/30" },
  blue: { solid: "bg-blue", soft: "bg-blue-soft", text: "text-blue-strong", ring: "ring-blue/30", border: "border-blue/30" },
  violet: { solid: "bg-violet", soft: "bg-violet-soft", text: "text-violet-strong", ring: "ring-violet/30", border: "border-violet/30" },
};

export type Modulo = { id: string; label: string; tono: Tono; Icon: LucideIcon };

/* La fila de íconos de sus posts: Clientes, Productos, Servicios, Ventas, Costos y gastos. */
export const MODULOS: Modulo[] = [
  { id: "clientes", label: "Clientes", tono: "pink", Icon: Users },
  { id: "productos", label: "Productos", tono: "orange", Icon: Package },
  { id: "servicios", label: "Servicios", tono: "green", Icon: CalendarDays },
  { id: "ventas", label: "Ventas", tono: "blue", Icon: BarChart3 },
  { id: "costos", label: "Costos y gastos", tono: "violet", Icon: FileText },
];

/* La fila del hero: los módulos, más lo que el sistema hace solo ("y más"). */
export const MODULOS_HERO: Modulo[] = [
  ...MODULOS,
  { id: "turnos", label: "Turnos", tono: "pink", Icon: Clock },
  { id: "notificaciones", label: "Notificaciones automáticas", tono: "orange", Icon: Bell },
  { id: "actualizaciones", label: "Actualizaciones continuas", tono: "green", Icon: Sparkles },
  { id: "mas", label: "¡Y más!", tono: "blue", Icon: Plus },
];

/* Qué existe hoy y qué viene. Las novedades se nombran sin fecha. */
export const INCLUYE_HOY = [
  "Ventas",
  "Cobros",
  "Clientes",
  "Productos",
  "Servicios y turnos",
  "Costos y gastos",
  "Metas mensuales",
  "Notificaciones",
  "Mensajes",
  "Descarga a Excel",
] as const;

export const NOVEDADES = ["Control de stock con avisos", "Caja por medio de pago", "Costo del producto en cinco partes"] as const;

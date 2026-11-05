import { Bell, BarChart3, CalendarDays, Clock, FileText, Package, Plus, ScanLine, Sparkles, Users, type LucideIcon } from "./iconos";

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
  { id: "codigos", label: "Códigos de barras", tono: "violet", Icon: ScanLine },
  { id: "notificaciones", label: "Notificaciones automáticas", tono: "orange", Icon: Bell },
  { id: "actualizaciones", label: "Actualizaciones continuas", tono: "green", Icon: Sparkles },
  { id: "mas", label: "¡Y más!", tono: "blue", Icon: Plus },
];

/* Qué existe hoy y qué viene. Lo que viene se nombra sin fecha; cuando sale, pasa a INCLUYE_HOY.
 * Stock, caja y costo en cinco partes salieron en la v1.8.0; variantes, combos, códigos de barras,
 * órdenes de trabajo, gastos por pagar y recomendaciones, en la v1.10.0. */
export const INCLUYE_HOY = [
  "Ventas",
  "Cobros",
  "Caja por medio de pago",
  "Clientes",
  "Productos",
  "Variantes: talle, color, sabor",
  "Combos",
  "Códigos de barras y etiquetas",
  "Costo del producto en cinco partes",
  "Control de stock con avisos",
  "Servicios y turnos",
  "Órdenes de trabajo",
  "Costos y gastos",
  "Gastos por pagar con aviso de vencimiento",
  "Metas mensuales",
  "Recomendaciones en Inicio",
  "Notificaciones",
  "Mensajes",
  "Descarga a Excel",
] as const;

/* Lo que viene: se muestra como "Próximamente" en /sistema, en la home y en llms.txt.
 * Factura electrónica: hecha y apagada en el sistema (REACT_APP_FEATURE_ARCA) hasta tener el certificado.
 * Cuando se prenda, sacarla de acá, sumarla a INCLUYE_HOY y crear su página en content/funciones.ts. */
export const NOVEDADES: readonly string[] = ["Factura electrónica de ARCA"];

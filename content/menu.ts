import { BarChart3, BookOpen, CalendarDays, CircleHelp, ClipboardList, FileSpreadsheet, GraduationCap, HandCoins, Heart, Landmark, MapPin, Package, Play, Rocket, ScanLine, Shirt, Store, Tag, Wallet, type LucideIcon } from "./iconos";
import type { Tono } from "./modulos";
import { RUBROS } from "./rubros";
import { YOUTUBE_URL, tiendaHref } from "./site";

/* El menú principal, en un solo lugar: lo usan el desplegable de escritorio y el acordeón del celular.
 * Solo se importa desde componentes de servidor, para no mandarle el contenido al navegador. */
export type ItemMenu = {
  href: string;
  t: string;
  Icon: LucideIcon;
  tono: Tono;
  nuevo?: boolean;
  /** Se abre en otra pestaña. */
  externo?: boolean;
  track?: string;
};

export type GrupoMenu = {
  id: string;
  etiqueta: string;
  /** Rutas que marcan este grupo como el actual. */
  rutas: string[];
  verTodo?: { href: string; t: string };
  items: ItemMenu[];
};

export const MENU: GrupoMenu[] = [
  {
    id: "sistema",
    etiqueta: "Sistema",
    rutas: ["/sistema"],
    verTodo: { href: "/sistema", t: "Ver todo el sistema" },
    items: [
      { href: "/sistema#gano-plata", t: "Resultado del mes", Icon: BarChart3, tono: "blue" },
      { href: "/sistema#cobros", t: "Ventas y cobros", Icon: Wallet, tono: "pink" },
      { href: "/sistema#precios", t: "Costos y precios", Icon: Tag, tono: "orange" },
      { href: "/sistema#stock", t: "Control de stock", Icon: Package, tono: "green" },
      { href: "/sistema#caja", t: "Caja", Icon: Landmark, tono: "blue" },
      { href: "/sistema#turnos", t: "Turnos y señas", Icon: CalendarDays, tono: "green" },
      { href: "/sistema#codigos", t: "Códigos de barras", Icon: ScanLine, tono: "violet", nuevo: true },
      { href: "/sistema#variantes", t: "Talles y colores", Icon: Shirt, tono: "pink", nuevo: true },
      { href: "/sistema#ordenes", t: "Órdenes de trabajo", Icon: ClipboardList, tono: "orange", nuevo: true },
    ],
  },
  {
    id: "rubros",
    etiqueta: "Tu rubro",
    rutas: ["/rubros"],
    verTodo: { href: "/rubros", t: "Ver todos los rubros" },
    items: RUBROS.map((r) => ({ href: `/rubros/${r.slug}`, t: r.nombre, Icon: r.Icon, tono: r.tono })),
  },
  {
    id: "servicios",
    etiqueta: "Servicios",
    rutas: ["/consultoria", "/planillas", "/bahia-blanca"],
    items: [
      { href: "/consultoria", t: "Consultoría económica", Icon: GraduationCap, tono: "green" },
      { href: "/?acomp=1#probar", t: "Sistema + acompañamiento", Icon: HandCoins, tono: "pink" },
      { href: "/planillas", t: "Planillas de Excel", Icon: FileSpreadsheet, tono: "orange" },
      { href: tiendaHref(), t: "Tienda de planillas", Icon: Store, tono: "blue", externo: true, track: "clic_tienda" },
      { href: "/bahia-blanca", t: "MBK en Bahía Blanca", Icon: MapPin, tono: "violet" },
    ],
  },
  {
    id: "recursos",
    etiqueta: "Recursos",
    rutas: ["/guias", "/preguntas", "/versiones"],
    items: [
      { href: "/versiones", t: "Novedades del sistema", Icon: Rocket, tono: "green" },
      { href: "/guias", t: "Guías para emprendedores", Icon: BookOpen, tono: "blue" },
      { href: "/preguntas", t: "Preguntas frecuentes", Icon: CircleHelp, tono: "pink" },
      { href: YOUTUBE_URL, t: "Tutoriales en YouTube", Icon: Play, tono: "orange", externo: true },
      { href: "/consultoria#belen", t: "Quién es Belén", Icon: Heart, tono: "violet" },
    ],
  },
];

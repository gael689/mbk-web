import { BarChart3, CalendarDays, Landmark, Package, Smartphone, Wallet, type LucideIcon } from "./iconos";
import type { Tono } from "./modulos";

/* Lo que incluye el sistema, en tildes: pocas palabras, para que se lea de un vistazo y den ganas de
 * verlo funcionando. Nada de explicar cada función acá: eso se cuenta en la demo. Solo lo que el sistema
 * hace HOY en producción (la fuente es system-mbk/frontend/src/lib/releaseNotes.ts). */
export type GrupoTildes = { id: string; titulo: string; tono: Tono; Icon: LucideIcon; items: string[] };

export const TILDES: GrupoTildes[] = [
  { id: "ventas", titulo: "Ventas y cobros", tono: "blue", Icon: Wallet, items: ["Ventas desde el celular", "Cobros en partes", "Quién te debe", "Medios de pago propios"] },
  { id: "stock", titulo: "Productos y stock", tono: "green", Icon: Package, items: ["Stock que baja solo", "Talles, colores y sabores", "Combos", "Códigos de barras"] },
  { id: "plata", titulo: "Caja y gastos", tono: "orange", Icon: Landmark, items: ["Caja por medio de pago", "Gastos por pagar", "Aviso de vencimientos", "Costo en cinco partes"] },
  { id: "turnos", titulo: "Turnos y trabajos", tono: "pink", Icon: CalendarDays, items: ["Turnos con seña", "Recordatorios", "Órdenes de trabajo", "Con tu logo, por WhatsApp"] },
  { id: "numeros", titulo: "Tus números", tono: "violet", Icon: BarChart3, items: ["Resultado del mes", "Metas mensuales", "Recomendaciones", "Descarga a Excel"] },
  { id: "digital", titulo: "Desde el celular", tono: "blue", Icon: Smartphone, items: ["Sin instalar nada", "Escáner con la cámara", "Celular y compu, misma cuenta", "Notificaciones"] },
];

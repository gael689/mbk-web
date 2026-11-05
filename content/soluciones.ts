import { BarChart3, CalendarDays, Landmark, Package, Smartphone, Tag, Wallet, type LucideIcon } from "./iconos";
import type { Tono } from "./modulos";

/* La regla de toda la copy: problema -> solución -> lo que ganás.
 * `titulo` es el titular-pregunta (lleva adentro la búsqueda que interesa).
 * `problema` lo dice el emprendedor, en sus palabras.
 * `novedad`: todavía no está disponible; en la web se muestra como "Novedad", sin fecha.
 * Hoy ningún bloque la lleva. */
export type MockId = "resultado" | "cobros" | "costos" | "stock" | "caja" | "turnos" | "celular";

export type Solucion = {
  id: string;
  tono: Tono;
  Icon: LucideIcon;
  modulo: string;
  titulo: string;
  problema: string;
  /** Lo que hace el sistema, en tildes: frases cortas. */
  incluye: string[];
  gana: string;
  mock: MockId;
  novedad?: boolean;
};

export const SOLUCIONES: Solucion[] = [
  {
    id: "gano-plata",
    tono: "blue",
    Icon: BarChart3,
    modulo: "Ventas",
    titulo: "¿Cómo saber si tu emprendimiento gana plata?",
    problema: "“Vendo todo el mes y no sé si gané plata.”",
    incluye: ["Vendido, cobrado, gastos y resultado", "Comparado con el mes anterior", "Tu meta del mes"],
    gana: "Saber si tu negocio te deja plata, sin hacer cuentas.",
    mock: "resultado",
  },
  {
    id: "cobros",
    tono: "pink",
    Icon: Wallet,
    modulo: "Cobros y clientes",
    titulo: "¿Sabés cuánto te deben tus clientes?",
    problema: "“No sé cuánto me deben.”",
    incluye: ["Lo que te falta cobrar, a la vista", "Cobros en partes", "Cada cobro con su fecha y medio de pago"],
    gana: "Cobrar lo que es tuyo, sin perseguir a nadie de memoria.",
    mock: "cobros",
  },
  {
    id: "precios",
    tono: "orange",
    Icon: Tag,
    modulo: "Productos",
    titulo: "¿Cómo calcular el precio de un producto?",
    problema: "“Pongo los precios a ojo.”",
    incluye: ["Costo en cinco partes", "El sistema lo suma por vos", "Tu margen, antes de guardar"],
    gana: "Precios que cubren lo que te cuesta y te dejan margen.",
    mock: "costos",
  },
  {
    id: "stock",
    tono: "green",
    Icon: Package,
    modulo: "Stock",
    titulo: "Control de stock para emprendedores: ¿cómo no quedarte sin mercadería?",
    problema: "“Me quedo sin mercadería sin darme cuenta.”",
    incluye: ["Baja solo con cada venta", "Aviso cuando queda poco", "Por talle, color y sabor", "Códigos de barras"],
    gana: "Reponer a tiempo y no perder ventas.",
    mock: "stock",
  },
  {
    id: "caja",
    tono: "blue",
    Icon: Landmark,
    modulo: "Caja",
    titulo: "¿Cuánta plata tenés hoy y dónde está?",
    problema: "“A principio de mes no sé cuánta plata tengo.”",
    incluye: ["Efectivo, transferencia, tarjeta y Mercado Pago", "Arqueo de caja", "Gastos por pagar, con aviso"],
    gana: "Saber cuánto hay en efectivo, en la cuenta y en Mercado Pago.",
    mock: "caja",
  },
  {
    id: "turnos",
    tono: "green",
    Icon: CalendarDays,
    modulo: "Servicios y turnos",
    titulo: "¿Cómo organizar los turnos de tu negocio sin que se te pisen?",
    problema: "“Se me pisan los turnos y me olvido de pedidos.”",
    incluye: ["Cliente, servicio y seña", "Recordatorio antes de cada turno", "Pendientes y pagos, a la vista"],
    gana: "Cumplir con cada cliente.",
    mock: "turnos",
  },
  {
    id: "todo-en-uno",
    tono: "pink",
    Icon: Smartphone,
    modulo: "Todo en un lugar",
    titulo: "Un programa para registrar ventas desde el celular, ¿y si tuvieras todo junto?",
    problema: "“Lo tengo todo en cuadernos y papelitos.”",
    incluye: ["Sin instalar nada", "Celular y compu, misma cuenta", "Clientes, productos, ventas y costos"],
    gana: "Tiempo para vender en vez de ordenar.",
    mock: "celular",
  },
];

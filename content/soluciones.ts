import { BarChart3, CalendarDays, Landmark, Package, Smartphone, Tag, Wallet, type LucideIcon } from "./iconos";
import type { Tono } from "./modulos";

/* La regla de toda la copy: problema -> solución -> lo que ganás.
 * `titulo` es el titular-pregunta (lleva adentro la búsqueda que interesa).
 * `problema` lo dice el emprendedor, en sus palabras.
 * `novedad`: todavía no está disponible; en la web se muestra como "Novedad", sin fecha. */
export type MockId = "resultado" | "cobros" | "costos" | "stock" | "caja" | "turnos" | "celular";

export type Solucion = {
  id: string;
  tono: Tono;
  Icon: LucideIcon;
  modulo: string;
  titulo: string;
  problema: string;
  hace: string;
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
    hace: "Cargás tus ventas y tus gastos, y el Sistema MBK te muestra el resultado del mes apenas abrís el Dashboard.",
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
    hace: "Anotás lo que queda pendiente en cada venta y el sistema te muestra quién te debe y cuánto, cliente por cliente.",
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
    hace: "Armás el costo real de cada producto —insumos, mano de obra, packaging, inversión y otros— y el sistema lo suma por vos.",
    gana: "Precios que cubren lo que te cuesta y te dejan margen.",
    mock: "costos",
    novedad: true,
  },
  {
    id: "stock",
    tono: "green",
    Icon: Package,
    modulo: "Stock",
    titulo: "Control de stock para emprendedores: ¿cómo no quedarte sin mercadería?",
    problema: "“Me quedo sin mercadería sin darme cuenta.”",
    hace: "El stock se descuenta solo cada vez que vendés y el sistema te avisa cuando queda poco de algo.",
    gana: "Reponer a tiempo y no perder ventas.",
    mock: "stock",
    novedad: true,
  },
  {
    id: "caja",
    tono: "blue",
    Icon: Landmark,
    modulo: "Caja",
    titulo: "¿Cuánta plata tenés hoy y dónde está?",
    problema: "“A principio de mes no sé cuánta plata tengo.”",
    hace: "Ves la caja separada por medio de pago: lo que hay en efectivo, en la cuenta del banco y en Mercado Pago.",
    gana: "Saber cuánto hay en efectivo, en la cuenta y en Mercado Pago.",
    mock: "caja",
    novedad: true,
  },
  {
    id: "turnos",
    tono: "green",
    Icon: CalendarDays,
    modulo: "Servicios y turnos",
    titulo: "¿Cómo organizar los turnos de tu negocio sin que se te pisen?",
    problema: "“Se me pisan los turnos y me olvido de pedidos.”",
    hace: "Una agenda de turnos con recordatorios, donde cada turno queda ligado a su cliente y a su venta.",
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
    hace: "Clientes, productos, servicios, ventas y costos en un solo lugar, que abrís desde el celular en el mostrador o en el colectivo.",
    gana: "Tiempo para vender en vez de ordenar.",
    mock: "celular",
  },
];

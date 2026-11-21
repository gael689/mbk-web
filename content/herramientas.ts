import { Clock, HandCoins, Package, Scale, Tag, TrendingUp, type LucideIcon } from "./iconos";
import type { Tono } from "./modulos";

/* Herramientas gratis (/herramientas/<slug>): calculadoras que un emprendedor busca y comparte.
 * Poco texto: un título, una bajada, la calculadora y una línea de cómo se hace la cuenta.
 * Mismas reglas de toda la web: sin precios de MBK, nada inventado (tampoco comisiones "reales"
 * de ningún medio de cobro: cambian seguido y las escribe cada persona) y, en el cierre, solo lo
 * que el sistema hace hoy. Las cuentas están en `lib/calculadoras.ts`. */
export type SlugHerramienta =
  | "precio-de-venta"
  | "punto-de-equilibrio"
  | "cuanto-te-queda"
  | "costo-de-un-producto"
  | "valor-de-la-hora"
  | "margen-y-markup";

export type Herramienta = {
  slug: SlugHerramienta;
  tono: Tono;
  /** Nombre corto: menú, tarjetas y migas. */
  nombre: string;
  /** Título y descripción para buscadores. */
  titulo: string;
  descripcion: string;
  h1: [string, string];
  bajada: string;
  /** La cuenta, en una línea. */
  formula: string;
  /** Cierre: lo que hace el Sistema MBK con los datos reales del negocio. */
  cierre: string;
  /** Guía relacionada (slug de content/guias.ts). */
  guia: string;
  /** Fecha de la última revisión (YYYY-MM-DD). */
  fecha: string;
};

export const HERRAMIENTAS: Herramienta[] = [
  {
    slug: "precio-de-venta",
    tono: "orange",
    nombre: "Precio de venta",
    titulo: "Calculadora de precio de venta con comisión",
    descripcion:
      "Calculá gratis a cuánto vender un producto: poné el costo, la ganancia que querés y la comisión de tu medio de cobro, y mirá el precio sugerido y cuánto te queda.",
    h1: ["¿A cuánto", "lo tengo que vender?"],
    bajada: "Poné lo que te cuesta, lo que querés ganar y la comisión que te cobran.",
    formula: "Precio = costo + ganancia, dividido por lo que te queda después de la comisión.",
    cierre: "En el Sistema MBK cargás el costo de cada producto y ves tu margen mientras escribís el precio.",
    guia: "como-calcular-el-precio-de-un-producto",
    fecha: "2026-11-21",
  },
  {
    slug: "punto-de-equilibrio",
    tono: "blue",
    nombre: "Punto de equilibrio",
    titulo: "Calculadora de punto de equilibrio para tu negocio",
    descripcion:
      "Calculá gratis cuántas unidades y cuánta plata tenés que vender por mes y por día para cubrir tus gastos fijos y no perder. Para emprendedores y pymes.",
    h1: ["¿Cuánto tengo que vender", "para no perder?"],
    bajada: "Poné tus gastos fijos del mes, tu precio promedio y lo que te cuesta cada unidad.",
    formula: "Unidades = gastos fijos del mes, dividido por lo que te deja cada venta (precio menos costo). Por día: el mes dividido 30.",
    cierre: "El Sistema MBK te muestra el resultado del mes con tus ventas y tus gastos reales, y te deja ponerte una meta.",
    guia: "como-saber-si-tu-emprendimiento-gana-plata",
    fecha: "2026-11-21",
  },
  {
    slug: "cuanto-te-queda",
    tono: "green",
    nombre: "Cuánto te queda",
    titulo: "Calculadora: cuánto te queda después de la comisión",
    descripcion:
      "Calculá gratis cuánto te acreditan y cuánto ganás en una venta cobrada con tarjeta, QR o link de pago, comparado con cobrar en efectivo. Vos ponés tu comisión.",
    h1: ["¿Cuánto me queda", "después de la comisión?"],
    bajada: "Poné lo que cobrás, lo que te cuesta y la comisión de tu medio de pago.",
    formula: "Te acreditan = lo que cobrás menos la comisión. Ganás = lo que te acreditan menos el costo.",
    cierre: "En el Sistema MBK cada cobro queda con su medio de pago, y la caja te muestra cuánto hay en cada uno.",
    guia: "caja-y-ganancia-no-son-lo-mismo",
    fecha: "2026-11-21",
  },
  {
    slug: "costo-de-un-producto",
    tono: "blue",
    nombre: "Costo de un producto",
    titulo: "Calculadora de costo de un producto (por unidad)",
    descripcion:
      "Calculá gratis cuánto te cuesta hacer cada unidad: sumá materiales, tu mano de obra y otros costos del lote (envase, etiqueta) y dividilos por las unidades que salen.",
    h1: ["¿Cuánto me cuesta", "hacer cada uno?"],
    bajada: "Poné lo que gastás en un lote, tus horas y cuántas unidades salen.",
    formula: "Costo por unidad = (materiales + horas × valor de la hora + otros costos), dividido por las unidades del lote.",
    cierre: "En el Sistema MBK guardás el costo de cada producto y ves tu margen mientras escribís el precio.",
    guia: "como-calcular-el-precio-de-un-producto",
    fecha: "2026-11-21",
  },
  {
    slug: "valor-de-la-hora",
    tono: "green",
    nombre: "Valor de la hora",
    titulo: "Calculadora: cuánto cobrar la hora de tu trabajo",
    descripcion:
      "Calculá gratis cuánto cobrar la hora y por día: sumá lo que querés ganar al mes y tus gastos fijos, y dividilos por las horas que realmente podés facturar.",
    h1: ["¿Cuánto tengo", "que cobrar la hora?"],
    bajada: "Poné lo que querés ganar, tus gastos fijos y las horas que facturás.",
    formula:
      "Valor de la hora = (lo que querés ganar + gastos fijos del mes), dividido por las horas que facturás al mes. Ojo: no son todas las que trabajás, solo las que te pagan.",
    cierre: "El Sistema MBK te muestra el resultado del mes con tus ventas y tus gastos reales, y te deja ponerte una meta.",
    guia: "como-saber-si-tu-emprendimiento-gana-plata",
    fecha: "2026-11-21",
  },
  {
    slug: "margen-y-markup",
    tono: "orange",
    nombre: "Margen y markup",
    titulo: "Calculadora de margen y markup (con la diferencia)",
    descripcion:
      "Calculá gratis el margen y el markup de un producto con su costo y su precio, o sacá el precio a partir del margen o markup que querés. Con la diferencia explicada.",
    h1: ["¿Cuánto es", "mi margen y mi markup?"],
    bajada: "Poné el costo y el precio. O elegí el porcentaje que querés y sacá el precio.",
    formula: "El margen se mide sobre el precio; el markup, sobre el costo. Con la misma ganancia, el markup siempre da un número más alto.",
    cierre: "En el Sistema MBK cargás el costo de cada producto y ves tu margen mientras escribís el precio.",
    guia: "como-calcular-el-precio-de-un-producto",
    fecha: "2026-11-21",
  },
];

/* Aparte de la lista, para que el tipo `Herramienta` siga siendo solo texto. */
export const ICONO_HERRAMIENTA: Record<SlugHerramienta, LucideIcon> = {
  "precio-de-venta": Tag,
  "punto-de-equilibrio": Scale,
  "cuanto-te-queda": HandCoins,
  "costo-de-un-producto": Package,
  "valor-de-la-hora": Clock,
  "margen-y-markup": TrendingUp,
};

export const herramientaPorSlug = (slug: string) => HERRAMIENTAS.find((h) => h.slug === slug);

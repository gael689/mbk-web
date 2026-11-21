/* Las cuentas de /herramientas, en funciones puras: sin React, sin estado y sin acceso al navegador,
 * para poder revisarlas (y probarlas con node) sin levantar la web.
 *
 * Convenciones:
 *  · Los porcentajes entran como número "de persona": 30 es 30 %.
 *  · Los campos llegan como texto, tal cual los escribió la persona; `leerNumero` los interpreta.
 *  · Ninguna función devuelve NaN ni Infinity: lo que no se puede calcular vuelve como
 *    `{ ok: false, motivo: "falta" }` (hay campos vacíos) o `{ ok: false, motivo: "error", mensaje }`. */

export type Falla = { ok: false; motivo: "falta" } | { ok: false; motivo: "error"; mensaje: string };

const FALTA: Falla = { ok: false, motivo: "falta" };
const error = (mensaje: string): Falla => ({ ok: false, motivo: "error", mensaje });

/** Lee un número escrito a la argentina o con punto decimal.
 *  Devuelve `null` si el campo está vacío y `NaN` si no se entiende o es negativo.
 *
 *  · "1.234,56" → 1234.56 (punto de miles, coma decimal)   · "1,234.56" → 1234.56
 *  · "1234,5" → 1234.5   · "12.5" → 12.5   · "$ 1 500" → 1500
 *  · Un solo punto seguido de exactamente tres cifras se toma como separador de miles,
 *    como se escribe en Argentina: "1.500" → 1500 (salvo que empiece con cero: "0.125" → 0.125). */
export function leerNumero(texto: string): number | null {
  const t = texto.replace(/[\s$% ]/g, "");
  if (t === "") return null;
  if (!/^[\d.,]+$/.test(t) || !/\d/.test(t)) return NaN;

  const puntos = t.split(".").length - 1;
  const comas = t.split(",").length - 1;
  let limpio: string;

  if (puntos && comas) {
    // El que aparece último es el decimal; el otro separa miles.
    const decimal = t.lastIndexOf(",") > t.lastIndexOf(".") ? "," : ".";
    const miles = decimal === "," ? "." : ",";
    if (t.split(decimal).length - 1 > 1) return NaN;
    limpio = t.split(miles).join("").replace(decimal, ".");
  } else if (comas) {
    limpio = comas === 1 ? t.replace(",", ".") : t.split(",").join("");
  } else if (puntos > 1) {
    limpio = t.split(".").join("");
  } else if (puntos === 1) {
    const [entero, resto] = t.split(".");
    const esMiles = resto.length === 3 && /^[1-9]\d{0,2}$/.test(entero);
    limpio = esMiles ? entero + resto : t;
  } else {
    limpio = t;
  }

  const n = Number(limpio);
  return Number.isFinite(n) ? n : NaN;
}

/** Pesos argentinos: "$ 1.234" si es entero, "$ 1.234,50" si tiene centavos. */
export function pesos(n: number): string {
  const centavos = Math.round(n * 100) / 100;
  const decimales = Number.isInteger(centavos) ? 0 : 2;
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  }).format(centavos === 0 ? 0 : centavos);
}

/** Número a la argentina, con hasta `decimales` cifras después de la coma. */
export function numero(n: number, decimales = 0): string {
  return new Intl.NumberFormat("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: decimales }).format(n);
}

const invalido = (...valores: (number | null)[]) => valores.some((v) => v !== null && Number.isNaN(v));
const NUMERO_INVALIDO = "Revisá los números: usá solo cifras, con coma o punto para los decimales.";

/* ── 1. Precio de venta ──────────────────────────────────────────────────── */

/** Sobre qué se mide la ganancia que la persona quiere. */
export type BaseGanancia = "costo" | "precio";

export type PrecioVenta =
  | {
      ok: true;
      /** Precio sugerido de venta. */
      precio: number;
      /** Lo que queda por unidad después del costo y la comisión. */
      ganancia: number;
      /** Lo que se lleva el medio de cobro por unidad. */
      comision: number;
      costo: number;
    }
  | Falla;

/** Precio que cubre el costo, la comisión del medio de cobro y deja la ganancia pedida.
 *
 *  Con c = comisión / 100 y g = ganancia / 100:
 *   · ganancia sobre el costo:  precio = costo × (1 + g) ÷ (1 − c)      ganancia = costo × g
 *   · ganancia sobre el precio: precio = costo ÷ (1 − g − c)            ganancia = precio × g
 *   · comisión = precio × c
 *  La comisión vacía cuenta como 0 (cobro en efectivo). */
export function precioDeVenta(costoTxt: string, gananciaTxt: string, comisionTxt: string, base: BaseGanancia): PrecioVenta {
  const costo = leerNumero(costoTxt);
  const gananciaPct = leerNumero(gananciaTxt);
  const comisionPct = leerNumero(comisionTxt) ?? 0;
  if (invalido(costo, gananciaPct, comisionPct)) return error(NUMERO_INVALIDO);
  if (costo === null || gananciaPct === null) return FALTA;
  if (costo <= 0) return error("El costo tiene que ser mayor a cero.");
  if (comisionPct >= 100) return error("La comisión tiene que ser menor al 100 %.");

  const g = gananciaPct / 100;
  const c = comisionPct / 100;

  if (base === "precio") {
    if (gananciaPct >= 100) return error("Sobre el precio, la ganancia tiene que ser menor al 100 %: probá medirla sobre el costo.");
    if (gananciaPct + comisionPct >= 100) return error("La ganancia y la comisión juntas tienen que sumar menos del 100 % del precio.");
    const precio = costo / (1 - g - c);
    return { ok: true, precio, ganancia: precio * g, comision: precio * c, costo };
  }

  const precio = (costo * (1 + g)) / (1 - c);
  return { ok: true, precio, ganancia: costo * g, comision: precio * c, costo };
}

/* ── 2. Punto de equilibrio ──────────────────────────────────────────────── */

export const DIAS_DEL_MES = 30;

export type PuntoEquilibrio =
  | {
      ok: true;
      /** Unidades enteras a vender en el mes para no perder (redondeado para arriba). */
      unidades: number;
      /** Plata que entra vendiendo esas unidades. */
      ventas: number;
      /** Lo mismo, repartido en 30 días. */
      unidadesPorDia: number;
      ventasPorDia: number;
      /** Lo que deja cada unidad para pagar los gastos fijos. */
      porUnidad: number;
    }
  | Falla;

/** Cuánto hay que vender por mes para cubrir los gastos fijos.
 *
 *   porUnidad = precio − costo por unidad
 *   unidades  = gastos fijos ÷ porUnidad, redondeado para arriba (no se vende media unidad)
 *   ventas    = unidades × precio
 *   por día   = unidades ÷ 30 y ventas ÷ 30 */
export function puntoDeEquilibrio(fijosTxt: string, precioTxt: string, costoTxt: string): PuntoEquilibrio {
  const fijos = leerNumero(fijosTxt);
  const precio = leerNumero(precioTxt);
  const costo = leerNumero(costoTxt);
  if (invalido(fijos, precio, costo)) return error(NUMERO_INVALIDO);
  if (fijos === null || precio === null || costo === null) return FALTA;
  if (precio <= 0) return error("El precio de venta tiene que ser mayor a cero.");

  const porUnidad = precio - costo;
  if (porUnidad <= 0) {
    return error(
      porUnidad === 0
        ? "Vendés al mismo valor que te cuesta: no te queda nada para pagar los gastos fijos. Subí el precio o bajá el costo."
        : "Vendés por menos de lo que te cuesta: con cada venta perdés más. Subí el precio o bajá el costo.",
    );
  }

  // El pequeño margen evita que 10,000000001 (ruido de coma flotante) se redondee a 11.
  const unidades = Math.max(0, Math.ceil(fijos / porUnidad - 1e-9));
  const ventas = unidades * precio;
  return { ok: true, unidades, ventas, unidadesPorDia: unidades / DIAS_DEL_MES, ventasPorDia: ventas / DIAS_DEL_MES, porUnidad };
}

/* ── 3. Cuánto te queda ──────────────────────────────────────────────────── */

export type CuantoQueda =
  | {
      ok: true;
      /** Lo que te acreditan después de la comisión. */
      acreditado: number;
      comision: number;
      /** Lo que ganás cobrando con ese medio de pago (puede ser negativo). */
      ganancia: number;
      /** Lo que ganarías cobrando lo mismo en efectivo. */
      gananciaEfectivo: number;
      precio: number;
    }
  | Falla;

/** Qué queda de una venta cobrada con un medio de pago, comparado con el efectivo.
 *
 *   comisión           = precio × comisión ÷ 100
 *   te acreditan       = precio − comisión
 *   ganás              = te acreditan − costo
 *   ganás en efectivo  = precio − costo        (la diferencia es la comisión) */
export function cuantoTeQueda(precioTxt: string, costoTxt: string, comisionTxt: string): CuantoQueda {
  const precio = leerNumero(precioTxt);
  const costo = leerNumero(costoTxt);
  const comisionPct = leerNumero(comisionTxt);
  if (invalido(precio, costo, comisionPct)) return error(NUMERO_INVALIDO);
  if (precio === null || costo === null || comisionPct === null) return FALTA;
  if (precio <= 0) return error("El precio que cobrás tiene que ser mayor a cero.");
  if (comisionPct >= 100) return error("La comisión tiene que ser menor al 100 %.");

  const comision = (precio * comisionPct) / 100;
  const acreditado = precio - comision;
  return { ok: true, acreditado, comision, ganancia: acreditado - costo, gananciaEfectivo: precio - costo, precio };
}

/* ── 4. Costo de un producto ─────────────────────────────────────────────── */

export type CostoProducto =
  | {
      ok: true;
      /** Lo que cuesta hacer cada unidad. */
      porUnidad: number;
      /** Lo que cuesta todo el lote, partido en sus tres partes. */
      materiales: number;
      manoDeObra: number;
      otros: number;
      total: number;
      unidades: number;
    }
  | Falla;

/** Costo por unidad de un lote.
 *
 *   mano de obra = horas × valor de la hora      (si se dejan vacías las dos, es 0)
 *   total        = materiales + mano de obra + otros costos del lote
 *   por unidad   = total ÷ unidades que salen
 *  Materiales y unidades son obligatorios; horas, valor de la hora y otros vacíos cuentan como 0,
 *  pero horas y valor de la hora van juntos. */
export function costoDeUnProducto(materialesTxt: string, horasTxt: string, valorHoraTxt: string, otrosTxt: string, unidadesTxt: string): CostoProducto {
  const materiales = leerNumero(materialesTxt);
  const horas = leerNumero(horasTxt);
  const valorHora = leerNumero(valorHoraTxt);
  const otros = leerNumero(otrosTxt);
  const unidades = leerNumero(unidadesTxt);
  if (invalido(materiales, horas, valorHora, otros, unidades)) return error(NUMERO_INVALIDO);
  if (materiales === null || unidades === null) return FALTA;
  if (unidades <= 0) return error("Las unidades que salen del lote tienen que ser más de cero.");
  if ((horas === null) !== (valorHora === null)) return error("Poné las horas y el valor de la hora, o dejá los dos vacíos.");

  const manoDeObra = (horas ?? 0) * (valorHora ?? 0);
  const total = materiales + manoDeObra + (otros ?? 0);
  if (total <= 0) return error("Poné al menos un costo mayor a cero.");
  return { ok: true, porUnidad: total / unidades, materiales, manoDeObra, otros: otros ?? 0, total, unidades };
}

/* ── 5. Valor de la hora ─────────────────────────────────────────────────── */

export const SEMANAS_POR_DEFECTO = 4;

export type ValorHora =
  | {
      ok: true;
      /** Lo que hay que cobrar cada hora facturable. */
      porHora: number;
      /** Lo que hay que facturar al mes (lo que querés ganar + los gastos fijos). */
      aFacturar: number;
      horasAlMes: number;
      /** Lo que hay que facturar por día de trabajo; null si no se indicaron los días por semana. */
      porDia: number | null;
      horasPorDia: number | null;
    }
  | Falla;

/** Cuánto cobrar la hora.
 *
 *   a facturar   = lo que querés ganar + gastos fijos del mes (vacío = 0)
 *   horas al mes = horas facturables por semana × semanas al mes (vacío = 4)
 *   por hora     = a facturar ÷ horas al mes
 *   por día      = a facturar ÷ (semanas × días por semana), solo si se dijeron los días
 *  Las horas son las que realmente se facturan, no todas las trabajadas. */
export function valorDeLaHora(quieroTxt: string, fijosTxt: string, horasSemanaTxt: string, semanasTxt: string, diasSemanaTxt: string): ValorHora {
  const quiero = leerNumero(quieroTxt);
  const fijos = leerNumero(fijosTxt) ?? 0;
  const horasSemana = leerNumero(horasSemanaTxt);
  const semanas = leerNumero(semanasTxt) ?? SEMANAS_POR_DEFECTO;
  const dias = leerNumero(diasSemanaTxt);
  if (invalido(quiero, fijos, horasSemana, semanas, dias)) return error(NUMERO_INVALIDO);
  if (quiero === null || horasSemana === null) return FALTA;
  if (horasSemana <= 0) return error("Las horas que facturás por semana tienen que ser más de cero.");
  if (horasSemana > 168) return error("Una semana tiene 168 horas: revisá las horas que facturás.");
  if (semanas <= 0 || semanas > 5) return error("Las semanas al mes tienen que estar entre 1 y 5.");
  if (dias !== null && (dias <= 0 || dias > 7)) return error("Los días por semana tienen que estar entre 1 y 7.");
  const aFacturar = quiero + fijos;
  if (aFacturar <= 0) return error("Poné lo que querés ganar al mes.");

  const horasAlMes = horasSemana * semanas;
  const diasAlMes = dias === null ? null : dias * semanas;
  return {
    ok: true,
    porHora: aFacturar / horasAlMes,
    aFacturar,
    horasAlMes,
    porDia: diasAlMes === null ? null : aFacturar / diasAlMes,
    horasPorDia: dias === null ? null : horasSemana / dias,
  };
}

/* ── 6. Margen y markup ──────────────────────────────────────────────────── */

export type MargenMarkup =
  | {
      ok: true;
      costo: number;
      precio: number;
      /** Precio menos costo (negativo si se vende con pérdida). */
      ganancia: number;
      /** Ganancia sobre el precio, en %. */
      margen: number;
      /** Ganancia sobre el costo, en %. */
      markup: number;
    }
  | Falla;

/** Margen y markup de un producto del que se conocen el costo y el precio.
 *
 *   ganancia = precio − costo
 *   margen   = ganancia ÷ precio × 100     (sobre el precio: nunca llega a 100 %)
 *   markup   = ganancia ÷ costo × 100      (sobre el costo: puede pasar de 100 %) */
export function margenYMarkup(costoTxt: string, precioTxt: string): MargenMarkup {
  const costo = leerNumero(costoTxt);
  const precio = leerNumero(precioTxt);
  if (invalido(costo, precio)) return error(NUMERO_INVALIDO);
  if (costo === null || precio === null) return FALTA;
  if (costo <= 0) return error("El costo tiene que ser mayor a cero.");
  if (precio <= 0) return error("El precio tiene que ser mayor a cero.");
  const ganancia = precio - costo;
  return { ok: true, costo, precio, ganancia, margen: (ganancia / precio) * 100, markup: (ganancia / costo) * 100 };
}

/** Lo que la persona fija para sacar el precio: un margen (sobre el precio) o un markup (sobre el costo). */
export type BaseMargen = "margen" | "markup";

export type PrecioPorMargen = { ok: true; costo: number; precio: number; ganancia: number; margen: number; markup: number } | Falla;

/** El camino inverso: el precio que da el margen o el markup que se quiere.
 *
 *   con m = porcentaje ÷ 100:
 *   · margen: precio = costo ÷ (1 − m)      (el margen tiene que ser menor al 100 %)
 *   · markup: precio = costo × (1 + m)
 *   ganancia = precio − costo; y el otro porcentaje sale de la ganancia como en `margenYMarkup`. */
export function precioPorMargen(costoTxt: string, porcentajeTxt: string, base: BaseMargen): PrecioPorMargen {
  const costo = leerNumero(costoTxt);
  const pct = leerNumero(porcentajeTxt);
  if (invalido(costo, pct)) return error(NUMERO_INVALIDO);
  if (costo === null || pct === null) return FALTA;
  if (costo <= 0) return error("El costo tiene que ser mayor a cero.");
  if (base === "margen" && pct >= 100) return error("Un margen sobre el precio tiene que ser menor al 100 %: para ganar más que el costo, usá el markup.");

  const m = pct / 100;
  const precio = base === "margen" ? costo / (1 - m) : costo * (1 + m);
  const ganancia = precio - costo;
  return { ok: true, costo, precio, ganancia, margen: (ganancia / precio) * 100, markup: (ganancia / costo) * 100 };
}

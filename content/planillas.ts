import { tiendaHref } from "./site";

export const PLANILLAS = [
  { nombre: "Control de Ventas", texto: "Registrá lo que vendés día a día.", href: tiendaHref("control-de-ventas") },
  { nombre: "Cálculo de Precios", texto: "Sacá cuánto cobrar por cada producto o servicio.", href: tiendaHref("calculo-de-precios") },
  { nombre: "Flujo de Caja", texto: "Mirá cuánta plata entra y cuánta sale cada mes.", href: tiendaHref("flujo-de-caja") },
  { nombre: "Control de Stock e Inventarios", texto: "Llevá la cuenta de tu mercadería.", href: tiendaHref("control-de-stock-e-inventarios") },
  { nombre: "Punto de Equilibrio", texto: "Descubrí cuánto tenés que vender para no perder.", href: tiendaHref("punto-de-equilibrio") },
  { nombre: "Específicas para Emprendedores", texto: "Pensadas para el día a día de un emprendimiento.", href: tiendaHref("especificas-para-emprendedores") },
] as const;

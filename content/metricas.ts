/* Cifras reales de uso del sistema, para la franja de métricas del hero.
 * Son conteos agregados (sin nombres ni montos) y siempre redondeados HACIA ABAJO con
 * "más de": así son ciertos hoy y no quedan viejos de un mes para el otro. No incluyen
 * las cuentas de prueba, la demo ni el negocio propio de MBK.
 *
 * Para actualizarlas, correr en la base (solo lectura) y volver a redondear hacia abajo:
 *   with reales as (select b.id from businesses b join profiles p on p.id=b.owner_id
 *     where b.is_active and p.is_active and p.archived_at is null and p.role='entrepreneur'
 *       and b.name not in ('Demo','Usuario para testear funcionalidades','Portal prueba 1','MBK Consultoria'))
 *   select (select count(*) from reales) negocios,
 *          (select count(*) from sales s join reales r on r.id=s.business_id) ventas,
 *          (select count(*) from customers c join reales r on r.id=c.business_id) clientes,
 *          (select count(*) from products p join reales r on r.id=p.business_id) productos;
 * Al 01/10/2026: 11 negocios · 2.021 ventas · 659 clientes · 688 productos. */
export const METRICAS_AL = "octubre 2026";

export const METRICAS = [
  { id: "negocios", valor: 10, etiqueta: "Negocios activos", tono: "pink" },
  { id: "ventas", valor: 2000, etiqueta: "Ventas cargadas", tono: "blue" },
  { id: "clientes", valor: 650, etiqueta: "Clientes registrados", tono: "green" },
  { id: "productos", valor: 650, etiqueta: "Productos cargados", tono: "orange" },
] as const;

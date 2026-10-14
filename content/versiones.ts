/* Historial de versiones del Sistema MBK, muy resumido, para la página /versiones.
 * Sale de las notas de versión del propio sistema (system-mbk/frontend/src/lib/releaseNotes.ts):
 * solo lo que usa un emprendedor, sin lo interno ni lo del panel de asesoría.
 * Cuando sale una versión nueva del sistema: agregarla ARRIBA (la primera es "la actual"),
 * el mismo día que se sube el front, y actualizar ULTIMA_MODIFICACION.versiones. */
export type Version = {
  version: string;
  /** YYYY-MM-DD, o null si no hay fecha documentada. */
  fecha: string | null;
  titulo: string;
  cambios: string[];
};

export const VERSIONES: Version[] = [
  {
    version: "1.8.0",
    fecha: "2026-10-12",
    titulo: "Stock y caja",
    cambios: [
      "Caja por medio de pago: cuánta plata hay en efectivo, transferencia, Mercado Pago y el resto, con arqueo.",
      "Control de stock por producto, con aviso cuando queda poco o se agota.",
      "Excel de stock y de caja.",
      "Una guía paso a paso la primera vez que entrás a Stock o a Caja.",
    ],
  },
  {
    version: "1.7.1",
    fecha: "2026-10-08",
    titulo: "Ventas más fáciles de corregir",
    cambios: [
      "Se puede corregir el precio de una venta ya cargada.",
      "El estado del pago siempre coincide con lo cobrado.",
      "Si se corrige el medio de pago de una venta cobrada, los totales por medio de pago quedan bien.",
    ],
  },
  {
    version: "1.7.0",
    fecha: "2026-10-06",
    titulo: "La web conectada al sistema",
    cambios: ["Las consultas que llegan desde www.mbk.com.ar entran directo al sistema, para responderlas más rápido."],
  },
  {
    version: "1.6.1",
    fecha: "2026-10-05",
    titulo: "Cobros con fecha y medio de pago",
    cambios: [
      "Cada cobro queda con su fecha y su medio de pago.",
      "La seña y el resto de un turno se pueden cobrar por medios distintos.",
    ],
  },
  {
    version: "1.6.0",
    fecha: "2026-10-04",
    titulo: "Costos en partes y medios de pago propios",
    cambios: [
      "El costo de un producto o servicio se puede dividir en insumos, mano de obra, packaging, inversión y otros.",
      "Cada negocio puede sumar sus propios medios de pago.",
      "Más cómodo desde el celular y Excel más completos.",
    ],
  },
  {
    version: "1.5.0",
    fecha: "2026-09-20",
    titulo: "Vendido y cobrado, por separado",
    cambios: [
      "Los cobros se registran en el mes en que se cobran.",
      "El tablero muestra por separado lo vendido y lo cobrado.",
      "Los productos y servicios dados de baja se pueden reactivar.",
    ],
  },
  {
    version: "1.4.0",
    fecha: "2026-08-24",
    titulo: "Turnos con pedido detallado",
    cambios: [
      "Los turnos se cargan con el pedido detallado.",
      "Cuenta DNI como medio de pago, y cuánto te acreditan.",
      "La fecha de la operación se elige al cargarla.",
    ],
  },
  {
    version: "1.3.1",
    fecha: "2026-08-04",
    titulo: "Más detalle en los informes",
    cambios: [
      "El período elegido alcanza a todo el detalle.",
      "El Excel de ventas incluye el detalle por producto.",
      "Aviso de clientes inactivos para volver a contactarlos.",
    ],
  },
  {
    version: "1.3",
    fecha: "2026-07-28",
    titulo: "Ventas más flexibles",
    cambios: ["Recargos en las ventas.", "Importes manuales dentro de una venta.", "Precio editable en cada ítem."],
  },
  {
    version: "1.2",
    fecha: "2026-07-14",
    titulo: "Metas, avisos y mensajes",
    cambios: ["Metas mensuales.", "Notificaciones y recordatorio de turnos.", "Seguimiento de cobros pendientes.", "Mensajes internos."],
  },
  {
    version: "1.1",
    fecha: "2026-06-05",
    titulo: "Cobros anticipados",
    cambios: ["Cobros anticipados en las ventas.", "Los gastos del período se comparan con el período anterior."],
  },
  {
    version: "1.0",
    fecha: null,
    titulo: "La primera versión",
    cambios: ["Ventas, clientes, productos, servicios, turnos con seña, gastos, el resultado del mes y descarga a Excel."],
  },
];

export const VERSION_ACTUAL = VERSIONES[0];

import type { Tono } from "./modulos";

/* Guías (/guias/<slug>): respuestas a las búsquedas que hace un emprendedor antes de
 * necesitar un sistema. Cada una enseña a resolver el problema a mano y recién al final
 * muestra cómo lo hace el Sistema MBK. Mismas reglas de toda la web: sin precios de MBK,
 * sin cifras ni casos inventados, y solo se afirma lo que el sistema hace hoy.
 * Los números de los ejemplos son redondos y se presentan como ejemplo. */
export type GuiaSeccion = { h: string; p: string[]; lista?: string[] };

export type Guia = {
  slug: string;
  tono: Tono;
  titulo: string;
  descripcion: string;
  h1: [string, string];
  bajada: string;
  /** Respuesta directa, que se entiende sola. */
  respuesta: string;
  secciones: GuiaSeccion[];
  /** Cómo lo resuelve el sistema (un párrafo + dónde se ve). */
  sistema: { titulo: string; texto: string };
  faq: { q: string; a: string }[];
  rubros: string[];
  /** Fecha de la última revisión (YYYY-MM-DD). */
  fecha: string;
};

export const GUIAS: Guia[] = [
  {
    slug: "como-calcular-el-precio-de-un-producto",
    tono: "orange",
    titulo: "Cómo calcular el precio de venta de un producto",
    descripcion:
      "Aprendé a calcular el precio de venta de un producto sumando todos sus costos y un margen, con un ejemplo paso a paso. Guía para emprendedores y pymes.",
    h1: ["Cómo calcular el precio", "de un producto"],
    bajada: "Un paso a paso para ponerle precio a lo que vendés sin adivinar, sumando todo lo que te cuesta y lo que querés ganar.",
    respuesta:
      "El precio de un producto se calcula sumando todos los costos de hacerlo o conseguirlo (insumos, mano de obra, packaging, una parte de la inversión y otros gastos) y agregando el margen de ganancia que querés. Si el precio no cubre el costo total, cada venta te hace perder plata aunque la caja se vea llena.",
    secciones: [
      {
        h: "1. Sumá todo lo que cuesta, no solo los materiales",
        p: [
          "El error más común es contar solo lo que pagaste por los materiales o por la mercadería. El costo real de un producto tiene más partes, y las que se olvidan son las que se llevan la ganancia.",
        ],
        lista: [
          "Insumos o mercadería: lo que gastás en materia prima o lo que le pagás al proveedor.",
          "Mano de obra: tu tiempo y el de quien te ayuda, aunque no te pagues un sueldo.",
          "Packaging: cajas, bolsas, etiquetas, cintas.",
          "Inversión: herramientas, máquinas o equipos que se van gastando con el uso.",
          "Otros: comisiones de cobro, traslados, una parte del alquiler o de los servicios.",
        ],
      },
      {
        h: "2. Decidí el margen que querés",
        p: [
          "El margen es lo que queda de cada venta después de cubrir el costo. Se puede mirar como un porcentaje del precio de venta o como un monto. Lo importante es elegirlo a propósito: es la plata que el negocio necesita para crecer, para absorber imprevistos y para pagarte a vos.",
          "Si no sabés qué margen te conviene, partí de lo que necesitás ganar al mes y de cuántas unidades vendés normalmente. Con esos dos datos se puede ir acomodando.",
        ],
      },
      {
        h: "3. Armá el precio y compará",
        p: [
          "Con el costo total y el margen que querés, sale un precio de venta. Después compará con lo que cobran negocios parecidos al tuyo: no para copiarlos, sino para entender si tu precio está en un rango razonable.",
          "Si tu precio quedó mucho más alto que el del mercado, podés revisar el costo (¿hay algo que puedas comprar mejor?) o la propuesta (¿qué te hace distinto?). Si quedó más bajo, probablemente estés regalando margen.",
        ],
      },
      {
        h: "Un ejemplo con números redondos",
        p: [
          "Imaginá un producto que te cuesta 1.000 en insumos, 500 en tu trabajo, 100 en packaging y 100 en otros gastos. El costo total es 1.700. Si querés que te quede una ganancia de 800 por unidad, el precio de venta tiene que ser 2.500. Es un ejemplo para mostrar la cuenta: los valores de tu producto serán otros.",
          "Si vendieras ese mismo producto a 1.800 porque así lo vende otra persona, te quedarían apenas 100 por unidad, y eso sin contar los días en que no vendés.",
        ],
      },
      {
        h: "4. Revisá cada tanto",
        p: [
          "Los costos cambian. Los insumos suben, el proveedor cambia la lista, la cinta o la caja se encarecen. Un precio puesto una vez y nunca más tocado se va quedando atrás. Conviene revisar los costos de tus productos principales al menos una vez por mes.",
        ],
      },
    ],
    sistema: {
      titulo: "Cómo lo hace el Sistema MBK",
      texto:
        "En la ficha de cada producto o servicio cargás el costo dividido en cinco partes: insumos, mano de obra, packaging, inversión y otros. El sistema suma las partes y muestra el margen mientras escribís el precio, antes de guardar. Cuando un costo cambia, lo actualizás en un lugar y ves qué productos te dejan más y cuáles menos.",
    },
    faq: [
      {
        q: "¿Cuánto margen de ganancia tengo que ponerle a un producto?",
        a: "No hay un número que sirva para todos. Depende de lo que necesitás ganar al mes, de cuántas unidades vendés y de los gastos que tiene tu negocio. Empezá por calcular el costo total real y a partir de ahí elegí un margen que cubra tus gastos y te deje ganancia. Belén y su equipo ayudan a definirlo en la consultoría, si querés una mirada profesional.",
      },
      {
        q: "¿Tengo que contar mi tiempo como costo?",
        a: "Sí. Tu trabajo tiene un valor aunque no lo cobres como sueldo. Si no lo sumás al costo, el negocio parece dar ganancia cuando en realidad lo que ganás es ese tiempo sin pago.",
      },
    ],
    rubros: ["pastelerias", "emprendimientos-artesanales", "indumentaria-y-lenceria"],
    fecha: "2026-10-14",
  },
  {
    slug: "como-saber-si-tu-emprendimiento-gana-plata",
    tono: "blue",
    titulo: "Cómo saber si tu emprendimiento gana plata",
    descripcion:
      "Guía simple para saber si tu negocio gana o pierde plata: qué registrar, cómo calcular el resultado del mes y por qué vender mucho no alcanza para saberlo.",
    h1: ["Cómo saber si tu emprendimiento", "gana plata"],
    bajada: "Vender no es ganar. Qué anotar y qué restar para saber qué te dejó el mes.",
    respuesta:
      "Para saber si un emprendimiento gana plata se compara lo que se vendió en el mes con todo lo que costó sostenerlo: los costos de los productos y los gastos del negocio. Si queda un resto positivo, hubo ganancia; si no, el negocio trabajó para cubrirse. Hace falta registrar las ventas y los gastos, no alcanza con mirar cuánta plata hay en la cuenta.",
    secciones: [
      {
        h: "Primero, qué NO te dice si ganaste",
        p: [
          "Mirar el saldo de la cuenta o la caja engaña, porque mezcla la plata del negocio con la tuya, con lo que todavía debés a proveedores y con lo que tus clientes aún no te pagaron. Tampoco alcanza con contar cuántas ventas hiciste: se puede vender mucho y ganar poco.",
        ],
      },
      {
        h: "Lo que hay que registrar",
        p: ["Con tres cosas anotadas todos los días alcanza para tener el resultado del mes:"],
        lista: [
          "Cada venta, con su importe y a quién se la hiciste.",
          "Cuánto cobraste de esa venta y cuánto quedó pendiente.",
          "Cada gasto del negocio: alquiler, servicios, insumos, transporte, publicidad.",
        ],
      },
      {
        h: "La cuenta del mes",
        p: [
          "Sumás lo vendido, restás los gastos y lo que queda es el resultado del mes. Si además querés saber cuánto de eso ya es plata en mano, mirás cuánto cobraste y cuánto falta cobrar. Son dos preguntas distintas: ¿el negocio rindió? y ¿ya tengo esa plata?",
        ],
      },
      {
        h: "Compará con el mes anterior y con una meta",
        p: [
          "Un número solo dice poco. Cuando lo comparás con el mes anterior ves si vas mejorando, y cuando te ponés una meta de ventas ves a mitad de mes si vas a llegar o si todavía estás a tiempo de moverte.",
        ],
      },
    ],
    sistema: {
      titulo: "Cómo lo hace el Sistema MBK",
      texto:
        "Cargás ventas y gastos a medida que pasan y el Dashboard te muestra el resultado del mes apenas lo abrís: cuánto vendiste, cuánto cobraste, cuánto falta cobrar, cuánto gastaste y el resultado neto. Podés compararlo con el mes anterior y fijar una meta mensual.",
    },
    faq: [
      {
        q: "¿Es lo mismo ganancia que plata en la cuenta?",
        a: "No. La plata en la cuenta incluye cobros de ventas de meses anteriores, aportes tuyos y plata que todavía tenés que pagar. La ganancia compara lo que vendiste con lo que costó sostener el negocio. Por eso conviene mirar las dos cosas por separado.",
      },
      {
        q: "¿Cada cuánto conviene mirar el resultado?",
        a: "Como mínimo una vez por mes, pero si registrás todo a diario podés mirarlo cuando quieras. Lo importante es que los datos estén cargados al día.",
      },
    ],
    rubros: ["gastronomia", "servicios-y-oficios", "pastelerias"],
    fecha: "2026-10-14",
  },
  {
    slug: "control-de-stock-para-emprendedores",
    tono: "green",
    titulo: "Control de stock para emprendedores: cómo empezar",
    descripcion:
      "Cómo llevar el control de stock de un emprendimiento o comercio: qué contar, cuándo reponer, cómo registrar mermas y cómo empezar con pocos productos.",
    h1: ["Control de stock para", "emprendedores"],
    bajada: "Cómo saber qué tenés, qué se está acabando y cuándo reponer, empezando por pocos productos.",
    respuesta:
      "El control de stock consiste en saber cuántas unidades tenés de cada producto y registrar cada vez que entra o sale mercadería. Un buen control te avisa cuándo reponer antes de quedarte sin nada. Para empezar alcanza con elegir pocos productos, contar lo que hay hoy y anotar cada venta y cada compra.",
    secciones: [
      {
        h: "Empezá chico: los productos que más rotan",
        p: [
          "Querer controlar todo de entrada es la mejor manera de abandonar a la semana. Elegí entre diez y quince productos, los que más vendés o los que más te duele quedarte sin ellos, y controlá solo esos hasta que la rutina esté instalada.",
        ],
      },
      {
        h: "Contá lo que hay hoy",
        p: [
          "El primer paso es un conteo real: ir producto por producto y anotar cuántas unidades hay. Ese número es tu punto de partida, y de ahí en más lo único que hace falta es sumar lo que entra y restar lo que sale.",
        ],
      },
      {
        h: "Anotá cada movimiento",
        p: ["El stock se desordena por los movimientos que no se anotan. Los que hay que registrar:"],
        lista: [
          "Ventas: cada unidad vendida baja el stock.",
          "Compras: cada reposición suma al stock.",
          "Mermas: lo que se rompe, se vence o se pierde.",
          "Devoluciones: lo que un cliente te devuelve y vuelve al estante.",
        ],
      },
      {
        h: "Definí un mínimo para cada producto",
        p: [
          "El stock mínimo es la cantidad a partir de la cual tenés que reponer. Depende de cuánto tarda tu proveedor en entregarte y de cuánto vendés por semana. Cuando el producto baja de ese número, es hora de hacer el pedido.",
        ],
      },
      {
        h: "Contá de vez en cuando",
        p: [
          "Aunque lo anotes todo, siempre hay diferencias. Un conteo periódico te muestra cuánto se pierde sin que te des cuenta y te permite corregir el número antes de que se desfase.",
        ],
      },
    ],
    sistema: {
      titulo: "Cómo lo hace el Sistema MBK",
      texto:
        "El stock se controla producto por producto y lo activa cada negocio cuando quiere. Cada venta descuenta el stock y cada compra a un proveedor lo suma. Podés hacer conteos, registrar mermas y devoluciones, definir un stock mínimo y recibir un aviso cuando un producto baja de ese mínimo o se agota. Nunca te frena una venta: si no hay unidades, la venta se guarda igual.",
    },
    faq: [
      {
        q: "¿Con qué frecuencia conviene hacer un conteo de inventario?",
        a: "Depende del tipo de negocio y del volumen. Una pauta razonable es contar los productos principales una vez por mes y el resto cada tanto. Lo importante es que el conteo sea una rutina y no un trabajo que se hace una vez al año.",
      },
      {
        q: "¿El stock influye en el resultado del mes?",
        a: "En el Sistema MBK no: el stock es un control de unidades y no modifica el resultado ni la rentabilidad.",
      },
    ],
    rubros: ["comercios", "indumentaria-y-lenceria", "veterinarias"],
    fecha: "2026-10-14",
  },
  {
    slug: "caja-y-ganancia-no-son-lo-mismo",
    tono: "pink",
    titulo: "Caja y ganancia: cuánta plata tenés y cuánto ganaste",
    descripcion:
      "Por qué tener plata en la caja no significa que el negocio gane. Diferencia entre caja, ventas y ganancia, con ejemplos, y cómo llevar la caja por medio de pago.",
    h1: ["Caja y ganancia", "no son lo mismo"],
    bajada: "Una cosa es la plata que tenés hoy y otra es lo que ganó el negocio. Cómo mirar cada una.",
    respuesta:
      "La caja es la plata que tenés disponible hoy, repartida entre efectivo, cuentas y billeteras. La ganancia es lo que le queda al negocio de lo vendido después de restar los costos y los gastos. Pueden ir en sentidos opuestos: un negocio puede tener la caja llena y perder plata, o ganar y no tener efectivo porque todavía no cobró.",
    secciones: [
      {
        h: "Qué mide la caja",
        p: [
          "La caja mide plata disponible. Sube cuando cobrás, aunque sea una venta del mes pasado, y cuando ponés plata propia. Baja cuando pagás gastos y cuando retirás. Responde a la pregunta: ¿con cuánta plata cuento hoy y en qué medio de pago está?",
        ],
      },
      {
        h: "Qué mide la ganancia",
        p: [
          "La ganancia mide el rendimiento del negocio: lo vendido en el período menos lo que costó producirlo y sostenerlo. Responde a otra pregunta: ¿el negocio rinde?",
        ],
      },
      {
        h: "Tres situaciones que confunden",
        p: ["Estas situaciones se repiten en casi todos los emprendimientos:"],
        lista: [
          "Pusiste plata propia para empezar el mes: la caja sube, pero no es una venta ni una ganancia.",
          "Vendiste mucho a pagar el mes que viene: la ganancia del mes es buena, pero la caja está vacía.",
          "Cobraste señas por trabajos que todavía no hiciste: la caja se ve bien, pero el trabajo (y sus costos) está por delante.",
        ],
      },
      {
        h: "Por qué conviene separar por medio de pago",
        p: [
          "La plata no está en un solo lugar. Parte está en efectivo, parte en la cuenta bancaria, parte en Mercado Pago o en una tarjeta que acredita después. Saber cuánto hay en cada lugar te evita sorpresas a la hora de pagar a un proveedor o de retirar.",
        ],
      },
      {
        h: "Hacé un arqueo de vez en cuando",
        p: [
          "El arqueo es contar lo que realmente hay y compararlo con lo que tus registros dicen que debería haber. Si no coincide, hay algo que no se anotó, y es mejor descubrirlo en el día que a fin de mes.",
        ],
      },
    ],
    sistema: {
      titulo: "Cómo lo hace el Sistema MBK",
      texto:
        "La Caja muestra cuánto hay en cada medio de pago (efectivo, transferencia, tarjeta, Mercado Pago, Cuenta DNI y otros), con el detalle de lo que movió cada uno. Cargás el saldo inicial una sola vez, pasás plata entre medios, registrás aportes y retiros y hacés el arqueo. La Caja es solo de consulta y nunca modifica el resultado del negocio, que se ve aparte en el Dashboard.",
    },
    faq: [
      {
        q: "¿Qué pasa con el dinero que pongo yo para arrancar el mes?",
        a: "Es un aporte, no una venta. En el Sistema MBK se registra como aporte del dueño: sube la caja pero no cuenta como ingreso del mes ni altera el resultado.",
      },
      {
        q: "¿Por qué mi caja no coincide con lo que cuento?",
        a: "Suele ser un gasto o un cobro sin anotar, o un traspaso entre medios de pago que no se registró. El arqueo sirve justamente para detectarlo y dejar la diferencia registrada como ajuste.",
      },
    ],
    rubros: ["gastronomia", "comercios", "peluquerias-y-barberias"],
    fecha: "2026-10-14",
  },
  {
    slug: "como-organizar-los-turnos-de-tu-negocio",
    tono: "green",
    titulo: "Cómo organizar los turnos de tu negocio sin que se te pisen",
    descripcion:
      "Cómo llevar la agenda de turnos de un negocio de servicios: qué datos anotar, cómo manejar señas y cobros pendientes y cómo evitar que se pisen los horarios.",
    h1: ["Cómo organizar los turnos", "de tu negocio"],
    bajada: "Una agenda que no se pisa, con la seña anotada y el cobro al día, sea cual sea tu servicio.",
    respuesta:
      "Para organizar los turnos de un negocio hace falta una sola agenda donde cada turno quede con su cliente, su servicio, su horario y su seña. Con eso se evitan los turnos pisados y se sabe de antemano qué falta cobrar. Lo que no se anota en ese lugar se olvida.",
    secciones: [
      {
        h: "Una sola agenda, no tres",
        p: [
          "Los turnos se pisan cuando viven en lugares distintos: un cuaderno, los mensajes de WhatsApp, la memoria. Elegí un solo lugar donde todo se anota, y que puedas abrir desde el celular en cualquier momento.",
        ],
      },
      {
        h: "Qué datos tiene que tener cada turno",
        p: ["Para que la agenda sirva el día de la atención, cada turno necesita:"],
        lista: [
          "El nombre de quien viene y una forma de contactarlo.",
          "El servicio y cuánto cuesta.",
          "El día y la hora.",
          "La seña que dejó y cuánto falta cobrar.",
        ],
      },
      {
        h: "La seña: por qué ayuda",
        p: [
          "La seña confirma el turno y cubre una parte del servicio si la persona no viene. No hay una regla única de cuánto pedir: depende del servicio y del costo de que se caiga el turno. Lo importante es anotarla en el momento, para que después no haya dudas sobre lo que ya se cobró.",
        ],
      },
      {
        h: "Cerrar el turno: cobrar y registrar",
        p: [
          "Cuando termina la atención, el turno se cierra con lo que falta cobrar. Si el cobro queda sin registrar, el dinero se pierde de vista. Cerrar el turno en el momento mantiene la agenda y las cuentas parejas.",
        ],
      },
      {
        h: "Revisá el día anterior",
        p: [
          "Un repaso de la agenda del día siguiente te permite avisar a quien tenga que confirmar y detectar si hay algo superpuesto antes de que sea tarde.",
        ],
      },
    ],
    sistema: {
      titulo: "Cómo lo hace el Sistema MBK",
      texto:
        "Cada turno se carga con su cliente, su servicio y su seña. El sistema calcula lo que falta cobrar, muestra qué turnos están pendientes de cobro y cuáles pagos, y te avisa antes de cada turno. Cuando lo recibido completa el precio, el turno pasa a Pagado.",
    },
    faq: [
      {
        q: "¿El sistema les avisa a mis clientes?",
        a: "El sistema te avisa a vos antes de cada turno. Escribirle al cliente para confirmar lo seguís haciendo por el canal que uses, por ejemplo WhatsApp.",
      },
      {
        q: "¿Sirve si no tengo horarios fijos y trabajo por encargo?",
        a: "Sí. Los pedidos por encargo se cargan igual que un turno, con su fecha de entrega y su seña. Es una forma de ver qué tenés para cada día y qué falta cobrar.",
      },
    ],
    rubros: ["estetica-y-belleza", "peluquerias-y-barberias", "servicios-y-oficios"],
    fecha: "2026-10-14",
  },
];

export const guiaPorSlug = (slug: string) => GUIAS.find((g) => g.slug === slug);

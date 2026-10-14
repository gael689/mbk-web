import { CalendarDays, Heart, Lightbulb, Package, ShoppingCart, Sparkles, Store, Tag, Users, type LucideIcon } from "./iconos";
import type { Tono } from "./modulos";

/* Una página por rubro (/rubros/<slug>): cada una con problemas, ejemplos y preguntas propias,
 * nunca el mismo texto con el nombre cambiado. Las reglas de toda la web valen acá:
 * sin precios ni "planes", sin números ni clientes inventados, y solo se afirma lo que el
 * sistema hace hoy (ver content/modulos.ts → INCLUYE_HOY y content/soluciones.ts).
 *
 * `modulo` de cada problema: la sección del sistema que lo resuelve (se muestra como chip).
 * `dia`: un día cualquiera del rubro, en pasos cortos. Es un ejemplo, no un caso real. */
export type RubroProblema = { modulo: string; problema: string; hace: string; gana: string };
export type RubroFaq = { q: string; a: string };

export type Rubro = {
  slug: string;
  nombre: string;
  /** Cómo se nombra a la gente del rubro en el texto: "tu pastelería", "tu local". */
  tuNegocio: string;
  tono: Tono;
  Icon: LucideIcon;
  /** Título de la pestaña (el sufijo " | MBK" lo agrega el layout). */
  titulo: string;
  descripcion: string;
  /** H1: antes + parte resaltada. */
  h1: [string, string];
  bajada: string;
  /** Definición que se entiende sola, abre la página y es lo que cita un buscador. */
  citable: string;
  problemas: RubroProblema[];
  diaTitulo: string;
  dia: string[];
  /** Secciones del sistema que más usa este rubro (texto de INCLUYE_HOY). */
  usa: string[];
  faq: RubroFaq[];
  /** Slugs de guías relacionadas (content/guias.ts). */
  guias: string[];
  /** Slugs de otros rubros parecidos. */
  parecidos: string[];
};

export const RUBROS: Rubro[] = [
  {
    slug: "indumentaria-y-lenceria",
    nombre: "Indumentaria y lencería",
    tuNegocio: "tu tienda de ropa",
    tono: "pink",
    Icon: Tag,
    titulo: "Sistema de gestión para tiendas de ropa y lencería",
    descripcion:
      "Ventas, cobros pendientes, stock con avisos y margen de cada prenda para tiendas de indumentaria y lencería. Desde el celular, creado por una economista de Bahía Blanca.",
    h1: ["Sistema para tu tienda de", "ropa o lencería"],
    bajada: "Qué se vendió, a quién, qué te falta cobrar y qué prenda te deja más margen, sin cuadernos ni planillas sueltas.",
    citable:
      "El Sistema MBK es un sistema de gestión online para tiendas de indumentaria y lencería: registra las ventas desde el celular, muestra lo que cada clienta todavía te debe, avisa cuando queda poco de un producto y calcula el margen de cada prenda. Lo creó Belén Klundt, economista de Bahía Blanca.",
    problemas: [
      {
        modulo: "Cobros y clientes",
        problema: "“Una clienta se lleva tres prendas, deja una parte y después no me acuerdo cuánto debe.”",
        hace: "Cargás la venta, anotás lo que pagó y lo que queda pendiente, y el sistema te muestra el Pendiente a cobrar con el nombre de cada clienta.",
        gana: "Cobrar lo que es tuyo sin llevar la cuenta de memoria.",
      },
      {
        modulo: "Stock",
        problema: "“Me entero de que no tengo más cuando la clienta ya lo está pidiendo.”",
        hace: "Cada venta descuenta el stock del producto y el sistema te avisa cuando queda poco o se agota. Hacés conteos y registrás devoluciones y mermas.",
        gana: "Reponer a tiempo lo que más sale.",
      },
      {
        modulo: "Productos",
        problema: "“Compro por mayor, pongo el precio a ojo y no sé cuánto me queda por prenda.”",
        hace: "Cargás lo que te cuesta cada producto y lo que lo vendés, y el sistema muestra el margen en el momento, antes de guardar.",
        gana: "Precios que cubren lo que pagaste y te dejan ganancia.",
      },
      {
        modulo: "Caja",
        problema: "“Entre efectivo, transferencias y Mercado Pago no sé cuánto tengo en cada lado.”",
        hace: "La caja separa lo que hay en efectivo, transferencia, tarjeta, Mercado Pago y Cuenta DNI.",
        gana: "Saber con qué plata contás hoy y dónde está.",
      },
    ],
    diaTitulo: "Un día en la tienda",
    dia: [
      "Por la mañana llega mercadería: la cargás como compra a proveedor y el stock sube solo.",
      "Una clienta se lleva un conjunto y paga la mitad. Registrás la venta con lo que falta cobrar.",
      "A la tarde otra paga por transferencia y la caja lo anota en ese medio de pago.",
      "A fin de mes abrís el Dashboard y ves ventas, cobrado, gastos y resultado neto.",
    ],
    usa: ["Ventas", "Cobros", "Productos", "Control de stock con avisos", "Caja por medio de pago", "Clientes"],
    faq: [
      {
        q: "¿Puedo llevar lo que me deben las clientas?",
        a: "Sí. Al cargar una venta anotás cuánto pagó la clienta en ese momento. Lo que queda aparece en Pendiente a cobrar, con la venta y el nombre de quien debe.",
      },
      {
        q: "¿El sistema me avisa cuando se acaba una prenda?",
        a: "Sí. Cuando un producto baja de su stock mínimo o se agota, el sistema te avisa una sola vez, y vuelve a avisar recién después de que lo repongas. El stock se controla producto por producto y lo activás cuando quieras.",
      },
      {
        q: "¿Sirve para vender por Instagram y WhatsApp?",
        a: "Sirve para registrar esas ventas: las cargás en el momento, con el medio de pago que usó la clienta. El sistema no vende por vos ni publica en redes: es el lugar donde queda ordenado lo que vendiste.",
      },
    ],
    guias: ["como-calcular-el-precio-de-un-producto", "control-de-stock-para-emprendedores"],
    parecidos: ["comercios", "emprendimientos-artesanales"],
  },
  {
    slug: "pastelerias",
    nombre: "Pastelerías",
    tuNegocio: "tu pastelería",
    tono: "orange",
    Icon: Sparkles,
    titulo: "Sistema de gestión para pastelerías y tortas por encargo",
    descripcion:
      "Pedidos por encargo con seña, costo de cada torta dividido en insumos, mano de obra y packaging, y cobros ordenados. Un sistema para pastelerías de Bahía Blanca y todo el país.",
    h1: ["Sistema para tu", "pastelería"],
    bajada: "Tus encargos con su seña, el costo real de cada torta y lo que te queda al final del mes.",
    citable:
      "El Sistema MBK sirve a pastelerías y pastelerías caseras para llevar los pedidos por encargo con su seña, calcular el costo de cada producto dividido en insumos, mano de obra y packaging, y ver cuánto se vendió, cuánto se cobró y cuánto quedó. Funciona desde el celular y lo creó una economista de Bahía Blanca.",
    problemas: [
      {
        modulo: "Servicios y turnos",
        problema: "“Anoto los encargos en el celular y en una libreta, y un día se me pasó uno.”",
        hace: "Cargás cada pedido con su cliente, su fecha y su seña. Ves cuáles faltan cobrar y cuáles están pagos, y el sistema te avisa antes de cada fecha.",
        gana: "Cumplir con cada encargo y saber cuánto falta cobrar de cada uno.",
      },
      {
        modulo: "Productos",
        problema: "“No sé cuánto me cuesta una torta de verdad: el tiempo, la caja, la cinta, todo.”",
        hace: "Dividís el costo de cada producto en cinco partes (insumos, mano de obra, packaging, inversión y otros) y el sistema lo suma y te muestra el margen.",
        gana: "Poner el precio sabiendo cuánto ganás con cada torta.",
      },
      {
        modulo: "Costos y gastos",
        problema: "“Compro harina, manteca y cajas todo el mes y no sé cuánto gasto.”",
        hace: "Registrás cada gasto con su fecha y su monto, y guardás los que se repiten (alquiler, gas, luz) como plantillas para no cargarlos de cero.",
        gana: "Ver cuánto sale mantener la pastelería y cuánto queda.",
      },
    ],
    diaTitulo: "Un día en la pastelería",
    dia: [
      "Te piden una torta para el sábado: la cargás como pedido, con la seña que dejaron.",
      "Revisás el listado de la semana y ves qué entregas tenés y cuáles faltan cobrar.",
      "Compraste insumos: los anotás como gasto en el momento, con el medio de pago.",
      "A fin de mes comparás ventas, gastos y resultado, y ajustás los precios que quedaron cortos.",
    ],
    usa: ["Servicios y turnos", "Cobros", "Productos", "Costo del producto en cinco partes", "Costos y gastos", "Metas mensuales"],
    faq: [
      {
        q: "¿Puedo anotar encargos con seña?",
        a: "Sí. Cada pedido se carga con su cliente, su fecha y la seña recibida. El sistema calcula lo que falta cobrar y, cuando lo recibido llega al total, el pedido pasa a Pagado.",
      },
      {
        q: "¿Cómo calculo cuánto me cuesta una torta?",
        a: "En la ficha del producto dividís el costo en insumos, mano de obra, packaging, inversión y otros. El sistema suma las partes y muestra el margen resultante mientras cargás, así ves si el precio que pusiste te deja ganancia.",
      },
      {
        q: "¿Sirve para una pastelería que recién empieza y trabaja desde casa?",
        a: "Sí. Se usa desde el celular, no hay nada que instalar y alcanza con cargar lo que vendés y lo que gastás. Es una forma de ordenarte desde el primer mes, antes de que los pedidos se acumulen.",
      },
    ],
    guias: ["como-calcular-el-precio-de-un-producto", "como-saber-si-tu-emprendimiento-gana-plata"],
    parecidos: ["gastronomia", "emprendimientos-artesanales"],
  },
  {
    slug: "gastronomia",
    nombre: "Gastronomía",
    tuNegocio: "tu local de comidas",
    tono: "orange",
    Icon: Store,
    titulo: "Sistema de gestión para gastronomía: cafés, rotiserías y viandas",
    descripcion:
      "Costo de cada plato, caja por medio de pago, gastos que se repiten y resultado del mes para cafeterías, rotiserías, viandas y locales de comida. Desde el celular.",
    h1: ["Sistema para tu local de", "gastronomía"],
    bajada: "Cuánto cuesta cada plato, cuánta plata hay en cada medio de pago y si el mes cerró con ganancia.",
    citable:
      "El Sistema MBK ayuda a cafeterías, rotiserías, viandas y locales de comida a saber cuánto cuesta cada plato, cuánta plata hay en efectivo, transferencia, tarjeta y Mercado Pago, cuánto se gastó en el mes y cuál fue el resultado. Se usa desde el celular y lo creó una economista de Bahía Blanca.",
    problemas: [
      {
        modulo: "Productos",
        problema: "“El precio del menú lo puse hace meses y los ingredientes no paran de subir.”",
        hace: "Cargás el costo de cada plato dividido en insumos, mano de obra, packaging y otros, y el sistema te muestra el margen. Cuando suben los insumos, actualizás el costo y ves cómo cambia.",
        gana: "Saber qué platos conviene empujar y cuáles revisar.",
      },
      {
        modulo: "Caja",
        problema: "“Cobro en efectivo, con tarjeta y con Mercado Pago, y a fin de día no cierra nada.”",
        hace: "La caja muestra cuánto hay en cada medio de pago. Hacés el arqueo contando lo que hay y el sistema registra la diferencia.",
        gana: "Cerrar el día sabiendo dónde está la plata.",
      },
      {
        modulo: "Costos y gastos",
        problema: "“Alquiler, luz, gas, proveedores: pago todo el mes y no sé cuánto me queda.”",
        hace: "Cargás cada gasto y guardás los fijos como plantillas. El Dashboard resta los gastos de lo vendido y te da el resultado neto del mes.",
        gana: "Ver si el local deja plata, no solo si hay movimiento.",
      },
      {
        modulo: "Stock",
        problema: "“Se me terminan las bebidas o los productos envasados y me doy cuenta tarde.”",
        hace: "Para los productos que vendés por unidad, el stock baja con cada venta y el sistema avisa cuando queda poco.",
        gana: "No quedarte sin lo que el cliente pide.",
      },
    ],
    diaTitulo: "Un día en el local",
    dia: [
      "Durante el servicio cargás las ventas desde el celular, con el medio de pago de cada una.",
      "Al cerrar, contás lo que hay en el cajón y lo comparás con lo que dice la caja en efectivo.",
      "Pagás al proveedor y lo anotás como gasto, con su fecha.",
      "El domingo mirás el Dashboard y decidís si este mes alcanza para lo que querías hacer.",
    ],
    usa: ["Ventas", "Caja por medio de pago", "Costos y gastos", "Costo del producto en cinco partes", "Control de stock con avisos", "Metas mensuales"],
    faq: [
      {
        q: "¿Puedo separar lo que cobro en efectivo, tarjeta y Mercado Pago?",
        a: "Sí. La caja muestra el dinero de cada medio de pago por separado (efectivo, transferencia, tarjeta, Mercado Pago, Cuenta DNI y otros), con el detalle de lo que movió cada uno y la posibilidad de hacer un arqueo.",
      },
      {
        q: "¿Sirve para controlar los insumos de la cocina?",
        a: "El stock se lleva por producto, no por receta: sirve para lo que vendés por unidad. Los insumos entran en el costo de cada plato, que cargás dividido en partes, y en los gastos del mes.",
      },
      {
        q: "¿Reemplaza al sistema de comandas o al punto de venta?",
        a: "No. El Sistema MBK es para la gestión del negocio: registrar ventas, gastos, costos y ver el resultado. No toma comandas ni se conecta a una impresora de tickets.",
      },
    ],
    guias: ["como-saber-si-tu-emprendimiento-gana-plata", "caja-y-ganancia-no-son-lo-mismo"],
    parecidos: ["pastelerias", "comercios"],
  },
  {
    slug: "estetica-y-belleza",
    nombre: "Estética y belleza",
    tuNegocio: "tu centro de estética",
    tono: "green",
    Icon: Heart,
    titulo: "Sistema de gestión para centros de estética y belleza",
    descripcion:
      "Turnos con seña, clientas con su historial de gasto, cobros pendientes y costo de cada tratamiento para centros de estética, uñas y belleza. Desde el celular.",
    h1: ["Sistema para tu centro de", "estética y belleza"],
    bajada: "Turnos que no se pisan, señas anotadas y el costo real de cada servicio, en un solo lugar.",
    citable:
      "El Sistema MBK sirve a centros de estética, estudios de uñas y negocios de belleza para agendar turnos con su seña, ver qué falta cobrar, llevar el listado de clientas con lo que gastó cada una y calcular el costo de cada servicio. Funciona desde el celular y lo creó una economista de Bahía Blanca.",
    problemas: [
      {
        modulo: "Servicios y turnos",
        problema: "“Se me pisan los turnos y me olvido de cuánto dejó de seña cada clienta.”",
        hace: "Cargás cada turno con su clienta, su servicio y su seña. Ves cuáles están pendientes de cobro y cuáles pagos, y el sistema te avisa antes de cada turno.",
        gana: "Atender a cada clienta a su hora, sabiendo qué falta cobrar.",
      },
      {
        modulo: "Productos",
        problema: "“Cobro la sesión pero no sé cuánto me cuestan los productos, el aparato y mi tiempo.”",
        hace: "Cargás el costo de cada servicio dividido en insumos, mano de obra, inversión y otros, y el sistema muestra el margen.",
        gana: "Servicios con un precio que te deja ganancia.",
      },
      {
        modulo: "Clientes",
        problema: "“No sé cuáles son mis mejores clientas.”",
        hace: "La libreta de clientes guarda los datos de contacto y suma lo que gastó cada una a lo largo del tiempo.",
        gana: "Reconocer a quienes más te eligen.",
      },
    ],
    diaTitulo: "Un día en el centro",
    dia: [
      "A primera hora abrís el listado de turnos y ves quién viene, con qué servicio y cuánto falta cobrar.",
      "Una clienta reserva para la semana que viene: la agendás con su seña.",
      "Vendés una crema además del servicio: la cargás como venta y el stock baja.",
      "A fin de mes ves cuánto facturó cada tipo de servicio y qué meta te falta.",
    ],
    usa: ["Servicios y turnos", "Cobros", "Clientes", "Productos", "Costo del producto en cinco partes", "Notificaciones"],
    faq: [
      {
        q: "¿Puedo registrar la seña de cada turno?",
        a: "Sí. Al agendar el turno anotás la seña recibida y el sistema calcula lo que falta. Cuando lo recibido completa el precio del servicio, el turno pasa a Pagado.",
      },
      {
        q: "¿El sistema les manda recordatorios a mis clientas?",
        a: "El sistema te avisa a vos antes de cada turno. Escribirle a la clienta sigue siendo cosa tuya, por WhatsApp o como acostumbres.",
      },
      {
        q: "¿Puedo vender productos además de dar servicios?",
        a: "Sí. Vas a ver el catálogo de productos con sus ventas y su stock, y la agenda de turnos para los servicios. El sistema muestra las secciones que corresponden a cómo trabajás.",
      },
    ],
    guias: ["como-organizar-los-turnos-de-tu-negocio", "como-calcular-el-precio-de-un-producto"],
    parecidos: ["peluquerias-y-barberias", "servicios-y-oficios"],
  },
  {
    slug: "peluquerias-y-barberias",
    nombre: "Peluquerías y barberías",
    tuNegocio: "tu peluquería",
    tono: "blue",
    Icon: CalendarDays,
    titulo: "Sistema de gestión para peluquerías y barberías",
    descripcion:
      "Agenda de turnos, cobro por medio de pago, venta de productos y resultado del mes para peluquerías y barberías. Desde el celular, sin instalar nada.",
    h1: ["Sistema para tu", "peluquería o barbería"],
    bajada: "La agenda del día, lo que cobraste en cada medio de pago y los productos que vendés, sin papelitos en el mostrador.",
    citable:
      "El Sistema MBK sirve a peluquerías y barberías para agendar turnos, registrar cuánto se cobró en efectivo, transferencia o Mercado Pago, vender productos con su stock y ver el resultado del mes. Se usa desde el celular y lo creó una economista de Bahía Blanca.",
    problemas: [
      {
        modulo: "Servicios y turnos",
        problema: "“La agenda está en un cuaderno y el que atiende no sabe qué turnos tengo yo.”",
        hace: "Los turnos quedan cargados con su cliente y su servicio, en un lugar al que entrás desde el celular.",
        gana: "Una sola agenda, siempre a mano.",
      },
      {
        modulo: "Caja",
        problema: "“A la noche no sé cuánto entró en efectivo y cuánto por transferencia.”",
        hace: "Cada cobro queda en su medio de pago y la caja los muestra separados. Podés pasar plata de un medio a otro y hacer el arqueo.",
        gana: "Cerrar el día sin hacer cuentas.",
      },
      {
        modulo: "Ventas",
        problema: "“Vendo shampoo, ceras y productos de barba, y no llevo cuántos me quedan.”",
        hace: "Los productos se venden desde el mismo sistema, con stock que baja solo y aviso cuando queda poco.",
        gana: "Vender productos sin perder el hilo del inventario.",
      },
      {
        modulo: "Metas",
        problema: "“Trabajo todo el mes y no sé si llegué a lo que necesitaba.”",
        hace: "Te ponés una meta mensual y el Dashboard muestra cuánto llevás frente a esa meta y frente al mes anterior.",
        gana: "Saber a mitad de mes si vas bien encaminado.",
      },
    ],
    diaTitulo: "Un día en la peluquería",
    dia: [
      "Abrís el sistema desde el celular y ves los turnos del día con cliente y servicio.",
      "Un cliente paga el corte por transferencia y compra una cera: se anota cada cosa en su lugar.",
      "Cuando se termina el mes, comparás con el anterior y ves si llegaste a la meta.",
    ],
    usa: ["Servicios y turnos", "Caja por medio de pago", "Ventas", "Control de stock con avisos", "Metas mensuales", "Clientes"],
    faq: [
      {
        q: "¿Lo pueden usar varias personas del equipo?",
        a: "Cada negocio tiene su cuenta. Si necesitás que más de una persona cargue datos, contanos cómo trabajan en el formulario o por WhatsApp y te decimos cómo se arma.",
      },
      {
        q: "¿Puedo cobrar en distintos medios de pago?",
        a: "Sí. Cada cobro se registra con su medio de pago (efectivo, transferencia, tarjeta, Mercado Pago, Cuenta DNI u otros) y la caja los muestra por separado.",
      },
      {
        q: "¿Me sirve si mi agenda ya está en una app de turnos?",
        a: "Sí, si lo que querés es ordenar lo que viene después: cobros, gastos, productos y resultado. El sistema no reemplaza a una app de reservas online para tus clientes: es para que vos lleves el negocio.",
      },
    ],
    guias: ["como-organizar-los-turnos-de-tu-negocio", "caja-y-ganancia-no-son-lo-mismo"],
    parecidos: ["estetica-y-belleza", "servicios-y-oficios"],
  },
  {
    slug: "comercios",
    nombre: "Comercios",
    tuNegocio: "tu comercio",
    tono: "blue",
    Icon: ShoppingCart,
    titulo: "Sistema de gestión para comercios: ventas, stock y caja",
    descripcion:
      "Ventas desde el celular, stock con avisos, compras a proveedores y caja por medio de pago para kioscos, regalerías, librerías y comercios de barrio.",
    h1: ["Sistema para tu", "comercio"],
    bajada: "Lo que vendés, lo que te queda en el estante y la plata que hay en cada caja, sin inventario a mano.",
    citable:
      "El Sistema MBK sirve a comercios de barrio, kioscos, regalerías y librerías para registrar ventas, controlar el stock con avisos de reposición, cargar compras a proveedores y ver cuánta plata hay en cada medio de pago. Se usa desde el celular y lo creó una economista de Bahía Blanca.",
    problemas: [
      {
        modulo: "Stock",
        problema: "“El inventario lo hago a ojo y cuando me falta algo ya perdí la venta.”",
        hace: "Cargás el stock de cada producto, cada venta lo descuenta y el sistema te avisa cuando queda poco. Hacés conteos y registrás mermas y devoluciones.",
        gana: "Reponer antes de quedarte sin nada.",
      },
      {
        modulo: "Stock",
        problema: "“Llega mercadería y nunca sé qué compré, a quién y cuánto pagué.”",
        hace: "Cargás cada compra a un proveedor, con su fecha, y opcionalmente con el número de remito o factura y el costo. Todo queda en un historial.",
        gana: "Saber qué entró, qué salió y cuánto costó.",
      },
      {
        modulo: "Ventas",
        problema: "“Vendo mucho de a poco y a fin de mes no sé si ganó el negocio.”",
        hace: "Registrás cada venta y cada gasto, y el Dashboard te muestra vendido, cobrado, gastos y resultado neto.",
        gana: "Un número claro al cierre del mes.",
      },
      {
        modulo: "Caja",
        problema: "“La caja nunca da lo que cuento.”",
        hace: "El arqueo compara lo que contaste con lo que el sistema calculó, y la diferencia queda registrada como ajuste.",
        gana: "Encontrar diferencias en el momento y no a fin de mes.",
      },
    ],
    diaTitulo: "Un día en el comercio",
    dia: [
      "Llega el proveedor: cargás la compra y el stock de esos productos sube.",
      "Durante el día vendés y el stock baja solo; el sistema te avisa qué quedó corto.",
      "Al cerrar, contás la caja y la comparás con lo calculado.",
      "El lunes mirás el listado de productos para reponer y hacés el pedido.",
    ],
    usa: ["Ventas", "Control de stock con avisos", "Productos", "Caja por medio de pago", "Costos y gastos", "Descarga a Excel"],
    faq: [
      {
        q: "¿Puedo cargar el stock de muchos productos a la vez?",
        a: "Sí. La carga inicial permite ingresar las cantidades de muchos productos juntos. Se recomienda empezar con pocos productos y sumar de a poco, para acostumbrarse.",
      },
      {
        q: "¿Qué pasa si vendo algo que figura sin stock?",
        a: "La venta se guarda igual: el sistema nunca te frena una venta. El stock queda en negativo hasta que cargues mercadería, y ahí se suma sobre ese número.",
      },
      {
        q: "¿Puedo sacar mis datos a Excel?",
        a: "Sí. Los listados de ventas, productos, stock y caja se descargan a Excel, así que lo que cargás es tuyo y lo podés llevar a donde quieras.",
      },
    ],
    guias: ["control-de-stock-para-emprendedores", "caja-y-ganancia-no-son-lo-mismo"],
    parecidos: ["indumentaria-y-lenceria", "veterinarias"],
  },
  {
    slug: "servicios-y-oficios",
    nombre: "Servicios y oficios",
    tuNegocio: "tu trabajo",
    tono: "green",
    Icon: Users,
    titulo: "Sistema de gestión para servicios y oficios independientes",
    descripcion:
      "Agenda de trabajos con seña, clientes, cobros pendientes y gastos para técnicos, fotógrafos, instaladores y profesionales que trabajan por su cuenta.",
    h1: ["Sistema para", "servicios y oficios"],
    bajada: "Tus trabajos agendados, lo que te deben y lo que gastás, en un solo lugar y desde el celular.",
    citable:
      "El Sistema MBK sirve a profesionales y oficios que trabajan por su cuenta (técnicos, instaladores, fotógrafos, diseñadores y más) para agendar trabajos con su seña, ver qué falta cobrar, llevar los datos de cada cliente y registrar los gastos del mes. Funciona desde el celular y lo creó una economista de Bahía Blanca.",
    problemas: [
      {
        modulo: "Servicios y turnos",
        problema: "“Entre llamados y mensajes pierdo el hilo de qué trabajo tengo cuándo.”",
        hace: "Cargás cada trabajo como un turno con su cliente, su servicio y su seña, y ves los pendientes y los pagos.",
        gana: "Una agenda ordenada, sin depender de la memoria.",
      },
      {
        modulo: "Cobros y clientes",
        problema: "“Hago el trabajo y después me cuesta cobrar y acordarme quién me debe.”",
        hace: "Lo que falta cobrar de cada trabajo queda a la vista, junto al cliente. El sistema calcula la diferencia entre lo recibido y el precio.",
        gana: "Cobrar a tiempo.",
      },
      {
        modulo: "Costos y gastos",
        problema: "“Entre combustible, herramientas y materiales no sé cuánto me queda.”",
        hace: "Registrás cada gasto y el Dashboard lo resta de lo que cobraste para mostrarte el resultado neto.",
        gana: "Saber cuánto te queda en el bolsillo.",
      },
    ],
    diaTitulo: "Una semana de trabajo",
    dia: [
      "El lunes cargás los trabajos que cerraste, cada uno con su seña.",
      "Cuando terminás un trabajo, registrás lo que te pagaron y ves lo que falta.",
      "Anotás la nafta y los materiales como gastos, con el medio de pago.",
      "El viernes mirás cuánto cobraste, cuánto gastaste y qué te queda.",
    ],
    usa: ["Servicios y turnos", "Cobros", "Clientes", "Costos y gastos", "Metas mensuales", "Descarga a Excel"],
    faq: [
      {
        q: "¿Sirve si trabajo solo y mis clientes son pocos?",
        a: "Sí. Es útil justamente cuando todo depende de vos: te ordena trabajos, cobros y gastos, así no tenés que acordarte de todo.",
      },
      {
        q: "¿Puedo cargar un servicio que no tiene un precio fijo?",
        a: "Podés cargar el servicio con un precio de referencia y registrar lo que realmente se cobra en cada trabajo. Si tenés dudas sobre cómo armarlo en tu caso, escribinos.",
      },
      {
        q: "¿Genera presupuestos o facturas?",
        a: "No. El sistema es para llevar la gestión del negocio (trabajos, cobros, gastos y resultado). No emite facturas ni presupuestos con membrete.",
      },
    ],
    guias: ["como-organizar-los-turnos-de-tu-negocio", "como-saber-si-tu-emprendimiento-gana-plata"],
    parecidos: ["estetica-y-belleza", "peluquerias-y-barberias"],
  },
  {
    slug: "veterinarias",
    nombre: "Veterinarias",
    tuNegocio: "tu veterinaria",
    tono: "green",
    Icon: Package,
    titulo: "Sistema de gestión para veterinarias y petshops",
    descripcion:
      "Stock de alimento y accesorios con avisos, turnos de consulta y peluquería, cobros por medio de pago y resultado del mes para veterinarias y petshops.",
    h1: ["Sistema para tu", "veterinaria o petshop"],
    bajada: "El stock de alimento y accesorios, los turnos de cada servicio y la caja, en el mismo lugar.",
    citable:
      "El Sistema MBK sirve a veterinarias y petshops para llevar el stock de alimento y accesorios con avisos de reposición, agendar turnos de servicios, registrar los cobros por medio de pago y ver el resultado del mes. No es un sistema de historias clínicas. Lo creó una economista de Bahía Blanca.",
    problemas: [
      {
        modulo: "Stock",
        problema: "“Se acaba el alimento de una marca y me entero cuando alguien lo busca.”",
        hace: "El stock de cada producto baja con cada venta, y el sistema te avisa cuando queda poco. Con el conteo de inventario corregís las diferencias.",
        gana: "No quedarte sin el producto que más se repite.",
      },
      {
        modulo: "Servicios y turnos",
        problema: "“Entre consultas, vacunas y peluquería canina, los horarios se cruzan.”",
        hace: "Agendás cada servicio como un turno con su cliente y su seña, y ves cuáles están pagos y cuáles pendientes.",
        gana: "Una agenda para todos los servicios.",
      },
      {
        modulo: "Ventas",
        problema: "“Vendo por mostrador y por pedido, y no tengo claro qué es lo que más me deja.”",
        hace: "Cargás ventas y costos de cada producto y el sistema muestra el margen. Podés bajar los listados a Excel.",
        gana: "Saber qué productos y servicios sostienen el negocio.",
      },
    ],
    diaTitulo: "Un día en la veterinaria",
    dia: [
      "Llega la distribuidora: cargás la compra y el alimento suma a su stock.",
      "Durante el día vendés por mostrador y el stock baja solo.",
      "Agendás una sesión de peluquería con su seña para el jueves.",
      "A fin de mes revisás qué productos quedaron en el aviso de reposición.",
    ],
    usa: ["Ventas", "Control de stock con avisos", "Servicios y turnos", "Caja por medio de pago", "Productos", "Descarga a Excel"],
    faq: [
      {
        q: "¿Lleva la historia clínica de las mascotas?",
        a: "No. El Sistema MBK es para la gestión del negocio (ventas, stock, turnos, cobros, gastos). No guarda fichas clínicas ni vacunaciones: eso lo seguís llevando como lo hacés hoy.",
      },
      {
        q: "¿Sirve para controlar el stock de alimento fraccionado?",
        a: "El stock se controla por producto. Si fraccionás, tendrías que decidir cómo cargarlo; escribinos con tu caso y te decimos cómo se ordena.",
      },
      {
        q: "¿Puedo tener productos y servicios en el mismo sistema?",
        a: "Sí. Los productos tienen su catálogo, sus ventas y su stock, y los servicios se agendan como turnos. El sistema muestra las secciones que corresponden a cómo trabajás.",
      },
    ],
    guias: ["control-de-stock-para-emprendedores", "como-organizar-los-turnos-de-tu-negocio"],
    parecidos: ["comercios", "peluquerias-y-barberias"],
  },
  {
    slug: "emprendimientos-artesanales",
    nombre: "Emprendimientos artesanales",
    tuNegocio: "tu emprendimiento",
    tono: "violet",
    Icon: Lightbulb,
    titulo: "Sistema de gestión para emprendimientos artesanales y de diseño",
    descripcion:
      "Costo de cada producto dividido en insumos, mano de obra y packaging, stock y ventas para velas, jabones, cerámica, deco y emprendimientos hechos a mano.",
    h1: ["Sistema para", "emprendimientos artesanales"],
    bajada: "Cuánto te cuesta hacer cada pieza, cuánto vendiste y cuánto te queda, aunque trabajes sola desde casa.",
    citable:
      "El Sistema MBK sirve a emprendimientos artesanales y de diseño (velas, jabones, cerámica, deco, accesorios y más) para calcular el costo de cada producto dividido en insumos, mano de obra, packaging, inversión y otros, controlar el stock y ver cuánto se vendió, cobró y ganó en el mes. Lo creó una economista de Bahía Blanca.",
    problemas: [
      {
        modulo: "Productos",
        problema: "“Pongo el precio mirando lo que cobra otra persona y no cuento mis horas.”",
        hace: "Dividís el costo de cada producto en insumos, mano de obra, packaging, inversión y otros. El sistema suma las partes y muestra el margen mientras cargás.",
        gana: "Un precio que te paga el trabajo, no solo los materiales.",
      },
      {
        modulo: "Stock",
        problema: "“Hago por tandas y no sé cuánto me queda de cada cosa.”",
        hace: "Cargás lo que produjiste como stock y cada venta lo descuenta. El sistema te avisa cuando queda poco para que armes la próxima tanda.",
        gana: "Producir lo que se vende, a tiempo.",
      },
      {
        modulo: "Ventas",
        problema: "“Vendo en ferias, por Instagram y por encargo, y todo queda en lugares distintos.”",
        hace: "Registrás cada venta con su medio de pago, vendas donde vendas, y todo se junta en el Dashboard.",
        gana: "Una vista completa de tu negocio.",
      },
    ],
    diaTitulo: "Una semana de emprendimiento",
    dia: [
      "Después de producir una tanda, cargás las unidades nuevas al stock.",
      "El sábado vendés en una feria: cargás cada venta con su medio de pago.",
      "Llegan encargos por Instagram: los anotás como turnos con su seña.",
      "A fin de mes sumás gastos y ves si el trabajo del mes dejó resultado.",
    ],
    usa: ["Productos", "Costo del producto en cinco partes", "Control de stock con avisos", "Ventas", "Costos y gastos", "Metas mensuales"],
    faq: [
      {
        q: "¿Cómo cargo el costo de algo que hago yo misma?",
        a: "En la ficha del producto dividís el costo en insumos, mano de obra, packaging, inversión y otros. Al sumar tu trabajo en mano de obra, el margen que ves ya incluye tu tiempo.",
      },
      {
        q: "¿Sirve si vendo poco todavía?",
        a: "Sí. Mientras antes empieces a registrar ventas y gastos, antes vas a saber si el emprendimiento deja ganancia. Con pocas ventas el trabajo de carga es mínimo.",
      },
      {
        q: "¿Tengo que pagar por usarlo mientras pruebo?",
        a: "Se puede pedir una demo para ver cómo funciona antes de decidir. Escribinos por WhatsApp o dejá tus datos en el formulario y te contamos cómo se arma según tu caso.",
      },
    ],
    guias: ["como-calcular-el-precio-de-un-producto", "como-saber-si-tu-emprendimiento-gana-plata"],
    parecidos: ["pastelerias", "indumentaria-y-lenceria"],
  },
];

export const rubroPorSlug = (slug: string) => RUBROS.find((r) => r.slug === slug);

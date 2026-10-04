// Mock 100% ficticio de Supabase para el Sistema MBK. Negocio de ejemplo: "Estilo Sur" (indumentaria).
// Se usa desde capturar.mjs; no toca ninguna base real. Datos deterministas (RNG con semilla).
export const USER_ID = "7d1c2a90-4b1e-4f5a-9a31-2f6a0c11aa01";
export const BIZ_ID = "b3f0c7de-6a54-4c1b-8e0d-5a9b1e22cc02";
export const NOW_ISO = "2026-09-18T15:00:00.000Z"; // 12:00 hora Argentina

// ── RNG con semilla ─────────────────────────────────────────────
let seed = 20260918;
const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
let idc = 0;
const uid = (p = "0") => `${p}${String(++idc).padStart(7, "0")}-0000-4000-8000-${String(idc).padStart(12, "0")}`.slice(0, 36);
const iso = (d, h = 12) => `${d}T${String(h + 3).padStart(2, "0")}:00:00.000Z`; // hora AR -> UTC
const ts = (d, h = 12) => iso(d, h);

export const profile = {
  id: USER_ID, full_name: "Lucía Montenegro", role: "entrepreneur", phone: null, avatar_url: null,
  is_active: true, advisor_relationship: "managed", must_change_password: false,
  terms_accepted_at: "2026-03-02T15:00:00.000Z", last_seen_version: "1.6.0", archived_at: null, is_internal: false,
  created_at: "2026-03-01T15:00:00.000Z", updated_at: "2026-09-01T15:00:00.000Z",
};

export const makeBusiness = ({ stock = false } = {}) => ({
  id: BIZ_ID, owner_id: USER_ID, name: "Estilo Sur", type: "both", category: "Indumentaria", currency: "ARS",
  is_active: true, goals_prompt_opt_out: false, payment_fees: { card: 3.5, mercadopago: 4.2, cuenta_dni: 0.6 },
  stock_enabled: stock, created_at: "2026-03-01T15:00:00.000Z", updated_at: "2026-09-01T15:00:00.000Z",
});

// ── Productos ───────────────────────────────────────────────────
const P = (name, cat, price, cost, extra = {}) => ({
  id: uid("p"), business_id: BIZ_ID, name, description: null, is_service: false, service_type: null,
  sale_price: price, cost_price: cost, unit: "u", sku: null, current_stock: 0, min_stock: 0, track_stock: false,
  stock_alert_state: "ok", needs_setup: false, cost_supplies: null, cost_labor: null, cost_packaging: null,
  cost_investment: null, cost_other: null, category: cat, is_active: true,
  created_at: "2026-03-10T15:00:00.000Z", updated_at: "2026-09-02T15:00:00.000Z", ...extra,
});
export const makeProducts = ({ stock = false } = {}) => {
  const st = (n, min) => (stock ? { track_stock: true, current_stock: n, min_stock: min } : {});
  idc = 100;
  return [
    P("Remera básica algodón", "Remeras y tops", 18500, 8200, st(34, 10)),
    P("Remera oversize estampada", "Remeras y tops", 24900, 10800, st(22, 8)),
    P("Top deportivo", "Remeras y tops", 16900, 7300, st(6, 8)),
    P("Camisa de lino", "Remeras y tops", 44800, 20500, st(15, 5)),
    P("Jean mom tiro alto", "Pantalones", 52900, 24000, st(18, 6)),
    P("Pantalón sastrero", "Pantalones", 56500, 26000, st(9, 4)),
    P("Short de lino", "Pantalones", 29900, 13200, st(0, 4)),
    P("Buzo canguro friza", "Abrigos", 48500, 22000, st(14, 5)),
    P("Campera de abrigo", "Abrigos", 98000, 47000, st(7, 3)),
    P("Vestido midi estampado", "Vestidos y polleras", 61900, 28500, st(11, 4)),
    P("Pollera plisada", "Vestidos y polleras", 39900, 17800, st(10, 4)),
    P("Cinturón de cuero", "Accesorios", 22500, 9000, st(25, 8)),
    P("Bufanda tejida", "Accesorios", 17900, 7400, st(19, 6)),
    P("Medias pack x3", "Accesorios", 9800, 4000, st(48, 12)),
    P("Cartera bandolera", "Accesorios", 68000, 31500, st(8, 3)),
    // Servicios
    P("Arreglo y ajuste de prendas", "Taller", 12000, 2500, { is_service: true, service_type: "appointment", unit: "turno" }),
    P("Asesoría de imagen (1 h)", "Asesoría", 35000, 5000, { is_service: true, service_type: "appointment", unit: "turno" }),
    P("Club Vestidor, plan mensual", "Suscripciones", 28000, 9000, { is_service: true, service_type: "monthly", unit: "mes" }),
  ];
};

// ── Clientes ────────────────────────────────────────────────────
const CUST = [
  ["Valentina Roldán", "291 5550101"], ["Camila Ibarra", "291 5550102"], ["Julieta Benítez", "291 5550103"],
  ["Martina Sosa", "291 5550104"], ["Lucas Peralta", "291 5550105"], ["Agustina Ferreyra", "291 5550106"],
  ["Florencia Acosta", "291 5550107"], ["Nicolás Domínguez", "291 5550108"], ["Sofía Quiroga", "291 5550109"],
  ["Carolina Medina", "291 5550110"], ["Mariana Ledesma", "291 5550111"], ["Tomás Villalba", "291 5550112"],
  ["Romina Cabrera", "291 5550113"], ["Paula Argañaraz", "291 5550114"], ["Ignacio Funes", "291 5550115"],
];
const slug = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ñ/g, "n").replace(/\s+/g, ".");
const NOTES = { 0: "Talle M. Le gustan los colores neutros.", 3: "Prefiere que le avisemos por WhatsApp.", 6: "Clienta frecuente: siempre pide cambios de talle." };

// ── Generación de ventas ────────────────────────────────────────
export function buildData({ stock = false } = {}) {
  seed = 20260918; idc = 1000;
  const products = makeProducts({ stock });
  const goods = products.filter((p) => !p.is_service);
  const services = products.filter((p) => p.is_service);
  const popular = [...goods].sort((a, b) => b.sale_price - a.sale_price); // la barra del Top 5 del front es relativa al total del #1 por unidades
  const monthly = services.find((p) => p.service_type === "monthly");
  const customers = CUST.map(([full_name, phone], i) => ({
    id: uid("c"), business_id: BIZ_ID, full_name, phone, email: i % 3 === 0 ? `${slug(full_name)}@example.com` : null,
    notes: NOTES[i] || null, total_spent: 0, purchase_count: 0, last_purchase_at: null, is_active: true,
    created_at: `2026-0${3 + (i % 5)}-${String(5 + i).padStart(2, "0")}T15:00:00.000Z`,
  }));
  const sales = [], sale_items = [], sale_payments = [];
  let num = 0;
  const feeOf = { card: 3.5, mercadopago: 4.2, cuenta_dni: 0.6, cash: 0, transfer: 0 };

  const addSale = (day, { pending = false, partial = 0, paidOn = null, forceItems = null, method = null, cust = null } = {}) => {
    const items = forceItems || (() => {
      const n = rnd() < 0.6 ? 1 : rnd() < 0.7 ? 2 : 3;
      const used = new Set(); const out = [];
      while (out.length < n) {
        const prod = popular[Math.floor(Math.pow(rnd(), 1.15) * popular.length)];
        if (used.has(prod.id)) continue; used.add(prod.id);
        out.push({ prod, qty: prod.sale_price < 20000 && rnd() < 0.4 ? 2 : 1, disc: 0, sur: 0 });
      }
      return out;
    })();
    const pm = method || pick(["cash", "cash", "transfer", "transfer", "card", "card", "mercadopago", "cuenta_dni"]);
    // descuento por pago en efectivo en algunas ventas / recargo con tarjeta en cuotas
    if (!forceItems && items.length === 1) {
      if (pm === "cash" && rnd() < 0.35) items[0].disc = 10;
      else if (pm === "card" && rnd() < 0.3) items[0].sur = 8;
    }
    const sid = uid("s");
    let total = 0, cost = 0;
    items.forEach((it) => {
      const sub = Math.round(it.qty * it.prod.sale_price * (1 - it.disc / 100) * (1 + it.sur / 100));
      total += sub; cost += it.qty * it.prod.cost_price;
      sale_items.push({ id: uid("i"), sale_id: sid, product_id: it.prod.id, product_name: it.prod.name, unit_price: it.prod.sale_price,
        unit_cost: it.prod.cost_price, quantity: it.qty, subtotal: sub, discount_pct: it.disc, surcharge_pct: it.sur });
    });
    const customer = cust ?? (num < 15 && !forceItems ? customers[num % 15] : rnd() < 0.8 ? pick(customers) : null);
    const received = pending ? partial : total;
    num += 1;
    sales.push({
      id: sid, business_id: BIZ_ID, customer_id: customer?.id || null, sale_date: ts(day), recognition_date: null,
      effective_date: day, total_amount: total, total_cost: cost, amount_received: received, sale_number: num,
      payment_method: pm, payment_status: pending ? "pending" : "paid", fee_pct: feeOf[pm] || 0, notes: null,
      created_at: ts(day), updated_at: ts(day),
    });
    if (received > 0) sale_payments.push({ id: uid("y"), sale_id: sid, business_id: BIZ_ID, amount: received, paid_on: paidOn || day, payment_method: pm, created_at: ts(paidOn || day), created_by: USER_ID });
    if (customer) {
      customer.total_spent += total; customer.purchase_count += 1;
      if (!customer.last_purchase_at || customer.last_purchase_at < ts(day)) customer.last_purchase_at = ts(day);
    }
    return sid;
  };

  // Julio-Agosto (mes anterior): menos movimiento
  const augDays = [1, 2, 4, 5, 6, 8, 9, 11, 12, 13, 15, 16, 18, 19, 20, 22, 23, 25, 26, 27, 29, 30];
  const augPendIdx = [7, 15];            // se cobran en septiembre
  augDays.forEach((d, i) => {
    const day = `2026-08-${String(d).padStart(2, "0")}`;
    const reps = i % 5 === 0 ? 2 : 1;
    for (let r = 0; r < reps; r++) {
      if (augPendIdx.includes(i) && r === 0) addSale(day, { pending: true, partial: 0 });
      else addSale(day);
    }
  });
  // cobros de agosto pendientes que entran en septiembre
  const augPend = sales.filter((s) => s.payment_status === "pending" && s.effective_date.startsWith("2026-08"));
  augPend.forEach((s, i) => {
    s.payment_status = "paid"; s.amount_received = s.total_amount;
    const d = i === 0 ? "2026-09-04" : "2026-09-09";
    sale_payments.push({ id: uid("y"), sale_id: s.id, business_id: BIZ_ID, amount: s.total_amount, paid_on: d, payment_method: s.payment_method, created_at: ts(d), created_by: USER_ID });
  });
  // una de agosto que sigue sin cobrar
  addSale("2026-08-28", { pending: true, partial: 0, method: "transfer" });

  // Septiembre
  const sepDays = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 15, 15, 15, 16, 16, 17, 17, 18, 18, 18];
  sepDays.forEach((d, i) => {
    const day = `2026-09-${String(d).padStart(2, "0")}`;
    if (i === 6) addSale(day, { pending: true, partial: 0, method: "transfer" });
    else if (i === 15) addSale(day, { pending: true, partial: 20000, method: "cash" });
    else if (i === 27) addSale(day, { pending: true, partial: 0, method: "mercadopago" });
    else addSale(day);
  });
  // Suscripciones del Club Vestidor (servicio mensual)
  [2, 3, 5].forEach((ci, k) => addSale(`2026-09-0${1 + k}`, { forceItems: [{ prod: monthly, qty: 1, disc: 0, sur: 0 }], method: "transfer", cust: customers[ci] }));
  [4, 6].forEach((ci, k) => addSale(`2026-08-0${1 + k}`, { forceItems: [{ prod: monthly, qty: 1, disc: 0, sur: 0 }], method: "transfer", cust: customers[ci] }));
  // Un par de ventas grandes
  addSale("2026-09-12", { forceItems: [{ prod: goods[8], qty: 1, disc: 0, sur: 0 }, { prod: goods[4], qty: 1, disc: 0, sur: 0 }], method: "card", cust: customers[0] });
  addSale("2026-09-17", { forceItems: [{ prod: goods[9], qty: 1, disc: 0, sur: 0 }, { prod: goods[10], qty: 1, disc: 0, sur: 0 }, { prod: goods[11], qty: 1, disc: 0, sur: 0 }], method: "transfer", cust: customers[8] });

  // renumerar por fecha de venta
  sales.sort((a, b) => a.effective_date.localeCompare(b.effective_date) || a.created_at.localeCompare(b.created_at));
  sales.forEach((s, i) => { s.sale_number = i + 1; });

  // ── Turnos ──
  const arreglo = services.find((p) => p.name.startsWith("Arreglo")), asesoria = services.find((p) => p.name.startsWith("Asesoría"));
  const appts = [], appt_items = [];
  const addAppt = (day, hhmm, prod, ci, status, deposit, pm, price = null) => {
    const id = uid("a"); const [h, m] = hhmm.split(":").map(Number);
    const p = price ?? prod.sale_price;
    const start = `${day}T${String(h + 3).padStart(2, "0")}:${String(m).padStart(2, "0")}:00.000Z`;
    const end = `${day}T${String(h + 4).padStart(2, "0")}:${String(m).padStart(2, "0")}:00.000Z`;
    appts.push({ id, business_id: BIZ_ID, customer_id: customers[ci].id, product_id: prod.id, sale_id: null, start_time: start, end_time: end,
      status, price: p, deposit_amount: status === "paid" ? p : deposit, payment_method: pm, fee_pct: 0, customer_name: null, customer_phone: null,
      notes: null, created_at: ts("2026-09-01"), updated_at: ts("2026-09-01") });
    appt_items.push({ id: uid("n"), appointment_id: id, product_id: prod.id, product_name: prod.name, unit_price: prod.sale_price, unit_cost: prod.cost_price,
      quantity: 1, subtotal: p, discount_pct: 0, surcharge_pct: 0, created_at: ts("2026-09-01") });
  };
  // agosto
  addAppt("2026-08-14", "10:00", asesoria, 1, "paid", 0, "transfer");
  addAppt("2026-08-21", "16:00", arreglo, 7, "paid", 0, "cash");
  addAppt("2026-08-27", "11:00", arreglo, 9, "paid", 0, "cash");
  // septiembre pasados
  addAppt("2026-09-03", "10:00", asesoria, 0, "paid", 0, "transfer");
  addAppt("2026-09-05", "15:00", arreglo, 10, "paid", 0, "cash");
  addAppt("2026-09-09", "11:00", asesoria, 3, "paid", 0, "mercadopago");
  addAppt("2026-09-11", "16:30", arreglo, 12, "paid", 0, "cash");
  addAppt("2026-09-16", "10:30", asesoria, 5, "paid", 0, "transfer");
  // próximos
  addAppt("2026-09-19", "10:00", asesoria, 6, "pending", 10000, "transfer");
  addAppt("2026-09-19", "12:00", arreglo, 13, "pending", 0, "cash");
  addAppt("2026-09-22", "15:00", asesoria, 2, "pending", 10000, "mercadopago");
  addAppt("2026-09-24", "11:00", arreglo, 11, "pending", 0, "cash");
  addAppt("2026-09-26", "17:00", asesoria, 14, "pending", 15000, "transfer");
  appts.sort((a, b) => b.start_time.localeCompare(a.start_time));

  // ── Costos ──
  const C = (name, type, amount, day, o = {}) => ({ id: uid("k"), business_id: BIZ_ID, name, cost_type: type, amount, category: o.category ?? null,
    frequency: o.frequency ?? (type === "fixed" ? "monthly" : "one-time"), cost_date: day, valid_until: null, notes: null, template_id: null,
    payment_method: o.pm ?? "transfer", is_active: true, created_at: ts(day), updated_at: ts(day) });
  const costs = [
    C("Alquiler del local", "fixed", 320000, "2026-09-01", { category: "Local" }),
    C("Sueldo empleada de mostrador", "fixed", 450000, "2026-09-05", { category: "Personal" }),
    C("Compra de mercadería — Textil Norte", "purchase", 380000, "2026-09-03", { category: "Mercadería" }),
    C("Compra de mercadería — Jeans del Sur", "purchase", 210000, "2026-09-10", { category: "Mercadería" }),
    C("Electricidad", "fixed", 41300, "2026-09-08", { category: "Servicios", pm: "cuenta_dni" }),
    C("Internet y telefonía", "fixed", 22600, "2026-09-08", { category: "Servicios", pm: "cuenta_dni" }),
    C("Publicidad en Instagram", "variable", 60000, "2026-09-02", { category: "Marketing", pm: "mercadopago" }),
    C("Honorarios del contador", "fixed", 55000, "2026-09-06", { category: "Administración" }),
    C("Bolsas y packaging", "variable", 34200, "2026-09-12", { category: "Packaging", pm: "cash" }),
    C("Limpieza del local", "variable", 18500, "2026-09-14", { category: "Local", pm: "cash" }),
    C("Seguro del local", "fixed", 26800, "2026-09-07", { category: "Local" }),
    C("Mantenimiento de vidriera", "other", 15000, "2026-09-15", { category: "Local", pm: "cash" }),
    // agosto
    C("Alquiler del local", "fixed", 320000, "2026-08-01", { category: "Local" }),
    C("Sueldo empleada de mostrador", "fixed", 450000, "2026-08-05", { category: "Personal" }),
    C("Compra de mercadería — Textil Norte", "purchase", 420000, "2026-08-04", { category: "Mercadería" }),
    C("Compra de mercadería — Jeans del Sur", "purchase", 260000, "2026-08-18", { category: "Mercadería" }),
    C("Electricidad", "fixed", 38900, "2026-08-08", { category: "Servicios", pm: "cuenta_dni" }),
    C("Internet y telefonía", "fixed", 22600, "2026-08-08", { category: "Servicios", pm: "cuenta_dni" }),
    C("Publicidad en Instagram", "variable", 45000, "2026-08-02", { category: "Marketing", pm: "mercadopago" }),
    C("Honorarios del contador", "fixed", 55000, "2026-08-06", { category: "Administración" }),
    C("Bolsas y packaging", "variable", 29800, "2026-08-12", { category: "Packaging", pm: "cash" }),
    C("Seguro del local", "fixed", 26800, "2026-08-07", { category: "Local" }),
  ].sort((a, b) => b.created_at.localeCompare(a.created_at));

  const cost_templates = [
    ["Alquiler", "fixed", "monthly"], ["Sueldos", "fixed", "monthly"], ["Electricidad", "fixed", "monthly"], ["Internet", "fixed", "monthly"],
    ["Compra de mercadería", "purchase", "one-time"], ["Publicidad", "variable", "one-time"], ["Packaging", "variable", "one-time"],
  ].map(([name, cost_type, frequency], i) => ({ id: uid("t"), business_id: null, name, cost_type, frequency, sort_order: i, is_active: true, created_at: ts("2026-03-01") }));

  const monthly_goals = [{ id: uid("g"), business_id: BIZ_ID, month: "2026-09-01", metric: "revenue", target_amount: 3500000, status: "set",
    reached_at: null, created_by: USER_ID, created_at: ts("2026-09-01"), updated_at: ts("2026-09-01") }];

  const notifications = [
    { type: "goal_pace", title: "Vas por buen camino con tu meta", body: "Llevás el 82% de la meta de septiembre y todavía quedan 12 días.", d: "2026-09-18", h: 9, read: false },
    { type: "payment_aging", title: "Tenés ventas sin cobrar", body: "Hay 3 ventas pendientes de cobro. Revisalas en Ventas.", d: "2026-09-17", h: 10, read: false },
    { type: "appointment_reminder", title: "Turno de mañana", body: "Mañana a las 10:00 tenés una Asesoría de imagen con Florencia Acosta.", d: "2026-09-18", h: 8, read: false },
    { type: "customers_inactive", title: "Clientas que hace tiempo no compran", body: "Hay clientas que no compran hace más de 60 días. Quizás sea buen momento para escribirles.", d: "2026-09-15", h: 9, read: true },
    { type: "monthly_digest", title: "Tu resumen de agosto está listo", body: "Cerraste agosto con buenos números. Mirá el detalle en el Dashboard.", d: "2026-09-01", h: 9, read: true },
    { type: "welcome", title: "¡Bienvenida al Sistema MBK!", body: "Cualquier duda, escribile a tu asesora desde Mensajes.", d: "2026-03-02", h: 9, read: true },
  ].map((n) => ({ id: uid("m"), recipient_id: USER_ID, business_id: BIZ_ID, type: n.type, title: n.title, body: n.body, data: {}, read_at: n.read ? ts(n.d, n.h) : null, created_at: ts(n.d, n.h) }));

  const suppliers = [["Textil Norte", "Marcos Giménez"], ["Jeans del Sur", "Daniela Ortiz"], ["Accesorios Plaza", "Pablo Rinaldi"]].map(([name, contact_name], i) => ({
    id: uid("u"), business_id: BIZ_ID, name, phone: `291 555020${i}`, email: null, cuit: null, contact_name, notes: null, is_active: true, created_at: ts("2026-03-05") }));

  return { products, customers, sales, sale_items, sale_payments, appointments: appts, appointment_items: appt_items, costs, cost_templates,
    monthly_goals, notifications, suppliers, messages: [], profiles: [profile], businesses: [makeBusiness({ stock })],
    stock_movements: [], stock_entries: [],
    cash_movements: [["cash", 150000], ["transfer", 1800000], ["mercadopago", 60000], ["cuenta_dni", 30000]].map(([method, amount]) => ({ id: uid("o"), business_id: BIZ_ID, method, amount, kind: "opening", movement_date: "2026-08-31" })) };
}

// ── Mini PostgREST ──────────────────────────────────────────────
const REL = {
  customer: { t: "customers", fk: "customer_id", one: true }, product: { t: "products", fk: "product_id", one: true },
  sale: { t: "sales", fk: "sale_id", one: true }, supplier: { t: "suppliers", fk: "supplier_id", one: true },
  sender: { t: "profiles", fk: "sender_id", one: true },
  sale_items: { t: "sale_items", key: "sale_id" }, sale_payments: { t: "sale_payments", key: "sale_id" },
  appointment_items: { t: "appointment_items", key: "appointment_id" }, stock_movements: { t: "stock_movements", key: "entry_id" },
};
const TABLE_OF = { customer: "customers", product: "products", sale: "sales" };

function embed(db, row, sel) {
  const out = { ...row };
  for (const name of Object.keys(REL)) {
    if (!(sel.includes(`${name}:`) || sel.includes(`${name}(`) || sel.includes(`${name}!`))) continue;
    const r = REL[name];
    if (r.one) {
      const found = db[r.t].find((x) => x.id === row[r.fk]) || null;
      out[name] = found ? embed(db, found, sel) : null;
    } else out[name] = db[r.t].filter((x) => x[r.key] === row.id);
  }
  return out;
}

const cmpVal = (rowVal, q) => {
  if (rowVal == null) return null;
  if (typeof rowVal === "string" && /^\d{4}-\d{2}-\d{2}$/.test(rowVal)) return [rowVal, String(q).slice(0, 10)];
  if (typeof rowVal === "string" && /^\d{4}-\d{2}-\d{2}T/.test(rowVal) && /^\d{4}-\d{2}-\d{2}/.test(String(q))) return [Date.parse(rowVal), Date.parse(q)];
  return [rowVal, isNaN(Number(q)) ? q : Number(q)];
};

function matches(row, col, expr) {
  const dot = expr.indexOf("."); const op = expr.slice(0, dot); const val = expr.slice(dot + 1);
  if (col === "or" || col === "and") return true;
  if (col.includes(".")) return true; // filtros sobre recursos embebidos: se ignoran
  const rv = row[col];
  if (op === "not") return !matches(row, col, val);
  if (op === "is") return val === "null" ? rv == null : val === "true" ? rv === true : rv === false;
  if (op === "in") { const set = val.replace(/^\(|\)$/g, "").split(",").map((s) => s.replace(/^"|"$/g, "")); return set.includes(String(rv)); }
  if (op === "ilike" || op === "like") return String(rv ?? "").toLowerCase().includes(val.replace(/%/g, "").toLowerCase());
  const c = cmpVal(rv, val); if (!c) return false; const [a, b] = c;
  switch (op) { case "eq": return String(a) === String(b); case "neq": return String(a) !== String(b); case "gt": return a > b; case "gte": return a >= b;
    case "lt": return a < b; case "lte": return a <= b; default: return true; }
}

export function handleRest(db, method, url, headers, body) {
  const path = url.pathname.replace("/rest/v1/", "");
  if (path.startsWith("rpc/")) return rpc(db, path.slice(4), body);
  const table = path; const rows0 = db[table];
  if (!rows0) return { status: 200, body: [] };
  if (method !== "GET" && method !== "HEAD") return { status: method === "POST" ? 201 : 200, body: method === "DELETE" ? [] : (body && !Array.isArray(body) ? [body] : body || []) };
  const sp = url.searchParams; const sel = sp.get("select") || "*";
  let rows = rows0.filter((r) => { for (const [k, v] of sp.entries()) { if (["select", "order", "limit", "offset"].includes(k)) continue; if (!matches(r, k, v)) return false; } return true; });
  const total = rows.length;
  const orders = sp.getAll("order");
  if (orders.length) rows = [...rows].sort((a, b) => { for (const o of orders.flatMap((x) => x.split(","))) { const [c, d = "asc"] = o.split("."); const x = a[c], y = b[c]; if (x === y) continue; const s = (x ?? "") > (y ?? "") ? 1 : -1; return d === "desc" ? -s : s; } return 0; });
  const off = Number(sp.get("offset") || 0); const lim = sp.get("limit");
  rows = rows.slice(off, lim ? off + Number(lim) : undefined);
  const wantObj = (headers["accept"] || "").includes("vnd.pgrst.object");
  const crange = total === 0 ? "*/0" : `${off}-${off + rows.length - 1}/${total}`;
  const out = rows.map((r) => embed(db, r, sel));
  if (wantObj) return out.length === 1 ? { status: 200, body: out[0] } : { status: 406, body: { code: "PGRST116", message: "JSON object requested, multiple (or no) rows returned" } };
  return { status: 200, body: out, crange };
}

function rpc(db, fn, p) {
  if (fn === "cash_balances") {
    const rows = [];
    for (const m of ["cash", "transfer", "card", "mercadopago", "cuenta_dni"]) {
      const sales_in = db.sale_payments.filter((x) => x.payment_method === m && x.paid_on >= p.p_from.slice(0, 10) && x.paid_on < p.p_to.slice(0, 10)).reduce((s, x) => s + x.amount, 0);
      const costs_out = db.costs.filter((c) => c.payment_method === m && c.cost_date >= p.p_from.slice(0, 10) && c.cost_date < p.p_to.slice(0, 10)).reduce((s, x) => s + x.amount, 0);
      const opening = { cash: 150000, transfer: 1800000, mercadopago: 60000, cuenta_dni: 30000, card: 0 }[m];
      rows.push({ method: m, opening, sales_in, appts_in: 0, costs_out, movements_in: 0, movements_out: 0, closing: opening + sales_in - costs_out });
    }
    return { status: 200, body: rows };
  }
  return { status: 200, body: [] };
}

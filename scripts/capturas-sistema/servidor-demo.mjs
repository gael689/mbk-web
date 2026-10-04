// Servidor de DEMO del Sistema MBK: un "Supabase falso" que corre en tu máquina (http://127.0.0.1:54322)
// con datos 100 % ficticios (negocio de ejemplo "Estilo Sur") y el módulo de Stock prendido.
// NO toca la base real: sirve para recorrer y probar la interfaz (stock, caja, ventas…) sin riesgo.
//
// Los cambios se guardan SOLO en memoria (al apagar el servidor se pierden). Simula las funciones de
// stock de la v1.6 (cargar compra, ajustar, contar, merma) y que una venta descuente stock.
//
// Uso:
//   1) node servidor-demo.mjs                       → levanta el "Supabase falso" en el puerto 54322
//   2) en system-mbk/frontend:  PORT=3400 BROWSER=none \
//        REACT_APP_SUPABASE_URL=http://127.0.0.1:54322 REACT_APP_SUPABASE_ANON_KEY=anon-falsa yarn start
//   3) abrir http://localhost:3400 e ingresar con cualquier mail y contraseña.
import http from "node:http";
import crypto from "node:crypto";
import { buildData, handleRest, USER_ID, BIZ_ID } from "./mock.mjs";

const PORT = Number(process.env.PORT || 54322);
const db = buildData({ stock: true });

const uuid = () => crypto.randomUUID();
const ahora = () => new Date().toISOString();
const estado = (p) => (p.current_stock <= 0 ? "out" : p.current_stock <= (p.min_stock || 0) ? "low" : "ok");
const producto = (id) => db.products.find((p) => p.id === id);

/* ── Stock: un movimiento = un cambio del número + una fila en el historial ─────────────── */
function mover(p, delta, reason, extra = {}) {
  p.current_stock = Number(p.current_stock || 0) + delta;
  p.track_stock = true;
  const previo = p.stock_alert_state;
  p.stock_alert_state = estado(p);
  db.stock_movements.push({
    id: uuid(), business_id: BIZ_ID, product_id: p.id, created_by: USER_ID,
    movement_type: delta >= 0 ? "in" : "out", quantity: Math.abs(delta), delta, stock_after: p.current_stock,
    reason, unit_cost: null, notes: null, movement_date: ahora(), ...extra,
  });
  // Aviso una sola vez por caída, como la base real.
  if (p.stock_alert_state !== "ok" && p.stock_alert_state !== previo) {
    const agotado = p.stock_alert_state === "out";
    db.notifications.unshift({
      id: uuid(), recipient_id: USER_ID, business_id: BIZ_ID, type: agotado ? "stock_out" : "stock_low",
      title: agotado ? "Sin stock" : "Stock bajo", body: `${p.name}: ${agotado ? "se agotó" : `quedan ${p.current_stock}`}.`,
      data: { product_id: p.id }, read_at: null, created_at: ahora(),
    });
  }
}

// Historial inicial coherente: una compra por producto controlado y unas ventas, para que el historial no esté vacío.
(function sembrar() {
  const proveedores = db.suppliers;
  const entrada = { id: uuid(), business_id: BIZ_ID, kind: "purchase", supplier_id: proveedores[0].id, entry_date: "2026-09-01", notes: "Reposición de septiembre", invoice_ref: null, created_by: USER_ID, created_at: "2026-09-01T13:00:00.000Z" };
  db.stock_entries.push(entrada);
  db.products.filter((p) => p.track_stock).forEach((p, i) => {
    const actual = p.current_stock;
    const vendidas = Math.min(actual + 3, 4 + (i % 3));
    p.current_stock = 0;
    mover(p, actual + vendidas, "purchase", { entry_id: entrada.id, supplier_id: entrada.supplier_id, unit_cost: p.cost_price, movement_date: "2026-09-01T13:00:00.000Z" });
    mover(p, -vendidas, "sale", { movement_date: `2026-09-${String(8 + (i % 9)).padStart(2, "0")}T15:00:00.000Z` });
  });
  db.notifications.length = Math.min(db.notifications.length, 12);
})();

/* ── RPC de stock (v1.6), en memoria ────────────────────────────────────────────────────── */
function rpc(fn, p) {
  if (fn === "register_stock_entry") {
    const entrada = { id: uuid(), business_id: BIZ_ID, kind: p.p_kind, supplier_id: p.p_supplier_id || null, entry_date: p.p_entry_date || ahora().slice(0, 10), notes: p.p_notes, invoice_ref: p.p_invoice_ref, created_by: USER_ID, created_at: ahora() };
    db.stock_entries.push(entrada);
    for (const l of p.p_lines || []) {
      let prod = l.product_id ? producto(l.product_id) : null;
      if (!prod && l.new_product) {
        prod = { id: uuid(), business_id: BIZ_ID, name: l.new_product.name, description: null, is_service: false, service_type: null, sale_price: 0, cost_price: 0, unit: l.new_product.unit || "u", sku: null, current_stock: 0, min_stock: 0, track_stock: true, stock_alert_state: "ok", needs_setup: true, category: null, is_active: true, created_at: ahora(), updated_at: ahora() };
        db.products.push(prod);
      }
      if (prod) mover(prod, Number(l.qty), p.p_kind === "purchase" ? "purchase" : "manual", { entry_id: entrada.id, supplier_id: entrada.supplier_id, unit_cost: l.unit_cost ?? null, notes: l.note || null });
    }
    return entrada.id;
  }
  if (fn === "set_product_stock") {
    const prod = producto(p.p_product_id);
    mover(prod, Number(p.p_new_qty) - Number(prod.current_stock || 0), "manual", { notes: p.p_note || null });
    return prod.current_stock;
  }
  if (fn === "register_stock_count") {
    const entrada = { id: uuid(), business_id: BIZ_ID, kind: p.p_kind, supplier_id: null, entry_date: ahora().slice(0, 10), notes: p.p_notes, invoice_ref: null, created_by: USER_ID, created_at: ahora() };
    let cambios = 0;
    for (const l of p.p_lines || []) {
      const prod = producto(l.product_id);
      if (!prod) continue;
      if (l.min_stock != null && l.min_stock !== prod.min_stock) { prod.min_stock = l.min_stock; prod.stock_alert_state = estado(prod); cambios++; }
      if (l.counted != null && (l.counted !== prod.current_stock || !prod.track_stock)) { mover(prod, Number(l.counted) - Number(prod.current_stock || 0), p.p_kind === "count" ? "count" : "manual", { entry_id: entrada.id }); cambios++; }
    }
    if (!cambios) return null;
    db.stock_entries.push(entrada);
    return entrada.id;
  }
  if (fn === "register_stock_loss") {
    mover(producto(p.p_product_id), -Number(p.p_qty), p.p_reason, { notes: p.p_note || null });
    return null;
  }
  return undefined; // el resto (caja, etc.) lo resuelve el mock
}

/* ── Escrituras genéricas en memoria (el mock original solo las "repite") ────────────────── */
function escribir(method, url, headers, body) {
  const tabla = url.pathname.replace("/rest/v1/", "");
  if (!db[tabla]) return { status: 200, body: [] };
  const quiereObjeto = (headers["accept"] || "").includes("vnd.pgrst.object");
  const devolver = (filas, status) => ({ status, body: quiereObjeto ? filas[0] ?? null : filas });
  if (method === "POST") {
    const filas = (Array.isArray(body) ? body : [body]).map((r) => ({ id: uuid(), created_at: ahora(), ...r }));
    db[tabla].push(...filas);
    // Una venta con productos controlados descuenta stock (en la base real lo hace un trigger).
    if (tabla === "sale_items") filas.forEach((f) => { const p = f.product_id && producto(f.product_id); if (p && p.track_stock) mover(p, -Number(f.quantity || 1), "sale", { sale_id: f.sale_id }); });
    return devolver(filas, 201);
  }
  const u = new URL(url); u.searchParams.set("select", "*");
  const ids = new Set(handleRest(db, "GET", u, {}, null).body.map((r) => r.id));
  if (method === "PATCH") {
    const filas = db[tabla].filter((r) => ids.has(r.id));
    filas.forEach((r) => Object.assign(r, body, { updated_at: ahora() }));
    if (tabla === "products") filas.forEach((p) => { p.stock_alert_state = estado(p); });
    return devolver(filas, 200);
  }
  if (method === "DELETE") { db[tabla] = db[tabla].filter((r) => !ids.has(r.id)); return { status: 204, body: [] }; }
  return { status: 200, body: [] };
}

/* ── Auth falsa: cualquier mail y contraseña entran ─────────────────────────────────────── */
const b64u = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
const jwt = `${b64u({ alg: "HS256", typ: "JWT" })}.${b64u({ sub: USER_ID, role: "authenticated", exp: 4102444800, aud: "authenticated" })}.firmafalsa`;
const user = { id: USER_ID, aud: "authenticated", role: "authenticated", email: "lucia@example.com", app_metadata: {}, user_metadata: {}, created_at: "2026-03-01T15:00:00Z" };
const sesion = { access_token: jwt, refresh_token: "refresh-falso", token_type: "bearer", expires_in: 3600 * 24 * 365, expires_at: 4102444800, user };

const leer = (req) => new Promise((ok) => { const c = []; req.on("data", (d) => c.push(d)); req.on("end", () => { try { ok(JSON.parse(Buffer.concat(c).toString() || "null")); } catch { ok(null); } }); });

http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
  const cors = { "access-control-allow-origin": "*", "access-control-allow-headers": req.headers["access-control-request-headers"] || "*", "access-control-allow-methods": "GET,POST,PATCH,PUT,DELETE,HEAD,OPTIONS", "access-control-expose-headers": "content-range" };
  const enviar = (status, obj, extra = {}) => { res.writeHead(status, { ...cors, "content-type": "application/json", ...extra }); res.end(req.method === "HEAD" || status === 204 ? "" : JSON.stringify(obj)); };
  try {
    if (req.method === "OPTIONS") { res.writeHead(204, cors); return res.end(); }
    if (url.pathname.startsWith("/auth/v1/user")) return enviar(200, user);
    if (url.pathname.startsWith("/auth/v1/logout")) return enviar(204, null);
    if (url.pathname.startsWith("/auth/v1/")) return enviar(200, sesion);
    if (url.pathname.startsWith("/rest/v1/")) {
      const body = req.method === "GET" || req.method === "HEAD" ? null : await leer(req);
      if (url.pathname.startsWith("/rest/v1/rpc/")) {
        const fn = url.pathname.replace("/rest/v1/rpc/", "");
        const r = rpc(fn, body || {});
        if (r !== undefined) return enviar(200, r);
        const m = handleRest(db, req.method, url, req.headers, body);
        return enviar(m.status, m.body);
      }
      const r = req.method === "GET" || req.method === "HEAD" ? handleRest(db, req.method, url, req.headers, null) : escribir(req.method, url, req.headers, body);
      return enviar(r.status, r.body, r.crange ? { "content-range": r.crange } : {});
    }
    return enviar(200, {});
  } catch (e) {
    console.error("[demo]", req.method, req.url, e.message);
    return enviar(500, { message: e.message });
  }
}).listen(PORT, "127.0.0.1", () => console.log(`Servidor de demo (Supabase falso) en http://127.0.0.1:${PORT} — datos ficticios, todo en memoria.`));

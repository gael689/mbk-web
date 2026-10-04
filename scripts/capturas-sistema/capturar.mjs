// Uso: node capturar.mjs [salida] [filtro]
//   Levanta el front ya corriendo en http://localhost:3400 (apuntando a Supabase FALSO en 127.0.0.1:54321)
//   y lo saca fotos con todo el tráfico interceptado por el mock. No toca ninguna base real.
// Regenerar cuando salga la v1.6: dejar el dev server arriba (ver LEEME al final del informe) y correr este script.
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildData, handleRest, USER_ID, NOW_ISO } from "./mock.mjs";
const require = createRequire("C:/Users/gaelr/Desktop/taller/package.json");
const { chromium } = require("playwright");

const here = path.dirname(fileURLToPath(import.meta.url));
const OUT = process.argv[2] || path.join(here, "salida");
const FILTER = process.argv[3] || "";
const BASE = process.env.BASE || "http://localhost:3400";
fs.mkdirSync(OUT, { recursive: true });

const b64u = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
const jwt = `${b64u({ alg: "HS256", typ: "JWT" })}.${b64u({ sub: USER_ID, role: "authenticated", exp: 4102444800, aud: "authenticated" })}.firmafalsa`;
const user = { id: USER_ID, aud: "authenticated", role: "authenticated", email: "lucia@example.com", app_metadata: {}, user_metadata: {}, created_at: "2026-03-01T15:00:00Z" };
const session = { access_token: jwt, refresh_token: "refresh-falso", token_type: "bearer", expires_in: 3600 * 24 * 365, expires_at: 4102444800, user };

async function newPage(browser, { w, h, scale, db }) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: scale, locale: "es-AR", timezoneId: "America/Argentina/Buenos_Aires", isMobile: w < 600, hasTouch: w < 600 });
  await ctx.clock.setFixedTime(new Date(NOW_ISO));
  await ctx.addInitScript((s) => { try { localStorage.setItem("sb-127-auth-token", JSON.stringify(s)); } catch {} }, session);
  const errors = [];
  await ctx.route("http://127.0.0.1:54321/**", async (route) => {
    const req = route.request(); const url = new URL(req.url()); const method = req.method();
    const cors = { "access-control-allow-origin": "*", "access-control-allow-headers": req.headers()["access-control-request-headers"] || "*", "access-control-allow-methods": "GET,POST,PATCH,PUT,DELETE,HEAD,OPTIONS", "access-control-expose-headers": "content-range" };
    if (method === "OPTIONS") return route.fulfill({ status: 204, headers: cors });
    if (url.pathname.startsWith("/auth/v1/user")) return route.fulfill({ status: 200, headers: { ...cors, "content-type": "application/json" }, body: JSON.stringify(user) });
    if (url.pathname.startsWith("/auth/v1/")) return route.fulfill({ status: 200, headers: { ...cors, "content-type": "application/json" }, body: JSON.stringify({ ...session, user }) });
    if (url.pathname.startsWith("/rest/v1/")) {
      let body = null; try { body = req.postDataJSON(); } catch {}
      const r = handleRest(db, method, url, req.headers(), body);
      const h = { ...cors, "content-type": "application/json" };
      if (r.crange) h["content-range"] = r.crange;
      return route.fulfill({ status: r.status, headers: h, body: method === "HEAD" ? "" : JSON.stringify(r.body) });
    }
    return route.fulfill({ status: 200, headers: cors, body: "{}" });
  });
  await ctx.routeWebSocket(/127\.0\.0\.1:54321/, () => {}); // realtime: conexión muda, sin ruido
  const page = await ctx.newPage();
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push("PAGEERROR " + e));
  return { ctx, page, errors };
}

// CSS de captura: sin barras de scroll, sin animaciones, sin el botón flotante de React DevTools/overlay de CRA
const CSS = `*{scrollbar-width:none!important}*::-webkit-scrollbar{display:none!important}*,*::before,*::after{animation-duration:0s!important;transition-duration:0s!important;caret-color:transparent!important}
#webpack-dev-server-client-overlay{display:none!important}`;

async function go(page, url, ready) {
  await page.goto(BASE + url, { waitUntil: "domcontentloaded" });
  await page.addStyleTag({ content: CSS });
  if (ready) await page.waitForSelector(ready, { timeout: 30000 });
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(1200);
  await page.evaluate(() => { document.querySelectorAll("[data-sonner-toast]").forEach((e) => e.remove()); });
}

const shots = JSON.parse(fs.readFileSync(path.join(here, "shots.json"), "utf8"));
const browser = await chromium.launch();
const cache = {};
for (const s of shots) {
  if (FILTER && !s.name.includes(FILTER)) continue;
  const stock = !!s.stock;
  const db = (cache[stock] ??= buildData({ stock }));
  const dev = s.device === "movil" ? { w: 390, h: 844, scale: 3 } : { w: 1440, h: 900, scale: 2 };
  const { ctx, page, errors } = await newPage(browser, { ...dev, db });
  try {
    await go(page, s.url, s.ready);
    if (s.run) await eval(`(async (page)=>{${s.run}})`)(page);
    await page.waitForTimeout(600);
    // Alto: si la captura es de página completa, se fija el viewport al alto del documento
    if (s.full) {
      const hgt = await page.evaluate(() => Math.max(document.documentElement.scrollHeight, document.body.scrollHeight));
      await page.setViewportSize({ width: dev.w, height: Math.min(Math.max(hgt, dev.h), s.maxH || 3000) });
      await page.waitForTimeout(900);
    }
    const file = path.join(OUT, s.name + ".png");
    if (s.clip) { const b = await page.locator(s.clip).first().boundingBox(); const vh = page.viewportSize().height; await page.screenshot({ path: file, clip: { x: Math.round(b.x), y: 0, width: Math.round(b.width), height: vh } }); }
    else await page.screenshot({ path: file, fullPage: false });
    console.log("OK", s.name, errors.filter((e) => !/WebSocket|realtime|Failed to load resource|ERR_/.test(e)).slice(0, 3));
  } catch (e) { console.log("FALLÓ", s.name, String(e).slice(0, 300)); await page.screenshot({ path: path.join(OUT, "_error_" + s.name + ".png") }).catch(() => {}); }
  await ctx.close();
}
await browser.close();

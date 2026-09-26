// Pruebas en navegador real: accesibilidad (axe-core), tamaños táctiles, CLS/LCP y el formulario.
// Usa Playwright de C:\Users\gaelr\Desktop\taller y axe-core de portfolio-next (solo lectura).
// Uso: node scripts/pruebas-ui.mjs [url]
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
const req = createRequire("C:/Users/gaelr/Desktop/taller/package.json");
const { chromium } = req("playwright");
const axeSrc = readFileSync("C:/Users/gaelr/Desktop/portfolio-next/node_modules/axe-core/axe.min.js", "utf8");
const url = process.argv[2] ?? "http://localhost:3100/";

const browser = await chromium.launch();
for (const [nombre, ancho, alto] of [["movil", 390, 844], ["escritorio", 1440, 900]]) {
  const ctx = await browser.newContext({ viewport: { width: ancho, height: alto }, hasTouch: nombre === "movil" });
  const page = await ctx.newPage();
  await page.addInitScript(() => {
    window.__cls = 0; window.__lcp = 0;
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: "largest-contentful-paint", buffered: true });
  });
  await page.goto(url, { waitUntil: "networkidle" });
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += 500) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(60); }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);

  const m = await page.evaluate(() => ({ cls: window.__cls, lcp: window.__lcp }));
  console.log(`\n[${nombre}] CLS=${m.cls.toFixed(4)} LCP=${Math.round(m.lcp)}ms`);

  await page.addScriptTag({ content: axeSrc });
  const r = await page.evaluate(async () => await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] } }));
  console.log(`[${nombre}] axe: ${r.violations.length} violaciones, ${r.passes.length} reglas OK`);
  for (const v of r.violations) console.log(`  - ${v.id} (${v.impact}): ${v.help} -> ${v.nodes.length} nodos; ej: ${v.nodes[0].target.join(" ")} :: ${(v.nodes[0].failureSummary || "").split("\n")[1] ?? ""}`);

  const chicos = await page.evaluate(() =>
    [...document.querySelectorAll("a, button, input:not([type=hidden]), select, summary")]
      .filter((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && e.closest("[aria-hidden=true]") === null && r.left > -100; })
      .map((e) => { const r = e.getBoundingClientRect(); return { t: (e.innerText || e.getAttribute("aria-label") || e.id || e.tagName).trim().slice(0, 40), w: Math.round(r.width), h: Math.round(r.height) }; })
      .filter((x) => x.h < 44 || x.w < 44),
  );
  console.log(`[${nombre}] objetivos táctiles < 44px: ${chicos.length}`);
  for (const c of chicos.slice(0, 12)) console.log("  -", JSON.stringify(c));

  if (nombre === "movil" && (await page.locator("#nombre").count())) {
    // Formulario: validación en el navegador, y error claro (sin variables de entorno en este server).
    await page.locator("#probar").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Quiero probar MBK" }).last().click();
    await page.waitForTimeout(300);
    console.log("[form] errores de validación visibles:", await page.locator("form p[id^=e-]").allTextContents());
    await page.fill("#nombre", "Ana Prueba");
    await page.fill("#negocio", "Ropa");
    await page.fill("#whatsapp", "2915551234");
    await page.selectOption("#interes", "ventas");
    await page.getByRole("button", { name: "Quiero probar MBK" }).last().click();
    await page.waitForTimeout(1200);
    const alerta = await page.locator("#form-error").innerText().catch(() => "(sin alerta)");
    console.log("[form] respuesta sin variables de entorno:", JSON.stringify(alerta));
    console.log("[form] link WhatsApp alternativo:", await page.locator("#form-error a").getAttribute("href").catch(() => null));
    await page.locator("#probar").screenshot({ path: ".verificacion/form-error-movil.png" });
  }
  await ctx.close();
}
await browser.close();

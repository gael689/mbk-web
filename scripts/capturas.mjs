// Capturas de toda la página a 390 px (móvil) y 1440 px (escritorio) en .verificacion/.
// Usa el Playwright instalado en C:\Users\gaelr\Desktop\taller\node_modules.
// Uso: node scripts/capturas.mjs [url] [prefijo]
import { createRequire } from "node:module";
const require = createRequire("C:/Users/gaelr/Desktop/taller/package.json");
const { chromium } = require("playwright");

const url = process.argv[2] ?? "http://localhost:3100/";
const pref = process.argv[3] ?? "";
const browser = await chromium.launch();
for (const [nombre, ancho, alto] of [["movil", 390, 844], ["escritorio", 1440, 900]]) {
  const ctx = await browser.newContext({ viewport: { width: ancho, height: alto }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errores = [];
  page.on("console", (m) => m.type() === "error" && errores.push(m.text()));
  page.on("pageerror", (e) => errores.push(String(e)));
  await page.goto(url, { waitUntil: "networkidle" });
  // Recorrer la página para disparar las apariciones al hacer scroll.
  // Para la captura se desactiva content-visibility (las secciones lejanas salen en blanco en
  // capturas de página completa; en un navegador real se renderizan al acercarse).
  await page.addStyleTag({ content: "main > section { content-visibility: visible !important; }" });
  // Dos pasadas: las secciones fuera de pantalla usan content-visibility y su alto real
  // recién se conoce cuando se renderizan.
  for (let pasada = 0; pasada < 2; pasada++) {
    const alto0 = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < alto0; y += alto * 0.6) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(120);
    }
  }
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  const desborde = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
    culpables: [...document.querySelectorAll("body *")]
      .filter((e) => e.getBoundingClientRect().right > document.documentElement.clientWidth + 1 && getComputedStyle(e).position !== "fixed")
      .slice(0, 8)
      .map((e) => e.tagName + "." + String(e.className).slice(0, 60)),
  }));
  console.log(nombre, "alto", total, "desborde", JSON.stringify(desborde), "errores", JSON.stringify(errores));
  await page.screenshot({ path: `.verificacion/${pref}${nombre}-completa.png`, fullPage: true });
  // Cortes por tramos para poder mirarlos con detalle.
  const H = nombre === "movil" ? 1700 : 1500;
  for (let i = 0, y = 0; y < total; i++, y += H) {
    await page.screenshot({ path: `.verificacion/${pref}${nombre}-${String(i).padStart(2, "0")}.png`, fullPage: true, clip: { x: 0, y, width: ancho, height: Math.min(H, total - y) } });
  }
  await ctx.close();
}
await browser.close();

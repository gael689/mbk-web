// LCP y CLS de la carga inicial (sin scroll), con CPU 4x más lenta y red 4G simulada en móvil.
import { createRequire } from "node:module";
const req = createRequire("C:/Users/gaelr/Desktop/taller/package.json");
const { chromium } = req("playwright");
const url = process.argv[2] ?? "http://localhost:3100/";
const browser = await chromium.launch();
for (const [nombre, ancho, alto, lento] of [["movil", 390, 844, true], ["escritorio", 1440, 900, false]]) {
  const ctx = await browser.newContext({ viewport: { width: ancho, height: alto } });
  const page = await ctx.newPage();
  if (lento) {
    const c = await ctx.newCDPSession(page);
    await c.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await c.send("Network.enable");
    await c.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
  }
  await page.addInitScript(() => {
    window.__lcp = []; window.__cls = 0;
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp.push([Math.round(e.startTime), e.element ? e.element.tagName + "." + String(e.element.className).slice(0, 40) : "?"]); }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto(url, { waitUntil: "load" });
  await page.waitForTimeout(3500);
  const r = await page.evaluate(() => ({ lcp: window.__lcp, cls: window.__cls }));
  console.log(nombre, "LCP:", JSON.stringify(r.lcp.at(-1)), "CLS:", r.cls.toFixed(4));
  await ctx.close();
}
await browser.close();

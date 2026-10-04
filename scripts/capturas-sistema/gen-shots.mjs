// Genera shots.json (lista de capturas). Editar acá y correr: node gen-shots.mjs
import fs from "node:fs";
const venta = (extra = "") => `await page.getByRole('button',{name:/Nueva venta/}).click(); await page.waitForTimeout(800);
 await page.getByTestId('customer-search-input').fill('Valent'); await page.waitForTimeout(300); await page.getByText('Valentina Roldán').last().click(); await page.waitForTimeout(300);
 const s=page.getByPlaceholder(/Buscar por nombre/); await s.fill('Vestido midi'); await s.press('Enter'); await s.fill('Cintur'); await s.press('Enter'); await page.waitForTimeout(500);
 await page.getByTestId('adjust-discount-toggle').first().click(); await page.waitForTimeout(300); await page.getByTestId('adjust-pct-input').fill('10'); await page.waitForTimeout(500); ${extra}`;
const dlgTop = "await page.evaluate(()=>{const e=[...document.querySelectorAll('[role=dialog] div')].find(x=>x.className.includes('overflow-y-auto')&&x.scrollHeight>x.clientHeight+20); if(e) e.scrollTop=0;}); await page.waitForTimeout(400);";
const pages = [
  ["dashboard", "/app/dashboard", "text=Buenas", {}],
  ["ventas", "/app/ventas?tab=ventas", 'button:has-text("Nueva venta")', {}],
  ["productos", "/app/productos", "text=Bufanda tejida", {}],
  ["clientes", "/app/clientes", "text=Valentina Roldán", {}],
  ["costos", "/app/costos", "text=Alquiler del local", {}],
  ["turnos", "/app/ventas?tab=turnos", "text=Asesoría de imagen", {}],
];
const shots = [];
for (const [n, url, ready] of pages) {
  shots.push({ name: `${n}-escritorio`, url, ready, ...(n === "dashboard" ? { full: true } : {}) });
  shots.push({ name: `${n}-escritorio-contenido`, url, ready, clip: "main", ...(n === "dashboard" ? { full: true } : {}) });
  shots.push({ name: `${n}-movil`, device: "movil", url, ready: ready.startsWith("text=") ? ready + " >> visible=true" : ready });
}
shots.push({ name: "dashboard-movil-completo", device: "movil", url: "/app/dashboard", ready: "text=Buenas", full: true, maxH: 9000 });
shots.push({ name: "nueva-venta-movil", device: "movil", url: "/app/ventas?tab=ventas", ready: 'button:has-text("Nueva venta")', run: venta() });
shots.push({ name: "nueva-venta-movil-inicio", device: "movil", url: "/app/ventas?tab=ventas", ready: 'button:has-text("Nueva venta")', run: venta(dlgTop) });
shots.push({ name: "nueva-venta-escritorio", url: "/app/ventas?tab=ventas", ready: 'button:has-text("Nueva venta")', run: venta() });
// v1.6 (todavía sin publicar)
shots.push({ name: "novedad-stock-escritorio", stock: true, url: "/app/stock", ready: "h1 >> visible=true" });
shots.push({ name: "novedad-caja-escritorio", url: "/app/caja", ready: "h1 >> visible=true", run: "await page.getByRole('button',{name:'Este mes'}).click(); await page.waitForTimeout(1200);" });
shots.push({ name: "ventas-movil", device: "movil", url: "/app/ventas?tab=ventas", ready: 'button:has-text("Nueva venta")', run: "await page.evaluate(()=>window.scrollTo(0,480)); await page.waitForTimeout(400);" });
shots.push({ name: "dashboard-movil-grafico", device: "movil", url: "/app/dashboard", ready: "text=Buenas", run: "await page.getByText('Meta del mes').first().scrollIntoViewIfNeeded(); await page.evaluate(()=>{const e=[...document.querySelectorAll('*')].find(x=>x.textContent.trim()==='Meta del mes'||x.textContent.trim()==='META DEL MES'); if(e) window.scrollTo(0,e.getBoundingClientRect().top+window.scrollY-90)}); await page.waitForTimeout(500);" });
fs.writeFileSync(new URL("./shots.json", import.meta.url), JSON.stringify(shots, null, 1));

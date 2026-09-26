// Vuelca el texto renderizado de la página (lo que ve una persona) y busca palabras prohibidas.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const req = createRequire("C:/Users/gaelr/Desktop/taller/package.json");
const { chromium } = req("playwright");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(process.argv[2] ?? "http://localhost:3100/", { waitUntil: "networkidle" });
await page.addStyleTag({ content: "main > section { content-visibility: visible !important; }" });
// Abrir todas las preguntas para incluir sus respuestas.
await page.evaluate(() => document.querySelectorAll("details").forEach((d) => (d.open = true)));
const texto = await page.evaluate(() => document.body.innerText);
writeFileSync(".verificacion/texto.txt", texto);
await browser.close();

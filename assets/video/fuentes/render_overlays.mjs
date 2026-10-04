// Renderiza los elementos de texto (titular, chips, botones) de cada escena
// desde HTML a PNG transparentes, con la tipografia de la marca (Poppins).
//
// Lo invoca build_video.py:   node render_overlays.mjs jobs.json
// jobs.json = [{ html: "ruta.html", out: "carpeta", ids: ["head","chip0"], w: 1080, h: 1920 }]
// Escribe out/<id>.png y out/boxes.json ({id: {x,y,w,h}}).
//
// Playwright vive en C:\Users\gaelr\Desktop\taller\node_modules (se puede
// cambiar con la variable PLAYWRIGHT_PKG).
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(process.env.PLAYWRIGHT_PKG || "C:/Users/gaelr/Desktop/taller/package.json");
const { chromium } = require("playwright");

const jobs = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const browser = await chromium.launch();
for (const job of jobs) {
  const page = await browser.newPage({ viewport: { width: job.w, height: job.h }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(job.html).href);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  fs.mkdirSync(job.out, { recursive: true });
  const boxes = {};
  for (const id of job.ids) {
    const el = page.locator("#" + id);
    const b = await el.boundingBox();
    await el.screenshot({ path: path.join(job.out, id + ".png"), omitBackground: true });
    boxes[id] = { x: Math.round(b.x), y: Math.round(b.y), w: b.width, h: b.height };
  }
  fs.writeFileSync(path.join(job.out, "boxes.json"), JSON.stringify(boxes));
  await page.close();
}
await browser.close();

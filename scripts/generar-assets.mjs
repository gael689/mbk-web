// Genera el logo recortado, el ícono de la marca (solo el gráfico) y favicon.ico
// a partir de assets/logo-original.png (copia de system-mbk/frontend/src/assets/logo.png).
// Uso: node scripts/generar-assets.mjs
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const SRC = "assets/logo-original.png";

// 1) Logo completo sin márgenes transparentes.
const full = await sharp(SRC).trim().png().toBuffer();
await writeFile("public/logo.png", full);
const meta = await sharp(full).metadata();
console.log("logo", meta.width, meta.height);

// 2) Solo el gráfico (barras + flecha), la parte de arriba del logo.
const trimmed = sharp(full);
const mark = await trimmed
  .extract({ left: 112, top: 0, width: 168, height: 142 })
  .png()
  .toBuffer();
await writeFile("public/logo-mark.png", mark);
const mm = await sharp(mark).metadata();
console.log("mark", mm.width, mm.height);

// 3) Cuadrado con fondo blanco y margen, para favicon / apple-icon.
async function cuadrado(size, pad) {
  const inner = size - pad * 2;
  const m = await sharp(mark).resize({ width: inner, height: inner, fit: "contain", background: "#ffffff00" }).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: "#ffffff" } })
    .composite([{ input: m, gravity: "center" }])
    .png()
    .toBuffer();
}
const p16 = await cuadrado(16, 1);
const p32 = await cuadrado(32, 2);
const p48 = await cuadrado(48, 3);
await writeFile("app/apple-icon.png", await cuadrado(180, 24));
await writeFile("app/icon.png", await cuadrado(192, 24));

// 4) ICO con PNGs adentro (válido desde Vista).
const imgs = [p16, p32, p48];
const sizes = [16, 32, 48];
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(imgs.length, 4);
let offset = 6 + imgs.length * 16;
const dir = [];
imgs.forEach((b, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(sizes[i], 0); e.writeUInt8(sizes[i], 1); e.writeUInt8(0, 2); e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(b.length, 8); e.writeUInt32LE(offset, 12);
  offset += b.length; dir.push(e);
});
await writeFile("app/favicon.ico", Buffer.concat([header, ...dir, ...imgs]));
console.log("favicon.ico listo");

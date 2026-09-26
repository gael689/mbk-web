// Servidor de mentira que hace de Resend, para probar la ruta /api/contacto sin mandar mails reales.
// Uso: node scripts/resend-falso.mjs [puerto]   y  RESEND_API_URL=http://localhost:PUERTO/emails
import http from "node:http";
const puerto = Number(process.argv[2] ?? 3199);
http
  .createServer((req, res) => {
    let cuerpo = "";
    req.on("data", (c) => (cuerpo += c));
    req.on("end", () => {
      console.log(`[resend-falso] ${req.method} ${req.url} auth=${req.headers.authorization}`);
      console.log(cuerpo);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ id: "falso-123" }));
    });
  })
  .listen(puerto, () => console.log("resend-falso escuchando en", puerto));

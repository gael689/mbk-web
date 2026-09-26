import type { NextConfig } from "next";
import path from "node:path";

const esProduccion = process.env.NODE_ENV === "production";

/* Encabezados de seguridad. El CSP solo va en producción: en desarrollo Next
 * necesita eval para el hot reload. Los scripts y estilos inline son de Next
 * (hidratación) y de los JSON-LD; el resto del origen es solo el propio sitio
 * más YouTube (videos y miniaturas) e Instagram (posts embebidos). */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://i.ytimg.com",
  "font-src 'self' data:",
  "connect-src 'self' https://vitals.vercel-insights.com",
  "frame-src https://www.youtube-nocookie.com https://www.instagram.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const seguridad = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  ...(esProduccion ? [{ key: "Content-Security-Policy", value: csp }] : []),
];

// Aviso al construir para producción: sin número de Belén, los botones de WhatsApp apuntan a uno de mentira.
if (esProduccion && !(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "")) {
  console.warn(
    "\n[mbk-web] ATENCION: falta NEXT_PUBLIC_WHATSAPP_NUMBER (el numero de Belen). Los botones de WhatsApp apuntan a un numero de mentira. No publiques asi.\n",
  );
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: { root: path.join(__dirname) },
  // /tienda -> la tienda de planillas (Tienda Nube), con utm para medir desde acá.
  async redirects() {
    const utm = "utm_source=mbk.com.ar&utm_medium=web";
    return [
      { source: "/tienda", destination: `https://mbkconsultoria.mitiendanube.com/?${utm}`, permanent: false },
      { source: "/tienda/:planilla", destination: `https://mbkconsultoria.mitiendanube.com/productos/:planilla/?${utm}`, permanent: false },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: seguridad }];
  },
};

export default nextConfig;

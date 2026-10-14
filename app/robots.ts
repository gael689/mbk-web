import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/* Abierto a Google y también a los buscadores con IA (ChatGPT, Claude,
 * Perplexity…), para que puedan citar a MBK. Quedan afuera /api/, /tienda (redirige a la tienda externa) y /baja (la baja de los mails).
 *
 * Cada bot usa solo el grupo más específico que lo nombra e ignora el de "*": por eso
 * todos los grupos llevan la misma lista de exclusiones, definida una sola vez acá. */
const BLOQUEADO = ["/api/", "/tienda", "/baja"];

const IA = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: ["*", ...IA].map((userAgent) => ({ userAgent, allow: "/", disallow: BLOQUEADO })),
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/* Abierto a Google y también a los buscadores con IA (ChatGPT, Claude,
 * Perplexity…), para que puedan citar a MBK. Quedan afuera /api/ y /tienda (redirige a la tienda externa). */
const IA = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Applebot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/tienda"] }, ...IA.map((userAgent) => ({ userAgent, allow: "/" }))],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

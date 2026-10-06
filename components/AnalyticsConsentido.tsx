"use client";

import { Analytics } from "@vercel/analytics/next";
import { useConsentimiento } from "@/lib/consentimiento";

/* Vercel Analytics solo se monta si la persona aceptó la medición de visitas. */
export function AnalyticsConsentido() {
  const c = useConsentimiento();
  return c?.medicion ? <Analytics /> : null;
}

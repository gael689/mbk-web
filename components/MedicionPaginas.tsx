"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { registrar } from "@/lib/analytics";
import { useConsentimiento } from "@/lib/consentimiento";

/* Cuenta una visita por cada página que se abre, solo si la persona aceptó la medición.
 * Si acepta estando en una página, esa también se cuenta. Sin render. */
export function MedicionPaginas() {
  const ruta = usePathname();
  const medir = useConsentimiento()?.medicion ?? false;
  useEffect(() => {
    if (medir) registrar("page_view");
  }, [ruta, medir]);
  return null;
}

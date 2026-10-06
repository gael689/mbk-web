"use client";

import { abrirPreferenciasCookies } from "@/lib/consentimiento";

/* Vuelve a abrir el panel de cookies para cambiar la elección. */
export function BotonCookies({ className, children = "Configurar cookies" }: { className?: string; children?: React.ReactNode }) {
  return (
    <button type="button" onClick={abrirPreferenciasCookies} className={className}>
      {children}
    </button>
  );
}

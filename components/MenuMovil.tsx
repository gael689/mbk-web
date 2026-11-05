"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X } from "@/content/iconos";

/* Menú del celular. El contenido llega armado desde el servidor (ContenidoMenuMovil). Se cierra al
 * elegir un enlace o con Escape, y no pasa de la altura de la pantalla: con todo abierto, se desplaza. */
export function MenuMovil({ children }: { children: ReactNode }) {
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    if (!abierto) return;
    const alTeclear = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, [abierto]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-controls="menu-movil"
        aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
        className="grid h-12 w-12 place-items-center rounded-full border-2 border-ink bg-white"
      >
        {abierto ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
      </button>
      <nav
        id="menu-movil"
        aria-label="Menú"
        hidden={!abierto}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setAbierto(false);
        }}
        className="absolute inset-x-0 top-full mt-2 max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain rounded-[1.75rem] border border-line bg-cream px-4 pb-6 pt-3 shadow-[var(--shadow-lift)]"
      >
        <div className="mx-auto sm:max-w-none">
          {children}
          <div className="pt-3">
            <Link href="/?demo=1#probar" className="btn btn-pink w-full">
              Solicitar demo
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

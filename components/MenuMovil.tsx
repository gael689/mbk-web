"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "@/content/iconos";

const ENLACES = [
  { href: "#como-funciona", t: "Cómo funciona" },
  { href: "#belen", t: "Belén" },
  { href: "#formas", t: "Dos formas de usarlo" },
  { href: "#consultoria", t: "Consultoría" },
  { href: "#planillas", t: "Planillas" },
  { href: "#preguntas", t: "Preguntas" },
];

/* Menú desplegable del celular. Se cierra al elegir un enlace o con Escape. */
export function MenuMovil() {
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
        className="absolute inset-x-0 top-full border-b border-line bg-cream px-4 pb-6 pt-3 shadow-[var(--shadow-soft)]"
      >
        <ul className="mx-auto max-w-72 space-y-1 sm:max-w-none">
          {ENLACES.map((e) => (
            <li key={e.href}>
              <a href={e.href} onClick={() => setAbierto(false)} className="flex min-h-12 items-center rounded-2xl px-4 text-lg font-semibold hover:bg-sand">
                {e.t}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a href="#probar" onClick={() => setAbierto(false)} className="btn btn-pink w-full">
              Quiero probar MBK
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

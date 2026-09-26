"use client";

import { useEffect } from "react";
import { registrar, type EventoWeb } from "@/lib/analytics";

/* Dos comportamientos globales, sin estado y sin render:
 *  1. Eventos de analítica por delegación: cualquier elemento con data-track="..."
 *     (clic en WhatsApp, "Iniciar sesión", tienda) registra su evento.
 *  2. Aparición suave al hacer scroll para los elementos con data-reveal. Solo
 *     se ocultan los que están fuera de pantalla al cargar, así que sin JS (o
 *     con movimiento reducido) todo el contenido se ve igual. */
export function Interacciones() {
  useEffect(() => {
    const alClic = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (el?.dataset.track) registrar(el.dataset.track as EventoWeb);
    };
    document.addEventListener("click", alClic);

    let io: IntersectionObserver | undefined;
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reducido && "IntersectionObserver" in window) {
      const altoVentana = window.innerHeight;
      io = new IntersectionObserver(
        (entradas) => {
          for (const en of entradas) {
            if (en.isIntersecting) {
              en.target.classList.add("rv-in");
              io?.unobserve(en.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.getBoundingClientRect().top < altoVentana) return;
        el.classList.add("rv");
        io?.observe(el);
      });
    }

    return () => {
      document.removeEventListener("click", alClic);
      io?.disconnect();
    };
  }, []);

  return null;
}

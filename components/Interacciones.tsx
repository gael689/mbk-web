"use client";

import { useEffect } from "react";
import { registrar, type EventoWeb } from "@/lib/analytics";

/* Dos comportamientos globales, sin estado y sin render:
 *  1. Eventos de analítica por delegación: cualquier elemento con data-track="..."
 *     (clic en WhatsApp, "Iniciar sesión", tienda) registra su evento.
 *  2. Aparición suave al hacer scroll para los elementos con data-reveal. Solo
 *     se ocultan los que están fuera de pantalla al cargar, así que sin JS (o
 *     con movimiento reducido se ve solo un fundido) todo el contenido se ve igual. */
export function Interacciones() {
  useEffect(() => {
    const alClic = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (el?.dataset.track) registrar(el.dataset.track as EventoWeb);
    };
    document.addEventListener("click", alClic);

    let io: IntersectionObserver | undefined;
    // Con "reducir movimiento" también se activa: el CSS cambia el movimiento por un fundido.
    if ("IntersectionObserver" in window) {
      const altoVentana = window.innerHeight;
      io = new IntersectionObserver(
        (entradas) => {
          for (const en of entradas) {
            if (en.isIntersecting) {
              const el = en.target as HTMLElement;
              el.classList.add("rv-in");
              io?.unobserve(el);
              // Terminada la aparición se suelta el estado: así el hover de las tarjetas
              // vuelve a su transición rápida y no queda un transform pegado.
              window.setTimeout(() => el.classList.remove("rv", "rv-in"), 1600);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.getBoundingClientRect().top < altoVentana) return;
        // Escalonado automático entre hermanos que aparecen juntos (si no traen su propio retraso).
        if (!el.style.transitionDelay) {
          const hermanos = Array.from(el.parentElement?.children ?? []).filter((h) => h.hasAttribute("data-reveal"));
          const i = hermanos.indexOf(el);
          if (hermanos.length > 1 && i > 0) el.style.transitionDelay = `${Math.min(i, 5) * 90}ms`;
        }
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

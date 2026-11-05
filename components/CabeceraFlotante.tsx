"use client";

import { useEffect, useState, type ReactNode } from "react";

/* Encabezado flotante: arriba de todo es transparente y se integra al hero; al bajar se vuelve una
 * píldora de vidrio (globals.css, "Encabezado flotante"). Lo de adentro se arma en el servidor. */
export function CabeceraFlotante({ children }: { children: ReactNode }) {
  const [arriba, setArriba] = useState(true);

  useEffect(() => {
    let cuadro = 0;
    const alMoverse = () => {
      cancelAnimationFrame(cuadro);
      cuadro = requestAnimationFrame(() => setArriba(window.scrollY < 40));
    };
    alMoverse();
    window.addEventListener("scroll", alMoverse, { passive: true });
    return () => {
      window.removeEventListener("scroll", alMoverse);
      cancelAnimationFrame(cuadro);
    };
  }, []);

  return (
    <header className="cabecera sticky top-0 z-40" data-arriba={arriba ? "" : undefined}>
      <div className="cabecera-pildora">{children}</div>
    </header>
  );
}

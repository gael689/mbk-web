"use client";

import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "@/content/iconos";

/* El estado del menú de escritorio. Lo de adentro de cada panel se arma en el servidor (PanelesMenu)
 * y llega como children: los enlaces están siempre en el HTML, abiertos o no, y al navegador no le
 * llega el contenido de rubros ni de funciones. Cerrado, `visibility: hidden` los saca del foco del teclado. */
type Estado = { abierto: string | null; abrir: (id: string) => void; cerrar: () => void; cerrarPronto: () => void };
const Contexto = createContext<Estado | null>(null);

export function MenuPrincipal({ children }: { children: ReactNode }) {
  const [abierto, setAbierto] = useState<string | null>(null);
  const temporizador = useRef(0);
  const raiz = useRef<HTMLElement>(null);

  const abrir = useCallback((id: string) => {
    window.clearTimeout(temporizador.current);
    setAbierto(id);
  }, []);
  const cerrar = useCallback(() => {
    window.clearTimeout(temporizador.current);
    setAbierto(null);
  }, []);
  const cerrarPronto = useCallback(() => {
    window.clearTimeout(temporizador.current);
    temporizador.current = window.setTimeout(() => setAbierto(null), 160);
  }, []);

  useEffect(() => () => window.clearTimeout(temporizador.current), []);

  useEffect(() => {
    if (!abierto) return;
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setAbierto(null);
      raiz.current?.querySelector<HTMLButtonElement>(`[data-menu="${abierto}"]`)?.focus();
    };
    const alTocarAfuera = (e: PointerEvent) => {
      if (!raiz.current?.contains(e.target as Node)) setAbierto(null);
    };
    window.addEventListener("keydown", alTeclear);
    document.addEventListener("pointerdown", alTocarAfuera);
    return () => {
      window.removeEventListener("keydown", alTeclear);
      document.removeEventListener("pointerdown", alTocarAfuera);
    };
  }, [abierto]);

  return (
    <Contexto.Provider value={{ abierto, abrir, cerrar, cerrarPronto }}>
      <nav ref={raiz} aria-label="Principal" className="hidden lg:block">
        <ul className="flex items-center gap-1">{children}</ul>
      </nav>
    </Contexto.Provider>
  );
}

export function Desplegable({ id, etiqueta, rutas, children }: { id: string; etiqueta: string; rutas: string[]; children: ReactNode }) {
  const estado = useContext(Contexto);
  const ruta = usePathname();
  if (!estado) return null;
  const { abierto, abrir, cerrar, cerrarPronto } = estado;
  const esteAbierto = abierto === id;
  const actual = rutas.some((r) => ruta === r || ruta.startsWith(`${r}/`));

  return (
    <li
      onPointerEnter={(e) => e.pointerType === "mouse" && abrir(id)}
      onPointerLeave={(e) => e.pointerType === "mouse" && cerrarPronto()}
      onBlur={(e) => {
        if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget as Node)) cerrar();
      }}
    >
      <button
        type="button"
        data-menu={id}
        aria-expanded={esteAbierto}
        aria-controls={`panel-${id}`}
        aria-current={actual ? "true" : undefined}
        onClick={(e) => {
          // Con el mouse ya se abrió al pasar por encima: el clic no lo vuelve a cerrar.
          if (esteAbierto && e.nativeEvent instanceof PointerEvent && e.nativeEvent.pointerType === "mouse") return;
          if (esteAbierto) cerrar();
          else abrir(id);
        }}
        className={`inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 py-2 text-[0.98rem] font-semibold hover:bg-blue-soft ${
          actual || esteAbierto ? "bg-blue-soft text-blue-strong" : "text-ink/85"
        }`}
      >
        {etiqueta}
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${esteAbierto ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      <div
        id={`panel-${id}`}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) cerrar();
        }}
        className={`menu-panel absolute inset-x-0 top-full pt-2 ${esteAbierto ? "menu-panel-abierto" : ""}`}
      >
        {children}
      </div>
    </li>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NAV = [
  { href: "/sistema", t: "Sistema" },
  { href: "/consultoria", t: "Consultoría" },
  { href: "/planillas", t: "Planillas" },
  { href: "/preguntas", t: "Preguntas" },
] as const;

/* Navegación principal (escritorio). Marca la página actual. */
export function NavEnlaces() {
  const ruta = usePathname();
  return (
    <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
      {NAV.map((n) => {
        const activo = ruta === n.href;
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={activo ? "page" : undefined}
            className={`rounded-full px-4 py-2.5 text-[0.98rem] font-semibold hover:bg-blue-soft ${activo ? "bg-blue-soft text-blue-strong" : "text-ink/85"}`}
          >
            {n.t}
          </Link>
        );
      })}
    </nav>
  );
}

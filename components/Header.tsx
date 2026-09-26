import Image from "next/image";
import { LOGIN_URL } from "@/content/site";
import { MenuMovil } from "./MenuMovil";

export const NAV = [
  { href: "#como-funciona", t: "Cómo funciona" },
  { href: "#belen", t: "Belén" },
  { href: "#consultoria", t: "Consultoría" },
  { href: "#planillas", t: "Planillas" },
  { href: "#preguntas", t: "Preguntas" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/90 backdrop-blur-md">
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-3">
        <a href="#inicio" className="flex shrink-0 items-center" aria-label="MBK Consultoría, ir al inicio">
          <Image src="/logo.png" alt="MBK Consultoría" width={395} height={314} priority className="h-12 w-auto" />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="rounded-full px-4 py-2.5 text-[0.98rem] font-semibold text-ink/85 hover:bg-sand hover:text-ink">
              {n.t}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={LOGIN_URL} data-track="clic_iniciar_sesion" className="btn btn-line btn-sm">
            Iniciar sesión
          </a>
          <a href="#probar" className="btn btn-pink btn-sm hidden md:inline-flex">
            Quiero probar MBK
          </a>
          <MenuMovil />
        </div>
      </div>
    </header>
  );
}

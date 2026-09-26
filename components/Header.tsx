import Image from "next/image";
import Link from "next/link";
import { LOGIN_URL } from "@/content/site";
import { MenuMovil } from "./MenuMovil";
import { NavEnlaces } from "./NavEnlaces";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/90 backdrop-blur-md">
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-3">
        <Link href="/" className="flex shrink-0 items-center" aria-label="MBK Consultoría, ir al inicio">
          <Image src="/logo.png" alt="MBK Consultoría" width={395} height={314} priority className="h-12 w-auto" />
        </Link>

        <NavEnlaces />

        <div className="flex items-center gap-2">
          <a href={LOGIN_URL} data-track="clic_iniciar_sesion" className="btn btn-line btn-sm">
            Iniciar sesión
          </a>
          <Link href="/#probar" className="btn btn-pink btn-sm hidden md:inline-flex">
            Quiero probar MBK
          </Link>
          <MenuMovil />
        </div>
      </div>
    </header>
  );
}

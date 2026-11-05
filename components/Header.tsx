import Image from "next/image";
import Link from "next/link";
import { LOGIN_URL } from "@/content/site";
import { CabeceraFlotante } from "./CabeceraFlotante";
import { MenuMovil } from "./MenuMovil";
import { ContenidoMenuMovil, NavEnlaces } from "./NavEnlaces";

export function Header() {
  return (
    <CabeceraFlotante>
      <Link href="/" className="flex shrink-0 items-center" aria-label="MBK Consultoría, ir al inicio">
        <Image src="/logo.png" alt="MBK Consultoría" width={395} height={314} priority className="h-11 w-auto" />
      </Link>

      <NavEnlaces />

      <div className="flex items-center gap-2">
        <a href={LOGIN_URL} data-track="clic_iniciar_sesion" className="btn btn-line btn-sm">
          Iniciar sesión
        </a>
        <Link href="/?demo=1#probar" className="btn btn-pink btn-sm hidden md:inline-flex">
          Solicitar demo
        </Link>
        <MenuMovil>
          <ContenidoMenuMovil />
        </MenuMovil>
      </div>
    </CabeceraFlotante>
  );
}

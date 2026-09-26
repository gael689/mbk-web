import Image from "next/image";
import { DEVELOPER_NAME, DEVELOPER_URL, INSTAGRAM_HANDLE, INSTAGRAM_URL, LOGIN_URL, PRIVACY_URL, SYSTEM_URL, TERMS_URL, YOUTUBE_URL, tiendaHref, whatsappUrl } from "@/content/site";
import { IconInstagram, IconWhatsApp, IconYouTube } from "./Marcas";

const enlace = "inline-flex min-h-11 items-center gap-2 rounded-full py-2 font-medium text-white/90 hover:text-white hover:underline";

/* 14 · Footer. Lo único que menciona a Gael es el crédito chico del final. */
export function Footer() {
  return (
    <footer className="on-dark bg-ink pb-24 pt-14 text-white md:pb-10">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <span className="inline-block rounded-2xl bg-white p-3">
              <Image src="/logo.png" alt="MBK Consultoría" width={395} height={314} className="h-auto w-28" />
            </span>
            <p className="mt-4 max-w-xs text-[0.98rem] text-white/75">
              Sistema de gestión y consultoría para emprendedores y pymes. Bahía Blanca, Buenos Aires, Argentina.
            </p>
          </div>

          <nav aria-label="Contacto y redes">
            <h2 className="text-[0.85rem] font-bold uppercase tracking-[0.14em] text-white/60">Contacto</h2>
            <ul className="mt-3">
              <li>
                <a href={whatsappUrl()} data-track="clic_whatsapp" target="_blank" rel="noopener noreferrer" className={enlace}>
                  <IconWhatsApp className="h-5 w-5" /> WhatsApp
                </a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={enlace}>
                  <IconInstagram className="h-5 w-5" /> {INSTAGRAM_HANDLE}
                </a>
              </li>
              <li>
                <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className={enlace}>
                  <IconYouTube className="h-5 w-5" /> YouTube
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Tienda y sistema">
            <h2 className="text-[0.85rem] font-bold uppercase tracking-[0.14em] text-white/60">MBK</h2>
            <ul className="mt-3">
              <li>
                <a href={tiendaHref()} data-track="clic_tienda" target="_blank" rel="noopener noreferrer" className={enlace}>
                  Tienda de planillas
                </a>
              </li>
              <li>
                <a href={SYSTEM_URL} rel="noopener" className={enlace}>
                  Sistema MBK
                </a>
              </li>
              <li>
                <a href={LOGIN_URL} data-track="clic_iniciar_sesion" className={enlace}>
                  Iniciar sesión
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Legales">
            <h2 className="text-[0.85rem] font-bold uppercase tracking-[0.14em] text-white/60">Legales</h2>
            <ul className="mt-3">
              <li>
                <a href={TERMS_URL} className={enlace}>
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a href={PRIVACY_URL} className={enlace}>
                  Política de privacidad
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/15 pt-6 text-[0.9rem] text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MBK Consultoría. Todos los derechos reservados.</p>
          <p>
            Desarrollado por{" "}
            <a href={DEVELOPER_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-semibold underline underline-offset-2 hover:text-white">
              {DEVELOPER_NAME}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

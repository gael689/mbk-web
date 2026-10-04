import { whatsappUrl } from "@/content/site";
import { IconWhatsApp } from "./Marcas";

/* Botón flotante en toda la página. Verde oscuro (no el #25D366 de marca) para
 * que el ícono blanco tenga contraste suficiente. */
export function WhatsAppFlotante() {
  return (
    <aside aria-label="Contacto por WhatsApp">
      <a
        href={whatsappUrl()}
        data-track="clic_whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir a MBK por WhatsApp"
        className="fixed bottom-4 right-4 z-50 inline-flex h-14 items-center gap-2.5 rounded-full bg-[#0d7a4a] px-4 font-bold text-white shadow-[0_10px_28px_-6px_rgba(13,122,74,0.7)] transition-transform hover:-translate-y-1 sm:bottom-6 sm:right-6 sm:px-5"
        style={{ animation: "wa-ping 2.6s ease-out 3" }}
      >
        <IconWhatsApp className="h-7 w-7" />
        <span className="hidden sm:inline">Escribinos</span>
      </a>
    </aside>
  );
}

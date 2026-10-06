/* Constantes de la web. Todo lo que cambia según el entorno o depende de datos
 * que faltan de parte de Belén vive acá, en un solo lugar. */

/* ── Dominio ──────────────────────────────────────────────────────────────
 * UNA sola constante para metadataBase, canónico, sitemap, robots, OG y JSON-LD.
 * Decisión (06/10/2026): el host canónico es `www.mbk.com.ar`. El dominio raíz
 * (`mbk.com.ar`) redirige con 308 al www (ver next.config.ts y el DNS). Tiene que ser
 * el host que REALMENTE sirve el sitio. Ver README, "www o sin www". */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mbk.com.ar").replace(/\/+$/, "");

export const SITE_NAME = "MBK Consultoría";
/* Sufijo de todos los títulos: el mismo en la home y en las páginas internas. */
export const SITE_SUFFIX = "MBK";
export const SITE_TITLE = `Sistema de gestión para emprendedores y pymes | ${SITE_SUFFIX}`;
export const SITE_DESCRIPTION =
  "El Sistema MBK: ventas, cobros, costos, clientes y turnos en un solo lugar, desde el celular. Creado por una economista de Bahía Blanca que trabaja con emprendedores y pymes.";

/* ── Enlaces externos ───────────────────────────────────────────────────── */
export const SYSTEM_URL = "https://mbksistema.com.ar";
export const LOGIN_URL = `${SYSTEM_URL}/login`;
export const TERMS_URL = `${SYSTEM_URL}/terminos`;
export const PRIVACY_URL = `${SYSTEM_URL}/privacidad`;

export const INSTAGRAM_URL = "https://www.instagram.com/mbkconsultoriaarg";
export const INSTAGRAM_HANDLE = "@mbkconsultoriaarg";
export const YOUTUBE_URL = "https://youtube.com/@mbkconsultoria";
// Resuelto desde https://youtube.com/@mbkconsultoria (externalId de la página del canal).
export const YOUTUBE_CHANNEL_ID = "UCILzW2QvXWs28zm-ES2S-ng";

/* La tienda de planillas. Los links de la web apuntan a /tienda y /tienda/<planilla>
 * (dominio propio) y next.config.ts los redirige a la tienda real agregando
 * utm_source=mbk.com.ar&utm_medium=web. Así la URL de la tienda vive en un solo
 * lugar y el HTML no depende de ella. */
export const STORE_URL = "https://mbkconsultoria.mitiendanube.com/";
export const tiendaHref = (planilla?: string) => (planilla ? `/tienda/${planilla}` : "/tienda");

export const DEVELOPER_NAME = "Gael González";
export const DEVELOPER_URL = "https://gaelgonzalez.com.ar";

/* ── WhatsApp ─────────────────────────────────────────────────────────────
 * El número de Belén es público: se muestra en la web y en los datos de Google.
 * Formato internacional sin + ni espacios. NEXT_PUBLIC_WHATSAPP_NUMBER lo pisa si
 * hace falta cambiarlo sin tocar el código. El de la propuesta original es de Gael
 * y NO se usa acá. */
const WHATSAPP_DEFAULT = "5492954362919";
/* Confirmado por Gael (06/10/2026): +54 9 2954 36-2919 es el número de MBK. */
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "") || WHATSAPP_DEFAULT;
/** Cómo se lee en pantalla: +54 9 2954 36-2919. */
export const WHATSAPP_DISPLAY = WHATSAPP_NUMBER.replace(/^54(9)(\d{4})(\d{2})(\d{4})$/, "+54 $1 $2 $3-$4");
export const WHATSAPP_MESSAGE = "Hola, vi la web de MBK y quiero saber más";
export const whatsappUrl = (message: string = WHATSAPP_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

/* ── Contenido que depende de material de Belén ─────────────────────────── */
/** Foto de Belén (ruta dentro de /public, ej. "/belen.jpg"). null = tarjeta con el logo. */
export const BELEN_PHOTO: string | null = "/belen.jpg";
/** Foto de escritorio con la notebook y el mate (ruta dentro de /public). null = ilustración. */
export const HERO_PHOTO: string | null = null;
/** La sección de testimonios solo se muestra cuando hay testimonios reales con permiso. */
export const SHOW_TESTIMONIALS = false;

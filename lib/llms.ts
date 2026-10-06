import { FAQ } from "@/content/faq";
import { SERVICIOS_CONSULTORIA } from "@/content/consultoria";
import { INCLUYE_HOY, NOVEDADES } from "@/content/modulos";
import { PLANILLAS } from "@/content/planillas";
import {
  INSTAGRAM_URL,
  LOGIN_URL,
  PRIVACY_URL,
  SITE_URL,
  STORE_URL,
  TERMS_URL,
  WHATSAPP_DISPLAY,
  YOUTUBE_URL,
} from "@/content/site";

/* llms.txt y llms-full.txt se generan desde el mismo contenido de la web y desde SITE_URL
 * (el host canónico), así nunca quedan desfasados ni con el host equivocado.
 * Ningún buscador grande confirmó que los lea: cuestan poco y no dañan, pero no son la
 * palanca principal. Mismo texto que ve una persona: no hay contenido "solo para IA". */

const RESUMEN =
  "El Sistema MBK es un sistema de gestión online para emprendedores y pymes: permite registrar ventas, cobros, costos, clientes, productos y turnos en un solo lugar, ver el resultado del mes y ponerse metas, desde el celular o la computadora. Lo creó Belén Klundt, Licenciada y Profesora en Economía de Bahía Blanca, a partir de su trabajo diario asesorando emprendedores y pymes. MBK Consultoría también ofrece consultoría económica y financiera y planillas de gestión.";

const ENLACES = `## Enlaces
- Inicio: ${SITE_URL}/
- El Sistema MBK (qué resuelve y cómo): ${SITE_URL}/sistema
- Consultoría y Belén Klundt: ${SITE_URL}/consultoria
- Planillas: ${SITE_URL}/planillas
- Preguntas frecuentes: ${SITE_URL}/preguntas
- Sistema (iniciar sesión): ${LOGIN_URL}
- Términos: ${TERMS_URL}
- Privacidad: ${PRIVACY_URL}
- Tienda de planillas: ${STORE_URL}
- Instagram: ${INSTAGRAM_URL}
- YouTube (tutoriales): ${YOUTUBE_URL}`;

const DATOS = `## Qué es y para quién
- Para: emprendedores, pymes, comercios y negocios de servicios (indumentaria, pastelería, estética, lencería, oficios y más).
- Problemas que resuelve: no saber si el negocio gana plata, no saber cuánto te deben, poner los precios a ojo, quedarse sin mercadería, no saber cuánta plata hay en caja, turnos que se pisan.
- Hoy incluye: ${INCLUYE_HOY.join(", ").toLowerCase().replace("excel", "Excel")}.
- Novedades (sin fecha): ${NOVEDADES.join(", ").toLowerCase()}.
- Dos formas de usarlo: solo el sistema, o sistema + acompañamiento del equipo de MBK desde el panel de asesoría.
- Costo: depende de cómo se use; se arma una propuesta según el negocio. Se puede pedir una demo antes de decidir.
- Ubicación: Bahía Blanca, Buenos Aires, Argentina.
- Contacto: WhatsApp ${WHATSAPP_DISPLAY} o el formulario de ${SITE_URL}/#probar`;

const CONSULTORIA = `## Consultoría (Bahía Blanca)
La dan Belén Klundt y su equipo.
${SERVICIOS_CONSULTORIA.map((s) => `- ${s}`).join("\n")}`;

const PLANILLAS_MD = `## Planillas (tienda)
${PLANILLAS.map((p) => `- ${p.nombre}: ${p.texto}`).join("\n")}`;

export function llmsTxt(): string {
  return `# MBK Consultoría — Sistema MBK

> ${RESUMEN}

${DATOS}

${ENLACES}

${CONSULTORIA}

${PLANILLAS_MD}

## Más detalle
- Texto completo de las preguntas frecuentes: ${SITE_URL}/llms-full.txt
`;
}

export function llmsFullTxt(): string {
  const faq = FAQ.map((f) => `### ${f.q}\n${f.a}`).join("\n\n");
  return `# MBK Consultoría — Sistema MBK (versión completa)

> ${RESUMEN}

${DATOS}

${CONSULTORIA}

${PLANILLAS_MD}

## Preguntas frecuentes
${faq}

${ENLACES}
`;
}

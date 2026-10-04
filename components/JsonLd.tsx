import { FAQ } from "@/content/faq";
import { SERVICIOS_CONSULTORIA } from "@/content/consultoria";
import {
  INSTAGRAM_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SYSTEM_URL,
  WHATSAPP_NUMBER,
  YOUTUBE_URL,
} from "@/content/site";

/* Datos estructurados (schema.org) en un solo @graph. Los @id cuelgan de
 * SITE_URL, el host canónico. No se declara teléfono, precio ni valoraciones:
 * nada que no esté comprobado. */
export function JsonLd() {
  const org = `${SITE_URL}/#organization`;
  const persona = `${SITE_URL}/#belen-klundt`;

  const grafo = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "es-AR",
        publisher: { "@id": org },
      },
      {
        "@type": "Organization",
        "@id": org,
        name: SITE_NAME,
        alternateName: "MBK",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png`, width: 395, height: 314 },
        founder: { "@id": persona },
        sameAs: [INSTAGRAM_URL, YOUTUBE_URL],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#servicio`,
        name: "MBK Consultoría",
        description:
          "Consultoría económica y financiera para emprendedores y pymes de Bahía Blanca, y el Sistema MBK de gestión para llevar ventas, cobros, costos y turnos.",
        url: SITE_URL,
        telephone: `+${WHATSAPP_NUMBER}`,
        image: `${SITE_URL}/logo.png`,
        parentOrganization: { "@id": org },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bahía Blanca",
          addressRegion: "Buenos Aires",
          addressCountry: "AR",
        },
        areaServed: { "@type": "City", name: "Bahía Blanca" },
        knowsAbout: [...SERVICIOS_CONSULTORIA],
        serviceType: [...SERVICIOS_CONSULTORIA],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#sistema`,
        name: "Sistema MBK",
        url: SYSTEM_URL,
        description: SITE_DESCRIPTION,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web (celular y computadora)",
        inLanguage: "es-AR",
        publisher: { "@id": org },
        creator: { "@id": persona },
        audience: { "@type": "Audience", audienceType: "Emprendedores y pymes" },
        featureList: [
          "Registro de ventas y cobros",
          "Costos y gastos",
          "Clientes y productos",
          "Servicios y agenda de turnos",
          "Metas mensuales y notificaciones",
          "Descarga de registros a Excel",
        ],
      },
      {
        "@type": "Person",
        "@id": persona,
        name: "María Belén Klundt",
        alternateName: "Belén Klundt",
        jobTitle: "Licenciada y Profesora en Economía",
        worksFor: { "@id": org },
        address: { "@type": "PostalAddress", addressLocality: "Bahía Blanca", addressCountry: "AR" },
        url: `${SITE_URL}/#belen`,
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#preguntas`,
        inLanguage: "es-AR",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Escapamos "<" para que nada del contenido pueda cerrar el <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(grafo).replace(/</g, "\\u003c") }}
    />
  );
}

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
          "Consultoría económica y financiera para emprendedores y pymes de Bahía Blanca, y el Sistema MBK de gestión para llevar ventas, cobros, costos, stock, caja y turnos.",
        url: SITE_URL,
        telephone: `+${WHATSAPP_NUMBER}`,
        image: `${SITE_URL}/logo.png`,
        parentOrganization: { "@id": org },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: `+${WHATSAPP_NUMBER}`,
          availableLanguage: "es-AR",
        },
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
          "Caja por medio de pago",
          "Costos y gastos",
          "Costo del producto en cinco partes",
          "Clientes y productos",
          "Control de stock con avisos",
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
        url: `${SITE_URL}/consultoria#belen`,
        image: `${SITE_URL}/belen.jpg`,
        sameAs: [INSTAGRAM_URL, YOUTUBE_URL],
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#consultoria`,
        name: "Consultoría económica para emprendedores y pymes",
        serviceType: "Consultoría económica y financiera",
        description:
          "Acompañamiento en el día a día, evaluación económico-financiera, diagnósticos, rentabilidad y costos, mercados, competidores y proveedores, y precios.",
        url: `${SITE_URL}/consultoria`,
        provider: { "@id": org },
        areaServed: { "@type": "City", name: "Bahía Blanca" },
        inLanguage: "es-AR",
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

/* Migas de pan de las páginas internas: Home > página. */
export function JsonLdMigas({ nombre, ruta }: { nombre: string; ruta: string }) {
  const grafo = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: nombre, item: `${SITE_URL}${ruta}` },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(grafo).replace(/</g, "\\u003c") }} />;
}

/* FAQPage: solo en /preguntas, donde las preguntas y respuestas están a la vista. */
export function JsonLdFaq() {
  const grafo = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/preguntas#faq`,
    url: `${SITE_URL}/preguntas`,
    inLanguage: "es-AR",
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(grafo).replace(/</g, "\\u003c") }} />;
}

const incrustar = (grafo: object) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(grafo).replace(/</g, "\\u003c") }} />
);

/* Migas de pan de cualquier profundidad: Inicio > sección > página. */
export function JsonLdMigasN({ migas }: { migas: { nombre: string; ruta: string }[] }) {
  return incrustar({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      ...migas.map((m, i) => ({ "@type": "ListItem", position: i + 2, name: m.nombre, item: `${SITE_URL}${m.ruta}` })),
    ],
  });
}

/* FAQPage de una página que muestra esas preguntas a la vista (rubros, guías, Bahía Blanca). */
export function JsonLdPreguntas({ ruta, preguntas }: { ruta: string; preguntas: { q: string; a: string }[] }) {
  return incrustar({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}${ruta}#faq`,
    url: `${SITE_URL}${ruta}`,
    inLanguage: "es-AR",
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntity: preguntas.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  });
}

/* Guía: Article firmado por la organización (no se le atribuye a una persona lo que no escribió ella). */
export function JsonLdArticulo({ ruta, titulo, descripcion, fecha }: { ruta: string; titulo: string; descripcion: string; fecha: string }) {
  return incrustar({
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}${ruta}#articulo`,
    mainEntityOfPage: `${SITE_URL}${ruta}`,
    headline: titulo,
    description: descripcion,
    inLanguage: "es-AR",
    datePublished: fecha,
    dateModified: fecha,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    image: `${SITE_URL}${ruta}/opengraph-image`,
  });
}

/* Página de un rubro: el Sistema MBK como servicio pensado para ese tipo de negocio. */
export function JsonLdRubro({ ruta, nombre, descripcion }: { ruta: string; nombre: string; descripcion: string }) {
  return incrustar({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${ruta}#servicio`,
    name: `Sistema MBK para ${nombre.toLowerCase()}`,
    serviceType: "Sistema de gestión online",
    description: descripcion,
    url: `${SITE_URL}${ruta}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Argentina" },
    audience: { "@type": "Audience", audienceType: nombre },
    inLanguage: "es-AR",
  });
}

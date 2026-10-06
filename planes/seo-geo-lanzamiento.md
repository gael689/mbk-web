# mbk-web: plan de SEO, GEO y posicionamiento para el lanzamiento (06/10/2026)

Punto de partida: `main` = `origin/main`, v2 corta ya commiteada, build limpio según `planes/publicacion.md` (del 04/10, parte de ese documento quedó vieja: ya hay remoto y la v2 está en `main`).

## Qué ya está bien (no tocar)

- `metadataBase`/canónico desde una sola constante (`SITE_URL`), `lib/meta.ts` repite OG y Twitter en cada página.
- `robots.ts` abierto a GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot, meta-externalagent.
- `sitemap.ts` con las 5 URLs, `public/llms.txt`, `app/opengraph-image.tsx` + `twitter-image`, favicon en la raíz de `app/`.
- JSON-LD: WebSite, Organization, ProfessionalService, SoftwareApplication y Person en la home; FAQPage en `/preguntas`.
- Headers de seguridad, `lang="es-AR"`, un solo h1 por página, axe sin violaciones.

## Fase 0 — Bloqueos y decisiones (sin esto no se lanza; lo resuelven Gael y Belén)

| # | Qué | Por qué importa para SEO |
|---|---|---|
| 0.1 | Registrar `mbk.com.ar` en nic.ar a nombre de Belén (hoy NXDOMAIN) | Sin dominio no hay nada que indexar |
| 0.2 | Elegir `www` o sin `www` (recomiendo **`www`**: CNAME robusto; sin `www` es solo estética). El otro redirige con **308** | Canónico, sitemap, OG y JSON-LD tienen que apuntar al host que sirve |
| 0.3 | Confirmar el WhatsApp: el código 2954 es de La Pampa y la web dice Bahía Blanca (Bahía es 0291) | El teléfono va en el JSON-LD; un dato inconsistente rompe la señal local |
| 0.4 | OK de Belén a las métricas del hero (+10 negocios, +2.000 ventas…) | "Nada inventado": los números salen de su base |
| 0.5 | Mail de destino del formulario + dominio verificado en Resend | Un formulario que no manda mail anula el objetivo de todo el SEO |
| 0.6 | Cuenta de Vercel a nombre de Belén | Hosting |
| 0.7 | H1 de `/consultoria` ("Una economista mirando tu negocio", en singular, contradice "y su equipo") | Coherencia título/H1/entidad |

## Fase 1 — Cambios de código (los hago yo, en una rama, sin deploy)

**1.1 Open Graph por página.** Hoy todas las páginas comparten una sola imagen (la del hero "¿Vendés todos los días y no sabés cuánto ganás?"). Crear `opengraph-image.tsx` propio en `/sistema`, `/consultoria`, `/planillas` y `/preguntas` (misma paleta, titular de cada página) o una función compartida `og(titulo, bajada)`. Verificar con `curl -A facebookexternalhit/1.1` y en 1200×630 que ningún texto quede cortado en WhatsApp (que recorta a ~1.91:1 pero con margen).

**1.2 Metadata.**
- Unificar el sufijo: la home termina en "| MBK" y el resto en "| MBK Consultoría".
- Revisar largos: título ≤ 60 caracteres, descripción ≤ 155. La de `/preguntas` y la de `/consultoria` se cortan en Google.
- `og:image:alt` por página, `og:locale es_AR`, `article:*` no aplica.

**1.3 Sitemap honesto.** `lastModified: new Date()` en todas las páginas declara que todo cambió cada vez que se hace el build, y Google termina ignorándolo. Poner una fecha real por página (constante que se actualiza cuando cambia el contenido). Sacar `changeFrequency`/`priority`, que Google ignora.

**1.4 JSON-LD.**
- `Person`: agregar `image` (`/belen.jpg`, ya existe) y `sameAs` (LinkedIn de Belén si lo tiene).
- `BreadcrumbList` en las 4 páginas internas.
- `WebPage`/`CollectionPage` por página con `about` y `isPartOf` apuntando a los `@id` existentes.
- `Service` para la consultoría (con `provider` = la organización y `areaServed` = Bahía Blanca), separado del `ProfessionalService` de la home.
- `Organization.contactPoint` con el WhatsApp una vez confirmado (0.3).
- No agregar `offers`, `aggregateRating` ni precios: la regla del proyecto es no inventar ni mostrar precios.
- Expectativa realista: Google limita los rich results de FAQ a sitios de salud y gobierno desde 2023; el FAQPage igual sirve para que los modelos de IA lean pregunta-respuesta, pero no esperar estrellas ni desplegables en Google.

**1.5 `llms.txt` generado, no estático.** Hoy tiene `https://mbk.com.ar` a mano. Pasarlo a una ruta (`app/llms.txt/route.ts`) que use `SITE_URL`, para que 0.2 no obligue a editarlo. Agregar `llms-full.txt` con el contenido de las páginas en texto plano. Aviso honesto: ningún buscador grande confirmó que lea `llms.txt`; cuesta poco y no hace daño, pero no es la palanca principal.

**1.6 robots.** Mantener abierto. Agregar `CCBot` y `Bytespider` solo si Gael quiere; no cambian el posicionamiento. Quitar `host` (es una directiva de Yandex, inofensiva pero inútil).

**1.7 Contenido pensado para que lo citen (GEO).** Los motores de IA citan párrafos que responden la pregunta de entrada.
- Cada sección de `/sistema` y cada respuesta del FAQ debería abrir con la respuesta directa en 1–2 oraciones, y después el detalle.
- Usar siempre el mismo nombre de entidad: "Sistema MBK" (producto) y "MBK Consultoría" (empresa). Hoy aparecen "MBK", "Sistema MBK" y "MBK Consultoría" mezclados.
- Mencionar "Bahía Blanca" en h1/h2 de consultoría y en el primer párrafo de la home, no solo en meta.
- Un bloque "Datos clave" visible (qué es, para quién, dónde, cómo se contrata) en la home, que es lo que los modelos extraen.

**1.8 Rendimiento.** Es factor de ranking y de abandono en celular. LCP de la home 3,5 s sin throttling (`EscenaSistema` + `Metricas`): medir con `scripts/lcp.mjs`, priorizar la imagen del hero (`priority`, tamaños, webp). Arreglar el error de lint de `components/Metricas.tsx:55` (`lugar -= 1`) para que `npm run lint` pase.

**1.9 Detalles.** Arreglar `.env.example` y `scripts/pruebas-ui.mjs` (botón "Quiero probar MBK" que ya no existe); `<link rel="alternate" hreflang>` no hace falta (un solo idioma).

## Fase 2 — Día del lanzamiento

1. Repo, proyecto en Vercel, variables en Production **y** en `.env.local`, dominio y DNS en nic.ar, redirección 308 del host secundario.
2. Resend: verificar el dominio y mandar un formulario real que llegue.
3. Correr los `curl` de verificación del README (favicon 200, canónico = host, `robots.txt`, redirección 308, OG con el user-agent de Facebook).
4. **Purgar caché de OG** (Facebook Sharing Debugger → *Scrape Again*, LinkedIn Post Inspector) **con y sin `www`**.
5. **Google Search Console** (propiedad de dominio, verificación por DNS) → enviar `sitemap.xml` → "Inspección de URL" y solicitar indexación de las 5 URLs.
6. **Bing Webmaster Tools** (se puede importar desde Search Console) → enviar sitemap. Importa más de lo que parece: Bing alimenta a ChatGPT Search y Copilot. Activar IndexNow (Vercel lo permite con un archivo de clave).
7. En `mbksistema.com.ar`: que `robots.txt`/`sitemap.xml` indexen solo `/login`, `/terminos`, `/privacidad`. Hoy el sistema compite con la web de marketing por las mismas búsquedas. No mover de dominio.
8. Lighthouse móvil y `scripts/texto-visible.mjs` (que no aparezcan precios).

## Fase 3 — Primeros 30–60 días (lo que realmente posiciona)

El sitio técnico ya está; lo que falta para aparecer es **autoridad y señales externas**. En orden de impacto:

1. **Google Business Profile** (perfil de empresa de Google) para MBK Consultoría en Bahía Blanca, con categoría, servicios, horario, WhatsApp y link a la web. Es la palanca más fuerte para "consultoría económica Bahía Blanca" y el mapa. Requiere verificación (postal/video) a nombre de Belén.
2. **Coherencia de datos (NAP)**: mismo nombre, ciudad y teléfono en la web, Google Business, Instagram, YouTube, Tienda Nube y LinkedIn. Poner el link a mbk.com.ar en la bio de Instagram, la descripción de YouTube y la Tienda Nube.
3. **Menciones y enlaces**: LinkedIn de Belén y de la empresa, cámaras empresarias y directorios de Bahía Blanca, la UNS si hay nota o convenio, notas en medios locales. Solo lo que sea real.
4. **Contenido nuevo (3–5 guías cortas)** sobre las preguntas que la gente hace: "cómo calcular el precio de un producto", "cómo saber si mi negocio gana plata", "qué es el punto de equilibrio", "cómo llevar el control de stock". Salen de lo que Belén ya explica; cada una enlaza a `/sistema` y a la planilla correspondiente. Es lo que más ayuda a aparecer en respuestas de IA, porque da páginas citables por pregunta. Sin inventar datos ni casos.
5. **Los videos de YouTube** con título y descripción con las mismas palabras de las páginas, y link a la web; los buscadores de IA citan mucho YouTube.
6. Testimonios reales con permiso (hoy apagados, bien): suman confianza y señales de reseña.

## Cómo medir

- Search Console: consultas, impresiones, páginas indexadas (meta: 5/5 a la semana).
- Prueba manual de GEO: una lista fija de ~15 preguntas ("sistema de gestión para emprendedores Argentina", "consultoría económica en Bahía Blanca", "qué es el Sistema MBK"…) en ChatGPT (con búsqueda), Perplexity, Gemini, Claude y Google. Anotar si MBK aparece, qué dice y qué fuentes cita. Hacerla **antes** del lanzamiento (línea base), a los 30 y a los 60 días. Si dice algo falso, corregirlo en la fuente.
- Vercel Analytics: ya tiene los eventos (`clic_whatsapp`, `envio_formulario`…); mirar de qué página y fuente viene cada consulta.

## Qué NO prometo

Nadie controla que ChatGPT o Google nombren a MBK: se puede hacer que el sitio sea fácil de leer, citable y consistente, pero la aparición depende de autoridad externa y de tiempo (semanas a meses). Una marca nueva con un dominio nuevo arranca de cero.

## Orden sugerido

Fase 0 en paralelo con Fase 1 (puedo avanzar 1.1 a 1.9 hoy mismo en una rama `seo/lanzamiento`, con `npm run build` y las pruebas de `scripts/` al final). Fase 2 cuando estén 0.1 a 0.6. Fase 3 arranca el día del lanzamiento: abrir Google Business Profile **antes**, porque la verificación demora días.

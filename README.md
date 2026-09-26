# mbk-web — la web pública de MBK (mbk.com.ar)

Next.js 16 (App Router) + TypeScript + Tailwind 4. Una sola página larga que **vende el Sistema MBK**
(consultoría y planillas en chico), pensada para el celular. El plan aprobado está en
`system-mbk/planes/plan-web-mbk.md`. **Sin precios en ninguna parte.**

> Estado: terminada y lista para desplegar, **sin desplegar**. No hay remoto ni dominio configurado.

## Cómo correrlo

```bash
npm install
cp .env.example .env.local   # completar (ver abajo)
npm run dev                  # http://localhost:3000
npm run build && npm run start   # producción local
```

## Variables de entorno

Las mismas van en `.env.local` y en Vercel (`.env.example` tiene el detalle).

| Variable | Para qué | Si falta |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Host canónico (metadataBase, canónico, sitemap, robots, OG, JSON-LD). Default `https://mbk.com.ar` | Usa el default |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | **Número de Belén**, formato `5492911234567` | Los botones apuntan a un número de mentira (`5490000000000`) y el build avisa |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Envío del formulario | La ruta responde 503 con mensaje claro y el front muestra el WhatsApp como alternativa. **Nunca simula un envío** |

## TODO antes de publicar (lo que falta de parte de Belén)

- [ ] **Su número de WhatsApp** → `NEXT_PUBLIC_WHATSAPP_NUMBER`. El +54 9 291 419 3031 de la propuesta es de Gael y **no se usa**.
- [ ] **Mail donde quiere recibir los interesados** → `CONTACT_TO_EMAIL`.
- [ ] Dominio `mbk.com.ar`: hoy no resuelve (NXDOMAIN el 26/09). Confirmar en nic.ar que esté registrado **a nombre de ella** o registrarlo. Para mandar mails desde `@mbk.com.ar` hay que verificar el dominio en Resend.
- [ ] **Decisión www / sin www** (ver más abajo).
- [ ] Cuenta de Vercel a su nombre (o autoriza a crearla con su mail).
- [ ] Una **foto suya** profesional (`BELEN_PHOTO` en `content/site.ts`) y, si tiene, su foto de escritorio con la notebook y el mate (`HERO_PHOTO`). Hoy hay una tarjeta con el logo y una ilustración.
- [ ] **Capturas reales** del sistema (negocio Demo) para reemplazar los mockups en HTML/CSS.
- [ ] Que valide: la lista de problemas, los titulares, el texto de "Pensado desde la experiencia" (está escrito en primera persona, a partir del plan) y las respuestas del FAQ.
- [ ] Instagram: ¿es cuenta profesional vinculada a una página de Facebook? (define si se puede mostrar el feed real).
- [ ] Definir qué incluye exactamente "Sistema + acompañamiento" (frecuencia, reuniones, reportes). Hoy dice solo que "se define en conjunto, según tu negocio".
- [ ] Testimonios reales con permiso (nombre y rubro). Sin testimonios la sección no va: el componente existe pero está apagado (`SHOW_TESTIMONIALS` en `content/site.ts`, datos en `content/testimonios.ts`).
- [ ] Confirmar con ella dos frases del bloque de cobros/turnos: que el sistema hoy "muestra quién te debe" y manda "recordatorios" de turnos (la copy afirma solo eso).

## Qué existe hoy y qué viene (así lo dice la web)

| Existe hoy | Novedades (se nombran sin fecha, con la etiqueta "Novedad") |
|---|---|
| Ventas, cobros, clientes, productos, servicios/turnos, costos y gastos, metas, notificaciones, mensajes, descarga a Excel | Control de stock con avisos · Caja por medio de pago · Costo del producto en cinco partes |

Cuando una novedad salga: sacar `novedad: true` en `content/soluciones.ts` y moverla de `NOVEDADES` a `INCLUYE_HOY` en `content/modulos.ts`.

## Dónde se edita cada cosa (todo el contenido está en `content/`)

- `site.ts`: dominio, links (login, legales, Instagram, YouTube, tienda), WhatsApp, fotos, flags.
- `soluciones.ts`: los problemas y los 7 bloques problema → solución → lo que ganás.
- `faq.ts` (también alimenta el JSON-LD), `consultoria.ts`, `planillas.ts`, `modulos.ts`, `instagram.ts`.
- `components/mockups/`: Dashboard (notebook y celular) y los mockups chicos. Datos de ejemplo obviamente ficticios; aparece el signo `$` **solo ahí**, dentro de esos mockups, nunca como precio del producto.

## Datos vivos

- **YouTube**: feed RSS público del canal (`channel_id` `UCILzW2QvXWs28zm-ES2S-ng`, resuelto desde @mbkconsultoria), pedido en el servidor y revalidado cada 6 h (`app/page.tsx` → `revalidate = 21600`; tiene que ser un literal). Si falla o viene vacío, la sección muestra una tarjeta con el link al canal. Los videos se cargan "livianos": el reproductor (youtube-nocookie) recién se descarga al tocar play.
- **Instagram**: sin API key no se puede leer el feed (Plan B del plan). La sección siempre muestra "Seguinos en Instagram" con el link. Para mostrar publicaciones, pegar sus URLs en `content/instagram.ts` (`https://www.instagram.com/p/XXXX/`, hasta 6) y se embeben solas. Plan A (feed real con Graph API) requiere cuenta profesional vinculada a Facebook y renovar el token cada 60 días: no está hecho.
- **Tienda**: los links a las planillas van a `/tienda` y `/tienda/<planilla>` (redirección en `next.config.ts` a la Tienda Nube con `utm_source=mbk.com.ar&utm_medium=web`). Los slugs de producto son los reales, verificados con 200.

## Formulario (`app/api/contacto`)

POST JSON. Validación en el servidor (zod, `lib/contacto.ts`, la misma que usa el navegador), honeypot (`sitio_web`, devuelve 400), tope de 8 KB, límite de 4 envíos por IP cada 10 min y envío por la API REST de Resend.

**Limitación del límite por IP**: está en memoria. En Vercel cada instancia lleva su propia cuenta y se reinicia al reciclarse, así que frena el abuso casual, no un ataque sostenido. Si llega spam: Upstash Redis o las reglas de rate limiting del Firewall de Vercel.

Probar sin mandar mails reales: `node scripts/resend-falso.mjs 3199` y arrancar con `RESEND_API_URL=http://localhost:3199/emails` (variable solo para pruebas). **Antes de dar por cerrado el deploy, probar un envío real contra Resend** (llega el mail).

## SEO / GEO

- `metadataBase` y canónico salen de `SITE_URL` (una constante). `app/sitemap.ts`, `app/robots.ts` (abierto a los buscadores con IA), `public/llms.txt`, `app/opengraph-image.tsx` (+ `twitter-image`), JSON-LD en `components/JsonLd.tsx` (WebSite, Organization, ProfessionalService de Bahía Blanca, SoftwareApplication, Person y FAQPage).
- **`public/llms.txt` es un archivo estático**: tiene `https://mbk.com.ar` escrito. Si el host canónico termina siendo `www.mbk.com.ar`, editarlo.
- `app/favicon.ico` está en la **raíz** de `app/` (nunca dentro de un grupo de rutas). Se genera del logo con `node scripts/generar-assets.mjs` (también genera `public/logo.png`, `public/logo-mark.png`, `app/icon.png`, `app/apple-icon.png`; el original está en `assets/logo-original.png`, copia de `system-mbk/frontend/src/assets/logo.png`).

### www o sin www: hay que decidirlo (con Gael y Belén)

`www` es más robusto (un CNAME sigue solo al hosting si cambia de IPs; el dominio raíz solo admite un registro A fijo). Sin `www` se ve mejor, pero es una decisión estética. Lo obligatorio: **`NEXT_PUBLIC_SITE_URL` tiene que ser el host que realmente sirve el sitio** (el de destino, no el que redirige) y la redirección del otro tiene que ser **308**. Si no, canónico, sitemap, robots, OG y JSON-LD apuntan a un host que redirige.

## Verificación (comandos)

```bash
HOST=https://mbk.com.ar   # el host real
curl -s -o /dev/null -w "%{http_code}\n" $HOST/favicon.ico                      # 200
curl -s $HOST/ | grep -o '<link[^>]*rel="icon"[^>]*>'                          # no vacío
curl -s $HOST/ | grep -o 'rel="canonical" href="[^"]*"'                        # = HOST
curl -s $HOST/robots.txt | grep -i host
curl -sI https://OTRO-HOST/ | grep -i location                                 # 308 al canónico
curl -sL -A "facebookexternalhit/1.1" $HOST/ | grep -oE '<meta property="og:[^"]*" content="[^"]*"'
```

Después de publicar: purgar la caché de WhatsApp/Facebook (developers.facebook.com/tools/debug → *Scrape Again*) y LinkedIn (Post Inspector), **con y sin `www`**; probar el clic de WhatsApp en un celular y que "Iniciar sesión" lleve a `mbksistema.com.ar/login`; Lighthouse en móvil; Search Console + sitemap.

Scripts de verificación en `scripts/` (usan el Playwright de `Desktop\taller`): `capturas.mjs` (390 y 1440 px, salen a `.verificacion/`, ignorado por git), `pruebas-ui.mjs` (axe-core, tamaños táctiles, formulario), `lcp.mjs` (LCP/CLS con CPU 4x y red 4G), `texto-visible.mjs` (busca `$`, USD, "precio", "plan" en el texto renderizado).

## Deploy (cuando se decida)

1. Repo privado (`nuevo-cliente`) y push. **No hecho.**
2. Proyecto en Vercel a nombre de Belén, framework Next.js, sin cambios de build.
3. Cargar las variables de entorno (tabla de arriba) en Production y Preview.
4. Dominio: agregar `mbk.com.ar` (y `www`) en Vercel, apuntar el DNS en nic.ar, definir el host canónico y la redirección 308 del otro.
5. Verificar el dominio en Resend y mandar un formulario de prueba real.
6. Correr los comandos de verificación de arriba, purgar OG, dar de alta Search Console.
7. En el sistema (`mbksistema.com.ar`): `robots.txt` y `sitemap.xml` pasan a indexar solo `/login`, `/terminos`, `/privacidad` (hoy indexan el sistema como si fuera la web). **No mover el sistema de dominio.**

## Notas técnicas

- Calidad medida con el motor de auditoría de `portfolio-next` (misma lógica, sin reglas propias); los encabezados de seguridad (CSP, HSTS, X-Frame-Options, Permissions-Policy, etc.) están en `next.config.ts`. El CSP solo se aplica en producción.
- Analytics: `@vercel/analytics`, solo se monta si `VERCEL` está definida, con eventos `clic_whatsapp`, `envio_formulario`, `clic_iniciar_sesion`, `clic_tienda`, `reproduce_video` (delegados con `data-track`; `lib/analytics.ts` no rompe si falla).
- Las secciones fuera de pantalla usan `content-visibility: auto` (baja el LCP móvil de ~6 s a ~1,9 s con CPU 4x + 4G). Las animaciones son CSS puro y se apagan con `prefers-reduced-motion`.
- Solo hay tres pesos de Poppins (400/600/800); `font-bold` se mapea a 600 en `globals.css`.

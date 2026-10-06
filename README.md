# mbk-web — la web pública de MBK (www.mbk.com.ar)

Next.js 16 (App Router) + TypeScript + Tailwind 4. **Vende el Sistema MBK** (consultoría y planillas en chico), pensada para el celular. El plan aprobado está en
`system-mbk/planes/plan-web-mbk.md`. **Sin precios en ninguna parte.**

> Estado: terminada, **sin desplegar**. Remoto: `gael689/mbk-web` (privado). Falta el dominio (`mbk.com.ar` sin registrar) y el mail del formulario: ver `planes/publicacion.md`.

## Versión elegida: la corta (04/10/2026)

Se publica la **v2: home corta + páginas** (rama `main`). Home corta y el detalle en `/sistema`, `/consultoria`, `/planillas` y `/preguntas`.

La **v1 (landing larga, una sola página)** está **archivada**: rama `archivo/v1-landing-larga` y tags `v1` (la original) y `v1-final` (con el WhatsApp de Belén). No se mantiene. Para verla: `git worktree add ../mbk-web-v1 v1-final && cd ../mbk-web-v1 && npm install && npm run build && PORT=3200 npm start`.

### Estructura

- **Home (`/`)**: hero con CTA → "Lo que te pasa hoy y lo que cambia" (6 tarjetas problema → lo que ganás, cada una lleva a `/sistema#...`) → "Empezá por donde estés" (tres puertas: Planillas, Sistema, Consultoría) → Belén en resumen → CTA final con formulario.
- **`/sistema`**: los 7 bloques problema → solución → ganancia con mockups, para quién es, dos formas de usarlo, tutoriales, cómo empezar, Instagram.
- **`/consultoria`**: Belén (experiencia, misión, valores) y los 8 servicios. **`/planillas`**: las 6 planillas. **`/preguntas`**: FAQ completo (y su JSON-LD FAQPage).
- **Un solo CTA principal** ("Solicitar demo", que lleva a `/?demo=1#probar` y deja elegida la opción "Quiero ver una demo del sistema") repetido en cada página y siempre llevando al formulario de la home (`/#probar`); "Sistema + acompañamiento" lo abre con `/?acomp=1#probar`. El formulario tiene lo esencial a la vista (nombre, negocio, WhatsApp, qué querés resolver) y el mail y el acompañamiento en un bloque opcional.
- **Color y efectos**: los cuatro colores del logo (azul, naranja, verde, rosa) se reparten por bloque; el violeta queda solo para "Costos y gastos" (el color fijo de Belén). Efectos solo CSS y suaves: manchas de color, las cuatro barras del logo que crecen una vez, ondas entre secciones, tarjetas que se elevan al pasar el mouse. Todo se apaga con `prefers-reduced-motion`.

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
| `NEXT_PUBLIC_SITE_URL` | Host canónico (metadataBase, canónico, sitemap, robots, OG, JSON-LD). Default `https://www.mbk.com.ar` (**decidido el 06/10/2026: gana `www`**) | Usa el default |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Opcional: pisa el número de Belén (formato `5492954362919`) | Usa el que está en `content/site.ts` (+54 9 2954 36-2919, **público**: se muestra en el pie y en el JSON-LD) |
| `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` | Conexión al Supabase del sistema (`mbk-system`): guarda las consultas del formulario y la medición de visitas | El formulario responde 503 con mensaje claro y el front muestra el WhatsApp como alternativa. **Nunca simula un envío**. La medición no guarda nada |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | **Opcional**: aviso por mail además del panel | Se omite el mail; la consulta igual queda guardada |

## TODO antes de publicar (lo que falta de parte de Belén)

- [x] Número de WhatsApp (+54 9 2954 36-2919, público): cargado en `content/site.ts` y **confirmado por Gael el 06/10/2026**.
- [ ] **Mail donde quiere recibir los interesados** → `CONTACT_TO_EMAIL`.
- [ ] Dominio `mbk.com.ar`: hoy no resuelve (NXDOMAIN el 26/09). Confirmar en nic.ar que esté registrado **a nombre de ella** o registrarlo. Para mandar mails desde `@mbk.com.ar` hay que verificar el dominio en Resend.
- [x] **www / sin www: decidido, gana `www`** (06/10/2026). Falta cargarlo en Vercel y el DNS; el 308 del dominio raíz ya está en `next.config.ts`.
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

## Capturas del sistema (hero y páginas)

Las imágenes del hero (`public/capturas/web/laptop.webp` y `celular.webp`) son capturas reales del sistema con **datos 100 % ficticios** (negocio de ejemplo "Estilo Sur"). Los originales en alta (25 PNG, escritorio y celular: dashboard, ventas, nueva venta, productos, clientes, costos, turnos, y stock y caja de la v1.6) están en `assets/capturas/`, **fuera de `public/`** para no publicarlos. Se generan con `scripts/capturas-sistema/` (Playwright + Supabase simulado: nunca toca la base real): levantar el front de `system-mbk` con `REACT_APP_SUPABASE_URL=http://127.0.0.1:54321`, correr `node gen-shots.mjs` y `node capturar.mjs ./salida`, y recomprimir a webp. Regenerarlas cuando salga la v1.6 o cambie la interfaz.

## Dónde se edita cada cosa (todo el contenido está en `content/`)

- `site.ts`: dominio, links (login, legales, Instagram, YouTube, tienda), WhatsApp, fotos, flags.
- `soluciones.ts`: los problemas y los 7 bloques problema → solución → lo que ganás.
- `faq.ts` (también alimenta el JSON-LD), `consultoria.ts`, `planillas.ts`, `modulos.ts`, `instagram.ts`.
- `components/mockups/`: Dashboard (notebook y celular) y los mockups chicos. Datos de ejemplo obviamente ficticios; aparece el signo `$` **solo ahí**, dentro de esos mockups, nunca como precio del producto.

## Datos vivos

- **YouTube**: feed RSS público del canal (`channel_id` `UCILzW2QvXWs28zm-ES2S-ng`, resuelto desde @mbkconsultoria), pedido en el servidor y revalidado cada 6 h (`app/page.tsx` → `revalidate = 21600`; tiene que ser un literal). Si falla o viene vacío, la sección muestra una tarjeta con el link al canal. Los videos se cargan "livianos": el reproductor (youtube-nocookie) recién se descarga al tocar play.
- **Instagram**: sin API key no se puede leer el feed (Plan B del plan). La sección siempre muestra "Seguinos en Instagram" con el link. Para mostrar publicaciones, pegar sus URLs en `content/instagram.ts` (`https://www.instagram.com/p/XXXX/`, hasta 6) y se embeben solas. Plan A (feed real con Graph API) requiere cuenta profesional vinculada a Facebook y renovar el token cada 60 días: no está hecho.
- **Tienda**: los links a las planillas van a `/tienda` y `/tienda/<planilla>` (redirección en `next.config.ts` a la Tienda Nube con `utm_source=mbk.com.ar&utm_medium=web`). Los slugs de producto son los reales, verificados con 200.

## Formulario (`app/api/contacto`) → panel de la asesora

POST JSON. Validación en el servidor (zod, `lib/contacto.ts`, la misma que usa el navegador), honeypot (`sitio_web`, devuelve 400), tope de 8 KB y límite de 4 envíos por IP cada 10 min. **Guarda la consulta en el Supabase del sistema** llamando a la función `submit_web_lead` (`lib/supabase.ts`, clave publishable, solo desde el servidor). La base valida de nuevo, frena inundaciones (20 consultas por hora), ignora el doble envío y les avisa a las asesoras con una notificación. Belén la ve en el panel del sistema: **Consultas web** (estado, WhatsApp asistido, notas) y **Visitas de la web**. Si la persona aceptó la medición, la consulta queda asociada a su primera visita (de dónde vino). El mail por Resend es opcional y de apoyo.

Las tablas (`web_leads`, `web_events`) y las funciones viven en `system-mbk/supabase/migrations/v1_7_web_consultas_visitas.sql`. Anon no puede leer ni escribir las tablas directo.

**Limitación del límite por IP**: está en memoria. En Vercel cada instancia lleva su propia cuenta y se reinicia al reciclarse, así que frena el abuso casual, no un ataque sostenido. Si llega spam: Upstash Redis o las reglas de rate limiting del Firewall de Vercel.

Para probar el mail opcional sin mandar mails reales: `node scripts/resend-falso.mjs 3199` y arrancar con `RESEND_API_URL=http://localhost:3199/emails`. **Antes de dar por cerrado el deploy, mandar una consulta de prueba y comprobar que aparece en "Consultas web"** (y borrarla).

## Cookies y privacidad

- Aviso de cookies (`components/Cookies.tsx`, `lib/consentimiento.ts`): cookie propia `mbk_cookies` (180 días, valor `m<medición>t<terceros>`, ej. `m1t0`). **Sin elección no se carga nada de terceros.** "Rechazar" y "Aceptar" de igual peso, "Elegir" por tipo, y "Configurar cookies" en el pie para cambiar.
- **Medición propia** (ya no hay Vercel Analytics): `MedicionPaginas` y `registrar()` mandan eventos a `/api/medir` solo si se aceptó la medición, y el servidor lo vuelve a comprobar con la cookie `mbk_cookies`. El identificador anónimo (`mbk_vid`, UUID al azar, HttpOnly, 13 meses) lo crea el servidor. Sin IP, sin nombre. Retirar el permiso borra `mbk_vid`. Se ve en el panel de asesora del sistema ("Visitas de la web").
- **Terceros** (reproductores de YouTube e Instagram): al tocar play sin permiso se muestra `AvisoTerceros` con "Aceptar y ver" / "Verlo en YouTube|Instagram" / "Ahora no".
- Páginas `/cookies` y `/privacidad` (de la web; la del sistema sigue en `mbksistema.com.ar/privacidad`). **Los textos legales los redactó Claude a partir de lo que la web hace de verdad: que Belén los revise** (especialmente conservación de datos y derechos).
- Si se suma otro servicio de terceros (mapa, chat, píxel de Meta, Google Analytics…): agregarlo a `/cookies`, ponerlo detrás del permiso correspondiente y ajustar el CSP en `next.config.ts`.

## SEO / GEO

- `metadataBase` y canónico salen de `SITE_URL` (una constante); cada página arma su metadata con `lib/meta.ts` (canónico, Open Graph con imagen y Twitter). `app/sitemap.ts` (home + 4 páginas), `app/robots.ts` (abierto a los buscadores con IA), `public/llms.txt`, `app/opengraph-image.tsx` (+ `twitter-image`), JSON-LD en `components/JsonLd.tsx`: WebSite, Organization, ProfessionalService de Bahía Blanca, SoftwareApplication y Person en la home, y FAQPage solo en `/preguntas` (donde las respuestas están a la vista).
- **`/llms.txt` y `/llms-full.txt` se generan** (`lib/llms.ts`, rutas en `app/`) desde el contenido de la web y `SITE_URL`: no hay nada que editar a mano.
- **Imagen OG por página**: `lib/og.tsx` (plantilla) + un `opengraph-image.tsx`/`twitter-image.tsx` en la carpeta de cada página. Para cambiar el texto, editar el de esa carpeta. `metaPagina` ya no declara imágenes.
- **Fechas del sitemap** (y el "Actualizado el…" visible): `content/fechas.ts`. Actualizar la de una página cuando cambia su contenido.
- **Contenido pensado para que lo citen**: el hero define qué es el sistema, quién lo creó y dónde; `/sistema` cierra con "El Sistema MBK en pocas palabras" (`components/DatosClave.tsx`); las respuestas del FAQ abren con la respuesta directa. Es el mismo texto que ve una persona, no hay contenido solo para IA.
- `app/favicon.ico` está en la **raíz** de `app/` (nunca dentro de un grupo de rutas). Se genera del logo con `node scripts/generar-assets.mjs` (también genera `public/logo.png`, `public/logo-mark.png`, `app/icon.png`, `app/apple-icon.png`; el original está en `assets/logo-original.png`, copia de `system-mbk/frontend/src/assets/logo.png`).

### www o sin www: decidido (06/10/2026) → `www`

`www` es más robusto (un CNAME sigue solo al hosting si cambia de IPs; el dominio raíz solo admite un registro A fijo). Sin `www` se ve mejor, pero es una decisión estética. Lo obligatorio: **`NEXT_PUBLIC_SITE_URL` tiene que ser el host que realmente sirve el sitio** (el de destino, no el que redirige) y la redirección del otro tiene que ser **308**. Si no, canónico, sitemap, robots, OG y JSON-LD apuntan a un host que redirige.

## Verificación (comandos)

```bash
HOST=https://www.mbk.com.ar   # el host real
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
4. Dominio: agregar `www.mbk.com.ar` (principal) y `mbk.com.ar` en Vercel, apuntar el DNS en nic.ar. El dominio raíz redirige con 308 al `www` (Vercel y `next.config.ts`).
5. Verificar el dominio en Resend y mandar un formulario de prueba real.
6. Correr los comandos de verificación de arriba, purgar OG, dar de alta Search Console.
7. En el sistema (`mbksistema.com.ar`): `robots.txt` y `sitemap.xml` pasan a indexar solo `/login`, `/terminos`, `/privacidad` (hoy indexan el sistema como si fuera la web). **No mover el sistema de dominio.**

## Notas técnicas

- Calidad medida con el motor de auditoría de `portfolio-next` (misma lógica, sin reglas propias); los encabezados de seguridad (CSP, HSTS, X-Frame-Options, Permissions-Policy, etc.) están en `next.config.ts`. El CSP solo se aplica en producción.
- Medición: eventos `page_view`, `clic_whatsapp`, `envio_formulario`, `clic_iniciar_sesion`, `clic_tienda`, `reproduce_video` (delegados con `data-track`; `lib/analytics.ts` no rompe si falla). Cada evento es una fila en `web_events` del Supabase del sistema.
- Las secciones fuera de pantalla usan `content-visibility: auto` (baja el LCP móvil de ~6 s a ~1,9 s con CPU 4x + 4G). Las animaciones son CSS puro y se apagan con `prefers-reduced-motion`.
- Solo hay tres pesos de Poppins (400/600/800); `font-bold` se mapea a 600 en `globals.css`.

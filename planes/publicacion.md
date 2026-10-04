# mbk-web: auditoría para publicar (04/10/2026)

Rama `copy/consultoria-equipo` (= `v2-corta` + commit `75e9843`), con la v2 sin commitear en el árbol.
No se desplegó nada, no se hizo push (no hay remoto) y no se tocó `mbk-web-v1`.


> **Actualización 04/10/2026, decisión de Gael:** el acompañamiento del sistema y la consultoría son lo mismo, y todo lo que es servicio pasa a hablar de un equipo ("da más seriedad"). Aplicado en 27 textos:
> - **Resuelto:** el título de `/consultoria` ("Un equipo mirando tu negocio"), la FAQ de "¿Tengo que contratar…?", el choque entre los dos acompañamientos ("Sistema + acompañamiento: Belén y su equipo, a tu lado") y el contacto ("te escribimos", "te llamamos", "Escribinos por WhatsApp", el mensaje de WhatsApp sin "Hola Belén").
> - **Queda a nombre de Belén**, a propósito: la autoría ("pensado/creado por una economista", la bio con "junto a mi equipo"), su foto, sus videos y el JSON-LD de la persona.
> - Cambios sin commitear, porque caen sobre archivos de la v2. El build da limpio.

## (a) Los 3 pedidos de Belén

Pedido: *"En lo que es Consultoria, podria Belen y su equipo… / análisis de competidores/proveedores juntos… / acompañamiento diario o algo así"*.

| Pedido | Estado | Dónde, con el texto que se ve |
|---|---|---|
| "Belén y su equipo" en consultoría | Aplicado | `/consultoria`: bajada "Además del sistema, Belén y su equipo hacen consultoría para pymes y emprendimientos desde Bahía Blanca…"; cierre "¿Querés que Belén y su equipo miren tu negocio?" / "…te escribimos por WhatsApp"; meta description "Belén Klundt, Licenciada y Profesora en Economía, y su equipo acompañan a emprendimientos y pymes en el día a día…". Home (tarjeta Consultoría): "Que Belén y su equipo analicen tu negocio". FAQ: "Belén y su equipo también lo hacen en la consultoría" y "Belén Klundt (…) y su equipo acompañan tu negocio en el día a día…". `llms.txt`: "La dan Belén Klundt y su equipo." |
| "Análisis de competidores y proveedores" en un solo ítem | Aplicado | Lista de servicios (`content/consultoria.ts`, se usa en `/consultoria` y en el JSON-LD): ítem 7 "Análisis de competidores y proveedores" (siguen siendo 8). Home: chip "Competidores y proveedores". FAQ: "de competidores y proveedores". Meta y `llms.txt` iguales. |
| "Acompañamiento en el día a día" destacado | Aplicado en la lista | Ítem 1 de los servicios de `/consultoria` ("1 Acompañamiento en el día a día"), en la meta description, la FAQ, el JSON-LD (`knowsAbout`/`serviceType`) y `llms.txt`. **No** aparece en la home: los chips de la tarjeta Consultoría son "Rentabilidad y costos · Precios · Competidores y proveedores · Mercados". |

### Decisiones de contenido pendientes (no las tomé)

1. **H1 de `/consultoria`: "Una economista mirando tu negocio"** sigue en singular y la página abre con la bio de Belén ("Lo pensó una economista…"). Con "Belén y su equipo" debajo, se lee contradictorio. Opciones: "Una mirada económica sobre tu negocio", "Economía aplicada a tu negocio", "Belén y su equipo, mirando tu negocio".
2. **FAQ "¿Tengo que contratar la consultoría?"**: "…se suman si querés que Belén mire tu negocio con vos." Habla de consultoría y acompañamiento juntos. Pasarlo a "que Belén y su equipo miren tu negocio con vos" depende de si el acompañamiento del sistema también lo delega.
3. **"Acompañamiento en el día a día" (consultoría) y "Sistema + acompañamiento" / "Sistema + Belén" (forma de usar el sistema) se pisan.** La home presenta la consultoría como "¿No buscás el sistema todavía?" (sin sistema), pero su ítem 1 es "acompañamiento", la misma palabra que usa la forma paga del sistema, que además es Belén sola ("Belén ve tu negocio desde su panel de asesora"). Hay que definir con Belén si son lo mismo o no. Si no lo son, renombrar uno de los dos (por ejemplo, "Seguimiento del día a día del negocio"). Si lo son, decirlo.
4. **Lo que más la eligen no está en la home.** Sumar el chip "Día a día" a la tarjeta Consultoría (`components/Escalera.tsx`, `CONSULTORIA`) si Belén quiere destacarlo ahí también.
5. **El contacto sigue siendo personal**: "Belén te va a escribir por WhatsApp", "Belén te escribe", "Belén te llama", "Escribir a Belén por WhatsApp", el mensaje "Hola Belén…". Ahora no está mal; hay que cambiarlo solo si también delega la atención comercial.
6. Detalles menores: "Diagnósticos generales y de áreas" (lista) frente a "por área" (FAQ). En `/sistema` el sobretítulo y la bajada repiten "Dos formas de usarlo".

## (b) Correcciones hechas

Las dos están en `content/faq.ts`, que tiene cambios de la v2 sin commitear, así que **quedaron en el árbol sin commit**. No hubo commit nuevo.

| Archivo | Antes | Después |
|---|---|---|
| `content/faq.ts` (consultoría económica) | "y su equipo acompañan **a** tu negocio en el día a día" | "y su equipo acompañan tu negocio en el día a día" |
| `content/faq.ts` (¿fuera de Bahía Blanca?) | "MBK Consultoría está en Bahía Blanca, **de donde** trabaja Belén" | "…, **desde donde** trabaja Belén" |

En los archivos limpios del commit `75e9843` (`app/consultoria/page.tsx`, `components/Consultoria.tsx`, `content/consultoria.ts`) no encontré errores claros. Lo que queda ahí es de contenido (punto 1).

## (c) Problemas, por prioridad

**Bloquean la publicación**
1. **El dominio `mbk.com.ar` no existe**: NXDOMAIN (lo volví a probar el 04/10; ya estaba así el 26/09). Toda la config (canónico, sitemap, robots, OG, JSON-LD, `llms.txt`, utm de la tienda) apunta a `https://mbk.com.ar`. Es coherente, pero hoy no resuelve.
2. **El formulario no manda mail**: no hay `.env.local` ni `RESEND_API_KEY` / `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL`. Lo probé: un envío válido devuelve 503 "no_configurado" y la web ofrece WhatsApp (no simula el envío, eso está bien). Falta el mail de Belén y verificar el dominio en Resend.
3. **La v2 no está commiteada** (36 modificados y 9 sin trackear) y no hay remoto, así que no se puede desplegar desde git.
4. **`assets/video/` pesa 22 MB** (dos `.mp4` de la demo, sin trackear). No se usa en la web y no tiene que entrar a git: ignorarlo (`/assets/video/*.mp4`) antes de commitear la v2.

**Importantes**
5. **`npm run lint` falla**: en `components/Metricas.tsx:55` está `lugar -= 1` dentro del `map` del render (regla `react-hooks/immutability`). El build pasa igual. Se arregla calculando `lugar` por índice. Es código de la v2, no lo toqué.
6. **Métricas del hero** (`content/metricas.ts`: +10 negocios, +2.000 ventas, +650 clientes, +650 productos): son reales, sacadas de la base y redondeadas hacia abajo, pero son números del negocio de Belén. Necesitan su OK explícito antes de publicarse (regla: "nada inventado").
7. Hay que confirmar con Belén que el WhatsApp +54 9 2954 36-2919 es el correcto (el 2954 es La Pampa y la web dice Bahía Blanca).
8. `.env.example` quedó viejo: dice que sin `NEXT_PUBLIC_WHATSAPP_NUMBER` "los botones apuntan a un número de mentira", y ya no es así (el número por defecto está en `content/site.ts`).
9. `scripts/pruebas-ui.mjs` tiene la prueba del formulario rota: busca el botón "Quiero probar MBK", que ya no existe. axe sí corre.
10. LCP móvil de la home: 3,5 s sin throttling (las demás páginas cargan en unos 0,2 s). Revisar el hero nuevo (`EscenaSistema` + `Metricas`) con `scripts/lcp.mjs` antes de publicar.

**Menores**
11. El título de la home termina en "| MBK" y el resto en "| MBK Consultoría".
12. El JSON-LD `Person` (Belén) no tiene `image`, aunque `public/belen.jpg` ya existe.
13. `public/llms.txt` tiene `https://mbk.com.ar` escrito a mano: si el canónico termina siendo `www`, hay que editarlo.
14. Hay un checkbox del formulario de 24 px (el acompañamiento): está dentro de un label, así que el área táctil real es mayor.

**Lo que está bien** (verificado con `npm run build` + `next start` + curl)
- El build está limpio (Next 16.3.6, npm por `package-lock.json`, 14 rutas).
- `app/favicon.ico` está en la raíz de `app/` → 200, y `<link rel="icon">` sale en las 5 páginas.
- Las 5 páginas tienen un `title` y una `description` propios, canónico `https://mbk.com.ar/...`, `og:url`/`og:image` absolutos, `lang="es-AR"`, un solo `h1` y link para saltar al contenido.
- `robots.txt` (`Host: https://mbk.com.ar` + sitemap), `sitemap.xml` (5 URLs), `opengraph-image` y `twitter-image` → 200.
- El JSON-LD es coherente: todo en `https://mbk.com.ar/#...`, y FAQPage solo en `/preguntas`.
- Enlaces internos: todos los anchors existen (`#probar`, `#belen`, `/sistema#turnos|stock|precios|gano-plata|cobros|caja`). Los externos dan 200: `mbksistema.com.ar/login|terminos|privacidad`, los 6 productos de Tienda Nube, YouTube, Instagram y gaelgonzalez.com.ar. `/tienda` → 307 a Tienda Nube con utm.
- axe: 0 violaciones en `/`, `/sistema`, `/consultoria` y `/preguntas` (móvil y escritorio), CLS 0.
- No encontré lorem, placeholders ni referencias a "v1" o "demo" en el texto renderizado ("Solicitar demo" es el CTA). Tampoco hay secretos: no existe ningún `.env*` salvo `.env.example`, y `.gitignore` cubre `.env*`, `.next`, `.vercel`, `.verificacion` y `assets/capturas`.
- No hay `.vercel` ni `vercel.json`: el proyecto no está vinculado.

## (d) Git y propuesta de ramas

Estado actual:
- `main` = `v1-landing-larga` = tag `v1` = `74480cc`. El worktree `../mbk-web-v1` está en esa rama.
- `v2-corta` = `7a21288`.
- `copy/consultoria-equipo` = `v2-corta` + `75e9843` (copy de Belén). Historia lineal.
- Sin commitear, todo de la v2 en curso: `.gitignore`, `CLAUDE.md`, `README.md`, `app/` (globals, page, planillas, preguntas), unos 22 componentes, `content/` (faq, iconos, instagram, modulos, site, soluciones), `lib/contacto.ts`, `next.config.ts` (le sacaron el aviso de WhatsApp) y `public/llms.txt`.
- Sin trackear: `components/{AcompanamientoInfo,EscenaSistema,Metricas,ReelCard}.tsx`, `content/metricas.ts`, `public/belen.jpg`, `public/capturas/` (452 KB), `public/reels/` (512 KB), `scripts/capturas-sistema/` y `assets/video/` (22 MB, no va).
- Los cambios de copy que cayeron sobre archivos de la v2 (`content/faq.ts`, `components/Escalera.tsx`) y mis 2 correcciones de la FAQ están mezclados con esos cambios.

Propuesta (la ejecuta Gael):
1. En `copy/consultoria-equipo`: agregar `/assets/video/*.mp4` al `.gitignore` y commitear la v2 en commits lógicos (contenido/FAQ, hero + métricas, Escalera + acompañamiento, reels de Instagram, capturas). Nunca `git add -A` sin mirar.
2. Llevar `v2-corta` hasta ahí con un fast-forward (`git checkout v2-corta && git merge --ff-only copy/consultoria-equipo`) y borrar `copy/consultoria-equipo`.
3. Cuando Belén apruebe la v2: `git checkout main && git merge --ff-only v2-corta` (es fast-forward, `main` es ancestro). El tag `v1` conserva la landing larga. El worktree `mbk-web-v1` se puede retirar después con `git worktree remove`.
4. Si eligiera la v1: cherry-pick de `75e9843` a `v1-landing-larga`/`main` (la lista de servicios es la misma).
5. Crear el remoto privado (`nuevo-cliente`) y hacer push de `main` y del tag `v1`.

## (e) Plan de publicación

**Hosting**: Vercel, como el resto de los sitios, framework Next.js y build por defecto. No hay config local.

**Lo que decide el dueño (o Belén)**
- [ ] Dominio `mbk.com.ar`: registrarlo en nic.ar **a nombre de Belén** (hoy no existe).
- [ ] `www` o sin `www`. `www` es más robusto (CNAME), y sin `www` se ve mejor. Lo que se elija va a `NEXT_PUBLIC_SITE_URL`, y el otro host redirige con 308.
- [ ] La cuenta de Vercel: de Belén, o de Gael con transferencia.
- [ ] El mail donde llegan los interesados (`CONTACT_TO_EMAIL`) y el remitente (`web@mbk.com.ar`, que requiere verificar el dominio en Resend).
- [ ] Los 6 puntos de copy de la sección (a) y el OK para publicar las métricas reales.
- [ ] Confirmar el WhatsApp.

**Pasos**
1. Ordenar git (sección d), crear el repo privado y hacer push.
2. Crear el proyecto en Vercel desde el repo, con la rama de producción `main`.
3. Cargar las variables en Production y Preview **y** en `.env.local`: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (`NEXT_PUBLIC_WHATSAPP_NUMBER` es opcional).
4. Agregar `mbk.com.ar` y `www.mbk.com.ar` en Vercel, cargar el DNS en nic.ar y configurar el 308 del host secundario. Si gana `www`: editar `public/llms.txt`.
5. Resend: verificar el dominio (SPF/DKIM) y **mandar un formulario real** que llegue al mail de Belén.
6. En `mbksistema.com.ar`: que `robots.txt`/`sitemap.xml` indexen solo `/login`, `/terminos` y `/privacidad`. El sistema no cambia de dominio.

**Checklist post-deploy**
```bash
HOST=https://mbk.com.ar   # el host real elegido
curl -s -o /dev/null -w "%{http_code}\n" $HOST/favicon.ico          # 200
curl -s $HOST/ | grep -o '<link[^>]*rel="icon"[^>]*>'              # no vacío
curl -s $HOST/ | grep -o 'rel="canonical" href="[^"]*"'            # = HOST
curl -s $HOST/robots.txt | grep -i host
curl -sI https://OTRO-HOST/ | grep -i location                     # 308 al canónico
curl -sL -A "facebookexternalhit/1.1" $HOST/ | grep -oE '<meta property="og:[^"]*" content="[^"]*"'
```
- [ ] Facebook Sharing Debugger → *Scrape Again*, y LinkedIn Post Inspector, **con y sin `www`**.
- [ ] Search Console: dar de alta la propiedad de dominio y enviar `sitemap.xml`.
- [ ] Formulario real recibido, clic de WhatsApp desde el celular, "Iniciar sesión" → `mbksistema.com.ar/login`.
- [ ] Lighthouse móvil (sobre todo el LCP de la home) y `scripts/texto-visible.mjs` (sin precios).

# Enlaces con UTM listos para copiar (21/11/2026)

**Qué hace la web con esto.** Si la persona aceptó la medición en el aviso de cookies, cada visita guarda `utm_source`, `utm_medium` y `utm_campaign` de la URL (`lib/analytics.ts` → `/api/medir` → `track_web_event`). Cuando esa persona manda el formulario, la consulta queda con el origen de su **primera visita** (`first_source`, `first_medium`, `first_campaign` y la página de entrada, en `submit_web_lead`), y Belén lo ve en "Consultas web" y "Visitas de la web".

**Límites reales:** sin aceptar la medición no se guarda nada (la consulta llega igual, sin origen). Solo se leen esos tres parámetros (`utm_content` y `utm_term` se ignoran), hasta 60 caracteres cada uno. Si no hay `utm_source`, el origen es el sitio de donde vino o "directo".

| Dónde va | Enlace |
|---|---|
| Bio de Instagram | `https://www.mbk.com.ar/?utm_source=instagram&utm_medium=bio&utm_campaign=perfil` |
| Historia de Instagram (sticker de enlace) | `https://www.mbk.com.ar/herramientas?utm_source=instagram&utm_medium=historia&utm_campaign=herramientas` |
| Descripción de YouTube | `https://www.mbk.com.ar/?utm_source=youtube&utm_medium=descripcion&utm_campaign=tutoriales` |
| Estado de WhatsApp | `https://www.mbk.com.ar/herramientas?utm_source=whatsapp&utm_medium=estado&utm_campaign=herramientas` |
| Mensaje de WhatsApp | `https://www.mbk.com.ar/?utm_source=whatsapp&utm_medium=mensaje&utm_campaign=contacto` |
| Firma de mail | `https://www.mbk.com.ar/?utm_source=mail&utm_medium=firma&utm_campaign=firma` |
| Referidos (desde el sistema) | `https://www.mbk.com.ar/?utm_source=referido&utm_medium=sistema&utm_campaign=<codigo>` |

**Referidos:** lo arma el sistema desde la v1.12 (tarjeta «¿Conocés a alguien a quien le sirva?» del Inicio, `system-mbk/frontend/src/lib/referral.ts`). `<codigo>` son los primeros 8 caracteres del id del negocio que recomienda: en Consultas web aparece como campaña de origen.

Para compartir una calculadora puntual, cambiar la ruta y dejar el resto igual:

- `https://www.mbk.com.ar/herramientas/precio-de-venta?utm_source=instagram&utm_medium=historia&utm_campaign=precio-de-venta`
- `https://www.mbk.com.ar/herramientas/punto-de-equilibrio?utm_source=instagram&utm_medium=historia&utm_campaign=punto-de-equilibrio`
- `https://www.mbk.com.ar/herramientas/cuanto-te-queda?utm_source=instagram&utm_medium=historia&utm_campaign=cuanto-te-queda`
- `https://www.mbk.com.ar/herramientas/costo-de-un-producto?utm_source=instagram&utm_medium=historia&utm_campaign=costo-de-un-producto`
- `https://www.mbk.com.ar/herramientas/valor-de-la-hora?utm_source=instagram&utm_medium=historia&utm_campaign=valor-de-la-hora`
- `https://www.mbk.com.ar/herramientas/margen-y-markup?utm_source=instagram&utm_medium=historia&utm_campaign=margen-y-markup`

## Reglas para armar uno nuevo

- Todo en minúsculas, sin espacios ni tildes (guiones para separar). `Instagram` e `instagram` cuentan como dos orígenes distintos.
- `utm_source` = de dónde viene (instagram, youtube, whatsapp, mail, referido). `utm_medium` = el lugar exacto (bio, historia, descripcion, estado, mensaje, firma, sistema). `utm_campaign` = la acción o el tema.
- En referidos, `<codigo>` es el código de quien recomienda: hasta 60 caracteres, solo letras, números y guiones.
- No usar UTM en enlaces internos de la web: pisarían el origen real de la visita.

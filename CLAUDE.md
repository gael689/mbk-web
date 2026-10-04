@AGENTS.md

## Proyecto: mbk-web

Web pública de MBK (mbk.com.ar), cliente de Gael. **Todo el detalle está en `README.md`**: variables de entorno, TODO de Belén, deploy y verificación. Reglas duras:

- Sin precios ni "planes" en ninguna parte. Nada inventado (testimonios, números, clientes). El único crédito a Gael es "Desarrollado por Gael González" en el footer.
- El WhatsApp de Belén (+54 9 2954 36-2919) es **público** y vive en `content/site.ts` (`NEXT_PUBLIC_WHATSAPP_NUMBER` lo pisa); el de la propuesta es de Gael y no se usa.
- Un solo dominio canónico: `SITE_URL` en `content/site.ts`. El host que sirve, no el que redirige.
- `app/favicon.ico` en la raíz de `app/`, nunca en un grupo de rutas.
- Todo el contenido vive en `content/`. Stock, caja por medio de pago y costos divididos son "novedades", no funciones ya disponibles.

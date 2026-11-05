# Menú, tildes y animaciones (05/11/2026)

Pedido de Gael: mirar xubio.com/ar y traer lo que sirva. **El diseño de MBK se queda.** Y sobre todo: **no sumar contenido ni texto**. Si la web explica todo, la gente no pregunta. Tiene que entrar por los ojos, generar curiosidad y empujar a pedir la demo.

## Qué se toma de Xubio y qué no

| Xubio | En MBK |
|---|---|
| Menú con desplegables | **Sí.** Sistema, Tu rubro, Servicios, Recursos. Servicios lleva consultoría y planillas, porque MBK no es solo sistema |
| Tarjeta visual dentro del desplegable | **Sí**, con el escáner animado |
| Pantallitas del producto dibujadas en HTML | **Sí**, y acá se mueven |
| Lo que incluye en tildes | **Sí**, con menos ítems |
| Franja de anuncio arriba | **Sí**, con la versión actual. **Sin** cuenta regresiva ni urgencia falsa |
| Una página por función | **No, por decisión de Gael**: es más contenido, y el objetivo es que pregunten |
| Precios, planes, 50% OFF | **No.** Regla dura de la web |
| "+60.000 empresas" y cifras así | **No.** Las cifras de MBK siguen siendo solo las reales de `content/metricas.ts` |
| Facturación, sueldos, conciliación, IA | **No** existen en MBK. No se prometen |

## Qué cambia

1. **Menú con desplegables** en escritorio y acordeón en el celular. Solo ícono y nombre.
2. **Franja de versión** arriba de todo.
3. **`CintaTildes`**: una cinta que corre con todo lo que incluye.
4. **`LoNuevo`**: banda oscura con pantallitas animadas y una acción: "Quiero verlo funcionando".
5. **`Incluye`**: tildes por grupo, cuatro por tarjeta, que saltan al aparecer.
6. **Avisos flotando en el hero**: "Venta registrada", "Te pagaron".
7. **`/sistema` con menos texto**: el párrafo de cada bloque pasa a tildes.
8. **Al día con la v1.10**: versiones, JSON-LD, `llms.txt`, una FAQ de rubro que había quedado falsa.
9. **Encabezado flotante** (como ACA Villa Bordeu): transparente arriba de todo, píldora de vidrio al bajar. `components/CabeceraFlotante.tsx`.
10. **Videos a prueba de fallas**: el feed de YouTube anda de a ratos y la sección se quedaba sin videos. Ahora hay respaldo en `content/videos.ts`.

## Reglas que no se tocan

- Solo se afirma lo que está en `system-mbk/frontend/src/lib/releaseNotes.ts` y publicado. Factura electrónica está **apagada** (`REACT_APP_FEATURE_ARCA`): va como "Próximamente".
- Toda animación es CSS puro y se ve siempre (decisión de Gael: forzada también con "reducir movimiento"). Nada de librerías nuevas.

## Pendiente

- [ ] Que Belén valide los tildes y el "Próximamente" de factura.
- [ ] Capturas reales de la v1.10: `scripts/capturas-sistema/mock.mjs` todavía no conoce las tablas nuevas.
- [ ] Cuando salga ARCA: sacar factura de `NOVEDADES` y sumarla a `INCLUYE_HOY`.

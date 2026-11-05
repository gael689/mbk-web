import Link from "next/link";
import { ArrowRight, ChevronDown } from "@/content/iconos";
import { MENU, type GrupoMenu, type ItemMenu } from "@/content/menu";
import { NOVEDADES } from "@/content/modulos";
import { VERSION_ACTUAL } from "@/content/versiones";
import { Desplegable, MenuPrincipal } from "./Desplegable";
import { PantallaEscaner } from "./mockups/Pantallitas";
import { OrbIcono, TagNuevo, TagProximamente } from "./Piezas";

function Enlace({ item, children, className }: { item: ItemMenu; children: React.ReactNode; className: string }) {
  if (item.externo) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" data-track={item.track} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className}>
      {children}
    </Link>
  );
}

/* Panel de escritorio: ícono y nombre, nada más. El del sistema lleva a la izquierda una pantallita de lo nuevo. */
function Panel({ grupo }: { grupo: GrupoMenu }) {
  const conVitrina = grupo.id === "sistema";
  const largo = grupo.items.length > 5;
  return (
    <div className={`mx-auto overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-[var(--shadow-lift)] ${conVitrina ? "grid max-w-[60rem] grid-cols-[16rem_1fr]" : largo ? "max-w-[44rem]" : "max-w-[34rem]"}`}>
        {conVitrina ? (
          <Link href="/versiones" className="on-dark grilla-puntos flex flex-col justify-between gap-4 bg-ink p-5 text-white">
            <span className="text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white/70">Nuevo · versión {VERSION_ACTUAL.version}</span>
            <PantallaEscaner />
            <span className="inline-flex items-center gap-1.5 text-[0.95rem] font-bold">
              Ver novedades <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        ) : null}
        <div className="p-4">
          <ul className="grid grid-cols-2 gap-1">
            {grupo.items.map((i) => (
              <li key={i.href}>
                <Enlace item={i} className="flex min-h-14 items-center gap-3 rounded-2xl p-2 font-semibold leading-snug transition-colors hover:bg-blue-soft">
                  <OrbIcono Icon={i.Icon} tono={i.tono} size={36} />
                  <span className="flex flex-wrap items-center gap-x-2">
                    {i.t}
                    {i.nuevo ? <TagNuevo /> : null}
                  </span>
                </Enlace>
              </li>
            ))}
          </ul>
          {grupo.verTodo ? (
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-line px-2 pt-2">
              {conVitrina
                ? NOVEDADES.map((n) => (
                    <span key={n} className="inline-flex items-center gap-2 text-[0.9rem] font-semibold text-muted">
                      {n} <TagProximamente />
                    </span>
                  ))
                : null}
              <Link href={grupo.verTodo.href} className="ml-auto inline-flex min-h-11 items-center gap-1.5 font-bold text-blue-strong hover:underline">
                {grupo.verTodo.t} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
  );
}

/* Navegación principal de escritorio: se arma en el servidor. */
export function NavEnlaces() {
  return (
    <MenuPrincipal>
      {MENU.map((g) => (
        <Desplegable key={g.id} id={g.id} etiqueta={g.etiqueta} rutas={g.rutas}>
          <Panel grupo={g} />
        </Desplegable>
      ))}
    </MenuPrincipal>
  );
}

/* El mismo menú para el celular: un acordeón con <details>, que funciona sin JavaScript. */
export function ContenidoMenuMovil() {
  return (
    <ul className="space-y-1">
      {MENU.map((g) => (
        <li key={g.id}>
          <details className="group">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between rounded-2xl px-4 text-lg font-semibold hover:bg-blue-soft [&::-webkit-details-marker]:hidden">
              {g.etiqueta}
              <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <ul className="space-y-0.5 pb-2 pl-2 pt-1">
              {g.items.map((i) => (
                <li key={i.href}>
                  <Enlace item={i} className="flex min-h-11 items-center gap-3 rounded-2xl px-2 py-1.5 font-medium hover:bg-blue-soft">
                    <OrbIcono Icon={i.Icon} tono={i.tono} size={30} />
                    <span className="flex flex-wrap items-center gap-x-2 leading-snug">
                      {i.t}
                      {i.nuevo ? <TagNuevo /> : null}
                    </span>
                  </Enlace>
                </li>
              ))}
              {g.verTodo ? (
                <li>
                  <Link href={g.verTodo.href} className="flex min-h-11 items-center gap-1.5 rounded-2xl px-2 font-bold text-blue-strong">
                    {g.verTodo.t} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </li>
              ) : null}
            </ul>
          </details>
        </li>
      ))}
    </ul>
  );
}

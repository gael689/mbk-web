import type { ReactNode } from "react";
import type { LucideIcon } from "@/content/iconos";
import { MODULOS, TONO, type Modulo, type Tono } from "@/content/modulos";

/* Piezas chicas que se repiten en toda la página. */

/** Círculo de color pleno con el ícono adentro. */
export function Orb({ modulo, size = 64 }: { modulo: Modulo; size?: number }) {
  const t = TONO[modulo.tono];
  return (
    <span className={`orb ${t.solid} shrink-0`} style={{ width: size, height: size }}>
      <modulo.Icon style={{ width: size * 0.48, height: size * 0.48 }} strokeWidth={2} aria-hidden="true" />
    </span>
  );
}

/** Círculo de color con un ícono cualquiera (para los bloques que no son un módulo). */
export function OrbIcono({ Icon, tono, size = 48 }: { Icon: LucideIcon; tono: Tono; size?: number }) {
  return (
    <span className={`orb ${TONO[tono].solid} shrink-0`} style={{ width: size, height: size }}>
      <Icon style={{ width: size * 0.48, height: size * 0.48 }} strokeWidth={2} aria-hidden="true" />
    </span>
  );
}

/** Ícono en círculo + etiqueta en píldora pastel: la fila de sus posts. */
export function IconoModulo({ modulo, size = 64 }: { modulo: Modulo; size?: number }) {
  const t = TONO[modulo.tono];
  return (
    <li className="flex flex-col items-center gap-2 text-center">
      <Orb modulo={modulo} size={size} />
      <span className={`chip ${t.soft} -mt-1`}>{modulo.label}</span>
    </li>
  );
}

export function FilaModulos({ size = 64, className = "" }: { size?: number; className?: string }) {
  return (
    <ul className={`flex flex-wrap items-start justify-center gap-x-4 gap-y-5 sm:gap-x-7 ${className}`} aria-label="Módulos del sistema">
      {MODULOS.map((m) => (
        <IconoModulo key={m.id} modulo={m} size={size} />
      ))}
    </ul>
  );
}

export function TagNovedad({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full bg-ink px-3 py-1 text-[0.8rem] font-bold uppercase tracking-wider text-white ${className}`}>
      Novedad
    </span>
  );
}

/** Píldora pastel con el nombre de un módulo, en el color de Belén. */
export function ChipTono({ tono, children }: { tono: Tono; children: ReactNode }) {
  return <span className={`chip ${TONO[tono].soft}`}>{children}</span>;
}

/** Encabezado de sección: etiqueta + titular-pregunta + bajada. */
export function EncabezadoSeccion({
  etiqueta,
  titulo,
  bajada,
  centrado = false,
  id,
}: {
  etiqueta?: string;
  titulo: ReactNode;
  bajada?: ReactNode;
  centrado?: boolean;
  id?: string;
}) {
  return (
    <header className={`mb-10 md:mb-14 ${centrado ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`} data-reveal>
      {etiqueta ? <span className="tag">{etiqueta}</span> : null}
      <h2 id={id} className={`h2 ${etiqueta ? "mt-5" : ""}`}>
        {titulo}
      </h2>
      {bajada ? <p className="lead mt-4">{bajada}</p> : null}
    </header>
  );
}

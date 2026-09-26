/* Adornos suaves con los cuatro colores del logo. Todo decorativo (aria-hidden),
 * CSS puro, sin filtros pesados: manchas con degradé radial y barras que crecen. */

/** Las cuatro barras del logo (verde, naranja, rosa, azul), animadas una vez al cargar. */
export function BarrasLogo({ className = "", animar = true }: { className?: string; animar?: boolean }) {
  const barras = [
    ["bg-green", 46],
    ["bg-orange", 74],
    ["bg-pink", 58],
    ["bg-blue", 96],
  ] as const;
  return (
    <span className={`flex items-end gap-[8%] ${className}`} aria-hidden="true">
      {barras.map(([c, h], i) => (
        <span
          key={c}
          className={`${c} ${animar ? "bar-grow" : ""} block w-full rounded-t-[35%]`}
          style={{ height: `${h}%`, ["--d" as string]: `${0.15 + i * 0.12}s` }}
        />
      ))}
    </span>
  );
}

/** Fondo de manchas de color para el hero y las bandas. */
export function Manchas({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden="true">
      <span
        className="blob -left-[12%] -top-[18%] h-[38rem] w-[38rem]"
        style={{ background: "radial-gradient(circle, rgb(27 115 185 / 0.22), transparent 65%)" }}
      />
      <span
        className="blob -right-[10%] top-[6%] h-[34rem] w-[34rem]"
        style={{ background: "radial-gradient(circle, rgb(228 46 154 / 0.2), transparent 65%)", animationDelay: "-6s" }}
      />
      <span
        className="blob -bottom-[20%] left-[28%] h-[30rem] w-[30rem]"
        style={{ background: "radial-gradient(circle, rgb(241 88 37 / 0.18), transparent 65%)", animationDelay: "-11s" }}
      />
      <span
        className="blob -bottom-[12%] -right-[6%] h-[26rem] w-[26rem]"
        style={{ background: "radial-gradient(circle, rgb(3 145 69 / 0.17), transparent 65%)", animationDelay: "-3s" }}
      />
    </div>
  );
}

/** Borde ondulado entre dos secciones. `fondo` = color de la sección de arriba, `color` = el de la de abajo. */
export function Ola({ fondo, color, invertida = false }: { fondo: string; color: string; invertida?: boolean }) {
  return (
    <div className={fondo} aria-hidden="true">
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className={`block h-7 w-full fill-current md:h-12 ${color} ${invertida ? "-scale-x-100" : ""}`}>
        <path d="M0 28C180 64 360 0 600 24s420 40 620 8c90-14 170-14 220-4V56H0Z" />
      </svg>
    </div>
  );
}

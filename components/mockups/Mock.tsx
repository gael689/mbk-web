import type { CSSProperties, ReactNode } from "react";

/* Contenedor de los mockups. `w` = ancho de la ilustración en "em": el texto y
 * las medidas internas se escalan con el ancho real del contenedor. Los
 * mockups son decorativos: se ocultan a los lectores de pantalla y el epígrafe
 * de cada bloque explica lo que muestran. */
export function Mock({
  w,
  ratio,
  className = "",
  fluid = false,
  children,
}: {
  w: number;
  ratio?: string;
  className?: string;
  /** En pantallas angostas agranda el texto de la ilustración (los mockups chicos). */
  fluid?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`mk ${fluid ? "mk-fluid" : ""} ${className}`} style={ratio ? { aspectRatio: ratio } : undefined} aria-hidden="true">
      <div className="mk-in h-full" style={{ "--w": w } as CSSProperties}>
        {children}
      </div>
    </div>
  );
}

export function Money({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`tabular-nums ${className}`}>$&nbsp;{children}</span>;
}

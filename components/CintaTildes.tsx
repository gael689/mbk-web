import { Check } from "@/content/iconos";
import { INCLUYE_HOY } from "@/content/modulos";

/* Cinta que corre con todo lo que incluye: movimiento y tildes, sin nada que leer con atención.
 * La lista completa va una sola vez para los lectores de pantalla; la copia que cierra el giro no. */
export function CintaTildes() {
  const item = (x: string) => (
    <>
      <Check className="h-4 w-4 shrink-0 text-green-strong" strokeWidth={3} aria-hidden="true" />
      {x}
    </>
  );
  return (
    <section className="cinta border-y border-line bg-white py-3.5" aria-label="Lo que incluye el sistema">
      <div className="marquee-mask">
        <div className="marquee-track flex w-max" style={{ animationDuration: "80s" }}>
          <ul className="flex gap-7 pr-7">
            {INCLUYE_HOY.map((x) => (
              <li key={x} className="inline-flex items-center gap-2 whitespace-nowrap font-semibold">
                {item(x)}
              </li>
            ))}
          </ul>
          <ul className="flex gap-7 pr-7" aria-hidden="true">
            {INCLUYE_HOY.map((x) => (
              <li key={x} className="inline-flex items-center gap-2 whitespace-nowrap font-semibold">
                {item(x)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

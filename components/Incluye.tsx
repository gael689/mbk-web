import { TILDES } from "@/content/funciones";
import { NOVEDADES } from "@/content/modulos";
import { EncabezadoSeccion, ListaTildes, OrbIcono, TagProximamente } from "./Piezas";

/* Todo lo que incluye el sistema, en tildes. Los tildes saltan cuando la tarjeta aparece en pantalla. */
export function Incluye({ fondo = "bg-cream" }: { fondo?: string }) {
  return (
    <section id="incluye" className={`section ${fondo}`} aria-labelledby="t-incluye">
      <div className="wrap">
        <EncabezadoSeccion
          id="t-incluye"
          titulo={
            <>
              Todo lo que <span className="hl">incluye</span>
            </>
          }
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TILDES.map((g) => (
            <li key={g.id} data-reveal className="card tono-card p-6">
              <div className="flex items-center gap-3">
                <OrbIcono Icon={g.Icon} tono={g.tono} size={42} />
                <h3 className="text-[1.2rem] font-extrabold leading-tight tracking-tight">{g.titulo}</h3>
              </div>
              <ListaTildes items={g.items} className="mt-5" />
            </li>
          ))}
        </ul>
        {NOVEDADES.length ? (
          <ul className="mt-5 flex flex-wrap gap-2" data-reveal>
            {NOVEDADES.map((x) => (
              <li key={x} className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-4 py-2 font-semibold">
                <TagProximamente />
                {x}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

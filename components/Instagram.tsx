import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/content/site";
import { INSTAGRAM_REELS } from "@/content/instagram";
import { IconInstagram } from "./Marcas";
import { ReelCard } from "./ReelCard";

/* 11 · Instagram. Sin API de Meta no se puede leer el feed, así que: el bloque
 * "Seguinos en Instagram" siempre, y las tarjetas de los reels cargados a mano
 * en content/instagram.ts (portada propia; el reproductor se abre al tocar). */
export function Instagram({ max = 6 }: { max?: number } = {}) {
  const reels = INSTAGRAM_REELS.slice(0, max);

  return (
    <section id="instagram" className="section" aria-labelledby="t-instagram">
      <div className="wrap">
        <div data-reveal className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="orb h-12 w-12 shrink-0 bg-pink-strong">
              <IconInstagram className="h-6 w-6" />
            </span>
            <div>
              <h2 id="t-instagram" className="h3">
                Seguinos en <span className="hl">Instagram</span>
              </h2>
              <p className="mt-1 max-w-xl text-ink/80">
                Tips para ordenar tu negocio, tutoriales del sistema y novedades, todas las semanas en {INSTAGRAM_HANDLE}.
              </p>
            </div>
          </div>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-pink shrink-0 self-start sm:self-auto">
            <IconInstagram className="h-5 w-5" />
            Ir a {INSTAGRAM_HANDLE}
          </a>
        </div>

        {reels.length > 0 ? (
          <div
            data-reveal
            className="-mx-4 mt-6 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:scroll-px-0 sm:px-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:pb-0"
          >
            {reels.map((r) => (
              <ReelCard key={r.id} reel={r} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

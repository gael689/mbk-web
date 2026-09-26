import { ArrowUpRight } from "@/content/iconos";
import { YOUTUBE_URL } from "@/content/site";
import { ultimosVideos } from "@/lib/youtube";
import { IconYouTube } from "./Marcas";
import { EncabezadoSeccion } from "./Piezas";
import { VideoCard } from "./VideoCard";

/* 7 · Miralo funcionar: los tutoriales del canal (feed RSS, revalidado cada 6 h). */
export async function Demo() {
  const videos = await ultimosVideos(6);

  return (
    <section id="demo" className="section" aria-labelledby="t-demo">
      <div className="wrap">
        <EncabezadoSeccion
          id="t-demo"
          etiqueta="Miralo funcionar"
          titulo={
            <>
              ¿Cómo se carga una venta? <span className="hl">Mirá los tutoriales</span>
            </>
          }
          bajada="Videos cortos de Belén, paso a paso, para que veas el sistema en uso antes de probarlo."
        />

        {videos.length > 0 ? (
          <>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((v) => (
                <li key={v.id} data-reveal>
                  <VideoCard id={v.id} titulo={v.titulo} miniatura={v.miniatura} />
                </li>
              ))}
            </ul>
            <div className="mt-8 text-center">
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-line">
                <IconYouTube className="h-6 w-6 text-[#c4302b]" />
                Ver todos en YouTube
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </>
        ) : (
          /* Si el feed falla o viene vacío, una tarjeta con el link al canal. */
          <div data-reveal className="card mx-auto flex max-w-2xl flex-col items-center gap-5 p-8 text-center sm:p-10">
            <span className="orb h-16 w-16 bg-[#c4302b]">
              <IconYouTube className="h-8 w-8" />
            </span>
            <h3 className="h3">Los tutoriales están en el canal de MBK</h3>
            <p className="text-muted">Cómo cargar una venta, un turno, un costo y más, explicado paso a paso.</p>
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-pink">
              Ir al canal de YouTube
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

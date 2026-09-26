import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/content/site";
import { INSTAGRAM_POSTS } from "@/content/instagram";
import { IconInstagram } from "./Marcas";

/* Solo se embeben URLs con esta forma (evita meter cualquier cosa en un iframe). */
const POST = /^https:\/\/www\.instagram\.com\/(p|reel)\/([\w-]+)\/?$/;

/* 11 · Instagram. Sin API key no se puede leer el feed, así que: el bloque
 * "Seguinos en Instagram" siempre, y los posts embebidos si se pegaron URLs
 * en content/instagram.ts. */
export function Instagram() {
  const posts = INSTAGRAM_POSTS.map((u) => u.match(POST)).filter((m): m is RegExpMatchArray => !!m).slice(0, 6);

  return (
    <section id="instagram" className="section" aria-labelledby="t-instagram">
      <div className="wrap">
        <div data-reveal className="relative overflow-hidden rounded-[2.5rem] bg-pink-soft p-8 sm:p-12">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-pink/15" aria-hidden="true" />
          <div className="absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-orange/15" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <span className="orb h-14 w-14 bg-pink-strong">
              <IconInstagram className="h-7 w-7" />
            </span>
            <h2 id="t-instagram" className="h2 mt-5">
              Seguinos en <span className="hl">Instagram</span>
            </h2>
            <p className="lead mt-3 !text-ink/80">
              Tips para ordenar tu negocio, tutoriales del sistema y novedades, todas las semanas en {INSTAGRAM_HANDLE}.
            </p>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-pink mt-7">
              <IconInstagram className="h-5 w-5" />
              Ir a {INSTAGRAM_HANDLE}
            </a>
          </div>
        </div>

        {posts.length > 0 ? (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((m) => (
              <li key={m[0]} className="overflow-hidden rounded-[1.5rem] border border-line bg-white">
                <iframe
                  src={`https://www.instagram.com/${m[1]}/${m[2]}/embed`}
                  title="Publicación de Instagram de MBK"
                  loading="lazy"
                  className="h-[34rem] w-full"
                />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

import { BotonCookies } from "@/components/BotonCookies";
import { Actualizado } from "@/components/Actualizado";
import { SubHero } from "@/components/SubPagina";
import { ULTIMA_MODIFICACION } from "@/content/fechas";
import { metaPagina } from "@/lib/meta";

export const metadata = metaPagina({
  titulo: "Política de cookies",
  descripcion: "Qué cookies y servicios de terceros usa la web de MBK Consultoría, para qué sirven y cómo cambiar tu elección.",
  ruta: "/cookies",
});

const FILAS: { nombre: string; quien: string; para: string; cuando: string }[] = [
  {
    nombre: "mbk_cookies",
    quien: "MBK (propia)",
    para: "Recordar qué elegiste en el aviso de cookies. Dura 180 días.",
    cuando: "Siempre. Es necesaria y no guarda nada personal.",
  },
  {
    nombre: "Medición de visitas (Vercel Web Analytics)",
    quien: "Vercel",
    para: "Contar visitas y clics (por ejemplo en WhatsApp o en “Solicitar demo”) para saber qué páginas sirven. No usa cookies ni te sigue entre sitios web.",
    cuando: "Solo si permitís la medición de visitas.",
  },
  {
    nombre: "Videos de YouTube (youtube-nocookie.com)",
    quien: "Google",
    para: "Reproducir los tutoriales dentro de la web. YouTube puede guardar cookies cuando se reproduce un video.",
    cuando: "Solo si permitís los contenidos de terceros y tocás play.",
  },
  {
    nombre: "Reels de Instagram (instagram.com)",
    quien: "Meta",
    para: "Reproducir los reels dentro de la web. Instagram puede guardar cookies cuando se reproduce un reel.",
    cuando: "Solo si permitís los contenidos de terceros y abrís el reel.",
  },
];

const h2 = "mt-10 text-[1.5rem] font-extrabold tracking-tight";
const p = "mt-3 max-w-3xl text-[1.05rem] leading-relaxed";

export default function Cookies() {
  return (
    <>
      <SubHero
        etiqueta="Legales"
        tono="violet"
        titulo={
          <>
            Política de <span className="hl">cookies</span>
          </>
        }
        bajada="Qué guarda esta web en tu dispositivo, qué cargan los servicios de terceros y cómo cambiar tu elección."
      />
      <section className="pb-10 md:pb-16" aria-label="Contenido de la política de cookies">
        <div className="wrap">
          <h2 className={h2.replace("mt-10", "mt-0")}>Qué son las cookies</h2>
          <p className={p}>
            Son pequeños archivos que un sitio guarda en tu navegador para recordar algo. Esta web usa lo mínimo: una cookie propia para recordar tu elección y,
            solo si lo permitís, servicios de terceros para medir visitas y mostrar videos.
          </p>

          <h2 className={h2}>Qué usamos</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-left text-[1rem]">
              <caption className="sr-only">Cookies y servicios de terceros de la web</caption>
              <thead>
                <tr className="border-b-2 border-ink">
                  <th scope="col" className="py-2 pr-4 font-extrabold">
                    Qué es
                  </th>
                  <th scope="col" className="py-2 pr-4 font-extrabold">
                    Quién
                  </th>
                  <th scope="col" className="py-2 pr-4 font-extrabold">
                    Para qué
                  </th>
                  <th scope="col" className="py-2 font-extrabold">
                    Cuándo se carga
                  </th>
                </tr>
              </thead>
              <tbody>
                {FILAS.map((f) => (
                  <tr key={f.nombre} className="border-b border-line align-top">
                    <th scope="row" className="py-3 pr-4 font-bold">
                      {f.nombre}
                    </th>
                    <td className="py-3 pr-4">{f.quien}</td>
                    <td className="py-3 pr-4">{f.para}</td>
                    <td className="py-3">{f.cuando}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={p}>
            Las miniaturas de los videos se piden a los servidores de YouTube (i.ytimg.com) al cargar la página, sin cookies. La tipografía y las imágenes de la web se
            sirven desde el propio sitio.
          </p>

          <h2 className={h2}>Cómo cambiar tu elección</h2>
          <p className={p}>
            Podés volver a elegir cuando quieras, y también aparece el aviso si borrás las cookies de tu navegador. Además, podés bloquear o borrar cookies desde la
            configuración del navegador.
          </p>
          <p className="mt-4">
            <BotonCookies className="btn btn-pink">Configurar cookies</BotonCookies>
          </p>

          <h2 className={h2}>Enlaces a otros sitios</h2>
          <p className={p}>
            Desde la web podés ir a WhatsApp, Instagram, YouTube, la tienda de planillas (Tienda Nube) y el Sistema MBK. Cada uno tiene sus propias cookies y su propia
            política, que se aplican cuando entrás a ellos.
          </p>

          <h2 className={h2}>Contacto</h2>
          <p className={p}>Si tenés dudas sobre esta política, escribinos por WhatsApp desde el botón de la página.</p>
        </div>
      </section>
      <Actualizado fecha={ULTIMA_MODIFICACION.cookies} />
    </>
  );
}

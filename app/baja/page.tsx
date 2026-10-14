import type { Metadata } from "next";
import Link from "next/link";
import { whatsappUrl } from "@/content/site";

export const metadata: Metadata = {
  title: "Dejar de recibir mails",
  robots: { index: false, follow: false },
};

/* Baja de los mails de presentación de MBK. El link del mail trae ?t=<token>; la baja se confirma
 * con un botón (POST a /api/baja), nunca solo por abrir el link. */
export default async function Baja({ searchParams }: PageProps<"/baja">) {
  const q = await searchParams;
  const t = typeof q.t === "string" ? q.t : "";
  const listo = q.listo === "1";
  const error = q.error === "1";

  return (
    <section className="section">
      <div className="wrap max-w-xl">
        <h1 className="h2">{listo ? "Listo, no te vamos a escribir más" : "Dejar de recibir mails de MBK"}</h1>

        {listo ? (
          <p className="mt-4 text-[1.1rem] leading-relaxed text-muted">
            Quedó registrado: no vas a recibir más mails de presentación de MBK Consultoría. Si fue un error o en algún momento
            querés saber del Sistema MBK, escribinos cuando quieras.
          </p>
        ) : t ? (
          <>
            <p className="mt-4 text-[1.1rem] leading-relaxed text-muted">
              Si confirmás, no te vamos a mandar más mails de presentación de MBK Consultoría.
            </p>
            {error && (
              <p className="mt-4 rounded-2xl bg-orange-soft px-4 py-3 text-[1rem]" role="alert">
                No pudimos registrarlo. Probá de nuevo en un rato, o respondé el mail con la palabra BAJA.
              </p>
            )}
            <form method="post" action="/api/baja" className="mt-6">
              <input type="hidden" name="t" value={t} />
              <button type="submit" className="btn btn-pink">
                Confirmar
              </button>
            </form>
          </>
        ) : (
          <p className="mt-4 text-[1.1rem] leading-relaxed text-muted">
            {error ? "El link no es válido. " : "Para darte de baja usá el link que viene al pie del mail. "}
            También podés responder el mail con la palabra BAJA y lo hacemos a mano.
          </p>
        )}

        <p className="mt-10 text-[0.95rem] text-muted">
          <Link href="/" className="underline underline-offset-2">
            Ir a la web de MBK
          </Link>
          {" · "}
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
            WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}

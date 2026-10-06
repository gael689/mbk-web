"use client";

import { guardarConsentimiento, useConsentimiento } from "@/lib/consentimiento";

/* Se muestra en lugar de un reproductor de YouTube o Instagram mientras la persona no
 * permitió los contenidos de terceros: explica qué pasa y deja elegir. */
export function AvisoTerceros({ servicio, href, onCancelar }: { servicio: "YouTube" | "Instagram"; href: string; onCancelar: () => void }) {
  const actual = useConsentimiento();
  return (
    <div className="absolute inset-0 grid place-items-center overflow-auto bg-white p-4 text-center text-ink">
      <div className="max-w-sm">
        <p className="text-[1rem] font-bold leading-snug">Para reproducirlo se carga {servicio}, que puede guardar cookies en tu dispositivo.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button type="button" onClick={() => guardarConsentimiento({ medicion: actual?.medicion ?? false, terceros: true })} className="btn btn-pink btn-sm">
            Aceptar y ver
          </button>
          <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-line btn-sm">
            Verlo en {servicio}
          </a>
        </div>
        <button type="button" onClick={onCancelar} className="mt-3 inline-flex min-h-11 items-center px-2 font-semibold underline underline-offset-2">
          Ahora no
        </button>
      </div>
    </div>
  );
}

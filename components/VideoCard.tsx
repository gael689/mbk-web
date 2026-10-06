"use client";

import { useState } from "react";
import { Play } from "@/content/iconos";
import { registrar } from "@/lib/analytics";
import { useConsentimiento } from "@/lib/consentimiento";
import { AvisoTerceros } from "./AvisoTerceros";

/* Video de YouTube "liviano": al principio es solo la miniatura, y el reproductor
 * (youtube-nocookie) se carga recién cuando la persona toca play Y permitió los contenidos
 * de terceros; si no, se le explica y puede aceptar o abrirlo en YouTube. */
export function VideoCard({ id, titulo, miniatura }: { id: string; titulo: string; miniatura: string }) {
  const [activo, setActivo] = useState(false);
  const consentimiento = useConsentimiento();

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-[var(--shadow-soft)]">
      <div className="relative aspect-video bg-ink">
        {activo && !consentimiento?.terceros ? (
          <AvisoTerceros servicio="YouTube" href={`https://www.youtube.com/watch?v=${id}`} onCancelar={() => setActivo(false)} />
        ) : activo ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={titulo}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              registrar("reproduce_video", { video: id });
              setActivo(true);
            }}
            className="group absolute inset-0 block h-full w-full"
            aria-label={`Reproducir: ${titulo}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={miniatura} alt="" loading="lazy" width={480} height={360} className="h-full w-full object-cover" />
            <span className="absolute inset-0 bg-black/5 transition-colors group-hover:bg-black/20">
              <span className="absolute bottom-3 right-3 grid h-12 w-12 place-items-center rounded-full bg-pink-strong text-white shadow-lg transition-transform group-hover:scale-110">
                <Play className="h-5 w-5 translate-x-0.5" fill="currentColor" aria-hidden="true" />
              </span>
            </span>
          </button>
        )}
      </div>
      <p className="p-4 text-[1.02rem] font-bold leading-snug">{titulo}</p>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { Play } from "@/content/iconos";
import type { Reel } from "@/content/instagram";
import { registrar } from "@/lib/analytics";

/* Reel de Instagram "liviano": al principio es solo la portada. El reproductor de Instagram
 * se carga recién cuando la persona toca la tarjeta, dentro de una ventana encima de la página. */
export function ReelCard({ reel }: { reel: Reel }) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const [abierto, setAbierto] = useState(false);

  const abrir = () => {
    registrar("reproduce_video", { video: reel.id });
    setAbierto(true);
    dialogo.current?.showModal();
  };

  return (
    <div className="w-[62%] shrink-0 snap-start sm:w-[14rem] lg:w-auto">
      <button
        type="button"
        onClick={abrir}
        className="group relative block aspect-[9/16] w-full overflow-hidden rounded-[1.5rem] bg-ink shadow-[var(--shadow-soft)]"
        aria-label={`Ver el reel: ${reel.titulo}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={reel.portada}
          alt=""
          loading="lazy"
          width={540}
          height={960}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-black/5 transition-colors group-hover:bg-black/20" />
        <span className="absolute bottom-3 right-3 grid h-12 w-12 place-items-center rounded-full bg-pink-strong text-white shadow-lg transition-transform group-hover:scale-110">
          <Play className="h-5 w-5 translate-x-0.5" fill="currentColor" aria-hidden="true" />
        </span>
      </button>
      <p className="mt-3 px-1 text-[1.02rem] font-bold leading-snug">{reel.titulo}</p>

      <dialog
        ref={dialogo}
        onClose={() => setAbierto(false)}
        onClick={(e) => {
          if (e.target === dialogo.current) dialogo.current?.close();
        }}
        aria-label={reel.titulo}
        className="m-auto overflow-visible border-0 bg-transparent p-0 backdrop:bg-black/70"
      >
        {abierto ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => dialogo.current?.close()}
              className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full bg-white text-xl font-bold leading-none text-ink"
              aria-label="Cerrar"
            >
              ×
            </button>
            <div className="overflow-hidden rounded-[1.5rem] bg-white">
              <iframe
                src={`https://www.instagram.com/reel/${reel.id}/embed`}
                title={`Reel de Instagram: ${reel.titulo}`}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="block h-[min(78vh,44rem)] w-[min(92vw,26rem)]"
              />
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}

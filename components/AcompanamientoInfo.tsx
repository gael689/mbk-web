"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, Check } from "@/content/iconos";

/* Botón "¿En qué consiste?" de la tarjeta Sistema + Belén: abre una ventana corta con lo que incluye
 * el acompañamiento. Solo se afirma lo que ya dice la web (panel de asesora, entender los números,
 * forma a medida): nada de frecuencias ni reuniones, que Belén todavía no definió. */
const PUNTOS = [
  "Usás el Sistema MBK completo.",
  "Nuestro equipo ve tu negocio desde el panel de asesoría.",
  "Te acompaña a entender tus números y a decidir.",
  "La forma se arma con vos, según tu negocio.",
];

export function AcompanamientoInfo() {
  const dialogo = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button type="button" onClick={() => dialogo.current?.showModal()} className="btn btn-pink mt-6 self-center">
        ¿En qué consiste?
        <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </button>

      <dialog
        ref={dialogo}
        aria-labelledby="t-acomp"
        onClick={(e) => {
          if (e.target === dialogo.current) dialogo.current?.close();
        }}
        className="m-auto w-[min(92vw,28rem)] overflow-visible rounded-[2rem] border-0 bg-white p-0 text-left backdrop:bg-black/60"
      >
        <div className="relative p-7 sm:p-8">
          <button
            type="button"
            onClick={() => dialogo.current?.close()}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-cream text-xl font-bold leading-none"
            aria-label="Cerrar"
          >
            ×
          </button>
          <p className="tag">Acompañamiento</p>
          <h3 id="t-acomp" className="mt-4 pr-8 text-[1.5rem] font-extrabold leading-tight tracking-tight">
            ¿En qué consiste el acompañamiento?
          </h3>
          <ul className="mt-5 space-y-3">
            {PUNTOS.map((p) => (
              <li key={p} className="flex gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-white">
                  <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <Link href="/?acomp=1&demo=1#probar" onClick={() => dialogo.current?.close()} className="btn btn-pink mt-7 w-full justify-center">
            Solicitar demo con acompañamiento
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </dialog>
    </>
  );
}

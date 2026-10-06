"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { alAbrirPreferencias, guardarConsentimiento, useConsentimiento, useCrudoConsentimiento } from "@/lib/consentimiento";

/* Aviso de cookies. Aparece solo si la persona nunca eligió (o desde "Configurar cookies"),
 * con "Rechazar" y "Aceptar" de igual peso, y la opción de elegir por tipo. Hasta que
 * elige, no se carga medición ni reproductores de terceros. */
export function Cookies() {
  const crudo = useCrudoConsentimiento();
  const actual = useConsentimiento();
  const [reabierto, setReabierto] = useState(false);
  const [elegir, setElegir] = useState(false);
  const [medicion, setMedicion] = useState(false);
  const [terceros, setTerceros] = useState(false);
  const caja = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      alAbrirPreferencias(() => {
        setMedicion(actual?.medicion ?? false);
        setTerceros(actual?.terceros ?? false);
        setElegir(true);
        setReabierto(true);
      }),
    [actual],
  );

  const visible = crudo === null || reabierto;
  useEffect(() => {
    if (reabierto) caja.current?.focus();
  }, [reabierto]);

  if (!visible) return null;

  const cerrar = (c: { medicion: boolean; terceros: boolean }) => {
    guardarConsentimiento(c);
    setReabierto(false);
    setElegir(false);
  };

  return (
    <div
      ref={caja}
      tabIndex={-1}
      role="dialog"
      aria-modal="false"
      aria-labelledby="t-cookies"
      className="fixed bottom-24 left-4 right-4 z-[60] rounded-3xl border border-line bg-white p-5 text-ink shadow-[var(--shadow-lift)] outline-none sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md"
    >
      <h2 id="t-cookies" className="text-[1.1rem] font-extrabold">
        Cookies
      </h2>
      <p className="mt-2 text-[0.98rem] leading-snug text-muted">
        Para medir las visitas y mostrar videos de YouTube e Instagram usamos servicios de terceros. No cargamos nada de eso sin tu permiso.{" "}
        <Link href="/cookies" className="font-semibold text-ink underline underline-offset-2">
          Más información
        </Link>
        .
      </p>

      {elegir ? (
        <fieldset className="mt-4 space-y-3">
          <legend className="sr-only">Elegí qué permitir</legend>
          <label className="flex min-h-11 items-start gap-3">
            <input type="checkbox" checked disabled className="mt-1 h-5 w-5 shrink-0" />
            <span className="text-[0.98rem] leading-snug">
              <strong>Necesarias.</strong> Recuerdan esta elección. Siempre activas.
            </span>
          </label>
          <label className="flex min-h-11 cursor-pointer items-start gap-3">
            <input type="checkbox" checked={medicion} onChange={(e) => setMedicion(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#c4187e]" />
            <span className="text-[0.98rem] leading-snug">
              <strong>Medición de visitas.</strong> Cuenta visitas y clics, sin cookies de seguimiento.
            </span>
          </label>
          <label className="flex min-h-11 cursor-pointer items-start gap-3">
            <input type="checkbox" checked={terceros} onChange={(e) => setTerceros(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#c4187e]" />
            <span className="text-[0.98rem] leading-snug">
              <strong>Videos de YouTube e Instagram.</strong> Pueden guardar sus propias cookies.
            </span>
          </label>
          <button type="button" onClick={() => cerrar({ medicion, terceros })} className="btn btn-line btn-sm w-full">
            Guardar mi elección
          </button>
        </fieldset>
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => cerrar({ medicion: false, terceros: false })} className="btn btn-line btn-sm">
            Rechazar
          </button>
          <button type="button" onClick={() => cerrar({ medicion: true, terceros: true })} className="btn btn-line btn-sm">
            Aceptar
          </button>
          <button
            type="button"
            onClick={() => {
              setMedicion(false);
              setTerceros(false);
              setElegir(true);
            }}
            className="inline-flex min-h-11 items-center px-2 font-semibold underline underline-offset-2"
          >
            Elegir
          </button>
        </div>
      )}
    </div>
  );
}

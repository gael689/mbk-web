import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@/content/iconos";
import { VERSION_ACTUAL } from "@/content/versiones";
import { PantallaBuscador, PantallaEscaner, PantallaOrden, PantallaPorPagar, PantallaRecomendacion, PantallaVariantes } from "./mockups/Pantallitas";

/* Cuatro palabras por tarjeta: la pantallita hace el trabajo. Lo demás se cuenta en la demo. */
const TARJETAS: { id: string; t: string; pantalla: ReactNode }[] = [
  { id: "codigos", t: "Escaneá con el celular", pantalla: <PantallaEscaner /> },
  { id: "variantes", t: "Stock por talle y color", pantalla: <PantallaVariantes /> },
  { id: "ordenes", t: "Órdenes con tu logo", pantalla: <PantallaOrden /> },
  { id: "por-pagar", t: "Avisos antes de que venza", pantalla: <PantallaPorPagar /> },
  { id: "metas", t: "Tu meta, día por día", pantalla: <PantallaRecomendacion /> },
  { id: "buscador", t: "Encontrá todo al toque", pantalla: <PantallaBuscador /> },
];

/* Lo nuevo de la versión actual: banda oscura con pantallitas animadas y una sola acción. */
export function LoNuevo() {
  return (
    <section id="lo-nuevo" className="on-dark grilla-puntos relative isolate overflow-hidden bg-ink py-16 text-white md:py-24" aria-labelledby="t-nuevo">
      <div className="wrap">
        <header className="mb-10 md:mb-12" data-reveal>
          <span className="tag">Versión {VERSION_ACTUAL.version}</span>
          <h2 id="t-nuevo" className="h2 mt-5">
            Mirá lo que hace <span className="text-[#ff7cc8]">ahora</span>
          </h2>
        </header>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TARJETAS.map((c) => (
            <li key={c.id} id={c.id} data-reveal className="flex flex-col rounded-[1.75rem] border border-white/15 bg-white/[0.06] p-4 transition-colors hover:border-white/35">
              <div className="flex flex-1 flex-col justify-center">{c.pantalla}</div>
              <p className="mt-4 px-1 text-[1.15rem] font-extrabold leading-snug tracking-tight">{c.t}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center" data-reveal>
          <Link href="/?demo=1#probar" className="btn btn-pink">
            Quiero verlo funcionando
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          <p className="text-[0.86rem] text-white/60">Ilustraciones con datos de ejemplo.</p>
        </div>
      </div>
    </section>
  );
}

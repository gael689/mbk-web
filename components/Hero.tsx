import Link from "next/link";
import { ArrowRight } from "@/content/iconos";
import { HERO_PHOTO } from "@/content/site";
import { Manchas } from "./Decoracion";
import { EscenaEscritorio } from "./Dispositivos";
import { FilaModulos } from "./Piezas";

export function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden pb-12 pt-8 md:pb-16 md:pt-14">
      <Manchas />
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          <span className="tag rise">Sistema MBK</span>
          <h1 className="display h1 mt-5">
            ¿Vendés todos los días y no sabés <span className="hl">cuánto ganás</span>?
          </h1>
          <p className="rise mt-6 max-w-xl text-[1.3rem] font-medium leading-snug sm:text-[1.5rem]" style={{ ["--d" as string]: "0.16s" }}>
            Mirá cómo saberlo en el <span className="font-extrabold text-pink-strong">Sistema MBK</span>.
          </p>
          <p className="lead rise mt-4 max-w-xl" style={{ ["--d" as string]: "0.22s" }}>
            Ventas, cobros, costos, clientes y turnos en un solo lugar, desde el celular. Pensado por una economista que trabaja todos los días
            con emprendedores y pymes.
          </p>
          <div className="rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "0.3s" }}>
            <Link href="/#probar" className="btn btn-pink">
              Quiero probar MBK
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link href="/sistema" className="btn btn-line">
              Ver cómo funciona
            </Link>
          </div>
        </div>

        <div className="rise" style={{ ["--d" as string]: "0.2s" }}>
          <EscenaEscritorio foto={HERO_PHOTO} />
        </div>
      </div>

      <div className="wrap mt-10 md:mt-14">
        <FilaModulos size={64} />
      </div>
    </section>
  );
}

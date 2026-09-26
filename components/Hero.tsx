import { ArrowRight } from "@/content/iconos";
import { HERO_PHOTO } from "@/content/site";
import { EscenaEscritorio } from "./Dispositivos";
import { FilaModulos } from "./Piezas";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pb-14 pt-8 md:pb-20 md:pt-14">
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
            Ventas, cobros, costos, clientes y turnos en un solo lugar, desde el celular. Es un sistema de gestión pensado por una economista
            que trabaja todos los días con emprendedores y pymes.
          </p>
          <div className="rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "0.3s" }}>
            <a href="#probar" className="btn btn-pink">
              Quiero probar MBK
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href="#como-funciona" className="btn btn-line">
              Ver cómo funciona
            </a>
          </div>
          <p className="rise mt-5 text-[0.98rem] text-muted" style={{ ["--d" as string]: "0.36s" }}>
            Creado por Belén Klundt, Lic. y Prof. en Economía · Bahía Blanca
          </p>
        </div>

        <div className="rise" style={{ ["--d" as string]: "0.2s" }}>
          <EscenaEscritorio foto={HERO_PHOTO} />
        </div>
      </div>

      <div className="wrap mt-12 md:mt-16">
        <FilaModulos size={68} />
      </div>
    </section>
  );
}

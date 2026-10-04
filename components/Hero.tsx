import Link from "next/link";
import { ArrowRight } from "@/content/iconos";
import { Manchas } from "./Decoracion";
import { EscenaSistema } from "./EscenaSistema";
import { MODULOS_HERO } from "@/content/modulos";
import { Metricas } from "./Metricas";
import { FilaModulos } from "./Piezas";

export function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden pb-12 pt-8 md:pb-16 md:pt-14">
      <Manchas />
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          <span className="tag rise">Sistema MBK</span>
          <h1 className="display h1 rise mt-5" style={{ ["--d" as string]: "0.08s" }}>
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
            <Link href="/?demo=1#probar" className="btn btn-pink">
              Solicitar demo
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link href="/sistema" className="btn btn-line">
              Ver cómo funciona
            </Link>
          </div>
          <p className="rise mt-4 font-semibold text-ink/80" style={{ ["--d" as string]: "0.38s" }}>
            Te mostramos el sistema funcionando. Sin compromiso.
          </p>
        </div>

        <div className="rise" style={{ ["--d" as string]: "0.2s" }}>
          <div className="lg:w-[120%]">
            <EscenaSistema />
          </div>
        </div>
      </div>

      <div className="wrap mt-10 md:mt-14">
        <FilaModulos size={64} modulos={MODULOS_HERO} className="mx-auto max-w-[58rem]" />
      </div>

      <div className="wrap mt-10 md:mt-12">
        <Metricas />
      </div>
    </section>
  );
}

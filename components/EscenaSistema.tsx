import Image from "next/image";
import { Bell, Check, Wallet } from "@/content/iconos";
import { BarrasLogo } from "./Decoracion";

/* Avisos que aparecen de a uno sobre la escena, como si el sistema estuviera andando. Decorativos. */
const AVISOS = [
  { Icon: Check, t: "Venta registrada", c: "bg-green-strong" },
  { Icon: Wallet, t: "Te pagaron por transferencia", c: "bg-blue-strong" },
  { Icon: Bell, t: "Queda poco stock", c: "bg-orange-strong" },
];

/* La imagen del hero: el sistema de verdad (capturas del negocio de ejemplo "Estilo Sur", con datos
 * ficticios) en una notebook y un celular. Las capturas se regeneran con el script de
 * capturas (ver README) cuando el sistema cambie. */
export function EscenaSistema() {
  return (
    <div
      className="relative isolate aspect-[5/4.4] overflow-hidden rounded-[2.5rem] shadow-[var(--shadow-lift)] sm:aspect-[5/3.9] lg:aspect-[1/0.86]"
      style={{ background: "linear-gradient(160deg,#e6f1fb 0%,#fbe6f2 58%,#ffece1 100%)" }}
    >
      <div className="absolute -left-[10%] -top-[20%] h-[80%] w-[70%] rounded-full bg-white/60 blur-3xl" aria-hidden="true" />
      <BarrasLogo className="absolute right-[7%] top-[6%] h-[15%] w-[8%]" />

      {/* Notebook */}
      <div className="absolute left-[2%] top-[9%] w-[93%]" style={{ fontSize: "clamp(8px, 1.4vw, 15px)" }}>
        <div className="rounded-t-[1.1em] bg-[#1c1a19] p-[0.55em] shadow-[0_30px_50px_-20px_rgba(60,30,10,0.55)]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[0.5em] bg-white">
            <Image
              src="/capturas/web/laptop.webp"
              alt="El Dashboard del Sistema MBK en una notebook: ventas, cobros, gastos, resultado del mes, meta y medios de pago (datos de ejemplo)"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover object-top"
            />
          </div>
        </div>
        <div className="mx-[-3%] h-[1.1em] rounded-b-[1.4em] bg-gradient-to-b from-[#d9d5d0] to-[#a9a49e] shadow-[0_10px_18px_-8px_rgba(60,30,10,0.55)]">
          <div className="mx-auto h-[0.35em] w-[18%] rounded-b-[0.4em] bg-[#8d8781]" />
        </div>
      </div>

      <div className="absolute bottom-[5%] left-[4%] z-10 grid" aria-hidden="true">
        {AVISOS.map((a, i) => (
          <span
            key={a.t}
            style={{ ["--d" as string]: `${i * 3}s` }}
            className="an-aviso col-start-1 row-start-1 flex items-center gap-2 self-end justify-self-start rounded-full bg-white py-1.5 pl-1.5 pr-3.5 text-[clamp(0.72rem,1.6vw,0.92rem)] font-semibold shadow-[var(--shadow-lift)]"
          >
            <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-white ${a.c}`}>
              <a.Icon className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            {a.t}
          </span>
        ))}
      </div>

      {/* Celular: cargando una venta */}
      <div className="float absolute bottom-[3%] right-[3%] w-[25%] rounded-[2.1rem] border-[5px] border-[#1c1a19] bg-[#1c1a19] shadow-[0_28px_44px_-16px_rgba(60,30,10,0.6)]">
        <div className="relative aspect-[585/1266] overflow-hidden rounded-[1.7rem] bg-white">
          <span className="absolute left-1/2 top-[1.5%] z-10 h-[1.6%] w-[26%] -translate-x-1/2 rounded-full bg-[#1c1a19]" aria-hidden="true" />
          <Image
            src="/capturas/web/celular.webp"
            alt="Cargar una venta desde el celular en el Sistema MBK (datos de ejemplo)"
            fill
            sizes="(min-width: 1024px) 12vw, 22vw"
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

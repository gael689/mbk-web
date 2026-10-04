"use client";

import { useEffect, useRef, useState } from "react";
import { Package, ShoppingCart, Store, Users, type LucideIcon } from "@/content/iconos";
import { METRICAS, METRICAS_AL } from "@/content/metricas";
import { TONO } from "@/content/modulos";

const fmt = new Intl.NumberFormat("es-AR");
const ICONOS: Record<(typeof METRICAS)[number]["id"], LucideIcon> = { negocios: Store, ventas: ShoppingCart, clientes: Users, productos: Package };

type Fase = "listo" | "armado" | "giro";

/* Un dígito como rodillo de odómetro: una tira de 0 a 9 (repetida) que sube hasta frenar en su
 * número. Los dígitos de más a la izquierda dan más vueltas y frenan después. */
function Rodillo({ digito, lugar, retraso, fase }: { digito: number; lugar: number; retraso: number; fase: Fase }) {
  const vueltas = 1 + Math.min(lugar, 2);
  const destino = fase === "armado" ? 0 : vueltas * 10 + digito;
  const final = fase === "listo" ? digito : destino;
  return (
    <span className="relative inline-block h-[1em] w-[0.62em] overflow-hidden align-top" aria-hidden="true">
      <span
        className="absolute inset-x-0 top-0 flex flex-col"
        style={{
          transform: `translateY(${-final}em)`,
          transition: fase === "giro" ? `transform ${1500 + lugar * 350}ms cubic-bezier(0.16, 0.8, 0.2, 1) ${retraso}ms` : "none",
        }}
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i} className="block h-[1em] text-center leading-none">
            {i % 10}
          </span>
        ))}
      </span>
    </span>
  );
}

function Odometro({ valor, retraso, fase }: { valor: number; retraso: number; fase: Fase }) {
  const texto = fmt.format(valor); // ej. "2.000"
  const caracteres = texto.split("");
  // Lugar de cada dígito contando desde la derecha (unidades = 0): se calcula antes del render.
  const lugares = caracteres.map((_, i) => caracteres.slice(i + 1).filter((c) => /\d/.test(c)).length);
  return (
    <span className="inline-flex items-start font-extrabold leading-none tracking-tight">
      <span aria-hidden="true" className="mr-[0.04em]">
        +
      </span>
      {caracteres.map((c, i) => {
        if (!/\d/.test(c)) {
          return (
            <span key={i} aria-hidden="true" className="inline-block w-[0.3em] text-center">
              {c}
            </span>
          );
        }
        return <Rodillo key={i} digito={Number(c)} lugar={lugares[i]} retraso={retraso} fase={fase} />;
      })}
    </span>
  );
}

/* Números reales de uso, en una fila y sin caja. Cada cifra es un odómetro que gira la primera vez
 * que se ve la franja. El HTML ya trae los valores finales (Google, sin JS o con "reducir
 * movimiento"): el giro es solo un efecto. */
export function Metricas() {
  const ref = useRef<HTMLDListElement>(null);
  const [fase, setFase] = useState<Fase>("listo");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    let temporizador = 0;
    setFase("armado");
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        // Un cuadro después de armar, para que el giro arranque desde cero.
        temporizador = window.setTimeout(() => setFase("giro"), 60);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(temporizador);
    };
  }, []);

  return (
    <div className="rise" style={{ ["--d" as string]: "0.7s" }}>
      <dl ref={ref} className="grid grid-cols-4 gap-x-2 sm:gap-x-8 md:gap-x-12">
        {METRICAS.map((m, i) => {
          const Icon = ICONOS[m.id];
          return (
            <div key={m.id} className="flex flex-col-reverse justify-end text-center sm:text-left">
              <dt className="mt-2 flex items-center justify-center gap-1.5 text-[clamp(0.68rem,2.5vw,0.92rem)] font-semibold leading-snug text-muted sm:justify-start">
                <Icon className="hidden h-[1.1em] w-[1.1em] shrink-0 sm:block" strokeWidth={2.2} aria-hidden="true" />
                {m.etiqueta}
              </dt>
              <dd className={`text-[clamp(1.3rem,5.6vw,3.2rem)] ${TONO[m.tono].text}`}>
                <Odometro valor={m.valor} retraso={i * 220} fase={fase} />
                <span className="sr-only">Más de {fmt.format(m.valor)}</span>
              </dd>
            </div>
          );
        })}
      </dl>
      <p className="mt-5 text-center text-[0.82rem] text-muted sm:text-left">Datos reales de uso del sistema, {METRICAS_AL}.</p>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight } from "@/content/iconos";
import { EncabezadoSeccion } from "./Piezas";

const PASOS = [
  { n: "1", t: "Pedís tu acceso", d: "Completás el formulario corto. Son dos minutos.", c: "bg-pink" },
  { n: "2", t: "Te llamamos", d: "Te escuchamos y te ayudamos a configurar tu negocio.", c: "bg-blue" },
  { n: "3", t: "Empezás a cargar", d: "Cargás tus ventas y ya ves cómo va tu negocio.", c: "bg-green" },
];

/* 8 · Cómo empezar. */
export function Pasos() {
  return (
    <section id="empezar" className="bg-orange-soft/40 py-16 md:py-24" aria-labelledby="t-empezar">
      <div className="wrap">
        <EncabezadoSeccion
          id="t-empezar"
          etiqueta="Cómo empezar"
          titulo={
            <>
              Tres pasos y <span className="hl">ya estás adentro</span>
            </>
          }
          centrado
        />
        <ol className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {PASOS.map((p, i) => (
            <li key={p.n} data-reveal style={{ transitionDelay: `${i * 90}ms` }} className="rounded-[2rem] bg-cream p-7 text-center">
              <span className={`orb mx-auto h-16 w-16 text-3xl font-extrabold ${p.c}`}>{p.n}</span>
              <h3 className="mt-5 text-[1.4rem] font-extrabold tracking-tight">{p.t}</h3>
              <p className="mt-2 text-muted">{p.d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center">
          <Link href="/?demo=1#probar" className="btn btn-pink">
            Solicitar demo
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

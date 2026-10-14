import Link from "next/link";
import { MODULOS, TONO, type Tono } from "@/content/modulos";
import { EncabezadoSeccion, Orb } from "./Piezas";

const RUBROS: { rubro: string; texto: string; tono: Tono; slug: string }[] = [
  { slug: "indumentaria-y-lenceria", rubro: "Indumentaria", texto: "Ventas, productos y lo que te deben tus clientas, siempre a mano.", tono: "pink" },
  { slug: "pastelerias", rubro: "Pastelería y gastronomía", texto: "Tus pedidos, tus cobros y tus costos, ordenados.", tono: "orange" },
  { slug: "estetica-y-belleza", rubro: "Estética y belleza", texto: "Turnos, clientas y cobros en un solo lugar.", tono: "green" },
  { slug: "comercios", rubro: "Lencería y comercios", texto: "Qué vendiste, a quién y cuánto te quedó.", tono: "blue" },
  { slug: "servicios-y-oficios", rubro: "Servicios y oficios", texto: "Agenda, clientes y gastos, sin papelitos.", tono: "orange" },
];

/* 5 · Para quién es. Sin nombrar clientes reales. */
export function ParaQuien() {
  return (
    <section id="para-quien" className="section" aria-labelledby="t-para-quien">
      <div className="wrap">
        <EncabezadoSeccion
          id="t-para-quien"
          etiqueta="Para quién es"
          titulo={
            <>
              Si tenés un negocio, <span className="hl">es para vos</span>
            </>
          }
          bajada="Emprendedores, pymes, comercios y negocios de servicios. Lo usás igual si recién arrancás o si ya tenés equipo."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RUBROS.map((r, i) => {
            const t = TONO[r.tono];
            const modulo = MODULOS.find((m) => m.tono === r.tono) ?? MODULOS[0];
            return (
              <li key={r.rubro} data-reveal style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
                <Link href={`/rubros/${r.slug}`} className="card tono-card flex h-full gap-4 p-6">
                <Orb modulo={modulo} size={52} />
                <div>
                  <h3 className="text-[1.2rem] font-extrabold leading-tight tracking-tight">{r.rubro}</h3>
                  <p className={`mt-1.5 text-muted`}>{r.texto}</p>
                  <span className={`mt-3 block h-1 w-10 rounded-full ${t.solid}`} aria-hidden="true" />
                </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 text-center">
          <Link href="/rubros" className="font-bold underline underline-offset-2">
            Ver todos los rubros
          </Link>
        </p>
      </div>
    </section>
  );
}

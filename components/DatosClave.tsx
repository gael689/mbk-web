import { INCLUYE_HOY, NOVEDADES } from "@/content/modulos";
import { WHATSAPP_DISPLAY } from "@/content/site";

/* "El Sistema MBK en pocas palabras": la definición completa en un solo lugar, en frases
 * que se entienden sin el resto de la página. Es lo mismo que dice el resto de la web
 * (nada nuevo ni solo para buscadores): sirve a quien llega con prisa y a quien resume la página. */
const DATOS: { t: string; d: string }[] = [
  { t: "Qué es", d: "Un sistema de gestión online para llevar ventas, cobros, costos, clientes, productos y turnos en un solo lugar, y ver el resultado del mes." },
  { t: "Para quién", d: "Emprendedores y pymes que venden productos, servicios o ambos: indumentaria, pastelería, estética, lencería, oficios y más." },
  { t: "Cómo se usa", d: "Desde el navegador del celular o de la computadora, con la misma cuenta en todos lados. No hay que instalar nada." },
  { t: "Qué incluye hoy", d: `${INCLUYE_HOY.join(", ")}.` },
  { t: "Novedades", d: `${NOVEDADES.join(", ")}.` },
  { t: "Quién lo creó", d: "Belén Klundt, Licenciada y Profesora en Economía, a partir de su trabajo diario con emprendedores y pymes de Bahía Blanca." },
  { t: "Cómo se contrata", d: "Solo el sistema, o el sistema con acompañamiento de Belén y su equipo. Se arma una propuesta según el negocio y se puede pedir una demo antes." },
  { t: "Dónde", d: `Bahía Blanca, Buenos Aires, Argentina. WhatsApp ${WHATSAPP_DISPLAY}.` },
];

export function DatosClave() {
  return (
    <section className="section bg-white" aria-labelledby="t-datos">
      <div className="wrap">
        <h2 id="t-datos" className="h2 max-w-3xl">
          El Sistema MBK en <span className="hl">pocas palabras</span>
        </h2>
        <dl className="mt-8 grid gap-x-10 gap-y-5 md:grid-cols-2">
          {DATOS.map((x) => (
            <div key={x.t} className="border-t border-line pt-4">
              <dt className="text-[0.85rem] font-bold uppercase tracking-[0.14em] text-pink-strong">{x.t}</dt>
              <dd className="mt-1.5 text-[1.05rem] leading-relaxed">{x.d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

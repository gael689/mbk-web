import Link from "next/link";
import { Actualizado } from "@/components/Actualizado";
import { JsonLdMigasN } from "@/components/JsonLd";
import { OrbIcono } from "@/components/Piezas";
import { CtaCierre, SubHero } from "@/components/SubPagina";
import { ULTIMA_MODIFICACION } from "@/content/fechas";
import { ArrowRight, BarChart3, Landmark, Package, Tag, CalendarDays, type LucideIcon } from "@/content/iconos";
import { GUIAS } from "@/content/guias";
import { metaPagina } from "@/lib/meta";

export const metadata = metaPagina({
  titulo: "Guías para emprendedores: precios, stock, caja y turnos",
  descripcion:
    "Guías prácticas para emprendedores y pymes: cómo calcular el precio de un producto, saber si tu negocio gana plata, controlar el stock, ordenar la caja y organizar turnos.",
  ruta: "/guias",
});

const ICONOS: Record<string, LucideIcon> = {
  "como-calcular-el-precio-de-un-producto": Tag,
  "como-saber-si-tu-emprendimiento-gana-plata": BarChart3,
  "control-de-stock-para-emprendedores": Package,
  "caja-y-ganancia-no-son-lo-mismo": Landmark,
  "como-organizar-los-turnos-de-tu-negocio": CalendarDays,
};

export default function Guias() {
  return (
    <>
      <SubHero
        etiqueta="Guías"
        tono="blue"
        titulo={
          <>
            Para ordenar tu negocio, <span className="hl">paso a paso</span>
          </>
        }
        bajada="Respuestas simples a las preguntas que todo emprendedor se hace: precios, ganancia, stock, caja y turnos."
      />
      <section className="section pt-4 md:pt-4" aria-label="Lista de guías">
        <div className="wrap">
          <ul className="grid gap-4 md:grid-cols-2">
            {GUIAS.map((g) => (
              <li key={g.slug} data-reveal>
                <Link href={`/guias/${g.slug}`} className="card tono-card flex h-full gap-4 p-6">
                  <OrbIcono Icon={ICONOS[g.slug] ?? Tag} tono={g.tono} size={52} />
                  <div className="flex-1">
                    <h2 className="text-[1.2rem] font-extrabold leading-tight tracking-tight">{g.titulo}</h2>
                    <p className="mt-2 text-muted">{g.bajada}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-blue-strong">
                      Leer la guía
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Actualizado fecha={ULTIMA_MODIFICACION.guias} />
      <CtaCierre />
      <JsonLdMigasN migas={[{ nombre: "Guías", ruta: "/guias" }]} />
    </>
  );
}

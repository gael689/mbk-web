import { Beneficios } from "@/components/Beneficios";
import { BelenResumen } from "@/components/BelenResumen";
import { CtaFinal } from "@/components/CtaFinal";
import { Ola } from "@/components/Decoracion";
import { Escalera } from "@/components/Escalera";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";

/* Home corta: promesa -> lo que ganás -> tres puertas -> quién lo pensó -> acción.
 * El detalle vive en /sistema, /consultoria, /planillas y /preguntas y se abre
 * solo si la persona lo pide. */
export default function Home() {
  return (
    <>
      <Hero />
      <Ola fondo="bg-cream" color="text-white" />
      <Beneficios />
      <Ola fondo="bg-white" color="text-cream" />
      <Escalera />
      <Ola fondo="bg-cream" color="text-green-soft" />
      <BelenResumen />
      <Ola fondo="bg-green-soft" color="text-blue-strong" />
      <CtaFinal />
      <JsonLd />
    </>
  );
}

import { Beneficios } from "@/components/Beneficios";
import { BelenResumen } from "@/components/BelenResumen";
import { CtaFinal } from "@/components/CtaFinal";
import { Ola } from "@/components/Decoracion";
import { Demo } from "@/components/Demo";
import { Escalera } from "@/components/Escalera";
import { Hero } from "@/components/Hero";
import { Instagram } from "@/components/Instagram";
import { JsonLd } from "@/components/JsonLd";

// Los videos de YouTube vienen del feed del canal: se regenera cada 6 h (literal: Next no acepta constantes importadas).
export const revalidate = 21600;

/* Home corta: promesa -> lo que ganás -> tres puertas -> verlo en uso (YouTube e Instagram)
 * -> quién lo pensó -> acción. El detalle vive en /sistema, /consultoria, /planillas y
 * /preguntas y se abre solo si la persona lo pide. */
export default function Home() {
  return (
    <>
      <Hero />
      <Ola fondo="bg-cream" color="text-white" />
      <Beneficios />
      <Ola fondo="bg-white" color="text-cream" />
      <Escalera />
      <Demo cantidad={3} />
      <Instagram max={4} />
      <Ola fondo="bg-cream" color="text-green-soft" />
      <BelenResumen />
      <Ola fondo="bg-green-soft" color="text-blue-strong" />
      <CtaFinal />
      <JsonLd />
    </>
  );
}

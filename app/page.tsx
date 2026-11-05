import { Beneficios } from "@/components/Beneficios";
import { BelenResumen } from "@/components/BelenResumen";
import { CintaTildes } from "@/components/CintaTildes";
import { CtaFinal } from "@/components/CtaFinal";
import { Ola } from "@/components/Decoracion";
import { Demo } from "@/components/Demo";
import { Escalera } from "@/components/Escalera";
import { Hero } from "@/components/Hero";
import { Incluye } from "@/components/Incluye";
import { Instagram } from "@/components/Instagram";
import { JsonLd } from "@/components/JsonLd";
import { LoNuevo } from "@/components/LoNuevo";

// Los videos de YouTube vienen del feed del canal: se regenera cada 6 h (literal: Next no acepta constantes importadas).
export const revalidate = 21600;

/* Home corta: promesa -> lo que ganás -> lo nuevo, en movimiento -> qué incluye, en tildes -> tres puertas
 * -> verlo en uso -> quién lo pensó -> acción. El detalle se abre solo si la persona lo pide: la idea
 * es que entre por los ojos y pregunte, no que lo lea todo acá. */
export default function Home() {
  return (
    <>
      <Hero />
      <CintaTildes />
      <Beneficios />
      <LoNuevo />
      <Incluye />
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

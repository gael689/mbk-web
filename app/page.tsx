import { Belen } from "@/components/Belen";
import { Consultoria } from "@/components/Consultoria";
import { CtaFinal } from "@/components/CtaFinal";
import { Demo } from "@/components/Demo";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Formas } from "@/components/Formas";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Instagram } from "@/components/Instagram";
import { Interacciones } from "@/components/Interacciones";
import { JsonLd } from "@/components/JsonLd";
import { Pasos } from "@/components/Pasos";
import { ParaQuien } from "@/components/ParaQuien";
import { Planillas } from "@/components/Planillas";
import { Problemas } from "@/components/Problemas";
import { Soluciones } from "@/components/Soluciones";
import { WhatsAppFlotante } from "@/components/WhatsAppFlotante";

// La página es estática; se regenera cada 6 h para traer los videos nuevos de YouTube.
// Tiene que ser un literal: Next no acepta constantes importadas en la config de ruta (21600 s = 6 h).
export const revalidate = 21600;

export default function Home() {
  return (
    <>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <Problemas />
        <Soluciones />
        <Belen />
        <ParaQuien />
        <Formas />
        <Demo />
        <Pasos />
        <Consultoria />
        <Planillas />
        <Instagram />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <WhatsAppFlotante />
      <Interacciones />
      <JsonLd />
    </>
  );
}

import Link from "next/link";
import { Actualizado } from "@/components/Actualizado";
import { SubHero } from "@/components/SubPagina";
import { ULTIMA_MODIFICACION } from "@/content/fechas";
import { PRIVACY_URL, WHATSAPP_DISPLAY } from "@/content/site";
import { metaPagina } from "@/lib/meta";

export const metadata = metaPagina({
  titulo: "Privacidad de esta web",
  descripcion: "Qué datos recibe la web de MBK Consultoría cuando completás el formulario, para qué los usamos y cómo ejercer tus derechos.",
  ruta: "/privacidad",
});

const h2 = "mt-10 text-[1.5rem] font-extrabold tracking-tight";
const p = "mt-3 max-w-3xl text-[1.05rem] leading-relaxed";
const ul = "mt-3 max-w-3xl list-disc space-y-2 pl-6 text-[1.05rem] leading-relaxed";

export default function Privacidad() {
  return (
    <>
      <SubHero
        etiqueta="Legales"
        tono="violet"
        titulo={
          <>
            Privacidad de <span className="hl">esta web</span>
          </>
        }
        bajada="Qué datos recibimos cuando nos escribís desde la web, para qué los usamos y qué derechos tenés."
      />
      <section className="pb-10 md:pb-16" aria-label="Contenido de la política de privacidad">
        <div className="wrap">
          <h2 className={h2.replace("mt-10", "mt-0")}>Quién es responsable</h2>
          <p className={p}>
            MBK Consultoría (Belén Klundt y su equipo), de Bahía Blanca, Buenos Aires, Argentina. Podés contactarnos por WhatsApp al {WHATSAPP_DISPLAY}.
          </p>

          <h2 className={h2}>Qué datos recibimos</h2>
          <p className={p}>Solo los que vos escribís en el formulario de contacto:</p>
          <ul className={ul}>
            <li>tu nombre, el nombre o rubro de tu negocio y tu número de WhatsApp;</li>
            <li>qué querés resolver (la opción que elegís);</li>
            <li>tu mail y si querés el acompañamiento del equipo, que son opcionales.</li>
          </ul>
          <p className={p}>
            Si en cambio nos escribís por WhatsApp, recibimos lo que nos mandes por ese medio, bajo las condiciones de WhatsApp. Para frenar el spam, el formulario cuenta
            los envíos por dirección IP durante unos minutos en la memoria del servidor; no la guardamos.
          </p>

          <h2 className={h2}>Para qué los usamos</h2>
          <p className={p}>
            Para contactarte por tu consulta, mostrarte el sistema funcionando y armarte una propuesta según tu negocio. No usamos tus datos para publicidad de terceros ni
            los vendemos.
          </p>

          <h2 className={h2}>Con quién se comparten</h2>
          <p className={p}>
            Solo con los proveedores que hacen posible la web: Vercel (alojamiento) y Resend (envío del aviso por mail a MBK con los datos del formulario). Pueden procesar
            los datos fuera de Argentina.
          </p>

          <h2 className={h2}>Cuánto tiempo los guardamos</h2>
          <p className={p}>
            Mientras dure la conversación comercial y el tiempo que haga falta para atenderte. Si no avanzamos, podés pedir que los borremos cuando quieras.
          </p>

          <h2 className={h2}>Tus derechos</h2>
          <p className={p}>
            Como titular de los datos podés pedir acceder a ellos, corregirlos, actualizarlos o suprimirlos, escribiéndonos por WhatsApp. La Ley 25.326 de Protección de los
            Datos Personales te garantiza esos derechos; la Agencia de Acceso a la Información Pública, como órgano de control de esa ley, atiende las denuncias y reclamos
            de quienes consideren afectados sus derechos.
          </p>

          <h2 className={h2}>Cookies</h2>
          <p className={p}>
            Qué guarda la web en tu dispositivo y cómo cambiar tu elección está en la{" "}
            <Link href="/cookies" className="font-semibold underline underline-offset-2">
              política de cookies
            </Link>
            .
          </p>

          <h2 className={h2}>Si usás el Sistema MBK</h2>
          <p className={p}>
            Los datos que cargás dentro del sistema (ventas, costos, clientes) se rigen por su propia{" "}
            <a href={PRIVACY_URL} className="font-semibold underline underline-offset-2">
              política de privacidad
            </a>
            .
          </p>
        </div>
      </section>
      <Actualizado fecha={ULTIMA_MODIFICACION.privacidad} />
    </>
  );
}

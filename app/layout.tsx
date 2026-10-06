import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Interacciones } from "@/components/Interacciones";
import { WhatsAppFlotante } from "@/components/WhatsAppFlotante";
import { SITE_DESCRIPTION, SITE_NAME, SITE_SUFFIX, SITE_TITLE, SITE_URL } from "@/content/site";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  // Solo tres pesos: menos archivos que bajar. `font-bold` se mapea a 600 en globals.css.
  weight: ["400", "600", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fcfaf7",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_SUFFIX}` },
  description: SITE_DESCRIPTION,
  applicationName: "Sistema MBK",
  authors: [{ name: "Belén Klundt" }],
  creator: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={poppins.variable}>
      <body>
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <WhatsAppFlotante />
        <Interacciones />
        {/* Analytics solo se monta en Vercel: fuera de ahí no carga nada. */}
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}

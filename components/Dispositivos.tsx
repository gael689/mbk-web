import Image from "next/image";
import { BarrasLogo } from "./Decoracion";
import { DashboardCelular, DashboardEscritorio } from "./mockups/Dashboard";

/* Notebook y celular (CSS) con el Dashboard del sistema adentro. */

export function Notebook({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="rounded-t-[1.1em] bg-[#1c1a19] p-[0.55em] pb-[0.55em] shadow-[0_30px_50px_-20px_rgba(60,30,10,0.55)]" style={{ fontSize: "clamp(8px, 1.5vw, 15px)" }}>
        <div className="overflow-hidden rounded-[0.5em]">
          <DashboardEscritorio />
        </div>
      </div>
      <div className="mx-[-3%] h-[1.1em] rounded-b-[1.4em] bg-gradient-to-b from-[#d9d5d0] to-[#a9a49e] shadow-[0_10px_18px_-8px_rgba(60,30,10,0.55)]" style={{ fontSize: "clamp(8px, 1.5vw, 15px)" }}>
        <div className="mx-auto h-[0.35em] w-[18%] rounded-b-[0.4em] bg-[#8d8781]" />
      </div>
    </div>
  );
}

export function Celular({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-[2.1rem] border-[5px] border-[#1c1a19] bg-[#1c1a19] shadow-[0_28px_44px_-16px_rgba(60,30,10,0.6)] ${className}`}
      aria-hidden="true"
    >
      <div className="relative overflow-hidden rounded-[1.7rem]">
        <span className="absolute left-1/2 top-[1.5%] z-10 h-[2.2%] w-[26%] -translate-x-1/2 rounded-full bg-[#1c1a19]" />
        <DashboardCelular />
      </div>
    </div>
  );
}

/* Mate negro con el logo: el que aparece en las fotos de Belén (ilustración). */
function Mate({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 170" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="mate-cuerpo" x1="0" x2="1">
          <stop offset="0" stopColor="#2b2827" />
          <stop offset="0.45" stopColor="#1d1b1a" />
          <stop offset="1" stopColor="#0f0e0e" />
        </linearGradient>
        <linearGradient id="mate-aro" x1="0" x2="1">
          <stop offset="0" stopColor="#f2f0ee" />
          <stop offset="1" stopColor="#8f8a86" />
        </linearGradient>
      </defs>
      {/* bombilla */}
      <path d="M78 58 L26 6" stroke="#d6d3d0" strokeWidth="5" strokeLinecap="round" />
      <path d="M26 6 L18 -2" stroke="#b9b5b1" strokeWidth="7" strokeLinecap="round" />
      {/* cuerpo */}
      <path d="M22 56 C22 140 40 164 66 164 C92 164 110 140 110 56 Z" fill="url(#mate-cuerpo)" />
      {/* yerba */}
      <ellipse cx="66" cy="56" rx="44" ry="11" fill="#7d8a3e" />
      <ellipse cx="66" cy="54" rx="34" ry="6" fill="#95a34d" opacity="0.7" />
      {/* aro */}
      <path d="M20 56 a46 12 0 0 1 92 0" fill="none" stroke="url(#mate-aro)" strokeWidth="7" strokeLinecap="round" />
      <rect x="21" y="62" width="90" height="9" fill="url(#mate-aro)" opacity="0.85" />
      {/* logo */}
      <image href="/logo-mark.png" x="46" y="96" width="40" height="34" opacity="0.92" />
    </svg>
  );
}

function Hoja({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 200" className={className} aria-hidden="true" focusable="false">
      <g fill="#5d9a68" opacity="0.55">
        <path d="M60 200 C40 140 10 110 4 40 C40 60 62 100 60 200Z" />
        <path d="M60 200 C70 130 100 90 118 30 C80 50 56 100 60 200Z" opacity="0.8" />
        <path d="M60 200 C56 120 50 70 62 0 C82 60 74 130 60 200Z" opacity="0.9" />
      </g>
    </svg>
  );
}

/* La escena del hero: escritorio cálido con mate, notebook y celular.
 * Si Belén pasa su foto real (HERO_PHOTO en content/site.ts), reemplaza esto. */
export function EscenaEscritorio({ foto }: { foto?: string | null }) {
  if (foto) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-[var(--shadow-lift)]">
        <Image src={foto} alt="Escritorio con una notebook que muestra el Sistema MBK" fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
      </div>
    );
  }
  return (
    <div
      className="relative isolate aspect-[5/4.2] overflow-hidden rounded-[2.5rem] shadow-[var(--shadow-lift)] sm:aspect-[5/3.9] lg:aspect-[1/0.92]"
      style={{ background: "linear-gradient(160deg,#e6f1fb 0%,#fbe6f2 58%,#ffece1 100%)" }}
      role="img"
      aria-label="Ilustración de un escritorio con un mate, una notebook y un celular que muestran el Sistema MBK"
    >
      {/* luz de ventana */}
      <div className="absolute -left-[10%] -top-[20%] h-[80%] w-[70%] rounded-full bg-white/60 blur-3xl" aria-hidden="true" />
      <div className="absolute inset-y-0 right-[8%] flex gap-[3%] opacity-40" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-full w-[2.2rem] -skew-x-6 bg-white/50" />
        ))}
      </div>
      <Hoja className="absolute -left-[3%] top-[6%] h-[38%] w-auto" />
      <BarrasLogo className="absolute right-[7%] top-[7%] h-[17%] w-[9%]" />
      {/* escritorio */}
      <div className="absolute inset-x-0 bottom-0 h-[24%]" style={{ background: "linear-gradient(180deg,#e2b283 0%,#cf9762 60%,#c08650 100%)" }} aria-hidden="true">
        <div className="h-[3px] w-full bg-white/50" />
      </div>
      <Mate className="absolute bottom-[9%] left-[3%] w-[19%]" />
      <Notebook className="absolute bottom-[15%] right-[3%] w-[84%]" />
      <Celular className="float absolute bottom-[4%] right-[5%] w-[19%]" />
    </div>
  );
}

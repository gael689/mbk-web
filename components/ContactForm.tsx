"use client";

import { useEffect, useState, useSyncExternalStore, type FormEvent } from "react";
import { ArrowRight, Check, ChevronDown } from "@/content/iconos";
import { whatsappUrl } from "@/content/site";
import { registrar } from "@/lib/analytics";
import { INTERESES, esquemaContacto, type ErroresContacto } from "@/lib/contacto";
import { IconWhatsApp } from "./Marcas";

type Estado =
  | { tipo: "quieto" }
  | { tipo: "enviando" }
  | { tipo: "ok" }
  | { tipo: "error"; mensaje: string; conWhatsApp: boolean };

const campoBase =
  "mt-1.5 block min-h-12 w-full rounded-2xl border-2 border-line bg-white px-4 py-2.5 text-[1.05rem] text-ink placeholder:text-ink/45 focus:border-ink";

export function ContactForm() {
  const [estado, setEstado] = useState<Estado>({ tipo: "quieto" });
  const [errores, setErrores] = useState<ErroresContacto>({});
  // Desde /sistema, "Sistema + acompañamiento" llega con ?acomp=1 y deja la casilla tildada
  // (en el servidor vale false, así la hidratación coincide).
  const acompUrl = useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).get("acomp") === "1",
    () => false,
  );
  // Los botones "Solicitar demo" llegan con ?demo=1 y dejan elegida esa opción.
  const demoUrl = useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).get("demo") === "1",
    () => false,
  );
  const [interesManual, setInteresManual] = useState<string | null>(null);
  const interes = interesManual ?? (demoUrl ? "demo" : "");
  const [acompManual, setAcompManual] = useState<boolean | null>(null);
  const [abiertoManual, setAbiertoManual] = useState<boolean | null>(null);
  const acomp = acompManual ?? acompUrl;
  // El bloque opcional se abre solo si viene con acompañamiento o si hay un error adentro.
  const masDatos = abiertoManual ?? (acompUrl || !!errores.email);

  // Los botones de "Sistema + acompañamiento" (?acomp=1) tildan la casilla.
  useEffect(() => {
    const alClic = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest<HTMLElement>("a[data-acomp]");
      if (a) setAcompManual(a.dataset.acomp === "1");
    };
    document.addEventListener("click", alClic);
    return () => document.removeEventListener("click", alClic);
  }, []);

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (estado.tipo === "enviando") return;
    const f = new FormData(e.currentTarget);
    const datos = {
      nombre: String(f.get("nombre") ?? ""),
      negocio: String(f.get("negocio") ?? ""),
      whatsapp: String(f.get("whatsapp") ?? ""),
      email: String(f.get("email") ?? ""),
      interes: String(f.get("interes") ?? ""),
      acompanamiento: acomp,
      sitio_web: String(f.get("sitio_web") ?? ""),
    };

    const previo = esquemaContacto.safeParse(datos);
    if (!previo.success) {
      const campos: ErroresContacto = {};
      for (const i of previo.error.issues) {
        const k = String(i.path[0]) as keyof ErroresContacto;
        if (!campos[k]) campos[k] = i.message;
      }
      setErrores(campos);
      setEstado({ tipo: "quieto" });
      return;
    }

    setErrores({});
    setEstado({ tipo: "enviando" });
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      const json = (await res.json().catch(() => null)) as { ok?: boolean; mensaje?: string; campos?: ErroresContacto; error?: string } | null;
      if (res.ok && json?.ok) {
        registrar("envio_formulario", { interes: datos.interes, acompanamiento: String(datos.acompanamiento) });
        setEstado({ tipo: "ok" });
        return;
      }
      if (json?.campos) setErrores(json.campos);
      setEstado({
        tipo: "error",
        mensaje: json?.mensaje ?? "No pudimos enviar tu consulta. Probá de nuevo o escribinos por WhatsApp.",
        conWhatsApp: res.status >= 500 || json?.error === "limite",
      });
    } catch {
      setEstado({
        tipo: "error",
        mensaje: "No pudimos conectarnos. Revisá tu conexión o escribinos por WhatsApp.",
        conWhatsApp: true,
      });
    }
  }

  if (estado.tipo === "ok") {
    return (
      <div role="status" className="rounded-[2rem] bg-green-soft p-8 text-center sm:p-10">
        <span className="orb mx-auto h-16 w-16 bg-green-strong">
          <Check className="h-8 w-8" strokeWidth={3} aria-hidden="true" />
        </span>
        <h3 className="h3 mt-5">¡Listo, recibimos tu consulta!</h3>
        <p className="mt-3 text-[1.1rem]">Te vamos a escribir por WhatsApp para contarte cómo seguir.</p>
      </div>
    );
  }

  const enviando = estado.tipo === "enviando";
  const err = (k: keyof ErroresContacto) =>
    errores[k] ? (
      <p id={`e-${k}`} className="mt-1.5 text-[0.95rem] font-semibold text-[#b42318]">
        {errores[k]}
      </p>
    ) : null;
  const desc = (k: keyof ErroresContacto) => (errores[k] ? `e-${k}` : undefined);

  return (
    <form onSubmit={enviar} noValidate className="space-y-5" aria-describedby={estado.tipo === "error" ? "form-error" : undefined}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className="font-bold">
            Tu nombre
          </label>
          <input id="nombre" name="nombre" type="text" autoComplete="name" required maxLength={80} className={campoBase} aria-invalid={!!errores.nombre} aria-describedby={desc("nombre")} />
          {err("nombre")}
        </div>
        <div>
          <label htmlFor="negocio" className="font-bold">
            Tu negocio o rubro
          </label>
          <input id="negocio" name="negocio" type="text" autoComplete="organization" required maxLength={100} placeholder="Ej.: ropa, pastelería, estética" className={campoBase} aria-invalid={!!errores.negocio} aria-describedby={desc("negocio")} />
          {err("negocio")}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="whatsapp" className="font-bold">
            Tu WhatsApp
          </label>
          <input id="whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" required maxLength={30} placeholder="Con código de área" className={campoBase} aria-invalid={!!errores.whatsapp} aria-describedby={desc("whatsapp")} />
          {err("whatsapp")}
        </div>
        <div>
          <label htmlFor="interes" className="font-bold">
            ¿Qué querés resolver?
          </label>
          <select id="interes" name="interes" required value={interes} onChange={(e) => setInteresManual(e.target.value)} className={campoBase} aria-invalid={!!errores.interes} aria-describedby={desc("interes")}>
            <option value="" disabled>
              Elegí una opción
            </option>
            {INTERESES.map((i) => (
              <option key={i.valor} value={i.valor}>
                {i.etiqueta}
              </option>
            ))}
          </select>
          {err("interes")}
        </div>
      </div>

      {/* Divulgación progresiva: lo esencial primero, lo opcional si la persona quiere sumarlo. */}
      <details open={masDatos} onToggle={(e) => setAbiertoManual(e.currentTarget.open)} className="group rounded-2xl border border-line">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 py-3 font-bold marker:hidden [&::-webkit-details-marker]:hidden">
          <span>
            Sumar mail o acompañamiento <span className="font-normal text-muted">(opcional)</span>
          </span>
          <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="space-y-4 px-4 pb-4">
          <div>
            <label htmlFor="email" className="font-bold">
              Tu mail
            </label>
            <input id="email" name="email" type="email" autoComplete="email" maxLength={120} className={campoBase} aria-invalid={!!errores.email} aria-describedby={desc("email")} />
            {err("email")}
          </div>
          <label className="flex min-h-12 cursor-pointer items-start gap-3 rounded-2xl bg-pink-soft p-4">
            <input type="checkbox" checked={acomp} onChange={(e) => setAcompManual(e.target.checked)} className="mt-0.5 h-6 w-6 shrink-0 accent-[#c4187e]" />
            <span className="font-semibold leading-snug">Quiero también el acompañamiento del equipo</span>
          </label>
        </div>
      </details>

      {/* Honeypot: las personas no lo ven ni lo completan. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          No completar este campo
          <input type="text" name="sitio_web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {estado.tipo === "error" ? (
        <div id="form-error" role="alert" className="rounded-2xl border-2 border-[#b42318]/40 bg-[#fdecea] p-4">
          <p className="font-semibold text-[#8a1c12]">{estado.mensaje}</p>
          {estado.conWhatsApp ? (
            <a href={whatsappUrl()} data-track="clic_whatsapp" target="_blank" rel="noopener noreferrer" className="btn btn-ink btn-sm mt-3">
              <IconWhatsApp className="h-5 w-5" />
              Escribinos por WhatsApp
            </a>
          ) : null}
        </div>
      ) : null}

      <button type="submit" disabled={enviando} className="btn btn-pink w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto">
        {enviando ? "Enviando…" : "Solicitar demo"}
        {enviando ? null : <ArrowRight className="h-5 w-5" aria-hidden="true" />}
      </button>
      <p className="text-[0.92rem] text-muted">Usamos tus datos solo para contactarte por esta consulta.</p>
    </form>
  );
}

"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Check } from "@/content/iconos";
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
  const [acomp, setAcomp] = useState(false);

  // Los botones "Quiero probar MBK" de "Sistema + acompañamiento" tildan la casilla.
  useEffect(() => {
    const alClic = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest<HTMLElement>("a[data-acomp]");
      if (a) setAcomp(a.dataset.acomp === "1");
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
        <p className="mt-3 text-[1.1rem]">Belén te va a escribir por WhatsApp para contarte cómo seguir.</p>
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
          <label htmlFor="email" className="font-bold">
            Tu mail <span className="font-normal text-muted">(opcional)</span>
          </label>
          <input id="email" name="email" type="email" autoComplete="email" maxLength={120} className={campoBase} aria-invalid={!!errores.email} aria-describedby={desc("email")} />
          {err("email")}
        </div>
      </div>

      <div>
        <label htmlFor="interes" className="font-bold">
          ¿Qué querés resolver?
        </label>
        <select id="interes" name="interes" required defaultValue="" className={campoBase} aria-invalid={!!errores.interes} aria-describedby={desc("interes")}>
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

      <label className="flex min-h-12 cursor-pointer items-start gap-3 rounded-2xl bg-pink-soft p-4">
        <input type="checkbox" checked={acomp} onChange={(e) => setAcomp(e.target.checked)} className="mt-0.5 h-6 w-6 shrink-0 accent-[#c4187e]" />
        <span className="font-semibold leading-snug">Quiero también acompañamiento de Belén</span>
      </label>

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
              Escribir a Belén por WhatsApp
            </a>
          ) : null}
        </div>
      ) : null}

      <button type="submit" disabled={enviando} className="btn btn-pink w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto">
        {enviando ? "Enviando…" : "Quiero probar MBK"}
        {enviando ? null : <ArrowRight className="h-5 w-5" aria-hidden="true" />}
      </button>
      <p className="text-[0.92rem] text-muted">Usamos tus datos solo para contactarte por esta consulta.</p>
    </form>
  );
}

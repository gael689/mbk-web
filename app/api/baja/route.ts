import { NextResponse } from "next/server";
import { llamarRpc } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Baja de los mails de presentación que manda el Sistema MBK desde Prospectos (v1.9).
 *
 * Dos formas de llegar:
 *  - El botón de /baja (formulario): POST con el campo `t` → redirige a /baja?listo=1.
 *  - La baja "en un clic" de Gmail y Yahoo (encabezado List-Unsubscribe-Post): POST a
 *    /api/baja?t=<token> con el cuerpo `List-Unsubscribe=One-Click` → responde 200 sin redirigir.
 *
 * El token es el `unsubscribe_token` del prospecto (un uuid al azar): sin él no se puede dar de
 * baja a nadie. La función `unsubscribe_prospect` es idempotente y no revela nada más que el nombre.
 * Un GET nunca da de baja (los antivirus de correo abren los links): solo muestra la página. */
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(req: Request) {
  const t = new URL(req.url).searchParams.get("t") ?? "";
  return NextResponse.redirect(new URL(`/baja${UUID.test(t) ? `?t=${t}` : ""}`, req.url), 303);
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  let token = url.searchParams.get("t") ?? "";
  let unClic = false;

  const tipo = req.headers.get("content-type") ?? "";
  if (tipo.includes("application/x-www-form-urlencoded") || tipo.includes("multipart/form-data")) {
    const form = await req.formData().catch(() => null);
    if (form) {
      unClic = form.get("List-Unsubscribe") === "One-Click";
      const delForm = form.get("t");
      if (typeof delForm === "string" && delForm) token = delForm;
    }
  }

  if (!UUID.test(token)) {
    return unClic
      ? new NextResponse("Token inválido", { status: 400 })
      : NextResponse.redirect(new URL("/baja?error=1", req.url), 303);
  }

  const r = await llamarRpc("unsubscribe_prospect", { p_token: token });
  if (!r.ok) {
    console.error("[baja] Supabase respondió", r.estado, r.mensaje);
    return unClic
      ? new NextResponse("Error", { status: 502 })
      : NextResponse.redirect(new URL(`/baja?t=${token}&error=1`, req.url), 303);
  }

  return unClic ? new NextResponse("OK", { status: 200 }) : NextResponse.redirect(new URL("/baja?listo=1", req.url), 303);
}

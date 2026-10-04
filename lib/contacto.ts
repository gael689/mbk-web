import { z } from "zod";

/* Validación del formulario. La usa la ruta /api/contacto (la que manda) y el
 * formulario del navegador (para no viajar al servidor con datos obviamente mal). */
export const INTERESES = [
  { valor: "demo", etiqueta: "Quiero ver una demo del sistema" },
  { valor: "ventas", etiqueta: "Ordenar mis ventas y cobros" },
  { valor: "costos", etiqueta: "Costos y precios" },
  { valor: "stock", etiqueta: "Stock" },
  { valor: "turnos", etiqueta: "Turnos" },
  { valor: "todo", etiqueta: "Todo un poco" },
] as const;

const valores = INTERESES.map((i) => i.valor) as [string, ...string[]];

const soloDigitos = (s: string) => s.replace(/\D/g, "");

export const esquemaContacto = z.object({
  nombre: z
    .string({ error: "Contanos tu nombre." })
    .trim().min(2, "Contanos tu nombre.").max(80, "El nombre es muy largo."),
  negocio: z
    .string({ error: "Contanos de qué es tu negocio." })
    .trim().min(2, "Contanos de qué es tu negocio.").max(100, "Es muy largo."),
  whatsapp: z
    .string({ error: "Escribí tu WhatsApp." })
    .trim()
    .max(30, "Revisá el número.")
    .refine((v) => {
      const n = soloDigitos(v).length;
      return n >= 8 && n <= 15 && /^[\d\s()+\-.]+$/.test(v);
    }, "Escribí un WhatsApp válido, con el código de área."),
  email: z
    .string({ error: "Ese mail no parece válido." })
    .trim()
    .max(120, "El mail es muy largo.")
    .refine((v) => v === "" || z.string().email().safeParse(v).success, "Ese mail no parece válido.")
    .optional()
    .default(""),
  interes: z.enum(valores, { error: "Elegí qué querés resolver." }),
  acompanamiento: z.boolean().optional().default(false),
  // Honeypot: las personas no lo ven ni lo completan.
  sitio_web: z.string().max(200).optional().default(""),
});

export type DatosContacto = z.infer<typeof esquemaContacto>;
export type ErroresContacto = Partial<Record<keyof DatosContacto, string>>;

export const etiquetaInteres = (valor: string) => INTERESES.find((i) => i.valor === valor)?.etiqueta ?? valor;

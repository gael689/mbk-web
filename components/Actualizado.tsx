/* "Actualizado el …": fecha visible de la última revisión del contenido de la página.
 * Es una señal de frescura para personas y buscadores; sale de content/fechas.ts. */
export function Actualizado({ fecha }: { fecha: string }) {
  const [y, m, d] = fecha.split("-").map(Number);
  const texto = new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  return (
    <p className="wrap pb-10 text-[0.95rem] text-muted">
      Actualizado el <time dateTime={fecha}>{texto}</time>.
    </p>
  );
}

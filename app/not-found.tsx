import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <p className="tag">Error 404</p>
        <h1 className="display h1 mt-5">
          Esta página <span className="hl">no existe</span>
        </h1>
        <p className="lead mx-auto mt-4 max-w-md">Puede que el link esté mal escrito o que la página ya no esté.</p>
        <Link href="/" className="btn btn-pink mt-8">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}

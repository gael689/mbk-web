/* Reels de Instagram que se muestran en la web. Sin API de Meta no se puede leer el feed,
 * así que cada reel se carga a mano:
 *   · id      → lo que va entre /reel/ y la última barra de la URL del reel.
 *   · titulo  → el que se lee debajo de la tarjeta.
 *   · portada → imagen 9:16 en public/reels/<id>.jpg (se baja del embed del reel).
 * La tarjeta es liviana (solo la portada); el reproductor de Instagram se carga recién
 * cuando la persona toca el play. La home muestra los primeros; /sistema muestra todos.
 * Si la lista está vacía queda solo el bloque "Seguinos en Instagram". */
export type Reel = { id: string; titulo: string; portada: string };

export const INSTAGRAM_REELS: Reel[] = [
  { id: "DcAB1rRTZ1I", titulo: "App MBK", portada: "/reels/DcAB1rRTZ1I.jpg" },
  { id: "Db_oJmSJn9y", titulo: "El mito del dinero fácil (en un podcast)", portada: "/reels/Db_oJmSJn9y.jpg" },
  { id: "DXQJ3dzk7Ji", titulo: "No pierdas plata", portada: "/reels/DXQJ3dzk7Ji.jpg" },
  { id: "DbRXAyBTLaf", titulo: "Tu negocio en un solo lugar", portada: "/reels/DbRXAyBTLaf.jpg" },
  { id: "DcmhorzT9QD", titulo: "3 preguntas clave", portada: "/reels/DcmhorzT9QD.jpg" },
];

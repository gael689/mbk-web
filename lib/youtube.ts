import { YOUTUBE_CHANNEL_ID } from "@/content/site";
import { VIDEOS_RESPALDO } from "@/content/videos";

/* Últimos videos del canal, desde el feed RSS público (sin API key). Se pide en el servidor y se
 * revalida cada 6 horas. El feed anda de a ratos: si falla o viene vacío, se usan los videos de
 * content/videos.ts, así la sección nunca se queda sin videos. */
export type Video = { id: string; titulo: string; publicado: string; miniatura: string };

const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
export const REVALIDATE_SEGUNDOS = 6 * 60 * 60;

const decodificar = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");

// i.ytimg.com sirve esta miniatura para todos los videos.
const miniaturaDe = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/* Los títulos del canal están en mayúsculas ("COMO CREAR UN PRODUCTO"). Solo se tocan esos. */
function tituloLegible(titulo: string): string {
  const limpio = titulo.replace(/\s+/g, " ").trim();
  if (limpio !== limpio.toUpperCase()) return limpio;
  const minusculas = limpio.toLowerCase().replace(/\bcomo\b/g, "cómo").replace(/\bmbk\b/g, "MBK");
  return minusculas.charAt(0).toUpperCase() + minusculas.slice(1);
}

const respaldo = (max: number): Video[] => VIDEOS_RESPALDO.slice(0, max).map((v) => ({ ...v, publicado: "", miniatura: miniaturaDe(v.id) }));

export async function ultimosVideos(max = 6): Promise<Video[]> {
  try {
    const res = await fetch(FEED, {
      next: { revalidate: REVALIDATE_SEGUNDOS },
      signal: AbortSignal.timeout(8000),
      headers: { Accept: "application/atom+xml, application/xml" },
    });
    if (!res.ok) return respaldo(max);
    const xml = await res.text();

    const videos: Video[] = [];
    for (const m of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
      const e = m[1];
      const id = e.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/)?.[1];
      const titulo = e.match(/<title>([\s\S]*?)<\/title>/)?.[1];
      const publicado = e.match(/<published>([^<]+)<\/published>/)?.[1] ?? "";
      if (!id || !titulo) continue;
      videos.push({ id, titulo: tituloLegible(decodificar(titulo)), publicado, miniatura: miniaturaDe(id) });
      if (videos.length >= max) break;
    }
    return videos.length > 0 ? videos : respaldo(max);
  } catch {
    return respaldo(max);
  }
}

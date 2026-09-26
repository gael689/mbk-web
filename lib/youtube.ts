import { YOUTUBE_CHANNEL_ID } from "@/content/site";

/* Últimos videos del canal, desde el feed RSS público (sin API key).
 * Se pide en el servidor y se revalida cada 6 horas. Si falla o viene vacío se
 * devuelve [] y la sección muestra la tarjeta con el link al canal. */
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

export async function ultimosVideos(max = 6): Promise<Video[]> {
  try {
    const res = await fetch(FEED, {
      next: { revalidate: REVALIDATE_SEGUNDOS },
      signal: AbortSignal.timeout(8000),
      headers: { Accept: "application/atom+xml, application/xml" },
    });
    if (!res.ok) return [];
    const xml = await res.text();

    const videos: Video[] = [];
    for (const m of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
      const e = m[1];
      const id = e.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/)?.[1];
      const titulo = e.match(/<title>([\s\S]*?)<\/title>/)?.[1];
      const publicado = e.match(/<published>([^<]+)<\/published>/)?.[1] ?? "";
      if (!id || !titulo) continue;
      videos.push({
        id,
        titulo: decodificar(titulo.trim()),
        publicado,
        // i.ytimg.com sirve esta miniatura para todos los videos.
        miniatura: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      });
      if (videos.length >= max) break;
    }
    return videos;
  } catch {
    return [];
  }
}

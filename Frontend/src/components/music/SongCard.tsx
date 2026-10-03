import { Play, MoreHorizontal } from "lucide-react";

interface SongCardProps { title: string; artist: string; image?: string; onPlay?: () => void; }

export default function SongCard({ title, artist, image, onPlay }: SongCardProps) {
  return (
    <article className="group rounded-xl bg-zinc-900/60 p-3 transition hover:bg-zinc-900">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-zinc-800">
        {image && <img src={image} alt={title} className="h-full w-full object-cover" />}
        <button onClick={onPlay} className="absolute bottom-3 right-3 translate-y-2 rounded-full bg-violet-600 p-3 text-white opacity-0 shadow-lg transition group-hover:translate-y-0 group-hover:opacity-100"><Play size={18} fill="currentColor" /></button>
      </div>
      <div className="mt-3 flex items-center gap-2"><div className="min-w-0 flex-1"><h3 className="truncate text-sm font-semibold text-white">{title}</h3><p className="truncate text-xs text-zinc-500">{artist}</p></div><MoreHorizontal size={18} className="text-zinc-600" /></div>
    </article>
  );
}

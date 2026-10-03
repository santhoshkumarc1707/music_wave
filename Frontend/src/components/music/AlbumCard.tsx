import { Play } from "lucide-react";

interface AlbumCardProps { title: string; artist: string; image?: string; onPlay?: () => void; }

export default function AlbumCard({ title, artist, image, onPlay }: AlbumCardProps) {
  return <article className="group"><div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-800">{image && <img src={image} alt={title} className="h-full w-full object-cover" />}<button onClick={onPlay} className="absolute bottom-3 right-3 rounded-full bg-violet-600 p-3 opacity-0 transition group-hover:opacity-100"><Play size={18} fill="currentColor" /></button></div><h3 className="mt-3 truncate font-medium">{title}</h3><p className="truncate text-sm text-zinc-500">{artist}</p></article>;
}

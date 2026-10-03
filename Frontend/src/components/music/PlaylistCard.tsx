interface PlaylistCardProps { title: string; description?: string; image?: string; }

export default function PlaylistCard({ title, description, image }: PlaylistCardProps) {
  return <article className="rounded-xl bg-zinc-900/60 p-3 hover:bg-zinc-900"><div className="aspect-square overflow-hidden rounded-lg bg-zinc-800">{image && <img src={image} alt={title} className="h-full w-full object-cover" />}</div><h3 className="mt-3 truncate font-semibold">{title}</h3><p className="mt-1 truncate text-xs text-zinc-500">{description || "Playlist"}</p></article>;
}

interface Props { title: string; description?: string; image?: string; }

export default function PlaylistHeader({ title, description, image }: Props) {
  return <div className="flex flex-col gap-5 sm:flex-row sm:items-end"><div className="h-48 w-48 shrink-0 overflow-hidden rounded-xl bg-zinc-800">{image && <img src={image} alt={title} className="h-full w-full object-cover" />}</div><div><p className="text-xs font-semibold uppercase tracking-wider text-violet-400">Playlist</p><h1 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h1><p className="mt-2 max-w-xl text-sm text-zinc-500">{description}</p></div></div>;
}

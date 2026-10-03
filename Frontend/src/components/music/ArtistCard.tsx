interface ArtistCardProps { name: string; image?: string; subtitle?: string; }

export default function ArtistCard({ name, image, subtitle = "Artist" }: ArtistCardProps) {
  return <article className="text-center"><div className="mx-auto aspect-square max-w-40 overflow-hidden rounded-full bg-zinc-800">{image && <img src={image} alt={name} className="h-full w-full object-cover" />}</div><h3 className="mt-3 truncate font-medium">{name}</h3><p className="text-sm text-zinc-500">{subtitle}</p></article>;
}

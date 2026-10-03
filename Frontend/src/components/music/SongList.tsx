import SongCard from "./SongCard";

interface Song { id: string; title: string; artist: string; image?: string; }
interface SongListProps { songs: Song[]; onPlay?: (song: Song) => void; }

export default function SongList({ songs, onPlay }: SongListProps) {
  return <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">{songs.map(song => <SongCard key={song.id} {...song} onPlay={() => onPlay?.(song)} />)}</div>;
}

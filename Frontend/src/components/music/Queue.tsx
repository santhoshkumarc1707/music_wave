import { X } from "lucide-react";

interface QueueProps { songs: { id: string; title: string; artist: string }[]; }

export default function Queue({ songs }: QueueProps) {
  return <aside className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-4"><div className="mb-4 flex items-center justify-between"><h2 className="font-semibold">Queue</h2><button className="text-zinc-500 hover:text-white"><X size={18} /></button></div><div className="space-y-2">{songs.map(song => <div key={song.id} className="rounded-lg p-3 hover:bg-zinc-900"><p className="truncate text-sm font-medium">{song.title}</p><p className="truncate text-xs text-zinc-500">{song.artist}</p></div>)}</div></aside>;
}

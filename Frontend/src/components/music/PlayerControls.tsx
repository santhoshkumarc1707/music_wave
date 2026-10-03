import { ListMusic, Pause, SkipBack, SkipForward, Shuffle, Repeat2 } from "lucide-react";

export default function PlayerControls() {
  return <div className="flex items-center justify-center gap-5 text-zinc-400"><Shuffle size={18} /><SkipBack size={20} /><button className="rounded-full bg-white p-3 text-black"><Pause size={18} /></button><SkipForward size={20} /><Repeat2 size={18} /><ListMusic size={18} /></div>;
}

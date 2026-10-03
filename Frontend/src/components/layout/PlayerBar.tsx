import { Heart, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

export default function PlayerBar() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 hidden h-20 border-t border-zinc-800 bg-zinc-950/95 px-4 backdrop-blur md:block">
      <div className="mx-auto flex h-full max-w-screen-2xl items-center gap-5">
        <div className="flex min-w-0 w-64 items-center gap-3">
          <div className="h-12 w-12 shrink-0 rounded-lg bg-zinc-800" />
          <div className="min-w-0"><p className="truncate text-sm font-medium">Nothing playing</p><p className="truncate text-xs text-zinc-500">Choose a song to start</p></div>
          <Heart size={17} className="text-zinc-500" />
        </div>
        <div className="flex flex-1 flex-col items-center gap-2">
          <div className="flex items-center gap-5">
            <SkipBack size={18} className="text-zinc-400" />
            <button className="rounded-full bg-white p-2 text-black"><Pause size={16} /></button>
            <SkipForward size={18} className="text-zinc-400" />
          </div>
          <div className="h-1 w-full max-w-xl rounded-full bg-zinc-800"><div className="h-full w-1/3 rounded-full bg-violet-500" /></div>
        </div>
        <div className="hidden w-40 items-center gap-2 xl:flex"><Volume2 size={17} className="text-zinc-400" /><div className="h-1 flex-1 rounded-full bg-zinc-800" /></div>
      </div>
    </footer>
  );
}

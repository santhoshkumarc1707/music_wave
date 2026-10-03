import { Bell, Search, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-zinc-900 bg-zinc-950/90 px-4 backdrop-blur sm:px-6">
      <div className="relative max-w-xl flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
        <input placeholder="Search songs, artists, albums..." className="w-full rounded-full border border-zinc-800 bg-zinc-900 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-violet-500" />
      </div>
      <button className="rounded-full p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white"><Bell size={20} /></button>
      <button className="rounded-full p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white"><UserCircle size={22} /></button>
    </header>
  );
}

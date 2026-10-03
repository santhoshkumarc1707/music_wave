import { Home, Library, Heart, Disc3, Mic2, ListMusic, Settings, Crown } from "lucide-react";

const links = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Discover", icon: Disc3, href: "/discover" },
  { label: "Your Library", icon: Library, href: "/library" },
  { label: "Favorites", icon: Heart, href: "/favorites" },
  { label: "Artists", icon: Mic2, href: "/artists" },
  { label: "Playlists", icon: ListMusic, href: "/playlists" },
];

export default function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-zinc-900 bg-zinc-950 px-4 py-6 lg:block">
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="rounded-lg bg-violet-600 p-2"><Disc3 size={20} /></div>
        <span className="text-xl font-bold">Music Wave</span>
      </div>
      <nav className="space-y-1">
        {links.map(({ label, icon: Icon, href }) => (
          <a key={label} href={href} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white">
            <Icon size={19} />{label}
          </a>
        ))}
      </nav>
      <div className="my-6 border-t border-zinc-900" />
      <a href="/premium" className="flex items-center gap-3 rounded-xl bg-violet-600/10 px-3 py-3 text-sm text-violet-300 hover:bg-violet-600/20">
        <Crown size={19} /> Upgrade to Premium
      </a>
      <a href="/settings" className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white">
        <Settings size={19} /> Settings
      </a>
    </aside>
  );
}

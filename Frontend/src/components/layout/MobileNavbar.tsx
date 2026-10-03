import { Home, Library, Search, Heart } from "lucide-react";

export default function MobileNavbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-4 border-t border-zinc-800 bg-zinc-950/95 p-2 backdrop-blur lg:hidden">
      {[["Home", Home], ["Search", Search], ["Library", Library], ["Favorites", Heart]].map(([label, Icon]) => (
        <a key={String(label)} href="#" className="flex flex-col items-center gap-1 py-2 text-xs text-zinc-400 hover:text-white">
          {Icon && <Icon size={19} />} {label}
        </a>
      ))}
    </nav>
  );
}

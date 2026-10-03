import { Volume2 } from "lucide-react";

export default function VolumeControl() {
  return <div className="flex items-center gap-2 text-zinc-400"><Volume2 size={18} /><input type="range" min="0" max="100" defaultValue="70" className="w-24 accent-violet-500" /></div>;
}

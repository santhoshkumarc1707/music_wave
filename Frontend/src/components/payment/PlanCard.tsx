import { Check, Crown } from "lucide-react";
import Button from "../common/Button";

interface Props { name: string; price: number; duration?: string; features: string[]; selected?: boolean; onSelect?: () => void; }

export default function PlanCard({ name, price, duration = "month", features, selected, onSelect }: Props) {
  return <article className={`rounded-2xl border p-6 ${selected ? "border-violet-500 bg-violet-500/5" : "border-zinc-800 bg-zinc-900/60"}`}><div className="flex items-center gap-2 text-violet-400"><Crown size={18} /><span className="text-sm font-semibold">{name}</span></div><div className="mt-4 flex items-end gap-1"><span className="text-4xl font-bold text-white">₹{price}</span><span className="pb-1 text-sm text-zinc-500">/{duration}</span></div><ul className="my-6 space-y-3">{features.map(feature => <li key={feature} className="flex gap-2 text-sm text-zinc-400"><Check size={17} className="shrink-0 text-violet-400" />{feature}</li>)}</ul><Button className="w-full" onClick={onSelect}>{selected ? "Selected" : "Choose plan"}</Button></article>;
}

import { useState } from "react";
import Button from "../common/Button";

const methods = ["UPI", "Card", "NetBanking", "Wallet", "PayPal"];

interface Props { onSelect?: (method: string) => void; }

export default function PaymentMethod({ onSelect }: Props) {
  const [method, setMethod] = useState("UPI");
  return <div className="space-y-4"><div className="grid grid-cols-2 gap-2">{methods.map(item => <button key={item} onClick={() => setMethod(item)} className={`rounded-lg border px-3 py-2.5 text-sm ${method === item ? "border-violet-500 bg-violet-500/10 text-white" : "border-zinc-800 text-zinc-400 hover:bg-zinc-900"}`}>{item}</button>)}</div><Button className="w-full" onClick={() => onSelect?.(method)}>Pay with {method}</Button></div>;
}

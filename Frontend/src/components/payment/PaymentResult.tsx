import { CheckCircle2, XCircle } from "lucide-react";

interface Props { success: boolean; title?: string; message?: string; }

export default function PaymentResult({ success, title, message }: Props) {
  const Icon = success ? CheckCircle2 : XCircle;
  return <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center"><Icon size={48} className={`mx-auto ${success ? "text-emerald-400" : "text-red-400"}`} /><h2 className="mt-4 text-xl font-bold">{title || (success ? "Payment successful" : "Payment failed")}</h2>{message && <p className="mt-2 text-sm text-zinc-500">{message}</p>}</div>;
}

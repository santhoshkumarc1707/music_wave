interface Props { title: string; message: string; time?: string; unread?: boolean; }

export default function NotificationItem({ title, message, time, unread }: Props) {
  return <div className={`rounded-xl p-3 ${unread ? "bg-violet-500/10" : "bg-zinc-900/50"}`}><div className="flex gap-3"><span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${unread ? "bg-violet-500" : "bg-zinc-700"}`} /><div className="min-w-0"><p className="text-sm font-medium text-white">{title}</p><p className="mt-1 text-xs text-zinc-500">{message}</p>{time && <p className="mt-2 text-[11px] text-zinc-600">{time}</p>}</div></div></div>;
}

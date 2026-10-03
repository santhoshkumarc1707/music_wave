import NotificationItem from "./NotificationItem";

interface Notification { id: string; title: string; message: string; time?: string; unread?: boolean; }
interface Props { notifications: Notification[]; }

export default function NotificationPanel({ notifications }: Props) {
  return <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950 p-3 shadow-2xl"><div className="mb-3 flex items-center justify-between px-2"><h2 className="font-semibold">Notifications</h2><button className="text-xs text-violet-400 hover:text-violet-300">Mark all read</button></div><div className="space-y-1">{notifications.map(n => <NotificationItem key={n.id} {...n} />)}</div></div>;
}

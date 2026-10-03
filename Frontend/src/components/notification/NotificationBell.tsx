import { Bell } from "lucide-react";

interface Props { count?: number; onClick?: () => void; }

export default function NotificationBell({ count = 0, onClick }: Props) {
  return <button onClick={onClick} className="relative rounded-full p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white"><Bell size={20} />{count > 0 && <span className="absolute right-0 top-0 min-w-4 rounded-full bg-violet-600 px-1 text-[10px] font-bold text-white">{count > 99 ? "99+" : count}</span>}</button>;
}

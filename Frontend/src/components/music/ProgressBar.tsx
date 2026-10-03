interface ProgressBarProps { current: number; duration: number; onSeek?: (value: number) => void; }

export default function ProgressBar({ current, duration, onSeek }: ProgressBarProps) {
  const percent = duration > 0 ? Math.min((current / duration) * 100, 100) : 0;
  return <div className="flex items-center gap-3 text-xs text-zinc-500"><span>0:00</span><input type="range" min="0" max={duration || 1} value={Math.min(current, duration || 1)} onChange={e => onSeek?.(Number(e.target.value))} className="flex-1 accent-violet-500" style={{ backgroundSize: `${percent}% 100%` }} /><span>{duration ? "0:00" : "0:00"}</span></div>;
}

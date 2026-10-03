import PlayerControls from "./PlayerControls";
import ProgressBar from "./ProgressBar";
import VolumeControl from "./VolumeControl";

export default function MusicPlayer() {
  return <div className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5"><div className="flex items-center justify-between"><div><p className="font-semibold">Music Player</p><p className="text-sm text-zinc-500">Ready to play</p></div><VolumeControl /></div><ProgressBar current={0} duration={0} /><PlayerControls /></div>;
}

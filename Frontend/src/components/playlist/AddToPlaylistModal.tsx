import Modal from "../common/Modal";

interface Props { open: boolean; onClose: () => void; playlists: { id: string; name: string }[]; onSelect?: (id: string) => void; }

export default function AddToPlaylistModal({ open, onClose, playlists, onSelect }: Props) {
  return <Modal open={open} onClose={onClose} title="Add to playlist"><div className="space-y-2">{playlists.map(p => <button key={p.id} onClick={() => { onSelect?.(p.id); onClose(); }} className="w-full rounded-lg bg-zinc-900 px-4 py-3 text-left text-sm hover:bg-zinc-800">{p.name}</button>)}</div></Modal>;
}

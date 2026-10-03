import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import Modal from "../common/Modal";

interface Props { open: boolean; onClose: () => void; onCreate?: (name: string) => void; }

export default function CreatePlaylistModal({ open, onClose, onCreate }: Props) {
  const [name, setName] = useState("");
  return <Modal open={open} onClose={onClose} title="Create playlist"><Input label="Playlist name" value={name} onChange={e => setName(e.target.value)} placeholder="My playlist" /><div className="mt-5 flex justify-end"><Button onClick={() => { onCreate?.(name); setName(""); onClose(); }} disabled={!name.trim()}>Create playlist</Button></div></Modal>;
}

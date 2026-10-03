import Modal from "../common/Modal";
import PaymentMethod from "./PaymentMethod";

interface Props { open: boolean; onClose: () => void; amount: number; onConfirm?: (method: string) => void; }

export default function PaymentModal({ open, onClose, amount, onConfirm }: Props) {
  return <Modal open={open} onClose={onClose} title="Demo payment"><p className="mb-5 text-sm text-zinc-400">This is a mock payment. No real money will be charged.</p><PaymentMethod onSelect={method => onConfirm?.(method)} /><p className="mt-5 text-center text-2xl font-bold">₹{amount}</p></Modal>;
}

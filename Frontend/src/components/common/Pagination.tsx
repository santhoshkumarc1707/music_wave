import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <button disabled={page <= 1} onClick={() => onChange(page - 1)} className="rounded-lg border border-zinc-800 p-2 text-zinc-300 disabled:opacity-30">
        <ChevronLeft size={18} />
      </button>
      <span className="text-sm text-zinc-400">Page {page} of {Math.max(totalPages, 1)}</span>
      <button disabled={page >= totalPages} onClick={() => onChange(page + 1)} className="rounded-lg border border-zinc-800 p-2 text-zinc-300 disabled:opacity-30">
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

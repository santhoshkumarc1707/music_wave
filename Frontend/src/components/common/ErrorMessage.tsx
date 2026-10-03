import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message?: string;
}

export default function ErrorMessage({ title = "Something went wrong", message = "Please try again." }: ErrorMessageProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
      <AlertCircle className="mt-0.5 shrink-0" size={20} />
      <div><p className="font-medium">{title}</p><p className="mt-1 text-sm text-red-300/80">{message}</p></div>
    </div>
  );
}

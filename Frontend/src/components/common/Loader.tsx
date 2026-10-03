interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = { sm: "h-4 w-4", md: "h-7 w-7", lg: "h-10 w-10" };

export default function Loader({ size = "md", className = "" }: LoaderProps) {
  return <div className={`animate-spin rounded-full border-2 border-zinc-700 border-t-violet-500 ${sizes[size]} ${className}`} />;
}

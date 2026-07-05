import { cn } from "@/lib/utils";

interface TagProps {
  children: string;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-neutral-200 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-neutral-500",
        className,
      )}
    >
      {children}
    </span>
  );
}

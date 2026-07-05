import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  children: string;
  className?: string;
}

export function StatusBadge({ children, className }: StatusBadgeProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted",
        className,
      )}
    >
      <span
        className="size-2 shrink-0 rounded-full bg-accent"
        aria-hidden="true"
      />
      {children}
    </p>
  );
}

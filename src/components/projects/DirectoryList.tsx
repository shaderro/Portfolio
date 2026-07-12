import Link from "next/link";
import { cn } from "@/lib/utils";
import type { IndexItem } from "@/types/index";

interface DirectoryListProps {
  items: IndexItem[];
  /** 0 = top-level entries with border-l; 1+ = nested indent only */
  depth?: number;
  /** Tighter spacing for the home three-column layout */
  compact?: boolean;
}

function DirectoryEntry({
  item,
  compact,
}: {
  item: IndexItem;
  compact?: boolean;
}) {
  return (
    <Link
      href={item.href}
      className="group block transition-colors duration-200 hover:text-accent"
    >
      <span
        className={cn(
          "font-semibold text-neutral-950 group-hover:text-accent",
          compact ? "text-[1.4rem]" : "text-[1.75rem]",
        )}
      >
        {item.title}
      </span>
      <span
        className={cn(
          "mt-0.5 block whitespace-pre-line leading-snug text-neutral-500",
          compact ? "text-[1rem]" : "text-[1.53125rem]",
        )}
      >
        {item.description}
      </span>
    </Link>
  );
}

export function DirectoryList({
  items,
  depth = 0,
  compact = false,
}: DirectoryListProps) {
  if (items.length === 0) return null;

  if (depth === 0) {
    return (
      <div
        className={cn(
          "border-l border-neutral-200 pl-4",
          compact ? "space-y-2.5" : "space-y-3 pl-5",
        )}
      >
        {items.map((item) => (
          <div key={item.href}>
            <DirectoryEntry item={item} compact={compact} />
            {item.children && item.children.length > 0 && (
              <DirectoryList
                items={item.children}
                depth={1}
                compact={compact}
              />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn(compact ? "mt-1.5 space-y-1.5 pl-3" : "mt-2 space-y-2 pl-4")}>
      {items.map((item) => (
        <div key={item.href}>
          <DirectoryEntry item={item} compact={compact} />
          {item.children && item.children.length > 0 && (
            <DirectoryList items={item.children} depth={2} compact={compact} />
          )}
        </div>
      ))}
    </div>
  );
}

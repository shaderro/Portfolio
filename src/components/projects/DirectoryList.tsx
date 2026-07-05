import Link from "next/link";
import type { IndexItem } from "@/types/index";

interface DirectoryListProps {
  items: IndexItem[];
  /** 0 = top-level entries with border-l; 1+ = nested indent only */
  depth?: number;
}

function DirectoryEntry({ item }: { item: IndexItem }) {
  return (
    <Link
      href={item.href}
      className="group block transition-colors duration-200 hover:text-accent"
    >
      <span className="text-base font-semibold text-neutral-950 group-hover:text-accent">
        {item.title}
      </span>
      <span className="mt-0.5 block text-sm leading-snug text-neutral-500">
        {item.description}
      </span>
    </Link>
  );
}

export function DirectoryList({ items, depth = 0 }: DirectoryListProps) {
  if (items.length === 0) return null;

  if (depth === 0) {
    return (
      <div className="space-y-3 border-l border-neutral-200 pl-5">
        {items.map((item) => (
          <div key={item.href}>
            <DirectoryEntry item={item} />
            {item.children && item.children.length > 0 && (
              <DirectoryList items={item.children} depth={1} />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-2 space-y-2 pl-4">
      {items.map((item) => (
        <div key={item.href}>
          <DirectoryEntry item={item} />
          {item.children && item.children.length > 0 && (
            <DirectoryList items={item.children} depth={2} />
          )}
        </div>
      ))}
    </div>
  );
}

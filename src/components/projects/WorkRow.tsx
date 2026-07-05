import Link from "next/link";
import { formatIndex } from "@/lib/utils";
import { Tag } from "@/components/ui/Tag";
import type { IndexItem } from "@/types/index";

interface WorkRowProps {
  item: IndexItem;
  /** Row number shown for top-level entries only */
  index?: number;
  depth?: number;
}

export function WorkRow({ item, index, depth = 0 }: WorkRowProps) {
  const showIndex = depth === 0 && index !== undefined;

  return (
    <li>
      <Link
        href={item.href}
        className="group grid grid-cols-1 gap-4 border-b border-border py-8 transition-colors hover:bg-neutral-50/50 md:grid-cols-[3rem_1fr_1.2fr_auto] md:items-center md:gap-8 md:py-10"
        style={depth > 0 ? { paddingLeft: `${depth * 1.5}rem` } : undefined}
      >
        <span
          className="font-mono text-sm text-muted-foreground"
          aria-hidden="true"
        >
          {showIndex ? formatIndex(index) : ""}
        </span>

        <h3
          className={
            depth === 0
              ? "text-2xl font-semibold tracking-tight text-neutral-950 transition-colors group-hover:text-accent md:text-3xl"
              : "text-lg font-medium tracking-tight text-neutral-950 transition-colors group-hover:text-accent md:text-xl"
          }
        >
          {item.title}
          {item.optional && (
            <span className="ml-2 font-mono text-xs font-normal uppercase tracking-widest text-muted-foreground">
              可选
            </span>
          )}
        </h3>

        <p className="text-sm leading-relaxed text-neutral-500 md:text-base">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-2 md:justify-end">
          {item.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <span className="sr-only">View {item.title}</span>
      </Link>
    </li>
  );
}

interface IndexBranchProps {
  item: IndexItem;
  index?: number;
  depth?: number;
}

/** Renders one index entry and its nested children */
export function IndexBranch({ item, index, depth = 0 }: IndexBranchProps) {
  return (
    <>
      <WorkRow item={item} index={index} depth={depth} />
      {item.children?.map((child) => (
        <IndexBranch
          key={`${item.href}/${child.title}`}
          item={child}
          depth={depth + 1}
        />
      ))}
    </>
  );
}

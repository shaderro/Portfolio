import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ProjectCardItem {
  title: string;
  description?: string;
  href: string;
  children?: readonly ProjectCardItem[];
}

interface ProjectCardProps {
  title: string;
  description?: string;
  items: readonly ProjectCardItem[];
  className?: string;
}

function ProjectCardEntry({ item }: { item: ProjectCardItem }) {
  return (
    <div>
      <Link
        href={item.href}
        className="group/item block transition-colors duration-200"
      >
        <span className="text-sm font-semibold leading-[21px] text-neutral-900 transition-colors duration-200 group-hover/item:text-neutral-600">
          {item.title}
        </span>
        {item.description && (
          <span className="mt-1 block text-[13px] leading-[19.5px] text-neutral-500">
            {item.description}
          </span>
        )}
      </Link>

      {item.children && item.children.length > 0 && (
        <ul className="mt-2 space-y-1 border-l border-border pl-3">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                className="inline-flex items-center gap-1 text-xs font-medium leading-[18px] text-neutral-900 transition-opacity duration-200 hover:opacity-60"
              >
                {child.title}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ProjectCard({
  title,
  description,
  items,
  className,
}: ProjectCardProps) {
  return (
    <article
      className={cn(
        "rounded-xl border border-border bg-white p-6",
        className,
      )}
    >
      <h3 className="text-xl font-bold leading-[30px] tracking-[-0.025em] text-neutral-950">
        {title}
      </h3>

      {description && (
        <p className="mt-1 text-[13px] leading-[21px] text-neutral-500">
          {description}
        </p>
      )}

      <ul className="mt-4">
        {items.map((item, index) => (
          <li
            key={item.href}
            className={cn(index > 0 && "mt-5 border-t border-border pt-5")}
          >
            <ProjectCardEntry item={item} />
          </li>
        ))}
      </ul>
    </article>
  );
}

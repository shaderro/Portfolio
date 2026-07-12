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

const cardChrome =
  "rounded-lg border border-border bg-white px-5 py-4 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-neutral-400 hover:bg-neutral-50 md:px-6 md:py-5";

function ProjectCardEntry({ item }: { item: ProjectCardItem }) {
  return (
    <div>
      <Link
        href={item.href}
        className="group/item block transition-colors duration-200"
      >
        <span className="text-base font-medium leading-snug text-neutral-950 transition-colors duration-200 group-hover/item:text-neutral-600">
          {item.title}
        </span>
        {item.description && (
          <span className="mt-0.5 block text-sm leading-snug text-neutral-500">
            {item.description}
          </span>
        )}
      </Link>

      {item.children && item.children.length > 0 && (
        <ul className="mt-1.5 space-y-1 border-l border-neutral-200 pl-3">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                className="block text-sm leading-snug text-neutral-500 transition-colors duration-200 hover:text-neutral-800"
              >
                {child.title}
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
    <article className={cn(cardChrome, className)}>
      <h3 className="text-[1.35rem] font-semibold leading-tight tracking-tight text-neutral-600 md:text-[1.5rem]">
        {title}
      </h3>

      {description && (
        <p className="mt-2 text-base leading-snug text-neutral-500">
          {description}
        </p>
      )}

      <ul className={cn("space-y-2.5", description ? "mt-4" : "mt-3")}>
        {items.map((item) => (
          <li key={item.href}>
            <ProjectCardEntry item={item} />
          </li>
        ))}
      </ul>
    </article>
  );
}

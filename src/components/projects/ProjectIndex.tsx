import Link from "next/link";
import { DirectoryList } from "@/components/projects/DirectoryList";
import {
  INDEX_CONTENT,
  INDEX_SECTION_TITLE,
  INDEX_TITLE,
} from "@/components/projects/index-layout";
import { cn } from "@/lib/utils";
import type { IndexItem } from "@/types/index";

interface ProjectIndexProps {
  sections: IndexItem[];
  labItems?: IndexItem[];
  labTitle?: string;
}

function ColumnTitle({
  item,
  staticTitle,
}: {
  item: IndexItem;
  staticTitle?: boolean;
}) {
  if (staticTitle) {
    return <p className={INDEX_SECTION_TITLE}>{item.title}</p>;
  }

  return (
    <Link href={item.href} className="group block">
      <span
        className={cn(
          INDEX_TITLE,
          "transition-colors group-hover:text-accent",
        )}
      >
        {item.title}
      </span>
    </Link>
  );
}

function ProjectColumn({ item }: { item: IndexItem }) {
  const hasChildren = (item.children?.length ?? 0) > 0;
  const staticTitle = Boolean(item.collapsible);

  return (
    <div className={INDEX_CONTENT}>
      <ColumnTitle item={item} staticTitle={staticTitle} />

      <p className="mt-2 whitespace-pre-line text-[1rem] leading-snug text-neutral-500">
        {item.description}
      </p>

      {hasChildren && item.children && (
        <div className="mt-3">
          <DirectoryList items={item.children} compact />
        </div>
      )}
    </div>
  );
}

function LabColumn({
  items,
  title,
}: {
  items: IndexItem[];
  title: string;
}) {
  return (
    <div id="lab" className={INDEX_CONTENT}>
      <h2 id="lab-heading" className={INDEX_SECTION_TITLE}>
        {title}
      </h2>
      <div className="mt-3">
        <DirectoryList items={items} compact />
      </div>
    </div>
  );
}

export function ProjectIndex({
  sections,
  labItems,
  labTitle = "Lab",
}: ProjectIndexProps) {
  return (
    <div className="grid grid-cols-3 gap-4 border-t border-border pt-4 sm:gap-6 sm:pt-5 lg:gap-10">
      {sections.map((section) => (
        <ProjectColumn key={section.href} item={section} />
      ))}
      {labItems && labItems.length > 0 && (
        <LabColumn items={labItems} title={labTitle} />
      )}
    </div>
  );
}

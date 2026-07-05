"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { DirectoryList } from "@/components/projects/DirectoryList";
import {
  INDEX_CONTENT,
  INDEX_GUTTER,
  INDEX_ROW,
  INDEX_TITLE,
} from "@/components/projects/index-layout";
import { cn } from "@/lib/utils";
import type { IndexItem } from "@/types/index";

interface ProjectIndexProps {
  sections: IndexItem[];
  labItems?: IndexItem[];
  labTitle?: string;
}

function TopLevelEntryLink({ item }: { item: IndexItem }) {
  return (
    <Link
      href={item.href}
      className="group inline-flex flex-wrap items-baseline gap-x-3"
    >
      <span
        className={cn(
          INDEX_TITLE,
          "transition-colors group-hover:text-accent",
        )}
      >
        {item.title}
      </span>
      {item.year && (
        <span className="font-mono text-sm text-neutral-400">{item.year}</span>
      )}
    </Link>
  );
}

function TopLevelSection({ item }: { item: IndexItem }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = (item.children?.length ?? 0) > 0;
  const showChildren = hasChildren && (!item.collapsible || isExpanded);

  return (
    <li className="border-t border-border py-5 md:py-6">
      <div className={INDEX_ROW}>
        {item.collapsible && hasChildren ? (
          <button
            type="button"
            aria-expanded={isExpanded}
            aria-label={
              isExpanded ? `Collapse ${item.title}` : `Expand ${item.title}`
            }
            onClick={() => setIsExpanded((open) => !open)}
            className={cn(
              INDEX_GUTTER,
              "mt-1.5 rounded-sm p-0.5 text-neutral-400 transition-colors hover:text-neutral-700",
            )}
          >
            <ChevronDown
              className={cn(
                "size-4 transition-transform duration-200",
                !isExpanded && "-rotate-90",
              )}
              strokeWidth={1.75}
            />
          </button>
        ) : (
          <span className={INDEX_GUTTER} aria-hidden="true" />
        )}

        <div className={INDEX_CONTENT}>
          <TopLevelEntryLink item={item} />

          {item.meta && (
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-400">
              {item.meta}
            </p>
          )}

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-500">
            {item.description}
          </p>

          {item.tags.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}

          {showChildren && item.children && (
            <div className="mt-3">
              <DirectoryList items={item.children} />
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

function LabSection({
  items,
  title,
}: {
  items: IndexItem[];
  title: string;
}) {
  return (
    <li className="border-t border-border py-5 md:py-6">
      <div className={INDEX_ROW}>
        <span className={INDEX_GUTTER} aria-hidden="true" />
        <div className={INDEX_CONTENT}>
          <h2 id="lab-heading" className={INDEX_TITLE}>
            {title}
          </h2>
          <div className="mt-3">
            <DirectoryList items={items} />
          </div>
        </div>
      </div>
    </li>
  );
}

export function ProjectIndex({
  sections,
  labItems,
  labTitle = "Lab",
}: ProjectIndexProps) {
  return (
    <ul>
      {sections.map((section) => (
        <TopLevelSection key={section.href} item={section} />
      ))}
      {labItems && labItems.length > 0 && (
        <LabSection items={labItems} title={labTitle} />
      )}
    </ul>
  );
}

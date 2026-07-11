"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { DirectoryList } from "@/components/projects/DirectoryList";
import {
  INDEX_CONTENT,
  INDEX_GUTTER,
  INDEX_ROW,
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

function formatIndexNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function TopLevelEntryLink({ item }: { item: IndexItem }) {
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

function TopLevelSection({
  item,
  index,
}: {
  item: IndexItem;
  index: number;
}) {
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
          <p className="font-mono text-sm text-neutral-400">
            {formatIndexNumber(index)}
          </p>

          <div className="mt-2">
            {item.collapsible ? (
              <p className={INDEX_SECTION_TITLE}>{item.title}</p>
            ) : (
              <TopLevelEntryLink item={item} />
            )}
          </div>

          <p className="mt-3 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-neutral-500 md:text-base">
            {item.description}
          </p>

          {showChildren && item.children && (
            <div className="mt-4">
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
          <h2 id="lab-heading" className={INDEX_SECTION_TITLE}>
            {title}
          </h2>
          <div className="mt-4">
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
      {sections.map((section, index) => (
        <TopLevelSection key={section.href} item={section} index={index} />
      ))}
      {labItems && labItems.length > 0 && (
        <LabSection items={labItems} title={labTitle} />
      )}
    </ul>
  );
}

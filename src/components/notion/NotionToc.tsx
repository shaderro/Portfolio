"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { List } from "lucide-react";
import { uuidToId } from "notion-utils";
import type { NotionTocItem } from "@/types/notion-toc";
import { cn } from "@/lib/utils";

const HEADER_OFFSET = 96;
const COLLAPSE_DELAY_MS = 275;
const TRANSITION_MS = 200;

const LEVEL_PADDING: Record<number, string> = {
  0: "pr-0",
  1: "pr-3",
  2: "pr-6",
  3: "pr-9",
};

interface NotionTocProps {
  items: NotionTocItem[];
}

function getHeadingElements(): HTMLElement[] {
  return [
    ...document.querySelectorAll<HTMLElement>(
      ".notion-page .notion-h[data-id]",
    ),
  ];
}

function scrollToHeading(anchorId: string) {
  const target =
    document.getElementById(anchorId) ??
    document.querySelector<HTMLElement>(
      `.notion-page .notion-h[data-id="${anchorId}"]`,
    );

  if (!target) return;

  const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
  window.history.replaceState(null, "", `#${anchorId}`);
}

export function NotionToc({ items }: NotionTocProps) {
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const collapseTimerRef = useRef<number | null>(null);

  const clearCollapseTimer = useCallback(() => {
    if (collapseTimerRef.current !== null) {
      window.clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = null;
    }
  }, []);

  const handlePointerEnter = useCallback(() => {
    clearCollapseTimer();
    setIsExpanded(true);
  }, [clearCollapseTimer]);

  const handlePointerLeave = useCallback(() => {
    clearCollapseTimer();
    collapseTimerRef.current = window.setTimeout(() => {
      setIsExpanded(false);
      collapseTimerRef.current = null;
    }, COLLAPSE_DELAY_MS);
  }, [clearCollapseTimer]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || items.length === 0) return;

    const syncActive = () => {
      const headings = getHeadingElements();
      if (headings.length === 0) return;

      let current = headings[0]?.dataset.id ?? null;

      for (const heading of headings) {
        const id = heading.dataset.id;
        if (!id) continue;
        if (heading.getBoundingClientRect().top <= HEADER_OFFSET + 8) {
          current = id;
        } else {
          break;
        }
      }

      setActiveId(current);
    };

    const timer = window.setTimeout(syncActive, 400);
    window.addEventListener("scroll", syncActive, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", syncActive);
    };
  }, [mounted, items]);

  useEffect(() => {
    if (!isExpanded) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        clearCollapseTimer();
        setIsExpanded(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isExpanded, clearCollapseTimer]);

  useEffect(() => {
    return () => clearCollapseTimer();
  }, [clearCollapseTimer]);

  if (!mounted || items.length === 0) return null;

  const h1Items = items.filter((item) => item.indentLevel === 0);
  const visibleItems = isExpanded ? items : h1Items;

  return createPortal(
    <div
      className="fixed top-24 right-0 z-40 hidden w-[calc(11rem+1.75rem)] lg:block xl:w-[calc(12rem+1.75rem)]"
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
    >
      <div className="relative flex h-[calc(100vh-120px)] flex-row-reverse">
        <div
          aria-hidden="true"
          className="flex w-7 shrink-0 flex-col items-center pt-1"
        >
          <List
            className={cn(
              "h-4 w-4 transition-colors duration-200",
              isExpanded ? "text-neutral-400" : "text-neutral-300",
            )}
            strokeWidth={1.75}
          />
        </div>

        <nav
          aria-label="Table of contents"
          className="absolute top-0 right-7 w-44 xl:w-48"
        >
          {isExpanded && (
            <p
              className="mb-3 text-right text-[11px] font-semibold tracking-[0.14em] text-neutral-400 uppercase"
              style={{
                transitionProperty: "opacity",
                transitionDuration: `${TRANSITION_MS}ms`,
              }}
            >
              Contents
            </p>
          )}
          <div
            className={cn(
              "max-h-[calc(100vh-120px)] overflow-y-auto",
              "[scrollbar-width:none] [-ms-overflow-style:none]",
              "[&::-webkit-scrollbar]:hidden",
            )}
          >
            <ul className="m-0 list-none space-y-0.5 p-0">
              {visibleItems.map((item) => {
                const anchorId = uuidToId(item.id);
                const isActive = activeId === anchorId;

                return (
                  <li key={item.id}>
                    <a
                      href={`#${anchorId}`}
                      title={item.text}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToHeading(anchorId);
                        setActiveId(anchorId);
                      }}
                      className={cn(
                        "block py-1 text-right leading-snug break-words whitespace-normal transition-colors duration-200",
                        item.indentLevel === 0 && isExpanded && "text-[15px] font-semibold",
                        item.indentLevel === 0 && !isExpanded && "text-[13px]",
                        item.indentLevel > 0 && "text-[12px]",
                        isExpanded
                          ? (LEVEL_PADDING[item.indentLevel] ?? "pr-0")
                          : "pr-0",
                        isActive
                          ? item.indentLevel === 0 && isExpanded
                            ? "text-neutral-900"
                            : "font-medium text-neutral-900"
                          : "text-neutral-500 hover:text-neutral-900",
                      )}
                    >
                      {item.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </div>,
    document.body,
  );
}

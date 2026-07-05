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

  return createPortal(
    <div
      className={cn(
        "fixed top-24 right-0 z-40 hidden lg:block",
        isExpanded
          ? "w-[calc(11rem+1.75rem)] xl:w-[calc(12rem+1.75rem)]"
          : "w-[3.75rem]",
      )}
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
    >
      <div className="relative flex h-[calc(100vh-120px)] flex-row-reverse">
        <div
          aria-hidden="true"
          className={cn(
            "flex shrink-0 flex-col items-center pt-1",
            isExpanded ? "w-7" : "w-[3.75rem]",
          )}
        >
          <List
            className={cn(
              "transition-[color,width,height,margin] duration-200",
              isExpanded
                ? "h-4 w-4 text-neutral-400"
                : "mr-1.5 h-[3.75rem] w-[3.75rem] text-neutral-300",
            )}
            strokeWidth={1.75}
          />
        </div>

        <nav
          aria-label="Table of contents"
          className={cn(
            "absolute top-0 right-7 w-44 xl:w-48",
            "ease-out",
            isExpanded
              ? "pointer-events-auto translate-x-0 opacity-100"
              : "pointer-events-none translate-x-2 opacity-0",
          )}
          style={{
            transitionProperty: "opacity, transform",
            transitionDuration: `${TRANSITION_MS}ms`,
          }}
        >
          <p className="mb-3 text-right text-[11px] font-semibold tracking-[0.14em] text-neutral-400 uppercase">
            Contents
          </p>
          <div
            className={cn(
              "max-h-[calc(100vh-120px)] overflow-y-auto",
              "[scrollbar-width:none] [-ms-overflow-style:none]",
              "[&::-webkit-scrollbar]:hidden",
            )}
          >
            <ul className="m-0 list-none space-y-0.5 p-0">
              {items.map((item) => {
                const anchorId = uuidToId(item.id);
                const isActive = activeId === anchorId;

                return (
                  <li key={item.id}>
                    <a
                      href={`#${anchorId}`}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToHeading(anchorId);
                        setActiveId(anchorId);
                      }}
                      className={cn(
                        "block py-1 text-right leading-snug transition-colors duration-200",
                        item.indentLevel === 0 ? "text-[13px]" : "text-[12px]",
                        LEVEL_PADDING[item.indentLevel] ?? "pr-0",
                        isActive
                          ? "font-medium text-neutral-900"
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

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { uuidToId } from "notion-utils";
import type { NotionTocItem } from "@/types/notion-toc";
import { cn } from "@/lib/utils";

const HEADER_OFFSET = 96;
const DEFAULT_HEADING_SELECTOR = ".notion-page .notion-h[data-id]";
const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_IN_OUT = [0.25, 0.1, 0.25, 1] as const;
const EXPAND_S = 0.36;
const HOVER_GRACE_MS = 220;

type TocGroup = {
  item: NotionTocItem;
  children: NotionTocItem[];
};

interface NotionTocProps {
  items: NotionTocItem[];
  headingSelector?: string;
  getAnchorId?: (item: NotionTocItem) => string;
}

function defaultGetAnchorId(item: NotionTocItem) {
  return uuidToId(item.id);
}

function getHeadingElements(selector: string): HTMLElement[] {
  return [...document.querySelectorAll<HTMLElement>(selector)];
}

function headingAnchorId(heading: HTMLElement) {
  return heading.dataset.id || heading.id;
}

function findHeading(anchorId: string, headingSelector: string) {
  return (
    document.getElementById(anchorId) ??
    document.querySelector<HTMLElement>(
      `${headingSelector}[data-id="${anchorId}"]`,
    )
  );
}

function scrollToHeading(anchorId: string, headingSelector: string) {
  const target = findHeading(anchorId, headingSelector);
  if (!target) return;

  target.style.scrollMarginTop = `${HEADER_OFFSET}px`;

  const top = Math.max(
    0,
    window.scrollY + target.getBoundingClientRect().top - HEADER_OFFSET,
  );
  const html = document.documentElement;
  const root = document.scrollingElement ?? html;

  html.style.scrollBehavior = "auto";
  root.scrollTop = top;
  html.style.scrollBehavior = "";

  window.history.replaceState(null, "", `#${anchorId}`);
}

function groupTocItems(items: NotionTocItem[]): TocGroup[] {
  const groups: TocGroup[] = [];

  for (const item of items) {
    if (item.indentLevel === 0 || groups.length === 0) {
      groups.push({ item, children: [] });
      continue;
    }
    groups[groups.length - 1]!.children.push(item);
  }

  return groups;
}

export function NotionToc({
  items,
  headingSelector = DEFAULT_HEADING_SELECTOR,
  getAnchorId = defaultGetAnchorId,
}: NotionTocProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const pinnedRef = useRef(false);
  const openIdRef = useRef<string | null>(null);
  const hoverTimerRef = useRef<number>(0);
  openIdRef.current = openId;

  const groups = useMemo(() => groupTocItems(items), [items]);

  const parentIdOf = useCallback(
    (anchorId: string | null) => {
      if (!anchorId) return null;
      let current: string | null = null;
      for (const item of items) {
        const id = getAnchorId(item);
        if (item.indentLevel === 0) current = id;
        if (id === anchorId) return current ?? id;
      }
      return current;
    },
    [getAnchorId, items],
  );

  useEffect(() => {
    setMounted(true);
    return () => window.clearTimeout(hoverTimerRef.current);
  }, []);

  const hoverGroup = useCallback((id: string | null) => {
    window.clearTimeout(hoverTimerRef.current);
    if (id !== null) {
      setHoverId(id);
      return;
    }
    hoverTimerRef.current = window.setTimeout(() => {
      setHoverId(null);
    }, HOVER_GRACE_MS);
  }, []);

  useEffect(() => {
    if (!mounted || items.length === 0) return;

    const syncActive = () => {
      const headings = getHeadingElements(headingSelector);
      if (headings.length === 0) return;

      let current = headingAnchorId(headings[0]!) || null;

      for (const heading of headings) {
        const id = headingAnchorId(heading);
        if (!id) continue;
        if (heading.getBoundingClientRect().top <= HEADER_OFFSET + 8) {
          current = id;
        } else {
          break;
        }
      }

      setActiveId(current);
      const parent = parentIdOf(current);
      if (!parent) return;
      if (pinnedRef.current && openIdRef.current && openIdRef.current !== parent) {
        pinnedRef.current = false;
      }
      if (!pinnedRef.current) setOpenId(parent);
    };

    const timer = window.setTimeout(syncActive, 400);
    window.addEventListener("scroll", syncActive, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", syncActive);
    };
  }, [mounted, items, headingSelector, parentIdOf]);

  const goTo = useCallback(
    (anchorId: string) => {
      setActiveId(anchorId);
      scrollToHeading(anchorId, headingSelector);
    },
    [headingSelector],
  );

  if (!mounted || items.length === 0) return null;

  const duration = reduceMotion ? 0 : EXPAND_S;

  const tocWidth = 260;
  const tocScale = 2 / 3;

  return createPortal(
    <nav
      aria-label="Table of contents"
      className="pointer-events-none fixed top-24 right-2 z-40 hidden font-sans lg:block"
      style={{ width: tocWidth * tocScale }}
    >
      <div
        className="pointer-events-auto origin-top-right"
        style={{
          width: tocWidth,
          transform: `scale(${tocScale})`,
          marginLeft: -(tocWidth * (1 - tocScale)),
        }}
        onMouseEnter={() => window.clearTimeout(hoverTimerRef.current)}
        onMouseLeave={() => hoverGroup(null)}
      >
        <div
          className={cn(
            "overflow-y-auto",
            "[scrollbar-width:none] [-ms-overflow-style:none]",
            "[&::-webkit-scrollbar]:hidden",
          )}
          style={{ maxHeight: `calc((100vh - 140px) / ${tocScale})` }}
        >
        <ul className="pointer-events-auto m-0 list-none p-0">
          {groups.map((group) => {
            const groupId = getAnchorId(group.item);
            const hasChildren = group.children.length > 0;
            const isOpen =
              hasChildren && (hoverId === groupId || (!hoverId && openId === groupId));
            const isTitleActive = activeId === groupId;

            return (
              <li
                key={group.item.id}
                className="text-right"
                onMouseEnter={() => hoverGroup(groupId)}
              >
                <div className="flex items-center justify-end gap-1 py-1">
                  <a
                    href={`#${groupId}`}
                    title={group.item.text}
                    onClick={(event) => {
                      event.preventDefault();
                      pinnedRef.current = false;
                      if (hasChildren) setOpenId(groupId);
                      goTo(groupId);
                    }}
                    className={cn(
                      "min-w-0 flex-1 cursor-pointer text-right text-[17px] font-bold leading-tight break-words transition-colors duration-200",
                      isTitleActive ? "text-neutral-900" : "text-neutral-400",
                    )}
                    style={{ fontWeight: 700 }}
                  >
                    {group.item.text}
                  </a>

                  {hasChildren ? (
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-label={
                        isOpen
                          ? `Collapse ${group.item.text}`
                          : `Expand ${group.item.text}`
                      }
                      onClick={() => {
                        const next = isOpen ? null : groupId;
                        pinnedRef.current = next !== parentIdOf(activeId);
                        setOpenId(next);
                      }}
                      className="shrink-0 cursor-pointer p-0.5 text-[12px] leading-none text-neutral-400"
                    >
                      <motion.span
                        className="inline-block"
                        animate={{ rotate: isOpen ? 0 : -90 }}
                        transition={{ duration, ease: EASE_OUT }}
                      >
                        ▾
                      </motion.span>
                    </button>
                  ) : (
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-[14px] leading-none text-neutral-400"
                    >
                      ›
                    </span>
                  )}
                </div>

                {hasChildren ? (
                  <motion.div
                    initial={false}
                    animate={
                      isOpen
                        ? { height: "auto", opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{
                      height: { duration, ease: EASE_OUT },
                      opacity: {
                        duration: reduceMotion ? 0 : isOpen ? 0.28 : 0.2,
                        ease: EASE_IN_OUT,
                      },
                    }}
                    className="overflow-hidden"
                    style={{ pointerEvents: isOpen ? "auto" : "none" }}
                    aria-hidden={!isOpen}
                    inert={isOpen ? undefined : true}
                  >
                    <ul className="m-0 flex list-none flex-col items-end gap-0.5 pt-0.5 pb-1 pr-4">
                      {group.children.map((child) => {
                        const childId = getAnchorId(child);
                        const isChildActive = activeId === childId;

                        return (
                          <li key={child.id} className="w-full">
                            <motion.div
                              initial={false}
                              animate={
                                isOpen
                                  ? { opacity: 1, y: 0 }
                                  : { opacity: 0, y: -10 }
                              }
                              transition={{
                                duration: reduceMotion ? 0 : 0.28,
                                delay: 0,
                                ease: isOpen ? EASE_OUT : EASE_IN_OUT,
                              }}
                            >
                              <a
                                href={`#${childId}`}
                                title={child.text}
                                onClick={(event) => {
                                  event.preventDefault();
                                  pinnedRef.current = false;
                                  setOpenId(groupId);
                                  goTo(childId);
                                }}
                                className={cn(
                                  "relative z-[1] block w-full cursor-pointer text-right text-[16.875px] font-normal leading-tight break-words transition-colors duration-200",
                                  child.indentLevel > 1 && "pr-2",
                                  isChildActive
                                    ? "text-neutral-900"
                                    : "text-neutral-400",
                                )}
                              >
                                {child.text}
                              </a>
                            </motion.div>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                ) : null}
              </li>
            );
          })}
        </ul>
        </div>
      </div>
    </nav>,
    document.body,
  );
}

"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useTransitionManager } from "@/components/fullpage/TransitionManager";

interface FullPageSectionProps {
  index: number;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}

export function FullPageSection({
  index,
  children,
  className,
  "aria-label": ariaLabel,
}: FullPageSectionProps) {
  const { getSectionStyle, activeIndex } = useTransitionManager();
  const style = getSectionStyle(index);
  const isActive = index === activeIndex;

  return (
    <section
      aria-label={ariaLabel}
      aria-hidden={!isActive}
      className={cn("absolute inset-0 overflow-hidden bg-transparent", className)}
      style={{
        opacity: style.opacity,
        transform: style.transform,
        pointerEvents: "none",
        zIndex: style.zIndex,
        transition: style.transition,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </section>
  );
}

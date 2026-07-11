"use client";

import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FULLPAGE_HEIGHT } from "@/components/fullpage/constants";
import { FullPageSection } from "@/components/fullpage/FullPageSection";
import {
  TransitionManager,
  useTransitionManager,
} from "@/components/fullpage/TransitionManager";
import { useFullPageNavigation } from "@/components/fullpage/useFullPageNavigation";

interface FullPageContainerProps {
  children: ReactNode;
  sectionCount: number;
  className?: string;
}

function FullPageViewport({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { handleWheel, handleKeyDown } = useFullPageNavigation();
  const { activeIndex, sectionCount, goTo } = useTransitionManager();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => handleWheel(event);
    const onKeyDown = (event: KeyboardEvent) => handleKeyDown(event);

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [handleKeyDown, handleWheel]);

  return (
    <div
      className={cn("relative w-full overflow-hidden bg-black", className)}
      style={{ height: FULLPAGE_HEIGHT }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Immersive project showcase"
    >
      <div className="relative h-full w-full">{children}</div>

      <nav
        className="pointer-events-auto absolute right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2 md:flex"
        aria-label="Section navigation"
      >
        {Array.from({ length: sectionCount }, (_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to section ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => goTo(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-300",
              index === activeIndex
                ? "scale-125 bg-white"
                : "bg-white/30 hover:bg-white/60",
            )}
          />
        ))}
      </nav>
    </div>
  );
}

export function FullPageContainer({
  children,
  sectionCount,
  className,
}: FullPageContainerProps) {
  return (
    <TransitionManager sectionCount={sectionCount}>
      <FullPageViewport className={className}>{children}</FullPageViewport>
    </TransitionManager>
  );
}

export { FullPageSection };

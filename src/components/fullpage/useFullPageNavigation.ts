"use client";

import { useCallback, useRef } from "react";
import { FULLPAGE_WHEEL_THRESHOLD } from "@/components/fullpage/constants";
import { useTransitionManager } from "@/components/fullpage/TransitionManager";

const WHEEL_RESET_MS = 150;

export function useFullPageNavigation() {
  const { goNext, goPrev, goTo, isTransitioning, activeIndex, sectionCount } =
    useTransitionManager();

  const wheelAccumulator = useRef(0);
  const wheelResetTimer = useRef<number | null>(null);

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();

      if (isTransitioning) return;

      if (wheelResetTimer.current !== null) {
        window.clearTimeout(wheelResetTimer.current);
      }

      wheelAccumulator.current += event.deltaY;

      wheelResetTimer.current = window.setTimeout(() => {
        wheelAccumulator.current = 0;
      }, WHEEL_RESET_MS);

      if (Math.abs(wheelAccumulator.current) < FULLPAGE_WHEEL_THRESHOLD) {
        return;
      }

      if (wheelAccumulator.current > 0 && activeIndex < sectionCount - 1) {
        goNext();
      } else if (wheelAccumulator.current < 0 && activeIndex > 0) {
        goPrev();
      }

      wheelAccumulator.current = 0;
    },
    [activeIndex, goNext, goPrev, isTransitioning, sectionCount],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isTransitioning) return;

      switch (event.key) {
        case "ArrowDown":
        case "PageDown":
          event.preventDefault();
          goNext();
          break;
        case "ArrowUp":
        case "PageUp":
          event.preventDefault();
          goPrev();
          break;
        case "Home":
          event.preventDefault();
          goTo(0);
          break;
        case "End":
          event.preventDefault();
          goTo(sectionCount - 1);
          break;
        default:
          break;
      }
    },
    [goNext, goPrev, goTo, isTransitioning, sectionCount],
  );

  return { handleWheel, handleKeyDown };
}

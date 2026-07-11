"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { FULLPAGE_NAV_COOLDOWN_MS, FULLPAGE_TRANSITION_MS } from "@/components/fullpage/constants";

export interface SectionTransitionStyle {
  opacity: number;
  transform: string;
  pointerEvents: "auto" | "none";
  zIndex: number;
  transition: string;
}

interface TransitionManagerContextValue {
  activeIndex: number;
  fromIndex: number;
  toIndex: number;
  progress: number;
  isTransitioning: boolean;
  sectionCount: number;
  goTo: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
  getSectionStyle: (index: number) => SectionTransitionStyle;
}

const TransitionManagerContext =
  createContext<TransitionManagerContextValue | null>(null);

export function useTransitionManager() {
  const context = useContext(TransitionManagerContext);
  if (!context) {
    throw new Error(
      "useTransitionManager must be used within TransitionManager",
    );
  }
  return context;
}

interface TransitionManagerProps {
  sectionCount: number;
  children: ReactNode;
  onIndexChange?: (index: number) => void;
}

export function TransitionManager({
  sectionCount,
  children,
  onIndexChange,
}: TransitionManagerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fromIndex, setFromIndex] = useState(0);
  const [toIndex, setToIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(1);

  const lockedUntil = useRef(0);
  const animationFrame = useRef<number | null>(null);

  const finishTransition = useCallback(
    (targetIndex: number) => {
      setActiveIndex(targetIndex);
      setIsTransitioning(false);
      setProgress(1);
      onIndexChange?.(targetIndex);
    },
    [onIndexChange],
  );

  const goTo = useCallback(
    (index: number) => {
      const now = Date.now();
      if (
        index === activeIndex ||
        index < 0 ||
        index >= sectionCount ||
        isTransitioning ||
        now < lockedUntil.current
      ) {
        return;
      }

      lockedUntil.current = now + FULLPAGE_NAV_COOLDOWN_MS;

      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
        animationFrame.current = null;
      }

      setFromIndex(activeIndex);
      setToIndex(index);
      setIsTransitioning(true);
      setProgress(0);

      const start = performance.now();

      const animate = (time: number) => {
        const elapsed = time - start;
        const nextProgress = Math.min(elapsed / FULLPAGE_TRANSITION_MS, 1);
        setProgress(nextProgress);

        if (nextProgress < 1) {
          animationFrame.current = requestAnimationFrame(animate);
        } else {
          animationFrame.current = null;
          finishTransition(index);
        }
      };

      animationFrame.current = requestAnimationFrame(animate);
    },
    [activeIndex, finishTransition, isTransitioning, sectionCount],
  );

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const getSectionStyle = useCallback(
    (index: number): SectionTransitionStyle => {
      const transition = `opacity ${FULLPAGE_TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${FULLPAGE_TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;

      if (!isTransitioning) {
        const isActive = index === activeIndex;
        return {
          opacity: isActive ? 1 : 0,
          transform: isActive ? "scale(1)" : "scale(1.02)",
          pointerEvents: isActive ? "auto" : "none",
          zIndex: isActive ? 20 : 10,
          transition,
        };
      }

      if (index === fromIndex) {
        return {
          opacity: 1 - progress,
          transform: `scale(${1 + progress * 0.015})`,
          pointerEvents: "none",
          zIndex: 20,
          transition: "none",
        };
      }

      if (index === toIndex) {
        return {
          opacity: progress,
          transform: `scale(${1.02 - progress * 0.02})`,
          pointerEvents: progress >= 1 ? "auto" : "none",
          zIndex: 21,
          transition: "none",
        };
      }

      return {
        opacity: 0,
        transform: "scale(1.02)",
        pointerEvents: "none",
        zIndex: 10,
        transition: "none",
      };
    },
    [activeIndex, fromIndex, isTransitioning, progress, toIndex],
  );

  const value = useMemo(
    () => ({
      activeIndex,
      fromIndex,
      toIndex,
      progress,
      isTransitioning,
      sectionCount,
      goTo,
      goNext,
      goPrev,
      getSectionStyle,
    }),
    [
      activeIndex,
      fromIndex,
      getSectionStyle,
      goNext,
      goPrev,
      goTo,
      isTransitioning,
      progress,
      sectionCount,
      toIndex,
    ],
  );

  return (
    <TransitionManagerContext.Provider value={value}>
      {children}
    </TransitionManagerContext.Provider>
  );
}

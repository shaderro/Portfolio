"use client";

import { cn } from "@/lib/utils";
import type { ScrollStage } from "@/data/visual-experiment-stages";

interface SectionOverlayProps {
  stage: ScrollStage;
}

export function SectionOverlay({ stage }: SectionOverlayProps) {
  const isPlaceholder = stage.type === "placeholder";
  const isLight = isPlaceholder && stage.background === "white";

  return (
    <div className="relative h-full w-full">
      {isPlaceholder && (
        <div
          className={cn(
            "absolute inset-0",
            isLight ? "bg-white" : "bg-black",
          )}
        />
      )}

      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-12 pt-32 md:px-10",
          isLight
            ? "bg-gradient-to-t from-white via-white/70 to-transparent"
            : "bg-gradient-to-t from-black/80 via-black/30 to-transparent",
        )}
      >
        {stage.type === "unity" && (
          <p
            className={cn(
              "font-mono text-[11px] uppercase tracking-[0.2em]",
              isLight ? "text-neutral-400" : "text-white/50",
            )}
          >
            Unity WebGL
          </p>
        )}

        <h2
          className={cn(
            "mt-3 text-3xl font-medium tracking-tight md:text-4xl",
            isLight ? "text-neutral-950" : "text-white",
          )}
        >
          {stage.title}
        </h2>

        {stage.description && (
          <p
            className={cn(
              "mt-3 max-w-xl text-sm leading-relaxed md:text-base",
              isLight ? "text-neutral-600" : "text-neutral-300",
            )}
          >
            {stage.description}
          </p>
        )}
      </div>
    </div>
  );
}

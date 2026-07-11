"use client";

import { UnityWebGLPlayer } from "@/components/unity/UnityWebGLPlayer";
import type { UnityBuild } from "@/data/unity-builds";
import { cn } from "@/lib/utils";

/** @deprecated Use UnityBackgroundLayer + SectionOverlay for immersive pages. */
export function UnityCanvasWrapper({
  build,
  title,
  description,
}: {
  build: UnityBuild;
  title: string;
  description?: string;
}) {
  return (
    <div className="relative h-full w-full">
      <UnityWebGLPlayer
        build={build}
        fullscreen
        enableWheelScroll={false}
        className="h-full w-full"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-6 pb-12 pt-32 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
          Unity WebGL
        </p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight text-white md:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-300 md:text-base">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

interface ContentSectionProps {
  title: string;
  description?: string;
  background?: "black" | "white";
  children?: React.ReactNode;
}

export function ContentSection({
  title,
  description,
  background = "black",
  children,
}: ContentSectionProps) {
  const isLight = background === "white";

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col justify-end px-6 pb-12 pt-24 md:px-10 md:pb-16",
        isLight ? "bg-white text-neutral-950" : "bg-black text-white",
      )}
    >
      <div className="mx-auto w-full max-w-3xl">
        {children}
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "mt-4 max-w-xl text-base leading-relaxed md:text-lg",
              isLight ? "text-neutral-600" : "text-neutral-300",
            )}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

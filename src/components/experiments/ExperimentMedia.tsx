"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { ExperimentEmbed } from "@/types/experiment";

interface ExperimentEmbedProps {
  embed: ExperimentEmbed;
  className?: string;
}

function EmbedFrame({
  embed,
  isVisible,
}: {
  embed: ExperimentEmbed;
  isVisible: boolean;
}) {
  const aspectRatio = embed.aspectRatio ?? "16 / 9";

  if (!isVisible) {
    return (
      <div
        className="w-full rounded-xl bg-neutral-100"
        style={{ aspectRatio }}
        aria-hidden="true"
      />
    );
  }

  if (embed.type === "video") {
    return (
      <video
        className="h-full w-full rounded-xl bg-neutral-950 object-cover"
        controls
        playsInline
        preload="none"
        poster={embed.poster}
        style={{ aspectRatio }}
      >
        <source src={embed.src} />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <iframe
      src={embed.src}
      title={embed.title}
      loading="lazy"
      className="h-full w-full rounded-xl border-0 bg-neutral-100"
      style={{ aspectRatio }}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
      sandbox={
        embed.type === "unity"
          ? "allow-scripts allow-same-origin allow-pointer-lock allow-popups"
          : undefined
      }
    />
  );
}

export function ExperimentMedia({ embed, className }: ExperimentEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio: embed.aspectRatio ?? "16 / 9" }}
    >
      <EmbedFrame embed={embed} isVisible={isVisible} />
    </div>
  );
}

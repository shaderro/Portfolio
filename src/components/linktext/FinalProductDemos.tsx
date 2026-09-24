"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ReadingMotion } from "./ReadingMotion";
import { GrammarReviewMotion } from "./ReviewMotion";
import { ScaledStage } from "./ScaledStage";

const LIBRARY_MS = 6.213;
const REVIEW_MS = 8.6;
const HOME_MS = 6;

const SHOTS = {
  library: {
    src: "/images/linktext/supporting/library.png",
    w: 1200,
    h: 751,
    alt: "Article library with filters and article cards",
  },
  home: {
    src: "/images/linktext/supporting/home.png",
    w: 1200,
    h: 751,
    alt: "Home screen with continue learning and recent articles",
  },
  knowledge: {
    src: "/images/linktext/review/knowledge-overview.png",
    w: 1197,
    h: 749,
    alt: "Knowledge list with word cards and Start review",
  },
} as const;

function loop(duration: number) {
  return { duration, repeat: Infinity as const };
}

function Stage({ children }: { children: ReactNode }) {
  return (
    <ScaledStage width={1200} height={750}>
      <div className="relative h-[750px] w-[1200px] overflow-hidden bg-[var(--lt-neutral-50)]">
        {children}
      </div>
    </ScaledStage>
  );
}

function Shot({
  name,
  className,
  reduceMotion,
  opacity,
  times,
  duration,
  ease,
}: {
  name: keyof typeof SHOTS;
  className?: string;
  reduceMotion: boolean;
  opacity: number[];
  times: number[];
  duration: number;
  ease?: string | string[];
}) {
  const shot = SHOTS[name];
  return (
    <motion.img
      src={shot.src}
      alt={shot.alt}
      width={shot.w}
      height={shot.h}
      className={`absolute inset-0 h-full w-full object-cover object-top ${className ?? ""}`}
      initial={{ opacity: opacity[0] }}
      animate={reduceMotion ? { opacity: opacity[0] } : { opacity }}
      transition={
        reduceMotion
          ? undefined
          : {
              opacity: {
                ...loop(duration),
                times,
                ease: ease ?? "linear",
              },
            }
      }
    />
  );
}

function LibraryToReading({ reduceMotion }: { reduceMotion: boolean }) {
  const cut = {
    times: [0, 0.1931, 0.1932, 1],
    ease: "linear" as const,
  };

  return (
    <Stage>
      {reduceMotion ? null : (
        <div className="absolute inset-0">
          <ReadingMotion loopMode="loop" />
        </div>
      )}
      <Shot
        name="library"
        className="z-10"
        reduceMotion={reduceMotion}
        opacity={reduceMotion ? [1] : [1, 1, 0, 0]}
        times={cut.times}
        duration={LIBRARY_MS}
        ease={cut.ease}
      />
    </Stage>
  );
}

function GrammarReviewSequence({ reduceMotion }: { reduceMotion: boolean }) {
  const fade = {
    times: [0, 0.1395, 0.1802, 1],
    ease: ["linear", "easeInOut", "linear"] as const,
  };

  return (
    <Stage>
      {reduceMotion ? null : (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1] }}
          transition={{ opacity: { ...loop(REVIEW_MS), ...fade } }}
        >
          <GrammarReviewMotion framed={false} />
        </motion.div>
      )}
      <Shot
        name="knowledge"
        className="z-10"
        reduceMotion={reduceMotion}
        opacity={reduceMotion ? [1] : [1, 1, 0, 0]}
        times={fade.times}
        duration={REVIEW_MS}
        ease={fade.ease}
      />
    </Stage>
  );
}

function HomepageStates({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <Stage>
      <Shot
        name="home"
        className="z-[3]"
        reduceMotion={reduceMotion}
        opacity={reduceMotion ? [1] : [1, 1, 0, 0, 1]}
        times={[0, 0.3083, 0.3583, 0.975, 1]}
        duration={HOME_MS}
        ease={["linear", "easeInOut", "linear", "easeInOut"]}
      />
      {reduceMotion ? null : (
        <>
          <Shot
            name="library"
            className="z-[2]"
            reduceMotion={false}
            opacity={[0, 0, 1, 1, 0, 0]}
            times={[0, 0.3083, 0.3583, 0.6417, 0.6917, 1]}
            duration={HOME_MS}
            ease={["linear", "easeInOut", "linear", "easeInOut", "linear"]}
          />
          <Shot
            name="knowledge"
            className="z-[1]"
            reduceMotion={false}
            opacity={[0, 0, 1, 1, 0]}
            times={[0, 0.6417, 0.6917, 0.975, 1]}
            duration={HOME_MS}
            ease={["linear", "easeInOut", "linear", "easeInOut"]}
          />
        </>
      )}
    </Stage>
  );
}

export function FinalProductDemos() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div className="grid w-full grid-cols-1 gap-16 lg:grid-cols-2">
      <LibraryToReading reduceMotion={reduceMotion} />
      <GrammarReviewSequence reduceMotion={reduceMotion} />
      <HomepageStates reduceMotion={reduceMotion} />
    </div>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease, tr } from "./fm";
import { TopNav } from "./product";
import { ScaledStage } from "./ScaledStage";

const DURATION = 14;
const SCROLL_Y = -370.44 * (1200 / 588);
const TIMES = [0, 0.0357, 0.4643, 0.5357, 0.9643, 1];
const EASE = ease("linear", "easeInOut", "linear", "easeInOut", "linear");

export function ProfileScrollMotion() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <ScaledStage width={1200} height={750}>
      <div className="relative h-[750px] w-[1200px] overflow-hidden bg-[var(--lt-neutral-50)]">
        <motion.img
          src="/images/linktext/supporting/profile.png"
          alt="Profile settings with language, credits, and account details"
          width={1200}
          height={1570}
          className="absolute top-0 left-0 max-w-none"
          initial={{ y: 0 }}
          animate={
            reduceMotion
              ? { y: 0 }
              : { y: [0, 0, SCROLL_Y, SCROLL_Y, 0, 0] }
          }
          transition={
            reduceMotion
              ? undefined
              : tr({
                  y: {
                    duration: DURATION,
                    times: TIMES,
                    ease: EASE,
                    repeat: Infinity,
                  },
                })
          }
        />
        <TopNav className="absolute inset-x-0 top-0 z-10" />
      </div>
    </ScaledStage>
  );
}

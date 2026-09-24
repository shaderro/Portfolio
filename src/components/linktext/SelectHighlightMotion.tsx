"use client";

import { motion, useReducedMotion } from "framer-motion";

const DURATION = 5.5;
const LOOP = { duration: DURATION, repeat: Infinity } as const;
const FADE_EASE = [
  "linear",
  [0.25, 0.1, 0.25, 1],
  "linear",
  "easeInOut",
  "linear",
] as const;
const FADE_OPACITY = [0, 0, 1, 1, 0, 0] as const;
const WAVE_A = [0, 0.0727, 0.1273, 0.3636, 0.4182, 1];
const WAVE_B = [0, 0.5818, 0.6364, 0.8727, 0.9273, 1];
const BG_KEYS = ["#EAEAED", "#EAEAED", "#EAEAED", "#F4F4F6"] as const;
const BG_A = [0, 0.1272, 0.1273, 0.2];
const BG_B = [0, 0.6363, 0.6364, 0.7091];
const BG_EASE = ["linear", "linear", [0.25, 0.1, 0.25, 1]] as const;

const ARTICLE = `Die Berliner Mauer war mehr als 28 Jahre lang das Symbol des Kalten Krieges und der Teilung Deutschlands. Errichtet im August 1961, trennte sie Ost - und Westberlin und wurde zu einer fast unuberwindbaren Grenze. Über 100.000 Menschen versuchten, die Mauer zu überwinden - einige schafften es, viele scheiterten tragisch. Die beruhmten Worte von US-Prasident John F. Kennedy ' Ich bin ein Berliner' wurden vor der Mauer gesprochen. Am 9. November 1989 fiel die Mauer friedlich, nachdem ein DDR-Funktionar versehentlich die Grenzöffnung bekannt gab. Heute erinnern nur noch wenige erhaltene Mauerteile und das Denkmal an der Bernauer Straße an diese Zeit. Die East Side Gallery zeigt bunte Graffiti-Kunst auf dem langsten noch stehenden Mauerabschnitt. Für viele Deutsche bleibt der Mauerfall das wichtigste Ereignis der jungeren Geschichte .`;

function Band({
  className,
  times,
  withBackground = false,
  backgroundTimes,
  reduceMotion,
  restVisible,
}: {
  className: string;
  times: number[];
  withBackground?: boolean;
  backgroundTimes?: number[];
  reduceMotion: boolean;
  restVisible: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={
        reduceMotion
          ? { opacity: restVisible ? 1 : 0, background: "#F4F4F6" }
          : withBackground
            ? { opacity: 0, background: "#EAEAED" }
            : { opacity: 0 }
      }
      animate={
        reduceMotion
          ? { opacity: restVisible ? 1 : 0 }
          : withBackground
            ? { opacity: [...FADE_OPACITY], background: [...BG_KEYS] }
            : { opacity: [...FADE_OPACITY] }
      }
      transition={
        reduceMotion
          ? undefined
          : withBackground && backgroundTimes
            ? {
                opacity: { ...LOOP, times, ease: FADE_EASE },
                background: {
                  ...LOOP,
                  times: backgroundTimes,
                  ease: BG_EASE,
                },
              }
            : { ...LOOP, times, ease: FADE_EASE }
      }
    />
  );
}

export function SelectHighlightMotion() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div className="flex w-[682px] flex-col items-center bg-white">
      <div className="flex w-[680px] flex-col items-start px-10 pt-7 pb-16">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-[5px] px-1.5 py-1">
            <img
              src="/images/linktext/motion/icon-back.svg"
              alt=""
              width={14}
              height={14}
              className="block max-w-none"
              style={{ width: 14, height: 14 }}
            />
            <p className="text-[13px] font-medium leading-5 text-[var(--lt-neutral-600)]">
              Back
            </p>
          </div>
          <p className="text-[11px] leading-4 text-[var(--lt-neutral-400)]">
            259 words
          </p>
        </div>
        <h2 className="pt-7 text-[22px] font-semibold leading-[29px] tracking-[-0.3px] text-[var(--lt-neutral-800)]">
          Die Berliner Mauer: Geschichte
        </h2>
        <p className="pt-2.5 text-xs leading-[18px] text-[var(--lt-neutral-400)]">
          Click any word to look it up in the assistant →
        </p>
        <div className="relative w-[600px] pt-6">
          <Band
            className="pointer-events-none absolute left-[152px] top-[47px] h-5 w-[448px] bg-[#eaeaed]"
            times={WAVE_A}
            withBackground
            backgroundTimes={BG_A}
            reduceMotion={reduceMotion}
            restVisible
          />
          <Band
            className="pointer-events-none absolute left-0 top-[73px] h-5 w-[317px] bg-[#eaeaed]"
            times={WAVE_A}
            withBackground
            backgroundTimes={BG_A}
            reduceMotion={reduceMotion}
            restVisible
          />
          <Band
            className="pointer-events-none absolute left-[141px] top-[73px] h-5 w-[174px] bg-[var(--lt-brand-200)]"
            times={WAVE_A}
            reduceMotion={reduceMotion}
            restVisible
          />
          <Band
            className="pointer-events-none absolute left-[310px] top-[168px] h-5 w-[290px] bg-[#eaeaed]"
            times={WAVE_B}
            withBackground
            backgroundTimes={BG_B}
            reduceMotion={reduceMotion}
            restVisible={false}
          />
          <motion.svg
            className="pointer-events-none absolute left-0 top-[194px] overflow-visible"
            width={452}
            height={20}
            viewBox="0 0 452 20"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: reduceMotion ? 0 : [...FADE_OPACITY] }}
            transition={
              reduceMotion
                ? undefined
                : { ...LOOP, times: WAVE_B, ease: FADE_EASE }
            }
          >
            <motion.path
              d="M0 0H452V20H0V0Z"
              initial={{ fill: "#EAEAED" }}
              animate={
                reduceMotion
                  ? { fill: "#EAEAED" }
                  : { fill: [...BG_KEYS] }
              }
              transition={
                reduceMotion
                  ? undefined
                  : { ...LOOP, times: BG_B, ease: BG_EASE }
              }
            />
          </motion.svg>
          <Band
            className="pointer-events-none absolute left-[196px] top-[194px] h-5 w-[256px] bg-[var(--lt-brand-200)]"
            times={WAVE_B}
            reduceMotion={reduceMotion}
            restVisible={false}
          />
          <p className="relative text-justify text-[14px] leading-6 text-[var(--lt-text-primary)]">
            {ARTICLE}
          </p>
        </div>
      </div>
    </div>
  );
}

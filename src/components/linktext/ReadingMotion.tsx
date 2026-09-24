"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ease, tr, type Bezier } from "./fm";
import { TopNav } from "./product";

const DURATION = 3.963;
const LIST_EASE = ease("linear", "easeInOut", "linear");
const NOTE_BEZIER: Bezier = [0.45, 1.45, 0.807, 1.215];
const NOTE_EASE = ease("linear", NOTE_BEZIER, "linear");

type LoopMode = "loop" | "boomerang";

function timeline(loopMode: LoopMode) {
  return loopMode === "boomerang"
    ? {
        duration: DURATION,
        repeat: Infinity,
        repeatType: "reverse" as const,
      }
    : {
        duration: DURATION,
        repeat: Infinity,
      };
}

const ASSETS = {
  back: { src: "/images/linktext/motion/icon-back.svg", w: 14, h: 14 },
  underline: {
    src: "/images/linktext/motion/sentence-underline.svg",
    w: 600,
    h: 27.52,
  },
  noteIcon: { src: "/images/linktext/motion/note-icon.svg", w: 6, h: 6 },
  noteDot: { src: "/images/linktext/motion/note-dot.svg", w: 6, h: 6 },
  whisperDot: { src: "/images/linktext/motion/whisper-dot.svg", w: 4, h: 4 },
  sparkle: { src: "/images/linktext/motion/icon-sparkle.svg", w: 14, h: 14 },
  dot1: { src: "/images/linktext/motion/dot-1.svg", w: 6, h: 6 },
  dot2: { src: "/images/linktext/motion/dot-2.svg", w: 6, h: 6 },
  dot3: { src: "/images/linktext/motion/dot-3.svg", w: 6, h: 6 },
  closeQuote: {
    src: "/images/linktext/motion/icon-close-quote.png",
    w: 18,
    h: 18,
  },
} as const;

const ASSISTANT_LINES: { times: number[]; body: ReactNode }[] = [
  {
    times: [0, 0.2524, 0.3785, 1],
    body: "Sentence structure: This is a compound sentence connected by indem, containing two coordinate main clauses (linked by und).",
  },
  {
    times: [0, 0.2725, 0.3987, 1],
    body: (
      <>
        <Term>Ich half</Term>
        {` = main clause, "I helped."`}
      </>
    ),
  },
  {
    times: [0, 0.2927, 0.4189, 1],
    body: (
      <>
        <Term>indem ich … brachte</Term>
        {` = adverbial clause of manner, "by means of…".`}
      </>
    ),
  },
  {
    times: [0, 0.3129, 0.4391, 1],
    body: (
      <>
        <Term>indem</Term>
        {` = "by (means of)", introduces a subordinate clause, verb goes to the end.`}
      </>
    ),
  },
  {
    times: [0, 0.3331, 0.4593, 1],
    body: (
      <>
        <Term>unterschiedliches Werkzeug</Term>
        {` = "different tools" (unterschiedlich = different, Werkzeug = tool).`}
      </>
    ),
  },
  {
    times: [0, 0.3533, 0.4795, 1],
    body: (
      <>
        <Term>brachte</Term>
        {` (past tense of bringen) = brought.`}
      </>
    ),
  },
  {
    times: [0, 0.3735, 0.4997, 1],
    body: (
      <>
        <Term>und er brachte mir bei, wie alles funktionierte</Term>
        {` = main clause 2 (coordinate), parallel to the first half.`}
      </>
    ),
  },
  {
    times: [0, 0.3937, 0.5198, 1],
    body: (
      <>
        <Term>er brachte mir bei</Term>
        {` = he taught me (beibringen means "to teach", mir = me (dative), bei is a separable prefix, not separated in past tense).`}
      </>
    ),
  },
  {
    times: [0, 0.4139, 0.54, 1],
    body: (
      <>
        <Term>wie alles funktionierte</Term>
        {` = object clause, "how everything worked".`}
      </>
    ),
  },
  {
    times: [0, 0.434, 0.5602, 1],
    body: (
      <>
        <Term>funktionierte</Term>
        {` (past tense of funktionieren) = worked / functioned.`}
      </>
    ),
  },
];

function Term({ children }: { children: ReactNode }) {
  return <span className="font-semibold">{children}</span>;
}

function MotionAsset({
  name,
  className,
}: {
  name: keyof typeof ASSETS;
  className?: string;
}) {
  const { src, w, h } = ASSETS[name];
  return (
    <img
      src={src}
      alt=""
      width={w}
      height={h}
      className={cn("block max-w-none", className)}
      style={{ width: w, height: h }}
    />
  );
}

function AssistantLine({
  times,
  reduceMotion,
  loopMode,
  children,
}: {
  times: number[];
  reduceMotion: boolean;
  loopMode: LoopMode;
  children: ReactNode;
}) {
  return (
    <motion.div
      className="w-full shrink-0"
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
      animate={
        reduceMotion
          ? { opacity: 1, y: 0 }
          : { opacity: [0, 0, 1, 1], y: [4, 4, 0, 0] }
      }
      transition={
        reduceMotion
          ? undefined
          : tr({
              ...timeline(loopMode),
              times,
              ease: LIST_EASE,
            })
      }
    >
      <p className="text-[13px] font-medium leading-5 text-[var(--lt-neutral-800)]">
        {children}
      </p>
    </motion.div>
  );
}

export function ReadingMotion({
  className,
  loopMode = "boomerang",
  showWhisper = true,
}: {
  className?: string;
  loopMode?: LoopMode;
  showWhisper?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const t = timeline(loopMode);

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col bg-[var(--lt-neutral-50)]",
        className,
      )}
    >
      <TopNav active="reading" className="shrink-0" />
      <div className="flex min-h-0 flex-1 items-stretch overflow-hidden">
        <section className="relative flex min-w-0 flex-1 flex-col overflow-hidden border-r border-[var(--lt-neutral-200)] bg-[var(--lt-surface-card)]">
          <div className="mx-auto flex w-full max-w-[680px] flex-col px-10 pt-7">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-[5px] rounded-[var(--lt-radius-input)] px-1.5 py-1">
                <span className="size-[14px] shrink-0">
                  <MotionAsset name="back" />
                </span>
                <p className="text-[13px] font-medium leading-5 text-[var(--lt-neutral-600)]">
                  Back
                </p>
              </div>
              <p className="text-[11px] leading-4 text-[var(--lt-neutral-400)]">
                259 words
              </p>
            </div>
            <h1 className="pt-7 text-[22px] font-semibold leading-[29px] tracking-[-0.3px] text-[var(--lt-neutral-800)]">
              Die Berliner Mauer: Geschichte
            </h1>
            <p className="pt-2.5 text-xs leading-[18px] text-[var(--lt-neutral-400)]">
              Click any word to look it up in the assistant →
            </p>
            <div className="relative w-full max-w-[600px] pt-6">
              <div className="pointer-events-none absolute left-0 top-6 h-[62px] w-[600px]">
                <div className="absolute left-0 top-[19px] h-[27.52px] w-[600px]">
                  <MotionAsset name="underline" />
                </div>
                <div className="absolute left-[147.9px] top-[27px] size-[6px]">
                  <MotionAsset name="noteIcon" />
                </div>
                <div className="absolute left-[259.9px] top-[48px] size-[6px]">
                  <motion.div
                    className="size-[6px]"
                    initial={
                      reduceMotion
                        ? { scaleX: 1, scaleY: 1 }
                        : { scaleX: 0, scaleY: 0 }
                    }
                    animate={
                      reduceMotion
                        ? { scaleX: 1, scaleY: 1 }
                        : { scaleX: [0, 0, 1, 1], scaleY: [0, 0, 1, 1] }
                    }
                    transition={
                      reduceMotion
                        ? undefined
                        : tr({
                            ...t,
                            times: [0, 0.3901, 0.4608, 1],
                            ease: NOTE_EASE,
                          })
                    }
                  >
                    <MotionAsset name="noteDot" />
                  </motion.div>
                </div>
              </div>
              <p className="text-justify text-[14px] leading-6 text-[var(--lt-text-primary)]">
                Die Berliner <span className="text-black">Mauer</span> war mehr
                als 28 Jahre lang das Symbol des Kalten Krieges und der Teilung
                Deutschlands. Errichtet im August 1961, trennte sie Ost - und
                Westberlin und wurde zu einer fast{" "}
                <span className="font-semibold text-[#2db9a0]">
                  unuberwindbaren
                </span>{" "}
                Grenze. Über 100.000 Menschen versuchten, die Mauer zu
                überwinden - einige schafften es, viele scheiterten tragisch. Die
                berühmten Worte von US-Präsident John F. Kennedy &apos; Ich bin
                ein Berliner&apos; wurden vor der Mauer gesprochen. Am 9.
                November 1989 fiel die Mauer friedlich, nachdem ein
                DDR-Funktionär versehentlich die Grenzöffnung bekannt gab .
                Heute erinnern nur noch wenige erhaltene Mauerteile und das
                Denkmal an der Bernauer Straße an diese Zeit. Die East Side
                Gallery zeigt bunte Graffiti-Kunst auf dem langsten noch
                stehenden Mauerabschnitt. Für viele Deutsche bleibt der
                Mauerfall das wichtigste Ereignis der jüngeren Geschichte .
              </p>
              <p className="mt-2.5 text-justify text-[14px] leading-6 text-[var(--lt-text-primary)]">
                Die Berliner Mauer war mehr als 28 Jahre lang das Symbol des
                Kalten Krieges und der Teilung Deutschlands. Errichtet im August
                1961, trennte sie Ost - und Westberlin und wurde zu einer fast
                unüberwindbaren Grenze. Über 100.000 Menschen versuchten, die
                Mauer zu überwinden - einige schafften es, viele scheiterten
                tragisch. Die berühmten Worte von US-Präsident John F. Kennedy
                &apos; Ich bin ein Berliner&apos; wurden vor der Mauer
                gesprochen. Am 9. November 1989 fiel die Mauer friedlich,
                nachdem ein DDR-Funktionär versehentlich die Grenzöffnung bekannt
                gab . Heute erinnern nur noch wenige erhaltene Mauerteile und das
                Denkmal an der Bernauer Straße an diese Zeit. Die East Side
                Gallery zeigt bunte Graffiti-Kunst auf dem langsten noch
                stehenden Mauerabschnitt. Für viele Deutsche bleibt der
                Mauerfall das wichtigste Ereignis der jüngeren Geschichte .
              </p>
            </div>
          </div>
          {showWhisper ? (
            <div className="pointer-events-none absolute right-0 top-[216px] flex items-center gap-1 pl-4">
              <span className="size-1 shrink-0">
                <MotionAsset name="whisperDot" />
              </span>
              <div className="w-[145px] text-[11px] font-medium leading-normal text-[#42c9b6]">
                <p className="font-bold">unuberwindbaren</p>
                <p>note added</p>
              </div>
            </div>
          ) : null}
        </section>

        <aside className="flex h-full w-[513px] shrink-0 flex-col bg-[var(--lt-surface-card)]">
          <div className="flex items-center justify-between border-b border-[var(--lt-neutral-200)] px-4 pb-3 pt-4">
            <div className="flex items-center gap-1.5">
              <span className="size-[14px] shrink-0">
                <MotionAsset name="sparkle" />
              </span>
              <p className="text-sm font-semibold leading-6 text-[var(--lt-neutral-800)]">
                Learning Assistant
              </p>
            </div>
          </div>
          <div className="flex min-h-0 flex-1 flex-col gap-[5px] overflow-y-auto px-4">
            <div className="w-full pt-3.5">
              <div className="w-full rounded-r-[var(--lt-radius-input)] border-l-[2.4px] border-[var(--lt-brand-300)] bg-[var(--lt-brand-50)] px-3 py-2">
                <p className="text-sm leading-6 text-[var(--lt-neutral-600)] italic">
                  “Ich half indem ich unterschiedliches Werkzeug brachte und er
                  brachte mir bei, wie alles funktionierte.”
                </p>
              </div>
            </div>
            <div className="flex w-full justify-end pt-2.5">
              <div className="rounded-tl-[var(--lt-radius-container)] rounded-tr-[var(--lt-radius-container)] rounded-br-[var(--lt-radius-code)] rounded-bl-[var(--lt-radius-container)] bg-[var(--lt-brand-200)] px-3.5 py-[9px]">
                <p className="text-[13px] leading-5 text-[var(--lt-text-secondary)]">
                  Can you explain this sentence?
                </p>
              </div>
            </div>
            <motion.div
              className="flex h-5 w-12 shrink-0 items-center justify-center gap-1.5 overflow-hidden py-1 pl-1"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 1 }}
              animate={
                reduceMotion ? { opacity: 0 } : { opacity: [1, 1, 0, 0] }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      ...t,
                      times: [0, 0.2019, 0.2524, 1],
                      ease: ["linear", "easeInOut", "linear"],
                    }
              }
            >
              <motion.div
                className="size-[6px] shrink-0"
                initial={{ opacity: 0.25 }}
                animate={
                  reduceMotion
                    ? { opacity: 0.25 }
                    : { opacity: [0.25, 0.6, 0.25, 0.25] }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        ...t,
                        times: [0, 0.0883, 0.1766, 1],
                        ease: ["easeInOut", "easeInOut", "linear"],
                      }
                }
              >
                <MotionAsset name="dot1" />
              </motion.div>
              <motion.div
                className="size-[6px] shrink-0"
                initial={{ opacity: 0.25 }}
                animate={
                  reduceMotion
                    ? { opacity: 0.25 }
                    : { opacity: [0.25, 0.25, 0.6, 0.25, 0.25] }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        ...t,
                        times: [0, 0.0505, 0.1388, 0.2271, 1],
                        ease: ["linear", "easeInOut", "easeInOut", "linear"],
                      }
                }
              >
                <MotionAsset name="dot2" />
              </motion.div>
              <motion.div
                className="size-[6px] shrink-0"
                initial={{ opacity: 0.25 }}
                animate={
                  reduceMotion
                    ? { opacity: 0.25 }
                    : { opacity: [0.25, 0.25, 0.6, 0.25, 0.25] }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : {
                        ...t,
                        times: [0, 0.1009, 0.1893, 0.2776, 1],
                        ease: ["linear", "easeInOut", "easeInOut", "linear"],
                      }
                }
              >
                <MotionAsset name="dot3" />
              </motion.div>
            </motion.div>
            <div className="flex w-full max-w-[469px] flex-col gap-1.5 pb-3.5 pr-3 pt-2.5">
              {ASSISTANT_LINES.map((line, index) => (
                <AssistantLine
                  key={index}
                  times={line.times}
                  reduceMotion={Boolean(reduceMotion)}
                  loopMode={loopMode}
                >
                  {line.body}
                </AssistantLine>
              ))}
            </div>
          </div>
          <div className="shrink-0 bg-[var(--lt-surface-card)]">
            <div className="border-t border-[var(--lt-brand-300)] bg-[var(--lt-brand-50)] px-3.5 pb-2 pt-2.5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold leading-[17px] text-[var(--lt-brand-500)]">
                  Quote entire sentence
                </p>
                <span className="size-[18px] shrink-0">
                  <MotionAsset name="closeQuote" />
                </span>
              </div>
              <p className="pt-px text-[11px] leading-4 text-[var(--lt-neutral-400)]">
                (continuing questions will keep this quote)
              </p>
              <p className="pt-1.5 text-xs leading-[18px] text-[var(--lt-neutral-600)]">
                &quot;Als er starb , trafen meine Brüder und ich ihre Anwältin
                ... + / − Dreißig Jahre zuvor setzten sich die drei Brüder in
                dem Büro der Anwältin nieder .&quot;
              </p>
            </div>
            <div className="px-3.5 py-2.5">
              <p className="text-[11px] leading-4 text-[var(--lt-neutral-400)]">
                You might want to ask...
              </p>
              <div className="flex flex-wrap items-start gap-1.5 pt-[7px]">
                <span className="rounded-[var(--lt-radius-container)] border border-[var(--lt-brand-300)] bg-[var(--lt-brand-50)] px-2.5 py-[5px] text-center text-xs font-medium leading-[18px] text-[var(--lt-brand-500)]">
                  &quot;What does this sentence mean?&quot;
                </span>
                <span className="rounded-[var(--lt-radius-container)] border border-[var(--lt-brand-300)] bg-[var(--lt-brand-50)] px-2.5 py-[5px] text-center text-xs font-medium leading-[18px] text-[var(--lt-brand-500)]">
                  &quot;Can you break down this sentence?&quot;
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3.5 pb-3.5 pt-2.5">
              <div className="h-[37px] min-w-0 flex-1 rounded-[var(--lt-radius-card)] border border-[var(--lt-neutral-200)] bg-[var(--lt-surface-card)] px-3 py-2" />
              <div className="shrink-0 rounded-[var(--lt-radius-card)] bg-[var(--lt-brand-400)] px-4 py-2">
                <p className="text-center text-[13px] font-medium leading-5 text-[var(--lt-text-inverse)]">
                  Send
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

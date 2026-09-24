"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const STAGE_W = 400;
const STAGE_H = 844;
const DURATION = 6.4;
const VOCAB_DURATION = 4.2;
const LOOP = { duration: DURATION, repeat: Infinity } as const;
const VOCAB_LOOP = { duration: VOCAB_DURATION, repeat: Infinity } as const;
const ICONS = {
  back: "/images/linktext/mobile/expression/icon-back.svg",
  speaker: "/images/linktext/mobile/expression/icon-speaker.svg",
  sentence: "/images/linktext/mobile/expression/icon-speaker-sentence.svg",
  chevronLeft: "/images/linktext/mobile/expression/chevron-left.svg",
  chevronRight: "/images/linktext/mobile/expression/chevron-right.svg",
  close: "/images/linktext/mobile/expression/icon-close.svg",
  volume: "/images/linktext/mobile/expression/icon-volume.svg",
  quote: "/images/linktext/mobile/expression/icon-sentence.svg",
  eye: "/images/linktext/mobile/expression/icon-eye.svg",
} as const;

function Glyph({ src, size }: { src: string; size: number }) {
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className="block max-w-none shrink-0"
      style={{ width: size, height: size }}
    />
  );
}

function ScaledPhone({
  children,
  width = STAGE_W,
}: {
  children: ReactNode;
  width?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / width));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={ref} className="w-full shrink-0" style={{ maxWidth: width }}>
      <div className="relative" style={{ height: STAGE_H * scale }}>
        <div
          className="relative origin-top-left"
          style={{
            width,
            height: STAGE_H,
            transform: `scale(${scale})`,
          }}
        >
          <div className="relative h-full w-full rounded-[38px] bg-[var(--lt-neutral-50)] shadow-[2px_10px_31px_3px_rgba(152,152,166,0.28)]">
            <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-[var(--lt-neutral-50)] [backface-visibility:hidden]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bullet({
  children,
  brand = false,
}: {
  children: ReactNode;
  brand?: boolean;
}) {
  return (
    <div className="flex w-full items-start gap-[7px]">
      <div className="flex shrink-0 items-start pt-[7px]">
        <span
          className={`size-1 rounded-[2px] ${
            brand ? "bg-[var(--lt-brand-400)]" : "bg-[var(--lt-neutral-300)]"
          }`}
        />
      </div>
      <p className="min-w-0 text-[13px] leading-[20.15px] text-[var(--lt-neutral-600)]">
        {children}
      </p>
    </div>
  );
}

function KnowledgeCard({
  title,
  brand = false,
  items,
}: {
  title: string;
  brand?: boolean;
  items: string[];
}) {
  return (
    <div
      className={`flex w-full flex-col rounded-lg ${
        brand
          ? "bg-[var(--lt-brand-50)] shadow-[0px_1px_1.5px_rgba(0,0,0,0.12)]"
          : "rounded-xl border border-[var(--lt-neutral-200)] bg-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.16)]"
      }`}
    >
      <div
        className={`px-3.5 pt-[9px] pb-2 ${
          brand
            ? "border-b-[0.8px] border-[var(--lt-brand-300)]"
            : "border-b-[0.8px] border-[var(--lt-neutral-100)]"
        }`}
      >
        <p
          className={`text-[10px] leading-[15px] font-bold tracking-[0.8px] uppercase ${
            brand
              ? "text-center text-[var(--lt-brand-500)]"
              : "text-[var(--lt-neutral-400)]"
          }`}
        >
          {title}
        </p>
      </div>
      <div className="flex flex-col gap-[5px] px-3.5 py-[11px]">
        {items.map((item) => (
          <Bullet key={item} brand={brand}>
            {item}
          </Bullet>
        ))}
      </div>
    </div>
  );
}

function ExampleCard({
  sentence,
  note,
}: {
  sentence: string;
  note: string;
}) {
  return (
    <div className="flex w-full flex-col rounded-lg border-[0.8px] border-[var(--lt-neutral-200)] bg-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.04)]">
      <div className="border-b-[0.8px] border-[var(--lt-neutral-100)] px-3.5 pt-[9px] pb-2">
        <p className="text-[10px] leading-[15px] font-bold tracking-[0.8px] text-[var(--lt-neutral-400)] uppercase">
          Example sentences
        </p>
      </div>
      <div className="flex flex-col px-3.5 py-[11px]">
        <div className="flex items-start justify-between gap-2">
          <p
            className="text-[13px] leading-[21.45px] text-[var(--lt-neutral-800)] italic"
            style={{ fontVariationSettings: '"slnt" -14' }}
          >
            {sentence}
          </p>
          <Glyph src={ICONS.sentence} size={14} />
        </div>
        <p className="pt-1 text-[11px] leading-[16.5px] text-[var(--lt-neutral-400)]">
          Source: HP1 ↗
        </p>
        <div className="mt-1 w-full rounded-md border-[0.8px] border-[var(--lt-neutral-100)] bg-[var(--lt-neutral-100)] px-3 py-[9px]">
          <p className="text-[12.5px] leading-5 text-[var(--lt-neutral-600)]">
            {note}
          </p>
        </div>
      </div>
    </div>
  );
}

function WordEntry({
  word,
  pos,
  definition,
  features,
  collocations,
  grammar,
  example,
  note,
}: {
  word: string;
  pos: string;
  definition: string[];
  features: string[];
  collocations: string[];
  grammar: string[];
  example: string;
  note: string;
}) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col items-start border-b-[0.8px] border-[var(--lt-neutral-100)] px-5 pb-3.5">
        <div className="flex w-full items-center justify-center gap-2 p-2.5">
          <p className="text-[26px] leading-[31.2px] font-bold tracking-[-0.52px] text-[var(--lt-neutral-800)]">
            {word}
          </p>
          <Glyph src={ICONS.speaker} size={17} />
        </div>
        <p className="w-full text-center text-[13px] leading-[19.5px] text-[var(--lt-neutral-500)]">
          {pos}
        </p>
      </div>
      <div className="flex flex-col gap-3 p-3">
        <KnowledgeCard title="Definition" brand items={definition} />
        <KnowledgeCard title="Word features" items={features} />
        <KnowledgeCard title="Collocations" items={collocations} />
        <KnowledgeCard title="Grammar notes" items={grammar} />
        <ExampleCard sentence={example} note={note} />
      </div>
    </div>
  );
}

const WORD_A = {
  word: "so",
  pos: "副词 / 连词",
  definition: ["如此、这样（表示程度或方式）", "那么（引出结果）"],
  features: ["so groß — 这么大", "so dass — 以至于"],
  collocations: ["so ... dass", "so ... wie"],
  grammar: ["so 引导结果从句：so ... dass 表程度"],
  example: "Es war so kalt, dass er zitterte.",
  note: "so ... dass = 'so ... that'；表结果的程度状语从句",
};

const WORD_B = {
  word: "am Strand",
  pos: "Prepositional phrase",
  definition: ["at the beach; on the beach (static location)"],
  features: ["am Strand liegen - to lie on the beach"],
  collocations: ["am Strand spazieren", "an den Strand fahren"],
  grammar: [
    "am = an + dem (dative) for static location",
    "contrast: an den Strand (accusative) for movement towards the beach",
  ],
  example: "Die Kinder spielten am Strand.",
  note: "am Strand = 'on the beach'; dative used for location (no movement)",
};

function NavCircle({
  direction,
  reduceMotion,
}: {
  direction: "prev" | "next";
  reduceMotion: boolean;
}) {
  const isPrev = direction === "prev";
  const times = isPrev
    ? [0, 0.219, 0.2452, 0.2714, 1]
    : [0, 0.6143, 0.6405, 0.6667, 1];
  const colorTimes = isPrev
    ? [0, 0.2189, 0.219, 0.2452, 0.2714, 0.9999, 1]
    : [0, 0.6142, 0.6143, 0.6405, 0.6667, 0.9999, 1];

  return (
    <motion.div
      className="flex size-12 shrink-0 items-center justify-center rounded-[24px] border border-[#eaeaed] bg-[#fafafa]"
      initial={{
        scaleX: 1,
        scaleY: 1,
        x: 0,
        y: 0,
        background: "#FAFAFA",
        borderColor: "#EAEAED",
      }}
      animate={
        reduceMotion
          ? undefined
          : {
              scaleX: [1, 1, 0.94, 1, 1],
              scaleY: [1, 1, 0.94, 1, 1],
              x: [0, 0, 1.44, 0, 0],
              y: [0, 0, 1.44, 0, 0],
              background: [
                "#FAFAFA",
                "#FAFAFA",
                "#FAFAFA",
                "#EDEDED",
                "#FAFAFA",
                "#FAFAFA",
                "#FAFAFA",
              ],
              borderColor: [
                "#EAEAED",
                "#EAEAED",
                "#EAEAED",
                "#D3D3D5",
                "#EAEAED",
                "#EAEAED",
                "#EAEAED",
              ],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              scaleX: {
                ...VOCAB_LOOP,
                times,
                ease: ["linear", "easeInOut", "easeInOut", "linear"],
              },
              scaleY: {
                ...VOCAB_LOOP,
                times,
                ease: ["linear", "easeInOut", "easeInOut", "linear"],
              },
              x: {
                ...VOCAB_LOOP,
                times,
                ease: ["linear", "easeInOut", "easeInOut", "linear"],
              },
              y: {
                ...VOCAB_LOOP,
                times,
                ease: ["linear", "easeInOut", "easeInOut", "linear"],
              },
              background: {
                ...VOCAB_LOOP,
                times: colorTimes,
                ease: [
                  "linear",
                  "linear",
                  "easeInOut",
                  "easeInOut",
                  "linear",
                  "linear",
                ],
              },
              borderColor: {
                ...VOCAB_LOOP,
                times: colorTimes,
                ease: [
                  "linear",
                  "linear",
                  "easeInOut",
                  "easeInOut",
                  "linear",
                  "linear",
                ],
              },
            }
      }
    >
      <Glyph
        src={isPrev ? ICONS.chevronLeft : ICONS.chevronRight}
        size={20}
      />
    </motion.div>
  );
}

export function VocabDetailPhone() {
  const reduceMotion = Boolean(useReducedMotion());
  const slideTimes = [0, 0.2381, 0.3452, 0.6548, 0.7619, 1] as const;
  const slideEase = [
    "linear",
    "easeInOut",
    "linear",
    "easeInOut",
    "linear",
  ] as const;

  return (
    <ScaledPhone>
      <div className="flex h-full flex-col bg-[var(--lt-neutral-50)] px-5 pb-6 pt-8">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl shadow-[0px_1px_1.5px_rgba(0,0,0,0.06),0px_4px_8px_rgba(0,0,0,0.05)]">
          <div className="relative flex items-center justify-between border-b-[0.8px] border-[var(--lt-neutral-100)] px-[18px] py-3">
            <div className="flex items-center gap-[5px] rounded-md px-1.5 py-1">
              <Glyph src={ICONS.back} size={14} />
              <p className="text-[13px] leading-[19.5px] font-medium text-[var(--lt-neutral-600)]">
                Back
              </p>
            </div>
            {reduceMotion ? (
              <p className="text-xs leading-[18px] text-[var(--lt-neutral-400)]">
                1 / 24
              </p>
            ) : (
              <>
                <motion.p
                  className="text-xs leading-[18px] text-[var(--lt-neutral-400)]"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: [1, 1, 0, 0, 1, 1] }}
                  transition={{
                    opacity: {
                      ...VOCAB_LOOP,
                      times: slideTimes,
                      ease: slideEase,
                    },
                  }}
                >
                  1 / 24
                </motion.p>
                <motion.p
                  className="absolute top-[17px] left-[310px] text-xs leading-[18px] text-[var(--lt-neutral-400)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
                  transition={{
                    opacity: {
                      ...VOCAB_LOOP,
                      times: slideTimes,
                      ease: slideEase,
                    },
                  }}
                >
                  2 / 24
                </motion.p>
              </>
            )}
          </div>
          <div className="relative min-h-0 flex-1 overflow-hidden">
            {reduceMotion ? (
              <WordEntry {...WORD_A} />
            ) : (
              <>
                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  initial={{ opacity: 1, x: 0 }}
                  animate={{
                    opacity: [1, 1, 0, 0, 1, 1],
                    x: [0, 0, -32, -32, 0, 0],
                  }}
                  transition={{
                    opacity: {
                      ...VOCAB_LOOP,
                      times: slideTimes,
                      ease: slideEase,
                    },
                    x: { ...VOCAB_LOOP, times: slideTimes, ease: slideEase },
                  }}
                >
                  <WordEntry {...WORD_A} />
                </motion.div>
                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  initial={{ opacity: 0, x: 32 }}
                  animate={{
                    opacity: [0, 0, 1, 1, 0, 0],
                    x: [32, 32, 0, 0, 32, 32],
                  }}
                  transition={{
                    opacity: {
                      ...VOCAB_LOOP,
                      times: slideTimes,
                      ease: slideEase,
                    },
                    x: { ...VOCAB_LOOP, times: slideTimes, ease: slideEase },
                  }}
                >
                  <WordEntry {...WORD_B} />
                </motion.div>
              </>
            )}
          </div>
          <div className="flex items-center justify-between px-1 py-3">
            <NavCircle direction="prev" reduceMotion={reduceMotion} />
            <NavCircle direction="next" reduceMotion={reduceMotion} />
          </div>
        </div>
      </div>
    </ScaledPhone>
  );
}

function ProgressBar() {
  return (
    <div className="flex w-full items-center gap-1.5 px-3.5 pt-[38px] pb-5">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-[14px] border-[1.115px] border-[var(--lt-neutral-200)] bg-white">
        <Glyph src={ICONS.close} size={13} />
      </div>
      <div className="flex min-w-px flex-1 items-center gap-2">
        <div className="flex min-w-px flex-1 items-center gap-[3px]">
          {Array.from({ length: 17 }, (_, index) => (
            <div
              key={index}
              className={`h-[5px] min-w-px flex-1 rounded-[99px] ${
                index === 0
                  ? "bg-[var(--lt-brand-400)]"
                  : "bg-[var(--lt-neutral-200)]"
              }`}
            />
          ))}
        </div>
        <p className="shrink-0 text-xs leading-[18px] text-[var(--lt-neutral-400)]">
          1 / 17
        </p>
      </div>
    </div>
  );
}

function DaranHeader() {
  return (
    <div className="flex flex-col items-center justify-center gap-[17px] px-5 pt-[18px] pb-2">
      <div className="flex flex-col items-center">
        <p className="text-[32px] leading-[42px] font-bold tracking-[-0.56px] text-[var(--lt-neutral-800)]">
          daran
        </p>
        <p className="text-xs leading-[18px] font-medium tracking-[0.36px] text-[var(--lt-neutral-400)]">
          Adverb
        </p>
      </div>
      <Glyph src={ICONS.volume} size={18} />
    </div>
  );
}

function SentenceCard({ expanded }: { expanded: boolean }) {
  return (
    <div className="relative w-full rounded-lg bg-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.12)]">
      <div className="flex flex-col items-center px-[30px] py-3.5">
        <p
          className="min-h-[93px] text-center text-sm leading-[23.1px] text-[var(--lt-neutral-800)] italic"
          style={{ fontVariationSettings: '"slnt" -14' }}
        >
          Die Dursleys schauderten beim Gedanken{" "}
          <span className="font-extrabold italic">daran</span>, was die Nachbarn
          sagen würden, sollten die Potters eines Tages in ihrer Straße
          aufkreuzen.
        </p>
        <div className="absolute top-[15px] right-[18px]">
          <Glyph src={ICONS.quote} size={13} />
        </div>
      </div>
      {expanded ? (
        <div className="flex items-center justify-center px-[30px] py-2">
          <p className="text-[11.5px] leading-[18.4px] text-[var(--lt-neutral-600)]">
            daran = &apos;at/on it&apos;; pronominal adverb replacing &apos;an +
            dem Gedanken&apos;; positioned after &apos;beim Gedanken&apos;,
            referring to &apos;the thought of it&apos;; introduces the following
            relative clause
          </p>
        </div>
      ) : null}
    </div>
  );
}

function ReviewActions() {
  return (
    <div className="flex h-[260px] w-full items-center justify-center gap-2.5 px-4 pb-[26px]">
      <div className="flex h-12 w-[150px] items-center justify-center rounded-lg border-[1.115px] border-[#e05555] bg-white p-3">
        <p className="text-[13px] leading-[19.5px] font-semibold text-[#e05555]">
          Don&apos;t know
        </p>
      </div>
      <div className="flex h-12 w-[145px] items-center justify-center rounded-lg bg-[var(--lt-brand-400)] p-3">
        <p className="text-[13px] leading-[19.5px] font-semibold text-white">
          Know it ✓
        </p>
      </div>
    </div>
  );
}

function DaranCollapsed() {
  return (
    <div className="flex h-full flex-col bg-[var(--lt-neutral-50)]">
      <ProgressBar />
      <DaranHeader />
      <div className="flex flex-col items-center gap-4 px-9">
        <SentenceCard expanded={false} />
        <div className="flex h-11 w-[328px] items-center justify-center gap-1.5 rounded-lg border-[1.115px] border-[var(--lt-brand-300)] bg-[var(--lt-brand-50)] px-4">
          <Glyph src={ICONS.eye} size={15} />
          <p className="text-[13px] leading-[19.5px] font-semibold text-[var(--lt-brand-500)]">
            Show definition
          </p>
        </div>
      </div>
      <div className="mt-auto">
        <ReviewActions />
      </div>
    </div>
  );
}

function DaranExpanded({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="flex h-full flex-col bg-[var(--lt-neutral-50)]">
      <ProgressBar />
      <DaranHeader />
      <div className="flex flex-col items-center gap-4">
        <div className="w-full px-9">
          <SentenceCard expanded />
        </div>
        <motion.div
          className="w-full origin-top px-9"
          initial={{ opacity: 0, scaleY: 0.985, y: 3 }}
          animate={
            reduceMotion
              ? { opacity: 1, scaleY: 1, y: 0 }
              : {
                  opacity: [0, 0, 1, 1],
                  scaleY: [0.985, 0.985, 1, 1],
                  y: [3, 3, 0, 0],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  opacity: {
                    ...LOOP,
                    times: [0, 0.3141, 0.3984, 1],
                    ease: ["linear", "easeInOut", "linear"],
                  },
                  scaleY: {
                    ...LOOP,
                    times: [0, 0.3141, 0.4297, 1],
                    ease: ["linear", "easeInOut", "linear"],
                  },
                  y: {
                    ...LOOP,
                    times: [0, 0.3141, 0.4297, 1],
                    ease: ["linear", "easeInOut", "linear"],
                  },
                }
          }
        >
          <div className="flex w-full flex-col rounded-lg bg-[var(--lt-brand-50)] shadow-[0px_1px_1.5px_rgba(0,0,0,0.12)]">
            <div className="border-b-[1.115px] border-[var(--lt-brand-300)] p-2.5">
              <p className="text-[10px] leading-[15px] font-bold tracking-[0.8px] text-[var(--lt-brand-500)] uppercase">
                Definition
              </p>
            </div>
            <div className="flex flex-col gap-[5px] px-4 py-3">
              <Bullet brand>
                in reference to that; about it (pronominal adverb replacing an +
                noun phrase)
              </Bullet>
              <Bullet brand>
                referring back to something previously mentioned
              </Bullet>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="mt-auto">
        <ReviewActions />
      </div>
    </div>
  );
}

export function DefinitionExpandPhone() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <ScaledPhone width={401}>
      {reduceMotion ? (
        <DaranCollapsed />
      ) : (
        <>
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{
              opacity: {
                ...LOOP,
                times: [0, 0.3125, 0.3141, 1],
                ease: "linear",
              },
            }}
          >
            <DaranCollapsed />
          </motion.div>
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1] }}
            transition={{
              opacity: {
                ...LOOP,
                times: [0, 0.3125, 0.3141, 1],
                ease: "linear",
              },
            }}
          >
            <DaranExpanded reduceMotion={false} />
          </motion.div>
        </>
      )}
    </ScaledPhone>
  );
}

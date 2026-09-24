"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LtIcon } from "./LtIcon";

const STAGE_W = 400;
const STAGE_H = 844;
const DURATION = 7.6;
const LOOP = { duration: DURATION, repeat: Infinity } as const;
const EASE_FADE3 = ["linear", "easeInOut", "linear"] as const;
const EASE_FADE5 = ["linear", "easeInOut", "linear", "easeInOut", "linear"] as const;
const EASE_OUT5 = ["linear", "easeOut", "linear", "easeOut", "linear"] as const;
const EASE_OUT9 = [
  "linear",
  "easeOut",
  "linear",
  "easeOut",
  "linear",
  "easeOut",
  "linear",
  "easeOut",
  "linear",
] as const;
const EASE_DROP_Y = [
  [0.5, 0, 0.5, 1],
  "easeOut",
  "linear",
  "easeOut",
  "linear",
  "easeOut",
  "linear",
  "easeOut",
  "linear",
] as const;
const READING_OPACITY = {
  ...LOOP,
  times: [0, 0.1974, 0.2632, 0.7237, 0.7895, 1],
  ease: EASE_FADE5,
} as const;
const READING_X = {
  ...LOOP,
  times: [0, 0.1974, 0.2632, 0.7224, 0.7237, 0.7895, 1],
  ease: ["linear", "easeInOut", "linear", "linear", "easeInOut", "linear"] as const,
} as const;
const REVIEW_T = {
  ...LOOP,
  times: [0, 0.1974, 0.2632, 0.4605, 0.5263, 1],
  ease: EASE_FADE5,
} as const;
const PROFILE_T = {
  ...LOOP,
  times: [0, 0.4605, 0.5263, 0.7237, 0.7895, 1],
  ease: EASE_FADE5,
} as const;
const HUB_T = {
  ...LOOP,
  times: [0, 0.1316, 0.1908, 0.3618, 0.4211, 1],
  ease: EASE_FADE5,
} as const;
const HUB_LINEAR = {
  ...LOOP,
  times: [0, 0.1316, 0.1908, 0.3618, 0.4211, 1],
  ease: "linear",
} as const;
const HUB_ON = [1, 1, 0, 0, 1, 1] as const;
const HUB_OFF = [0, 0, 1, 1, 0, 0] as const;
const EXAMPLE_CARD_BODY =
  "This is an example text. This is an example text.";
const HUB_VOCAB_CARDS = [
  { title: "vocabulary", body: EXAMPLE_CARD_BODY, mastered: false },
  { title: "vocabulary", body: EXAMPLE_CARD_BODY, mastered: true },
  { title: "vocabulary", body: EXAMPLE_CARD_BODY, mastered: false },
  { title: "vocabulary", body: EXAMPLE_CARD_BODY, mastered: false },
  { title: "vocabulary", body: EXAMPLE_CARD_BODY, mastered: false },
  { title: "vocabulary", body: EXAMPLE_CARD_BODY, mastered: false },
  { title: "vocabulary", body: EXAMPLE_CARD_BODY, mastered: true },
  { title: "vocabulary", body: EXAMPLE_CARD_BODY, mastered: true },
  { title: "vocabulary", body: EXAMPLE_CARD_BODY, mastered: true },
  { title: "vocabulary", body: EXAMPLE_CARD_BODY, mastered: true },
];
const ICONS = {
  bookOn: "/images/linktext/mobile/nav/book-open-active.svg",
  bookOff: "/images/linktext/mobile/nav/book-open-inactive.svg",
  refreshOn: "/images/linktext/mobile/nav/refresh-active.svg",
  refreshOff: "/images/linktext/mobile/nav/refresh-inactive.svg",
  userOn: "/images/linktext/mobile/nav/user-active.svg",
  userOff: "/images/linktext/mobile/nav/user-inactive.svg",
  globe: "/images/linktext/mobile/nav/globe.svg",
  wallet: "/images/linktext/mobile/nav/wallet.svg",
  settings: "/images/linktext/mobile/nav/settings.svg",
  help: "/images/linktext/mobile/nav/help-circle.svg",
  logout: "/images/linktext/mobile/nav/log-out.svg",
  chevron: "/images/linktext/mobile/nav/chevron-right.svg",
  chevronDown: "/images/linktext/mobile/nav/chevron-down.svg",
  sparkle: "/images/linktext/mobile/nav/sparkle.svg",
} as const;

const ARTICLES = [
  {
    title: "Die Berliner Mauer: Geschichte",
    level: "intermediate" as const,
    meta: "259 words · 3 notes",
    body: "Die Berliner Mauer war mehr als 28 Jahre lang das Symbol des Kalten Krieges und trennte Ost- und Westberlin.",
  },
  {
    title: "Die Berliner Mauer: Geschichte",
    level: "intermediate" as const,
    meta: "259 words · 3 notes",
    body: "Die Berliner Mauer war mehr als 28 Jahre lang das Symbol des Kalten Krieges und trennte Ost- und Westberlin.",
  },
  {
    title: "Am Flughafen",
    level: "beginner" as const,
    meta: "402 words",
    body: "Familie Mueller plant ihren Urlaub und muss fruehzeitig am Flughafen erscheinen, um den Abflug nicht zu verpassen.",
  },
  {
    title: "Der kleine Prinz (Auszug)",
    level: "beginner" as const,
    meta: "209 words · 4 notes",
    body: "Als ich sechs Jahre alt war, sah ich einmal ein wunderbares Bild in einem Buch ueber den Urwald, das sich Erlebte Geschichten nannte.",
  },
];

const VOCAB_CARDS = [
  { title: "vocabulary", body: EXAMPLE_CARD_BODY, mastered: true },
  { title: "vocabulary", body: EXAMPLE_CARD_BODY, mastered: false },
  { title: "vocabulary", body: EXAMPLE_CARD_BODY, mastered: false },
  { title: "vocabulary", body: EXAMPLE_CARD_BODY, mastered: false },
  { title: "vocabulary", body: EXAMPLE_CARD_BODY, mastered: false },
  { title: "vocabulary", body: EXAMPLE_CARD_BODY, mastered: false },
  { title: "vocabulary", body: EXAMPLE_CARD_BODY, mastered: true },
  { title: "vocabulary", body: EXAMPLE_CARD_BODY, mastered: true },
  { title: "vocabulary", body: EXAMPLE_CARD_BODY, mastered: true },
  { title: "vocabulary", body: EXAMPLE_CARD_BODY, mastered: true },
];

const GRAMMAR_CARDS = VOCAB_CARDS.map((card, index) => ({
  title: "Grammar",
  body: "This is an example text. This is an example text.",
  mastered: index % 3 === 0,
}));

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

function ScaledPhone({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / STAGE_W));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full max-w-[400px]">
      <div className="relative" style={{ height: STAGE_H * scale }}>
        <div
          className="relative origin-top-left"
          style={{
            width: STAGE_W,
            height: STAGE_H,
            transform: `scale(${scale})`,
          }}
        >
          <div className="pointer-events-none absolute inset-0 rounded-[38px] shadow-[2px_10px_31px_3px_#9898a6]" />
          <div className="relative isolate h-full w-full overflow-hidden rounded-[38px] bg-white">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

type WebNavVariant = "default" | "reading" | "vocab" | "grammar";

function WebNavBar({ variant }: { variant: WebNavVariant }) {
  const readingOn = variant === "reading";
  const insightsOn = variant === "vocab" || variant === "grammar";
  const sub =
    variant === "vocab"
      ? "Vocabulary"
      : variant === "grammar"
        ? "Grammar"
        : null;

  return (
    <nav className="absolute inset-x-0 top-0 flex h-[52px] items-center border-b border-[var(--lt-border-default)] bg-[var(--lt-surface-nav)] px-6">
      <div className="flex items-center gap-2 overflow-hidden">
        <span className="flex size-[25px] items-center justify-center overflow-hidden rounded-[13px]">
          <LtIcon name="logo" alt="" />
        </span>
        <p className="whitespace-nowrap text-sm leading-6 font-semibold text-[var(--lt-text-primary)]">
          LinkText
        </p>
      </div>
      <div className="flex items-start overflow-hidden px-3">
        <div className="h-[18px] w-px bg-[var(--lt-border-default)]" />
      </div>
      <div className="flex items-start overflow-hidden">
        <div
          className={`relative flex flex-col items-start justify-center overflow-hidden px-3 ${
            readingOn ? "py-4" : "pt-4"
          }`}
        >
          <p
            className={`text-[13px] leading-5 ${
              readingOn
                ? "w-auto font-semibold text-[var(--lt-text-primary)]"
                : "font-normal text-[var(--lt-text-tertiary)]"
            } ${insightsOn ? "w-[52px]" : "whitespace-nowrap"}`}
          >
            Reading
          </p>
          {readingOn ? (
            <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-[1px] bg-[var(--lt-bg-brand)]" />
          ) : null}
        </div>
        <div
          className={`relative flex overflow-hidden px-3 py-4 ${
            insightsOn
              ? "flex-col items-center justify-center"
              : "items-center"
          }`}
        >
          {insightsOn ? (
            <div className="flex items-center gap-0.5 overflow-hidden">
              <p className="w-[68px] text-[13px] leading-5 font-semibold text-[var(--lt-text-primary)]">
                Insights ▾
              </p>
              <p className="whitespace-nowrap text-[11px] leading-normal font-medium text-[var(--lt-text-tertiary)]">
                {sub}
              </p>
            </div>
          ) : (
            <p className="whitespace-nowrap text-[13px] leading-5 font-normal text-[var(--lt-text-tertiary)]">
              Insights
            </p>
          )}
          {insightsOn ? (
            <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-[1px] bg-[var(--lt-bg-brand)]" />
          ) : null}
        </div>
      </div>
      <div className="min-w-px flex-1" />
      <div className="flex items-center gap-3">
        <p className="whitespace-nowrap text-xs leading-[18px] font-medium text-[var(--lt-text-secondary)]">
          German ▾
        </p>
        <p className="whitespace-nowrap text-xs leading-[18px] text-[var(--lt-text-muted)]">
          1087 credits
        </p>
        <div className="flex items-center gap-2">
          <span className="flex size-[26px] items-center justify-center">
            <LtIcon name="avatar" alt="" />
          </span>
          <p className="text-xs font-medium text-[var(--lt-text-secondary)]">
            Account
          </p>
        </div>
      </div>
    </nav>
  );
}

export function WebTopNavMotion() {
  const reduceMotion = Boolean(useReducedMotion());

  if (reduceMotion) {
    return (
      <div className="relative h-[52px] w-full bg-white">
        <WebNavBar variant="reading" />
      </div>
    );
  }

  return (
    <div className="relative h-[52px] w-full bg-white">
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{
          opacity: {
            ...LOOP,
            times: [0, 0.1974, 0.2237, 1],
            ease: EASE_FADE3,
          },
        }}
      >
        <WebNavBar variant="default" />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
        transition={{
          opacity: {
            ...LOOP,
            times: [0, 0.1974, 0.2237, 0.3947, 0.4211, 1],
            ease: EASE_FADE5,
          },
        }}
      >
        <WebNavBar variant="reading" />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
        transition={{
          opacity: {
            ...LOOP,
            times: [0, 0.3947, 0.4211, 0.7763, 0.8026, 1],
            ease: EASE_FADE5,
          },
        }}
      >
        <WebNavBar variant="vocab" />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1] }}
        transition={{
          opacity: {
            ...LOOP,
            times: [0, 0.7763, 0.8026, 1],
            ease: EASE_FADE3,
          },
        }}
      >
        <WebNavBar variant="grammar" />
      </motion.div>
      <motion.p
        className="pointer-events-none absolute top-4 left-[277px] text-[13px] leading-normal font-normal whitespace-nowrap text-[#717182]"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{
          opacity: {
            ...LOOP,
            times: [0, 0.3947, 0.4145, 1],
            ease: ["linear", "easeOut", "linear"],
          },
        }}
      >
        ▾
      </motion.p>
      <motion.div
        className="pointer-events-none absolute top-[54px] left-[200px] h-[76px] w-[120px] rounded-lg bg-white shadow-[0px_4px_8px_rgba(0,0,0,0.12)]"
        initial={{ opacity: 0, y: 0 }}
        animate={{
          opacity: [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
          y: [0, -10, 0, 0, -10, -10, 0, 0, -10, -10],
        }}
        transition={{
          opacity: {
            ...LOOP,
            times: [
              0, 0.4211, 0.4474, 0.4868, 0.5132, 0.7105, 0.7368, 0.7763,
              0.8026, 1,
            ],
            ease: EASE_OUT9,
          },
          y: {
            ...LOOP,
            times: [
              0, 0.4211, 0.4474, 0.4868, 0.5132, 0.7105, 0.7368, 0.7763,
              0.8026, 1,
            ],
            ease: EASE_DROP_Y,
          },
        }}
      >
        <motion.div
          className="absolute top-[6px] left-2 h-7 w-[104px] rounded-[6px] bg-[#edf7f5]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
          transition={{
            opacity: {
              ...LOOP,
              times: [0, 0.4474, 0.4671, 0.4868, 0.5132, 1],
              ease: EASE_OUT5,
            },
          }}
        />
        <motion.div
          className="absolute top-[38px] left-2 h-7 w-[104px] rounded-[6px] bg-[#edf7f5]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
          transition={{
            opacity: {
              ...LOOP,
              times: [0, 0.7368, 0.7566, 0.7763, 0.8026, 1],
              ease: EASE_OUT5,
            },
          }}
        />
        <p className="absolute top-3.5 left-4 text-[13px] leading-normal font-medium whitespace-nowrap text-[#717182]">
          Vocabulary
        </p>
        <p className="absolute top-11 left-4 text-[13px] leading-normal font-medium whitespace-nowrap text-[#717182]">
          Grammar
        </p>
      </motion.div>
    </div>
  );
}

function LibraryArticle({
  title,
  level,
  meta,
  body,
}: (typeof ARTICLES)[number]) {
  return (
    <article className="flex w-full shrink-0 flex-col gap-3 rounded-xl border border-[var(--lt-neutral-200)] bg-white px-4 pt-3.5 pb-3 shadow-[0px_4px_10px_rgba(0,0,0,0.07),0px_1px_1.5px_rgba(0,0,0,0.06)]">
      <p className="text-sm leading-[19.6px] font-semibold text-[var(--lt-neutral-800)]">
        {title}
      </p>
      <div className="flex items-center gap-2">
        <span
          className={
            level === "beginner"
              ? "rounded-[99px] border border-[var(--lt-brand-300)] bg-[var(--lt-brand-50)] px-2 py-0.5 text-[10px] font-semibold tracking-[0.4px] text-[var(--lt-brand-500)]"
              : "rounded-[99px] border border-[#fcd34d] bg-[#fef3c7] px-2 py-0.5 text-[10px] font-semibold tracking-[0.4px] text-[#92400e]"
          }
        >
          {level === "beginner" ? "Beginner" : "Intermediate"}
        </span>
        <p className="text-xs leading-[18px] text-[var(--lt-neutral-400)]">
          {meta}
        </p>
      </div>
      <p className="text-[13px] leading-5 text-[var(--lt-neutral-600)]">
        {body}
      </p>
      <div className="border-t border-[var(--lt-neutral-100)] pt-2.5">
        <p className="text-[13px] leading-[18px] font-semibold text-[var(--lt-brand-500)]">
          Read →
        </p>
      </div>
    </article>
  );
}

function WordTile({
  title,
  body,
  mastered,
}: {
  title: string;
  body: string;
  mastered: boolean;
}) {
  return (
    <article
      className={`flex h-[100px] w-[164px] flex-col justify-between overflow-hidden rounded-lg px-3.5 pt-3 pb-2.5 shadow-[0px_1px_3px_rgba(0,0,0,0.12)] ${
        mastered ? "bg-[var(--lt-brand-50)]" : "bg-white"
      }`}
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <p className="text-sm leading-[18.2px] font-semibold text-[var(--lt-neutral-800)]">
          {title}
        </p>
        <p className="mt-0.5 line-clamp-2 text-xs leading-[18.6px] text-[var(--lt-neutral-500)]">
          {body}
        </p>
      </div>
      <div className="flex h-[19px] items-center gap-[5px] pt-0.5">
        <span
          className={`size-1.5 rounded-[3px] ${
            mastered ? "bg-[var(--lt-brand-400)]" : "bg-[var(--lt-neutral-400)]"
          }`}
        />
        <p
          className={`text-[11px] leading-[16.5px] font-medium ${
            mastered
              ? "text-[var(--lt-brand-500)]"
              : "text-[var(--lt-neutral-400)]"
          }`}
        >
          {mastered ? "Mastered" : "Not Mastered"}
        </p>
      </div>
    </article>
  );
}

function FilterBar() {
  const fields = [
    { label: "Sort", value: "Newest First" },
    { label: "Status", value: "All" },
    { label: "Articles", value: "All articles" },
  ];
  return (
    <div className="flex w-full shrink-0 flex-col gap-2 border-[0.8px] border-[var(--lt-neutral-200)] bg-white px-6 py-2.5">
      <div className="flex w-full gap-3">
        {fields.map((field) => (
          <div key={field.label} className="flex min-w-px flex-1 flex-col gap-1">
            <p className="text-[11px] leading-[16.5px] font-medium tracking-[0.44px] text-[var(--lt-neutral-400)]">
              {field.label}
            </p>
            <div className="flex h-[35px] items-center justify-between rounded-[6px] border-[0.8px] border-[var(--lt-neutral-200)] bg-[var(--lt-neutral-50)] px-[11px]">
              <p className="text-[13px] leading-[19.5px] text-[var(--lt-neutral-600)]">
                {field.value}
              </p>
              <Glyph src={ICONS.chevronDown} size={13} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsBar() {
  return (
    <div className="flex w-full shrink-0 items-center gap-1.5 bg-[var(--lt-neutral-50)] px-6 py-3">
      <p className="text-[13px] leading-[19.5px]">
        <span className="font-semibold text-[var(--lt-neutral-800)]">24</span>
        <span className="text-[var(--lt-neutral-500)]"> words</span>
      </p>
      <span className="text-[13px] text-[var(--lt-neutral-500)]">·</span>
      <p className="text-[13px] leading-[19.5px]">
        <span className="font-semibold text-[var(--lt-brand-500)]">7</span>
        <span className="text-[var(--lt-neutral-500)]"> mastered</span>
      </p>
      <span className="text-[13px] text-[var(--lt-neutral-500)]">·</span>
      <p className="text-[13px] leading-[19.5px] text-[var(--lt-neutral-400)]">
        17 to review
      </p>
      <div className="h-1 min-w-px max-w-[200px] flex-1 overflow-hidden rounded-[99px] bg-[var(--lt-neutral-100)]">
        <div className="h-1 w-[58px] rounded-[99px] bg-[var(--lt-brand-400)]" />
      </div>
      <p className="text-xs leading-[18px] text-[var(--lt-neutral-400)]">29%</p>
    </div>
  );
}

function HubStatSwap({
  on,
  off,
  className,
}: {
  on: ReactNode;
  off: ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      <motion.span
        className="block"
        initial={{ opacity: 1 }}
        animate={{ opacity: [...HUB_ON] }}
        transition={{ opacity: HUB_LINEAR }}
      >
        {on}
      </motion.span>
      <motion.span
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [...HUB_OFF] }}
        transition={{ opacity: HUB_LINEAR }}
      >
        {off}
      </motion.span>
    </span>
  );
}

function HubStatsBar() {
  return (
    <div className="flex w-full shrink-0 items-center gap-1.5 bg-[var(--lt-neutral-50)] px-6 py-3">
      <HubStatSwap
        className="text-[13px] leading-[19.5px] whitespace-nowrap"
        on={
          <>
            <span className="font-semibold text-[var(--lt-neutral-800)]">24</span>
            <span className="text-[var(--lt-neutral-500)]"> words</span>
          </>
        }
        off={
          <>
            <span className="font-semibold text-[var(--lt-neutral-800)]">12</span>
            <span className="text-[var(--lt-neutral-500)]"> rules</span>
          </>
        }
      />
      <span className="text-[13px] text-[var(--lt-neutral-500)]">·</span>
      <HubStatSwap
        className="text-[13px] leading-[19.5px] whitespace-nowrap"
        on={
          <>
            <span className="font-semibold text-[var(--lt-brand-500)]">7</span>
            <span className="text-[var(--lt-neutral-500)]"> mastered</span>
          </>
        }
        off={
          <>
            <span className="font-semibold text-[var(--lt-brand-500)]">4</span>
            <span className="text-[var(--lt-neutral-500)]"> mastered</span>
          </>
        }
      />
      <span className="text-[13px] text-[var(--lt-neutral-500)]">·</span>
      <HubStatSwap
        className="text-[13px] leading-[19.5px] whitespace-nowrap text-[var(--lt-neutral-400)]"
        on={<span>17 to review</span>}
        off={<span>8 to review</span>}
      />
      <div className="h-1 min-w-px max-w-[200px] flex-1 overflow-hidden rounded-[99px] bg-[var(--lt-neutral-100)]">
        <motion.div
          className="h-1 rounded-[99px] bg-[var(--lt-brand-400)]"
          initial={{ width: 58 }}
          animate={{ width: [58, 58, 26.73, 26.73, 58, 58] }}
          transition={{ width: HUB_LINEAR }}
        />
      </div>
      <HubStatSwap
        className="text-xs leading-[18px] whitespace-nowrap text-[var(--lt-neutral-400)]"
        on={<span>29%</span>}
        off={<span>33%</span>}
      />
    </div>
  );
}

function StartReviewButton({ count = "17" }: { count?: string }) {
  return (
    <div className="flex items-center gap-2 rounded-[99px] bg-[var(--lt-brand-400)] px-6 py-3 shadow-[0px_4px_10px_rgba(45,185,160,0.35)]">
      <Glyph src={ICONS.sparkle} size={15} />
      <p className="text-sm leading-[21px] font-semibold text-white">
        Start review
      </p>
      <span className="relative flex h-5 min-w-5 items-center justify-center rounded-[99px] bg-white/25 px-2 py-px text-xs leading-[18px] font-bold text-white">
        {count}
      </span>
    </div>
  );
}

function HubStartReviewButton() {
  return (
    <div className="flex items-center gap-2 rounded-[99px] bg-[var(--lt-brand-400)] px-6 py-3 shadow-[0px_4px_10px_rgba(45,185,160,0.35)]">
      <Glyph src={ICONS.sparkle} size={15} />
      <p className="text-sm leading-[21px] font-semibold text-white">
        Start review
      </p>
      <span className="relative flex h-5 w-7 items-center justify-center rounded-[99px] bg-white/25 text-xs leading-[18px] font-bold text-white">
        <motion.span
          className="block"
          initial={{ opacity: 1 }}
          animate={{ opacity: [...HUB_ON] }}
          transition={{ opacity: HUB_LINEAR }}
        >
          17
        </motion.span>
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: [...HUB_OFF] }}
          transition={{ opacity: HUB_LINEAR }}
        >
          8
        </motion.span>
      </span>
    </div>
  );
}

function KnowledgeGrid({
  cards,
  showCta = true,
}: {
  cards: { title: string; body: string; mastered: boolean }[];
  showCta?: boolean;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden px-6 pt-5 pb-[100px]">
      <div className="grid grid-cols-2 gap-3">
        {cards.map((card, index) => (
          <WordTile key={`${card.title}-${index}`} {...card} />
        ))}
      </div>
      {showCta ? (
        <div className="absolute bottom-[108px] left-1/2 -translate-x-1/2">
          <StartReviewButton />
        </div>
      ) : null}
    </div>
  );
}

function ReviewTabs({ active }: { active: "grammar" | "vocabulary" }) {
  return (
    <div className="flex h-[46px] w-full shrink-0 items-center border-b-[0.8px] border-[var(--lt-neutral-200)] bg-white pt-4">
      {(
        [
          { id: "grammar", label: "Grammar", width: 56 },
          { id: "vocabulary", label: "Vocabulary", width: 72 },
        ] as const
      ).map((tab) => {
        const on = active === tab.id;
        return (
          <div
            key={tab.id}
            className="flex min-w-px flex-1 flex-col items-center justify-center gap-2"
          >
            <p
              className={`text-[13px] leading-5 font-medium ${
                on
                  ? "text-[var(--lt-neutral-800)]"
                  : "text-[var(--lt-neutral-400)]"
              }`}
            >
              {tab.label}
            </p>
            <div
              className="h-0.5 rounded-[99px]"
              style={{
                width: tab.width,
                background: on ? "#2db9a0" : "transparent",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

function ReviewBody({ tab }: { tab: "grammar" | "vocabulary" }) {
  return (
    <div className="flex h-full flex-col bg-[var(--lt-neutral-50)]">
      <ReviewTabs active={tab} />
      <FilterBar />
      <StatsBar />
      <div className="min-h-0 flex-1">
        <KnowledgeGrid
          cards={tab === "grammar" ? GRAMMAR_CARDS : VOCAB_CARDS}
        />
      </div>
    </div>
  );
}

function BottomNav({ active }: { active: "reading" | "review" | "profile" }) {
  const items = [
    {
      id: "reading" as const,
      label: "Reading",
      on: ICONS.bookOn,
      off: ICONS.bookOff,
    },
    {
      id: "review" as const,
      label: "Review",
      on: ICONS.refreshOn,
      off: ICONS.refreshOff,
    },
    {
      id: "profile" as const,
      label: "Profile",
      on: ICONS.userOn,
      off: ICONS.userOff,
    },
  ];

  return (
    <nav className="flex h-[84px] w-full items-start border-t border-[var(--lt-neutral-200)] bg-white pt-3 pb-5">
      {items.map((item) => {
        const on = active === item.id;
        return (
          <div
            key={item.id}
            className="flex w-[133.3px] flex-col items-center justify-center gap-1"
          >
            <Glyph src={on ? item.on : item.off} size={24} />
            <p
              className={`text-[11px] leading-normal ${
                on
                  ? "font-semibold text-[var(--lt-brand-500)]"
                  : "font-medium text-[var(--lt-neutral-400)]"
              }`}
            >
              {item.label}
            </p>
          </div>
        );
      })}
    </nav>
  );
}

function ProfileRow({
  icon,
  label,
  danger = false,
  chevron = true,
}: {
  icon: string;
  label: string;
  danger?: boolean;
  chevron?: boolean;
}) {
  return (
    <div className="flex w-full items-center justify-between border-b border-[var(--lt-neutral-200)] py-4">
      <div className="flex items-center gap-3">
        <Glyph src={icon} size={20} />
        <p
          className={`text-sm leading-6 font-semibold ${
            danger
              ? "text-[var(--lt-text-danger)]"
              : "text-[var(--lt-text-primary)]"
          }`}
        >
          {label}
        </p>
      </div>
      {chevron ? <Glyph src={ICONS.chevron} size={16} /> : null}
    </div>
  );
}

function ReadingScreen() {
  return (
    <div className="flex h-full flex-col bg-[var(--lt-neutral-50)]">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-8 pt-7 pb-10">
        <div className="flex items-end justify-between border-b border-[var(--lt-neutral-100)] pb-4">
          <div>
            <p className="text-xl leading-[30px] font-bold tracking-[-0.4px] text-[var(--lt-neutral-800)]">
              Your Library
            </p>
            <p className="pt-[3px] text-[13px] leading-[19.5px] text-[var(--lt-neutral-400)]">
              8 articles · German
            </p>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-[var(--lt-brand-400)] px-3.5 py-[7px]">
            <span className="text-[15px] leading-[15px] font-semibold text-[var(--lt-brand-500)]">
              +
            </span>
            <p className="text-[13px] leading-[19.5px] font-semibold text-[var(--lt-brand-500)]">
              Add Article
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 overflow-hidden pt-5">
          {ARTICLES.map((article, index) => (
            <LibraryArticle key={`${article.title}-${index}`} {...article} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="flex h-full flex-col gap-7 bg-white px-6 py-10">
      <p className="text-[28px] leading-normal font-bold text-[var(--lt-text-primary)]">
        Profile
      </p>
      <div className="flex w-full items-center gap-4 rounded-2xl border border-[var(--lt-border-default)] bg-white p-5">
        <div className="flex size-14 items-center justify-center rounded-[28px] bg-[var(--lt-brand-50)]">
          <p className="text-xl font-bold text-[var(--lt-brand-400)]">U</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-lg font-bold text-[var(--lt-text-primary)]">
            User
          </p>
          <p className="text-sm text-[var(--lt-text-secondary)]">Free Plan</p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-3">
        <p className="text-xs font-bold tracking-[1px] text-[var(--lt-text-tertiary)]">
          LEARNING
        </p>
        <div className="border-t border-b border-[var(--lt-border-default)]">
          <ProfileRow icon={ICONS.globe} label="Learning Language" />
          <ProfileRow icon={ICONS.wallet} label="Credits" />
        </div>
      </div>
      <div className="flex w-full flex-col gap-3">
        <p className="text-xs font-bold tracking-[1px] text-[var(--lt-text-tertiary)]">
          SETTINGS
        </p>
        <div className="border-t border-b border-[var(--lt-border-default)]">
          <ProfileRow icon={ICONS.settings} label="Preferences" />
          <ProfileRow icon={ICONS.help} label="Help & Support" />
        </div>
      </div>
      <div className="border-t border-b border-[var(--lt-border-default)]">
        <ProfileRow icon={ICONS.logout} label="Log Out" danger chevron={false} />
      </div>
    </div>
  );
}

export function NavSpacesPhone() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <ScaledPhone>
      {reduceMotion ? (
        <>
          <ReadingScreen />
          <div className="absolute inset-x-0 bottom-0">
            <BottomNav active="reading" />
          </div>
        </>
      ) : (
        <>
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 1, x: 0 }}
            animate={{
              opacity: [1, 1, 0, 0, 1, 1],
              x: [0, 0, -24, 24, 24, 0, 0],
            }}
            transition={{
              opacity: READING_OPACITY,
              x: READING_X,
            }}
          >
            <ReadingScreen />
          </motion.div>
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, x: 24 }}
            animate={{
              opacity: [0, 0, 1, 1, 0, 0],
              x: [24, 24, 0, 0, -24, -24],
            }}
            transition={{
              opacity: REVIEW_T,
              x: REVIEW_T,
            }}
          >
            <ReviewBody tab="vocabulary" />
          </motion.div>
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, x: 24 }}
            animate={{
              opacity: [0, 0, 1, 1, 0, 0],
              x: [24, 24, 0, 0, -24, -24],
            }}
            transition={{
              opacity: PROFILE_T,
              x: PROFILE_T,
            }}
          >
            <ProfileScreen />
          </motion.div>
          <motion.div
            className="absolute inset-x-0 bottom-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 1, 0, 0, 1, 1] }}
            transition={{ opacity: READING_OPACITY }}
          >
            <BottomNav active="reading" />
          </motion.div>
          <motion.div
            className="absolute inset-x-0 bottom-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
            transition={{ opacity: REVIEW_T }}
          >
            <BottomNav active="review" />
          </motion.div>
          <motion.div
            className="absolute inset-x-0 bottom-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
            transition={{ opacity: PROFILE_T }}
          >
            <BottomNav active="profile" />
          </motion.div>
        </>
      )}
    </ScaledPhone>
  );
}

export function ReviewHubPhone() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <ScaledPhone>
      {reduceMotion ? (
        <div className="flex h-full flex-col bg-[var(--lt-neutral-50)]">
          <ReviewTabs active="vocabulary" />
          <FilterBar />
          <StatsBar />
          <div className="min-h-0 flex-1">
            <KnowledgeGrid cards={HUB_VOCAB_CARDS} />
          </div>
          <BottomNav active="review" />
        </div>
      ) : (
        <div className="relative h-full bg-[var(--lt-neutral-50)]">
          <motion.div
            className="absolute inset-x-0 top-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: [...HUB_ON] }}
            transition={{ opacity: HUB_T }}
          >
            <ReviewTabs active="vocabulary" />
          </motion.div>
          <motion.div
            className="absolute inset-x-0 top-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [...HUB_OFF] }}
            transition={{ opacity: HUB_T }}
          >
            <ReviewTabs active="grammar" />
          </motion.div>
          <div className="absolute inset-x-0 top-[46px]">
            <FilterBar />
            <HubStatsBar />
          </div>
          <div className="absolute inset-x-0 top-[166px] bottom-[84px] overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full w-[400px]"
              initial={{ x: 0 }}
              animate={{ x: [0, 0, -400, -400, 0, 0] }}
              transition={{ x: HUB_T }}
            >
              <KnowledgeGrid cards={HUB_VOCAB_CARDS} showCta={false} />
            </motion.div>
            <motion.div
              className="absolute top-0 left-[400px] h-full w-[400px]"
              initial={{ x: 0 }}
              animate={{ x: [0, 0, -400, -400, 0, 0] }}
              transition={{ x: HUB_T }}
            >
              <KnowledgeGrid cards={GRAMMAR_CARDS} showCta={false} />
            </motion.div>
            <div className="pointer-events-none absolute bottom-[108px] left-1/2 -translate-x-1/2">
              <HubStartReviewButton />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0">
            <BottomNav active="review" />
          </div>
        </div>
      )}
    </ScaledPhone>
  );
}

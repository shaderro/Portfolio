"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LtIcon } from "./LtIcon";
import { NavButton, TopNav } from "./product";
import { ScaledStage } from "./ScaledStage";

const DURATION = 4.5;
const LOOP = { duration: DURATION, repeat: Infinity } as const;
const SPRING_EASE = (t: number) =>
  1 -
  Math.exp(-t * 7.8685) *
    (Math.cos(t * 4.8764) + 1.6136 * Math.sin(t * 4.8764));

const CARD_FADE = {
  times: [0, 0.4444, 0.4711, 1],
  ease: ["linear", "easeOut", "linear"] as const,
};
const SECTION_FADE = {
  times: [0, 0.4622, 0.5222, 1],
  ease: ["linear", "easeOut", "linear"] as const,
};
const SECTION_SPRING = {
  times: [0, 0.4622, 0.5778, 1],
  ease: ["linear", SPRING_EASE, "linear"] as const,
};
const ACTION_FADE = {
  times: [0, 0.4778, 0.5444, 1],
  ease: ["linear", "easeOut", "linear"] as const,
};
const ACTION_Y = {
  times: [0, 0.4778, 0.5667, 1],
  ease: ["linear", SPRING_EASE, "linear"] as const,
};

function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-1.5">
      <div className="flex min-w-0 flex-1 items-center gap-[2.5px]">
        {Array.from({ length: total }, (_, index) => (
          <div
            key={index}
            className={cn(
              "h-1 min-w-px flex-1 rounded-full",
              index < current
                ? "bg-[var(--lt-brand-400)]"
                : "bg-[var(--lt-neutral-200)]",
            )}
          />
        ))}
      </div>
      <p className="shrink-0 text-[10px] leading-[15px] text-[var(--lt-neutral-400)]">
        {current} / {total}
      </p>
    </div>
  );
}

function CardHeader({ current, total }: { current: number; total: number }) {
  return (
    <header className="flex items-center gap-2 border-b border-[var(--lt-neutral-100)] px-3 py-2.5">
      <button
        type="button"
        aria-label="Close"
        className="flex size-[23px] shrink-0 items-center justify-center rounded-[10px] border border-[var(--lt-neutral-200)] bg-white"
      >
        <span className="flex size-[11px] items-center justify-center">
          <LtIcon name="close" />
        </span>
      </button>
      <ProgressBar current={current} total={total} />
    </header>
  );
}

function ActionButtons() {
  return (
    <div className="flex gap-2.5">
      <button
        type="button"
        className="flex h-[38px] flex-1 items-center justify-center rounded-md border border-[var(--lt-border-danger)] bg-white text-[11px] font-semibold text-[var(--lt-text-danger)]"
      >
        Don&apos;t know
      </button>
      <button
        type="button"
        className="flex h-[38px] flex-1 items-center justify-center rounded-md bg-[var(--lt-brand-400)] text-[11px] font-semibold text-white"
      >
        Know it ✓
      </button>
    </div>
  );
}

function StudyingFooter() {
  return (
    <div className="flex items-center justify-center gap-1.5 pt-3">
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        aria-hidden
      >
        <path
          d="M1.5 1.25h3.1c.7 0 1.15.35 1.4.6.25-.25.7-.6 1.4-.6h3.1v6.6H7.4c-.55 0-1.05.15-1.4.4-.35-.25-.85-.4-1.4-.4H1.5V1.25Z"
          stroke="#9898A6"
          strokeWidth="0.9"
        />
      </svg>
      <p className="text-[9px] leading-[13px] text-[var(--lt-neutral-400)]">
        Studying from <span className="text-[var(--lt-neutral-500)]">HP1</span>
        {" · "}
        14 words to review
      </p>
    </div>
  );
}

function ShowDefinition() {
  return (
    <button
      type="button"
      className="flex h-9 w-full items-center justify-center gap-1.5 rounded-md border border-[var(--lt-brand-300)] bg-[var(--lt-brand-50)] text-[11px] font-semibold text-[var(--lt-brand-500)]"
    >
      <span className="flex size-[15px] items-center justify-center">
        <LtIcon name="eye" />
      </span>
      Show definition
    </button>
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
    <div className="flex items-start gap-1.5">
      <span
        className={cn(
          "mt-[7px] size-[3.5px] shrink-0 rounded-[1.5px]",
          brand ? "bg-[var(--lt-brand-400)]" : "bg-[var(--lt-neutral-300)]",
        )}
      />
      <p className="text-[11px] leading-[17px] text-[var(--lt-neutral-600)]">
        {children}
      </p>
    </div>
  );
}

function SectionCard({
  label,
  accent = false,
  children,
}: {
  label: string;
  accent?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-md border",
        accent
          ? "border-[var(--lt-brand-300)] bg-[var(--lt-brand-50)]"
          : "border-[var(--lt-neutral-200)] bg-white",
      )}
    >
      <div
        className={cn(
          "border-b px-3.5 pt-2 pb-1.5",
          accent ? "border-[var(--lt-brand-300)]" : "border-[var(--lt-neutral-100)]",
        )}
      >
        <p
          className={cn(
            "text-[8px] font-bold tracking-[0.7px] uppercase",
            accent ? "text-[var(--lt-brand-500)]" : "text-[var(--lt-neutral-400)]",
          )}
        >
          {label}
        </p>
      </div>
      <div className="flex flex-col gap-1 px-3.5 py-2.5">{children}</div>
    </div>
  );
}

function StageChrome({
  active,
  children,
}: {
  active: "insights" | "vocabulary";
  children: ReactNode;
}) {
  return (
    <div className="relative h-[750px] w-[1200px] bg-white">
      <TopNav active={active} className="h-[43px] px-5 py-0" />
      <div className="relative h-[707px]">
        <NavButton className="absolute top-[310px] left-[322px] size-10 rounded-full" />
        <NavButton
          className="absolute top-[310px] left-[838px] size-10 rotate-180 rounded-full"
          label="Next"
        />
        <div className="absolute top-5 left-[375px] w-[450px]">{children}</div>
      </div>
    </div>
  );
}

function VocabPrompt() {
  return (
    <>
      <div className="flex flex-col items-center px-4 pt-5">
        <div className="flex items-center gap-1.5">
          <h2 className="text-center text-[23px] font-bold leading-[35px] tracking-[-0.5px] text-[var(--lt-neutral-800)]">
            fehlend
          </h2>
          <button
            type="button"
            aria-label="Play pronunciation"
            className="flex size-5 items-center justify-center"
          >
            <span className="flex size-[15px] items-center justify-center">
              <LtIcon name="speakerWord" />
            </span>
          </button>
        </div>
        <p className="text-[10px] font-medium tracking-[0.3px] text-[var(--lt-neutral-400)]">
          Adjective (present participle)
        </p>
      </div>
      <div className="px-3.5 pt-3.5">
        <div className="relative rounded-md border border-[var(--lt-neutral-200)] bg-[var(--lt-neutral-50)] px-3.5 py-3 pr-8">
          <p className="text-center text-[12px] leading-[19px] text-[var(--lt-neutral-800)] italic">
            Die{" "}
            <span className="inline-block rounded-[2.5px] bg-[var(--lt-brand-50)] px-0.5 font-bold not-italic text-[var(--lt-brand-500)]">
              fehlend
            </span>
            en Seiten wurden später gefunden.
          </p>
          <button
            type="button"
            aria-label="Play sentence"
            className="absolute top-2 right-2 flex size-[14px] items-center justify-center"
          >
            <span className="flex size-[11px] items-center justify-center">
              <LtIcon name="speakerSentence" />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

function VocabCollapsed() {
  return (
    <div className="w-[450px]">
      <article className="overflow-hidden rounded-[10px] bg-white shadow-[0_0.8px_2.5px_rgba(0,0,0,0.06),0_3.3px_16.7px_rgba(0,0,0,0.07)]">
        <CardHeader current={6} total={17} />
        <VocabPrompt />
        <div className="px-3.5 pt-4 pb-4">
          <ShowDefinition />
        </div>
        <div className="px-3.5 pb-3.5">
          <ActionButtons />
        </div>
      </article>
      <StudyingFooter />
    </div>
  );
}

function VocabExpanded({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.article
      className="flex w-[450px] flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_0.8px_2.5px_rgba(0,0,0,0.06),0_3.3px_16.7px_rgba(0,0,0,0.07)]"
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: [0, 0, 1, 1] }}
      transition={reduceMotion ? undefined : { opacity: { ...LOOP, ...CARD_FADE } }}
    >
      <CardHeader current={6} total={17} />
      <VocabPrompt />
      <p className="px-4 pt-1.5 text-[10px] leading-[15px] text-[var(--lt-neutral-400)]">
        fehlend = &apos;missing&apos;; modifies the plural noun Seiten
      </p>
      <motion.div
        className="origin-top px-3.5 pt-3.5"
        initial={
          reduceMotion
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.96, y: 5 }
        }
        animate={
          reduceMotion
            ? { opacity: 1, scale: 1, y: 0 }
            : {
                opacity: [0, 0, 1, 1],
                scale: [0.96, 0.96, 1, 1],
                y: [5, 5, 0, 0],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                opacity: { ...LOOP, ...SECTION_FADE },
                scale: { ...LOOP, ...SECTION_SPRING },
                y: { ...LOOP, ...SECTION_SPRING },
              }
        }
      >
        <div className="flex flex-col gap-1.5 border-t border-[var(--lt-neutral-100)] pt-3.5">
          <SectionCard label="Definition" accent>
            <Bullet brand>missing; absent; lacking</Bullet>
          </SectionCard>
          <SectionCard label="Word features">
            <Bullet>fehlende Unterlagen - missing documents</Bullet>
          </SectionCard>
          <SectionCard label="Collocations">
            <Bullet>das Fehlende</Bullet>
            <Bullet>fehlende Mittel</Bullet>
          </SectionCard>
          <SectionCard label="Grammar notes">
            <Bullet>
              present participle of fehlen used as an attributive adjective
            </Bullet>
            <Bullet>
              declines like any adjective according to case, number, and gender
            </Bullet>
          </SectionCard>
        </div>
      </motion.div>
      <motion.div
        className="px-3.5 pt-4 pb-3.5"
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -4.167 }}
        animate={
          reduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: [0, 0, 1, 1], y: [-4.167, -4.167, 0, 0] }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                opacity: { ...LOOP, ...ACTION_FADE },
                y: { ...LOOP, ...ACTION_Y },
              }
        }
      >
        <ActionButtons />
      </motion.div>
    </motion.article>
  );
}

function GrammarPrompt() {
  return (
    <div className="relative px-3.5 pt-3.5">
      <div className="rounded-md border border-[var(--lt-neutral-200)] bg-[var(--lt-neutral-50)] px-3.5 py-3 pr-8">
        <p className="text-center text-[12px] leading-5 text-[var(--lt-neutral-800)] italic">
          Autonome Waffensysteme stellen eine besondere ethische Herausforderung
          dar, da sie die Entscheidung über Leben und Tod an algorithmische
          Prozesse delegieren.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
          <span className="rounded-full border border-[var(--lt-brand-400)] bg-[var(--lt-brand-50)] px-2.5 py-0.5 text-[9px] font-semibold text-[var(--lt-brand-400)]">
            Conditional Clause
          </span>
          <span className="rounded-full border border-[var(--lt-brand-400)] bg-[var(--lt-brand-50)] px-2.5 py-0.5 text-[9px] font-semibold text-[var(--lt-brand-400)]">
            Separable-prefix verb
          </span>
        </div>
      </div>
      <button
        type="button"
        aria-label="Play sentence"
        className="absolute top-6 right-5 flex size-[14px] items-center justify-center"
      >
        <span className="flex size-[11px] items-center justify-center">
          <LtIcon name="speakerSentence" />
        </span>
      </button>
    </div>
  );
}

function GrammarCollapsed() {
  return (
    <div className="w-[450px]">
      <article className="overflow-hidden rounded-[10px] bg-white shadow-[0_0.8px_2.5px_rgba(0,0,0,0.06),0_3.3px_16.7px_rgba(0,0,0,0.07)]">
        <CardHeader current={3} total={14} />
        <GrammarPrompt />
        <div className="px-3.5 pt-4 pb-4">
          <ShowDefinition />
        </div>
        <div className="px-3.5 pb-3.5">
          <ActionButtons />
        </div>
      </article>
      <StudyingFooter />
    </div>
  );
}

function GrammarExpanded({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      className="flex w-[450px] flex-col"
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: [0, 0, 1, 1] }}
      transition={reduceMotion ? undefined : { opacity: { ...LOOP, ...CARD_FADE } }}
    >
      <article className="overflow-hidden rounded-[10px] bg-white shadow-[0_0.8px_2.5px_rgba(0,0,0,0.06),0_3.3px_16.7px_rgba(0,0,0,0.07)]">
        <CardHeader current={3} total={14} />
        <GrammarPrompt />
        <motion.div
          className="origin-top px-3.5 py-4"
          initial={
            reduceMotion
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.96, y: 5 }
          }
          animate={
            reduceMotion
              ? { opacity: 1, scale: 1, y: 0 }
              : {
                  opacity: [0, 0, 1, 1],
                  scale: [0.96, 0.96, 1, 1],
                  y: [5, 5, 0, 0],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  opacity: { ...LOOP, ...SECTION_FADE },
                  scale: { ...LOOP, ...SECTION_SPRING },
                  y: { ...LOOP, ...SECTION_SPRING },
                }
          }
        >
          <div className="flex flex-col gap-3.5 text-[11px] leading-[17px] text-[var(--lt-neutral-600)]">
            <div className="flex flex-col gap-1">
              <p className="text-[11px] font-bold uppercase text-[var(--lt-brand-400)]">
                Conditional Clause
              </p>
              <p>
                Causal clause (&apos;da...delegieren&apos;); &apos;da
                sie...delegieren&apos; ={" "}
                <span className="font-semibold">
                  because they delegate the decision about life and death to
                  algorithmic processes
                </span>
                ; provides the reason for why autonomous weapon systems pose a
                special ethical challenge.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[11px] font-bold uppercase text-[var(--lt-brand-400)]">
                Separable-prefix verb
              </p>
              <p>
                Separable prefix verb →{" "}
                <span className="font-semibold text-[var(--lt-brand-400)]">
                  &apos;stellen ... dar&apos;
                </span>{" "}
                = &apos;present/represent&apos;; &apos;stellen&apos; (base) is
                split by &apos;eine besondere ethische Herausforderung&apos;;
                &apos;dar&apos; appears at clause end; together they form the
                main predicate, establishing what autonomous weapon systems do.
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="px-3.5 pb-3.5"
          initial={
            reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -4.167 }
          }
          animate={
            reduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: [0, 0, 1, 1], y: [-4.167, -4.167, 0, 0] }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  opacity: { ...LOOP, ...ACTION_FADE },
                  y: { ...LOOP, ...ACTION_Y },
                }
          }
        >
          <ActionButtons />
        </motion.div>
      </article>
      <StudyingFooter />
    </motion.div>
  );
}

function CollapsedOverlay({
  reduceMotion,
  children,
}: {
  reduceMotion: boolean;
  children: ReactNode;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute top-0 left-0"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 1 }}
      animate={reduceMotion ? { opacity: 0 } : { opacity: [1, 1, 0, 0] }}
      transition={
        reduceMotion ? undefined : { opacity: { ...LOOP, ...CARD_FADE } }
      }
    >
      {children}
    </motion.div>
  );
}

function VocabReviewStage({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <StageChrome active="insights">
      <VocabExpanded reduceMotion={reduceMotion} />
      <CollapsedOverlay reduceMotion={reduceMotion}>
        <VocabCollapsed />
      </CollapsedOverlay>
    </StageChrome>
  );
}

function GrammarReviewStage({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <StageChrome active="insights">
      <GrammarExpanded reduceMotion={reduceMotion} />
      <CollapsedOverlay reduceMotion={reduceMotion}>
        <GrammarCollapsed />
      </CollapsedOverlay>
    </StageChrome>
  );
}

export function VocabReviewMotion({ framed = true }: { framed?: boolean }) {
  const reduceMotion = Boolean(useReducedMotion());
  const stage = <VocabReviewStage reduceMotion={reduceMotion} />;
  if (!framed) return stage;
  return (
    <ScaledStage width={1200} height={750}>
      {stage}
    </ScaledStage>
  );
}

export function GrammarReviewMotion({ framed = true }: { framed?: boolean }) {
  const reduceMotion = Boolean(useReducedMotion());
  const stage = <GrammarReviewStage reduceMotion={reduceMotion} />;
  if (!framed) return stage;
  return (
    <ScaledStage width={1200} height={750}>
      {stage}
    </ScaledStage>
  );
}

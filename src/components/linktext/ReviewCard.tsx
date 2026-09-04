"use client";

import { cn } from "@/lib/utils";
import { LtIcon } from "./LtIcon";

const TOTAL_STEPS = 14;
const CURRENT_STEP = 3;

export function ReviewCard({ className }: { className?: string }) {
  return (
    <article
      className={cn(
        "flex w-full max-w-[540px] flex-col overflow-hidden rounded-[var(--lt-radius-container)] bg-[var(--lt-surface-card)] shadow-[var(--lt-elevation-content)]",
        className,
      )}
    >
      <header className="flex items-center gap-2.5 border-b border-[var(--lt-neutral-100)] px-3.5 py-3">
        <button
          type="button"
          aria-label="Close"
          className="flex size-7 shrink-0 items-center justify-center rounded-[var(--lt-radius-container)] border border-[var(--lt-neutral-200)] bg-[var(--lt-surface-card)]"
        >
          <span className="flex size-[13px] items-center justify-center">
            <LtIcon name="close" />
          </span>
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-[3px]">
            {Array.from({ length: TOTAL_STEPS }, (_, index) => (
              <div
                key={index}
                className={cn(
                  "h-[5px] min-w-px flex-1 rounded-[var(--lt-radius-badge)]",
                  index < CURRENT_STEP
                    ? "bg-[var(--lt-brand-400)]"
                    : "bg-[var(--lt-neutral-200)]",
                )}
              />
            ))}
          </div>
          <p className="shrink-0 text-xs leading-[18px] text-[var(--lt-neutral-400)]">
            {CURRENT_STEP} / {TOTAL_STEPS}
          </p>
        </div>
      </header>

      <div className="flex flex-col items-center px-5 pt-6">
        <div className="flex items-center gap-2">
          <h2 className="text-center text-[30px] font-semibold leading-[38px] tracking-[-0.5px] text-[var(--lt-neutral-800)]">
            fehlend
          </h2>
          <button
            type="button"
            aria-label="Play pronunciation"
            className="flex size-6 shrink-0 items-center justify-center p-[3px]"
          >
            <span className="flex size-[18px] items-center justify-center">
              <LtIcon name="speakerWord" />
            </span>
          </button>
        </div>
        <p className="text-center text-xs font-medium leading-[18px] text-[var(--lt-neutral-400)]">
          Adjective (present participle)
        </p>
      </div>

      <div className="px-4 pt-4">
        <div className="relative rounded-[var(--lt-radius-card)] border border-[var(--lt-neutral-200)] bg-[var(--lt-neutral-50)] px-4 py-3.5 pr-9">
          <p className="text-center text-sm leading-6 text-[var(--lt-neutral-800)] italic">
            Die{" "}
            <span className="inline-block rounded-[var(--lt-radius-code)] bg-[var(--lt-brand-50)] px-0.5 font-semibold not-italic text-[var(--lt-brand-500)]">
              fehlend
            </span>
            en Seiten wurden später gefunden.
          </p>
          <button
            type="button"
            aria-label="Play sentence"
            className="absolute top-2.5 right-2.5 flex size-[17px] items-center justify-center p-0.5"
          >
            <span className="flex size-[13px] items-center justify-center">
              <LtIcon name="speakerSentence" />
            </span>
          </button>
        </div>
      </div>

      <div className="px-4 py-5">
        <button
          type="button"
          className="flex h-[43.5px] w-full items-center justify-center gap-1.5 rounded-[var(--lt-radius-card)] border border-[var(--lt-brand-300)] bg-[var(--lt-brand-50)] text-[13px] font-semibold leading-5 text-[var(--lt-brand-500)]"
        >
          <span className="flex size-[15px] items-center justify-center">
            <LtIcon name="eye" />
          </span>
          Show definition
        </button>
      </div>

      <div className="flex gap-2.5 px-4 pb-4">
        <button
          type="button"
          className="flex h-[45.5px] flex-1 items-center justify-center rounded-[var(--lt-radius-button-md)] border border-[var(--lt-border-danger)] bg-[var(--lt-bg-primary)] text-[13px] font-semibold leading-5 text-[var(--lt-text-danger)]"
        >
          Don&apos;t know
        </button>
        <button
          type="button"
          className="flex h-[45.5px] flex-1 items-center justify-center rounded-[var(--lt-radius-button-md)] bg-[var(--lt-bg-brand)] text-[13px] font-semibold leading-5 text-[var(--lt-text-inverse)]"
        >
          Know it ✓
        </button>
      </div>
    </article>
  );
}

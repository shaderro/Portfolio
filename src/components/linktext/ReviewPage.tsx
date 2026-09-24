import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GrammarReviewMotion, VocabReviewMotion } from "./ReviewMotion";

const ASSETS = {
  overview: {
    src: "/images/linktext/review/knowledge-overview.png",
    w: 1197,
    h: 749,
  },
  vocabCard: {
    src: "/images/linktext/review/vocab-detail-card.png",
    w: 594,
    h: 501,
  },
  grammarCard: {
    src: "/images/linktext/review/grammar-detail-card.png",
    w: 594,
    h: 531,
  },
  vocabPage: {
    src: "/images/linktext/review/vocab-detail-page.png",
    w: 1200,
    h: 750,
  },
  grammarPage: {
    src: "/images/linktext/review/grammar-detail-page.png",
    w: 1200,
    h: 750,
  },
} as const;

function Frame({
  name,
  alt,
  bordered = false,
}: {
  name: keyof typeof ASSETS;
  alt: string;
  bordered?: boolean;
}) {
  const { src, w, h } = ASSETS[name];
  return (
    <div className="w-full min-w-0">
      <img
        src={src}
        alt={alt}
        width={w}
        height={h}
        className={cn(
          "block h-auto w-full bg-white",
          bordered && "border border-[#eaeaed]",
        )}
        style={{ maxWidth: w }}
      />
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-[#eaeaed]" />;
}

function QuoteRule({ children }: { children: ReactNode }) {
  return (
    <div className="w-full border-l-4 border-[var(--lt-ink)] py-2 pl-7 pr-6">
      <p className="text-lg font-medium leading-normal text-[#5c6378]">
        {children}
      </p>
    </div>
  );
}

function Statement({ children }: { children: ReactNode }) {
  return (
    <div className="w-full border-l border-[var(--lt-ink)] py-3 pl-7 pr-6">
      <p className="text-base font-medium leading-6 text-[#5c6378]">{children}</p>
    </div>
  );
}

function Insight({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full items-start gap-4 px-5 py-4">
      <span className="mt-0.5 h-5 w-[3px] shrink-0 bg-[var(--lt-brand-400)]" />
      <p className="text-sm leading-[22px] text-[var(--lt-neutral-700)]">
        {children}
      </p>
    </div>
  );
}

function InkStep({
  label,
  tone,
  wrapClassName,
}: {
  label: string;
  tone: "solid" | "outline";
  wrapClassName?: string;
}) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-lg px-3.5 py-2 text-center text-xs font-semibold leading-normal",
        tone === "solid" && "bg-[var(--lt-ink)] text-white",
        tone === "outline" && "border border-[var(--lt-ink)] bg-white text-[var(--lt-ink)]",
        wrapClassName,
      )}
    >
      {label}
    </span>
  );
}

function ArrowDown() {
  return (
    <span className="text-sm leading-normal text-[var(--lt-ink)]">↓</span>
  );
}

function ArrowRight() {
  return (
    <span className="shrink-0 text-sm leading-normal text-[var(--lt-ink)]">
      →
    </span>
  );
}

function FlowRow({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 overflow-x-auto rounded-lg px-6 py-4">
      {children}
    </div>
  );
}

export function ReviewPage() {
  return (
    <div
      className="linktext bg-white text-[var(--lt-ink)]"
      id="review"
      data-toc=""
      data-id="review"
    >
      <header className="mx-auto flex w-full max-w-[1440px] flex-col gap-2 px-6 pt-16 pb-12 md:px-10 lg:px-[120px] lg:pt-[120px]">
        <p className="text-[72px] leading-none font-black text-[#e6e6e3]">05</p>
        <h1 className="text-[36px] leading-none font-extrabold text-[var(--lt-ink)]">
          Review
        </h1>
      </header>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 pb-[120px] md:px-10 lg:px-[120px]">
        <div className="flex flex-col gap-3">
          <QuoteRule>
            Turning accumulated knowledge into a reviewable system
          </QuoteRule>
          <p className="text-[15px] leading-6 text-[var(--lt-neutral-700)]">
            Reading generates knowledge. Review turns that knowledge into
            something users can revisit and practice.
          </p>
        </div>

        <Divider />

        <section className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h2
              className="text-2xl font-extrabold text-[var(--lt-ink)]"
              id="knowledge-overview"
              data-toc=""
              data-id="knowledge-overview"
            >
              01 — Knowledge Overview
            </h2>
            <p className="text-[15px] leading-[22px] text-[#333]">
              A flat overview of accumulated knowledge
            </p>
          </div>
          <Statement>
            The Review page provides a flat list of vocabulary and grammar
            knowledge points generated from the user&apos;s reading activity.
          </Statement>
          <Frame
            name="overview"
            alt="Review knowledge list with filters, word cards, and Start review"
            bordered
          />
          <p className="text-[15px] leading-6 text-[var(--lt-neutral-700)]">
            Users can filter the list based on different dimensions, such as:
          </p>
          <div className="flex flex-col gap-1.5 pl-1 text-sm leading-[22px] text-[var(--lt-neutral-700)]">
            <p>• Article</p>
            <p>• Knowledge type</p>
            <p>• Mastery status</p>
          </div>
          <p className="text-[15px] leading-6 text-[var(--lt-neutral-700)]">
            The flat structure keeps the overview lightweight while allowing users
            to quickly narrow down what they want to revisit.
          </p>
          <h3 className="text-lg font-bold text-[var(--lt-ink)]">
            Two ways to engage with knowledge
          </h3>
          <div className="flex w-full flex-col items-center gap-4 rounded-lg p-6">
            <InkStep label="Knowledge List" tone="solid" />
            <div className="flex items-start gap-10">
              <div className="flex flex-col items-center gap-2">
                <InkStep label="Explore" tone="outline" />
                <ArrowDown />
                <InkStep label="Knowledge Detail" tone="outline" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <InkStep label="Review" tone="outline" />
                <ArrowDown />
                <InkStep label="Flashcards" tone="outline" />
              </div>
            </div>
          </div>
          <p className="text-[15px] leading-6 text-[var(--lt-neutral-700)]">
            Each knowledge point supports two different modes of engagement:
            Explore for understanding and Review for active recall.
          </p>
        </section>

        <Divider />

        <section className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h2
              className="text-2xl font-extrabold text-[var(--lt-ink)]"
              id="knowledge-detail"
              data-toc=""
              data-id="knowledge-detail"
            >
              02 — Knowledge Detail
            </h2>
            <p className="text-[15px] leading-[22px] text-[#333]">
              From a learning point to a complete knowledge model
            </p>
          </div>
          <Statement>
            Clicking a knowledge point opens its complete learning context.
          </Statement>
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <h3 className="text-lg font-bold text-[var(--lt-ink)]">
                Vocabulary
              </h3>
              <p className="text-[15px] leading-6 text-[var(--lt-neutral-700)]">
                For vocabulary, the detail view brings together:
              </p>
              <div className="flex flex-col gap-1.5 pl-1 text-sm leading-[22px] text-[var(--lt-neutral-700)]">
                <p>• Definition</p>
                <p>• Linguistic features</p>
                <p>• Common collocations</p>
                <p>• Original sentences from the user&apos;s reading</p>
              </div>
              <Frame
                name="vocabCard"
                alt="Vocabulary detail for am Strand with definition, features, and examples"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <h3 className="text-lg font-bold text-[var(--lt-ink)]">Grammar</h3>
              <p className="min-h-[138px] text-[15px] leading-6 text-[var(--lt-neutral-700)]">
                For grammar, the same structure is adapted to grammatical
                knowledge, with the relevant explanations and example sentences
                grouped into a single knowledge point.
              </p>
              <Frame
                name="grammarCard"
                alt="Grammar detail for Subjunctive II with structure and sentence mapping"
              />
            </div>
          </div>
        </section>

        <Frame
          name="vocabPage"
          alt="Vocabulary detail page for am Strand in the LinkText product"
        />
        <Frame
          name="grammarPage"
          alt="Grammar detail page for Subjunctive II in the LinkText product"
        />

        <Divider />

        <section className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h2
              className="text-2xl font-extrabold text-[var(--lt-ink)]"
              id="review-mode"
              data-toc=""
              data-id="review-mode"
            >
              03 — Review Mode
            </h2>
            <p className="text-[15px] leading-[22px] text-[#333]">
              Different knowledge requires different forms of recall
            </p>
          </div>
          <Statement>
            Vocabulary is reviewed as a lexical unit; grammar is reviewed through
            contextual comprehension.
          </Statement>
          <h3 className="text-lg font-bold text-[var(--lt-ink)]">
            Vocabulary — Recall the word
          </h3>
          <p className="text-[15px] leading-6 text-[var(--lt-neutral-700)]">
            Vocabulary is reviewed as an individual lexical unit. The user is
            presented with the word and prompted to recall its meaning or
            relevant knowledge before revealing the answer.
          </p>
          <FlowRow>
            <InkStep label="Word" tone="solid" />
            <ArrowRight />
            <InkStep label="Recall" tone="outline" />
            <ArrowRight />
            <InkStep label="Reveal" tone="outline" />
            <ArrowRight />
            <InkStep label="Self-assess mastery" tone="outline" />
          </FlowRow>
          <VocabReviewMotion />
          <h3 className="text-lg font-bold text-[var(--lt-ink)]">
            Grammar — Understand the sentence
          </h3>
          <p className="text-[15px] leading-6 text-[var(--lt-neutral-700)]">
            Rather than asking users to memorize an abstract grammar definition,
            LinkText presents a sentence and asks whether they can understand
            how the grammar works in context.
          </p>
          <FlowRow>
            <InkStep label="Sentence" tone="solid" />
            <ArrowRight />
            <InkStep label="Understand the sentence" tone="outline" />
            <ArrowRight />
            <InkStep
              label="Reveal contextual explanation"
              tone="outline"
              wrapClassName="w-[110px]"
            />
            <ArrowRight />
            <InkStep label="Self-assess mastery" tone="outline" />
          </FlowRow>
          <GrammarReviewMotion />
          <Insight>
            This is not simply giving two tab views two flashcard UIs — it is
            designing the interaction model based on the nature of the
            learning object.
          </Insight>
        </section>

        <Divider />

        <section className="flex flex-col gap-3">
          <h3 className="text-lg font-bold text-[var(--lt-ink)]">
            Review System Overview
          </h3>
          <div className="flex w-full flex-col items-center gap-2 rounded-lg p-6">
            <InkStep label="READ" tone="solid" />
            <ArrowDown />
            <InkStep label="Generate Knowledge" tone="outline" />
            <ArrowDown />
            <div className="flex items-center justify-center gap-6 rounded-lg border border-[var(--lt-ink)] px-6 py-4">
              <p className="text-xs font-semibold text-[var(--lt-ink)]">
                Knowledge Base
              </p>
              <InkStep label="Vocabulary" tone="outline" />
              <InkStep label="Grammar" tone="outline" />
            </div>
            <ArrowDown />
            <div className="flex items-start gap-10">
              <div className="flex flex-col items-center gap-2">
                <InkStep label="Explore" tone="outline" />
                <ArrowDown />
                <InkStep label="Detail" tone="outline" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <InkStep label="Review" tone="outline" />
                <ArrowDown />
                <InkStep label="Recall" tone="outline" />
                <ArrowDown />
                <InkStep label="Self-assess" tone="outline" />
              </div>
            </div>
          </div>
          <Insight>
            Review transforms knowledge accumulated through reading into a
            structured cycle of exploration, recall, and self-assessment.
          </Insight>
        </section>
      </div>
    </div>
  );
}

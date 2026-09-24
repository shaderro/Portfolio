import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GrammarFocusMotion, VocabFocusMotion } from "./InlineNotesMotion";
import { ReadingMotion } from "./ReadingMotion";
import { ScaledStage } from "./ScaledStage";
import { SelectHighlightMotion } from "./SelectHighlightMotion";

const ASSETS = {
  before: {
    src: "/images/linktext/reading-experience/reading-before.png",
    w: 372,
    h: 532,
  },
  after: {
    src: "/images/linktext/reading-experience/reading-after.png",
    w: 548,
    h: 532,
  },
  empty: {
    src: "/images/linktext/reading-experience/reading-empty.png",
    w: 1113,
    h: 696,
  },
  chatTypes: {
    src: "/images/linktext/reading-experience/chat-types.png",
    w: 1198,
    h: 155,
  },
} as const;

function Frame({
  name,
  alt,
  className,
}: {
  name: keyof typeof ASSETS;
  alt: string;
  className?: string;
}) {
  const { src, w, h } = ASSETS[name];
  return (
    <div className={cn("w-full min-w-0", className)}>
      <img
        src={src}
        alt={alt}
        width={w}
        height={h}
        className="block h-auto w-full bg-white"
        style={{ maxWidth: w }}
      />
    </div>
  );
}

function MotionStage({
  width,
  height,
  children,
}: {
  width: number;
  height: number;
  children: ReactNode;
}) {
  return (
    <ScaledStage width={width} height={height}>
      {children}
    </ScaledStage>
  );
}

function Divider() {
  return <div className="h-px w-full bg-[#eaeaed]" />;
}

function QuoteRule({ children }: { children: ReactNode }) {
  return (
    <div className="w-full border-l-4 border-[var(--lt-ink)] py-3 pl-6">
      <p className="text-base font-medium leading-6 text-[#5c6378]">{children}</p>
    </div>
  );
}

function BulletBox({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-1.5 rounded-xl border border-[#e6e6e6] bg-white px-6 py-5 text-sm leading-[22px] text-[var(--lt-neutral-800)]">
      {children}
    </div>
  );
}

function TealLabel({ children }: { children: ReactNode }) {
  return <span className="font-semibold text-[var(--lt-brand-500)]">{children}</span>;
}

function FlowStep({
  label,
  tone,
}: {
  label: string;
  tone: "outline-brand" | "outline" | "solid";
}) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-lg px-3.5 py-2 text-xs leading-normal",
        tone === "outline-brand" &&
          "border border-[var(--lt-brand-400)] bg-[var(--lt-brand-50)] font-semibold text-[var(--lt-neutral-800)]",
        tone === "outline" &&
          "border border-[#eaeaed] bg-white font-medium text-[var(--lt-neutral-800)]",
        tone === "solid" &&
          "bg-[var(--lt-brand-400)] font-semibold text-white",
      )}
    >
      {label}
    </span>
  );
}

function FlowArrow() {
  return (
    <span className="shrink-0 text-sm text-[var(--lt-brand-400)]">→</span>
  );
}

export function ReadingExperiencePage() {
  return (
    <div
      className="linktext bg-white text-[var(--lt-ink)]"
      id="reading-experience"
      data-toc=""
      data-id="reading-experience"
    >
      <header className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-6 pt-16 pb-12 md:px-10 lg:px-[120px] lg:pt-[120px]">
        <div className="flex flex-col gap-2">
          <p className="text-[72px] leading-none font-black text-[#e6e6e3]">04</p>
          <h1 className="text-[36px] leading-none font-extrabold text-[var(--lt-ink)]">
            The Reading Experience
          </h1>
        </div>
        <p className="border-l-4 border-[var(--lt-ink)] py-2 pl-6 text-lg font-medium leading-7 text-[#5c6378]">
          Designing an interactive reading experience without disrupting the
          natural rhythm of reading
        </p>
      </header>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 pb-24 md:px-10 lg:px-[120px]">
        <div className="flex flex-col gap-3">
          <p className="text-[15px] leading-6 text-[var(--lt-neutral-800)]">
            LinkText is designed around a simple principle:{" "}
            <span className="font-semibold">language learning should happen within the context of reading</span><span className="font-bold">, rather than interrupting it.</span>
          </p>
          <p className="text-[15px] leading-6 text-[var(--lt-neutral-800)]">
            The reading experience therefore needs to{" "}
            <span className="font-semibold">balance two goals</span>:
          </p>
          <div className="flex flex-col gap-1.5 pl-1 text-sm leading-[22px] text-[var(--lt-neutral-800)]">
            <p>• Preserve the natural structure and rhythm of the original text</p>
            <p>• Make words, sentences, and questions directly interactive</p>
          </div>
        </div>

        <Divider />

        <section className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h2
              className="text-2xl font-extrabold text-[var(--lt-ink)]"
              id="read-select"
              data-toc=""
              data-id="read-select"
            >
              01 - Read &amp; Select
            </h2>
            <p className="text-[15px] leading-[22px] text-[#333]">
              From sentence-based UI to contextual text selection
            </p>
          </div>
          <QuoteRule>
            Users can select a word, part of a sentence, or an entire sentence
            to explore vocabulary, expressions, or sentence-level grammar.
          </QuoteRule>
          <p className="text-[15px] leading-6 text-[var(--lt-neutral-800)]">
            To keep the interaction focused,{" "}
            <span className="font-bold">selection is </span>
            <span className="font-semibold">constrained to a single sentence</span>.
          </p>
          <div className="flex flex-col gap-1.5 pl-1 text-sm leading-[22px] text-[var(--lt-neutral-800)]">
            <p>• Users can select any portion of text within one sentence</p>
            <p>• Selection cannot cross sentence boundaries</p>
            <p>• Sentence-level interaction preserves semantic context</p>
            <p>
              • Broader content or contextual questions are handled separately
              through AI
            </p>
          </div>
          <h3 className="text-lg font-bold text-[var(--lt-ink)]">
            The interaction challenge
          </h3>
          <p className="text-[15px] leading-6 text-[var(--lt-neutral-800)]">
            The system needs to communicate{" "}
            <span className="font-semibold">a hidden rule</span>:
          </p>
          <div className="flex w-full items-start gap-4 rounded-lg px-5 py-4">
            <span className="mt-0.5 h-5 w-[3px] shrink-0 rounded-[2px] bg-[var(--lt-brand-400)]" />
            <p className="text-sm font-medium leading-[22px] text-[var(--lt-neutral-800)]">
              Your selection belongs to this sentence.
            </p>
          </div>
          <p className="text-[15px] leading-6 text-[var(--lt-neutral-800)]">
            The user should understand the boundary without seeing explicit UI
            instructions or interrupting the reading experience.
          </p>
          <div className="flex w-full min-w-0 flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-10">
            <Frame
              name="before"
              alt="Before: sentence blocks breaking the paragraph"
              className="md:max-w-[372px]"
            />
            <Frame
              name="after"
              alt="After: intact paragraph with inline selection"
              className="md:max-w-[548px]"
            />
          </div>
          <div className="flex flex-col gap-8 md:flex-row md:gap-10">
            <div className="flex min-w-0 flex-1 flex-col gap-8">
              <h3 className="text-lg font-bold text-[var(--lt-ink)]">
                Before - Breaking the reading rhythm
              </h3>
              <p className="text-[15px] leading-6 text-[var(--lt-neutral-800)]">
                In the original UI, paragraphs were broken into{" "}
                <span className="font-semibold">independent sentence blocks</span>
                . Each sentence behaved like a large interactive element. The
                structure of the interface began to dominate the structure of
                the text. The paragraph{" "}
                <span className="font-bold">
                  no longer read like a continuous passage
                </span>
                .
              </p>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-8">
              <h3 className="text-lg font-bold text-[var(--lt-ink)]">
                After - Preserve the paragraph, reveal the interaction context
              </h3>
              <p className="text-[15px] leading-6 text-[var(--lt-neutral-800)]">
                The redesigned experience{" "}
                <span className="font-bold">keeps the original </span>
                <span className="font-semibold">paragraph structure intact</span>.
              </p>
            </div>
          </div>
          <p className="text-[15px] leading-6 text-[var(--lt-neutral-800)]">
            Instead of turning each sentence into a separate UI block, the
            interface uses{" "}
            <span className="font-semibold">inline selection states</span> to
            communicate sentence boundaries.
          </p>
          <BulletBox>
            <p>
              • <TealLabel>Primary highlight:</TealLabel> the user&apos;s
              selected text uses the brand green
            </p>
            <p>
              • <TealLabel>Secondary highlight:</TealLabel> the rest of the
              selected sentence receives a subtle light-gray highlight
            </p>
            <p>
              • <TealLabel>Transition:</TealLabel> the secondary highlight
              briefly shifts from gray to a lighter state when the active
              sentence changes
            </p>
          </BulletBox>
          <MotionStage width={682} height={521}>
            <SelectHighlightMotion />
          </MotionStage>
          <p className="text-[15px] leading-6 text-[var(--lt-neutral-800)]">
            This creates a{" "}
            <span className="font-semibold">lightweight visual cue</span> that
            answers “which sentence am I currently interacting with”{" "}
            <span className="font-bold">
              without breaking the paragraph into separate components
            </span>
            .
          </p>
        </section>

        <Divider />

        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <h2
                className="text-2xl font-extrabold text-[var(--lt-ink)]"
                id="ask-questions"
                data-toc=""
                data-id="ask-questions"
              >
                02 - Ask Questions
              </h2>
              <p className="text-[15px] leading-[22px] text-[#333]">
                Context-aware questions without adding friction
              </p>
            </div>
            <QuoteRule>
              Once text is selected, users can ask LinkText about it.
            </QuoteRule>
            <h3 className="text-lg font-bold text-[var(--lt-ink)]">
              Initial state - no selection
            </h3>
            <Frame
              name="empty"
              alt="Empty reading state with Learning Assistant waiting for a selection"
            />
            <p className="text-[15px] leading-6 text-[var(--lt-neutral-800)]">
              When nothing is selected:
            </p>
            <div className="flex flex-col gap-1.5 pl-1 text-sm leading-[22px] text-[var(--lt-neutral-800)]">
              <p>
                • The <span className="font-bold">send action is disabled</span>
              </p>
              <p>
                • The interface prompts the user to select the text they want to
                ask about
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold text-[var(--lt-ink)]">
              Active selection
            </h3>
            <p className="text-[15px] font-semibold leading-6 text-[var(--lt-neutral-800)]">
              When text is selected:
            </p>
            <div className="flex flex-col gap-1.5 pl-1 text-sm leading-[22px] text-[var(--lt-neutral-800)]">
              <p>
                • <span className="font-bold">Suggested questions</span> become
                available
              </p>
              <p>
                • Users can <span className="font-bold">send a question</span>
              </p>
              <p>
                • The <span className="font-bold">selected text</span> remains
                visible as the context
              </p>
            </div>
            <p className="text-[15px] leading-6 text-[var(--lt-neutral-800)]">
              The <span className="font-semibold">type of selection</span>{" "}
              determines the most relevant suggested questions.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-1.5 pl-1 text-sm leading-[22px] text-[var(--lt-neutral-800)] lg:gap-x-[115px]">
              <p>
                • <TealLabel>Word:</TealLabel> meaning, usage, pronunciation
              </p>
              <p>
                • <TealLabel>Phrase:</TealLabel> meaning, expression, usage
              </p>
              <p>
                • <TealLabel>Sentence:</TealLabel> grammar, sentence structure,
                overall meaning
              </p>
            </div>
            <Frame
              name="chatTypes"
              alt="Suggested questions for word, phrase, and sentence selections"
            />
            <MotionStage width={1198} height={875}>
              <ReadingMotion loopMode="loop" showWhisper={false} />
            </MotionStage>
          </div>
        </section>

        <Divider />

        <section className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h2
              className="text-2xl font-extrabold text-[var(--lt-ink)]"
              id="inline-notes"
              data-toc=""
              data-id="inline-notes"
            >
              03 - Inline Notes
            </h2>
            <p className="text-[15px] leading-[22px] text-[#333]">
              Turning AI answers into persistent knowledge
            </p>
          </div>
          <QuoteRule>
            AI answering the question should not be the end of the interaction.
            The knowledge should be preserved.
          </QuoteRule>
          <p className="text-[15px] leading-6 text-[var(--lt-neutral-800)]">
            When users ask about a piece of text, LinkText creates an{" "}
            <span className="font-semibold">
              inline note at the relevant position
            </span>{" "}
            in the original passage.
          </p>
          <p className="text-[15px] leading-6 text-[var(--lt-neutral-800)]">
            Users can:
          </p>
          <BulletBox>
            <p>• See a concise explanation directly in context</p>
            <p>• Revisit the explanation later</p>
            <p>• Open the note to view the complete knowledge detail</p>
          </BulletBox>
          <h3 className="text-lg font-bold text-[var(--lt-ink)]">
            From instant answers to persistent knowledge
          </h3>
          <p className="text-[15px] leading-6 text-[var(--lt-neutral-800)]">
            The redesigned experience{" "}
            <span className="font-semibold">
              separates immediate feedback from knowledge generation
            </span>
            .
          </p>
          <p className="text-[15px] leading-6 text-[var(--lt-neutral-800)]">
            The AI answer appears immediately, while the corresponding knowledge
            point is generated{" "}
            <span className="font-semibold">asynchronously in the background</span>.
          </p>
          <div className="flex w-full flex-wrap items-center justify-center gap-2 overflow-x-auto rounded-xl px-8 py-6">
            <FlowStep label="User asks a question" tone="outline-brand" />
            <FlowArrow />
            <FlowStep label="AI provides an immediate answer" tone="outline" />
            <span className="flex shrink-0 flex-col items-center leading-none">
              <span className="text-[10px] font-medium text-[var(--lt-neutral-400)]">
                async
              </span>
              <span className="text-sm text-[var(--lt-brand-400)]">──→</span>
            </span>
            <FlowStep label="Background knowledge generation" tone="outline" />
            <FlowArrow />
            <FlowStep label="Inline Note is created" tone="solid" />
            <FlowArrow />
            <FlowStep label="User is notified with a subtle cue" tone="solid" />
          </div>
          <h3 className="text-lg font-bold text-[var(--lt-ink)]">
            Inline Note behavior
          </h3>
          <p className="text-[15px] leading-6 text-[var(--lt-neutral-800)]">
            A subtle <span className="font-semibold">margin whisper</span>{" "}
            appears next to the relevant sentence when new knowledge is ready —
            low-disruption by design.
          </p>
          <MotionStage width={927} height={415}>
            <GrammarFocusMotion />
          </MotionStage>
          <MotionStage width={927} height={415}>
            <VocabFocusMotion />
          </MotionStage>
          <div className="flex w-full flex-col gap-4 rounded-xl border border-[#e6e6e6] bg-white px-6 py-5 text-sm leading-[22px] text-[var(--lt-neutral-800)]">
            <p>
              • <TealLabel>Knowledge types</TealLabel>: Vocabulary uses{" "}
              <span className="font-semibold">highlight</span>, grammar uses{" "}
              <span className="font-semibold">underline</span>, inline note{" "}
              <span className="font-semibold">
                attaches to the relevant word or sentence
              </span>
              . Users can identify the type of knowledge{" "}
              <span className="font-semibold">at a glance</span> without opening
              the full note.
            </p>
            <p>
              • <TealLabel>New note cue</TealLabel>: A small{" "}
              <span className="font-semibold">notification dot</span> appears
              near the relevant annotation with a{" "}
              <span className="font-semibold">breathing animation</span> to
              signal new knowledge. The dot{" "}
              <span className="font-semibold">clears once viewed</span>, keeping
              the interface clean.
            </p>
            <p>
              • <TealLabel>Depth control</TealLabel>: Each note title includes a{" "}
              <span className="font-semibold">→ indicator</span> linking to a
              deeper explanation. This creates a{" "}
              <span className="font-semibold">
                two-level information structure
              </span>
              :{" "}
              <span className="font-semibold">
                reading context → inline explanation → full knowledge detail
              </span>
              .
            </p>
            <p>
              • <TealLabel>User agency</TealLabel>: Users choose{" "}
              <span className="font-semibold">how deeply to engage</span> with
              the knowledge — from a quick inline glance to a complete
              explanation —{" "}
              <span className="font-semibold">
                without leaving the reading flow
              </span>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

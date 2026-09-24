import type { ReactNode } from "react";
import { WireframeOverview } from "./WireframeOverview";

const ASSETS = {
  flowArrow: {
    src: "/images/linktext/ia/flow-arrow.svg",
    w: 10,
    h: 28,
  },
  bullet: {
    src: "/images/linktext/ia/bullet.svg",
    w: 6,
    h: 14,
  },
} as const;

function QuoteRule({ children }: { children: ReactNode }) {
  return (
    <div className="w-full border-l-4 border-[var(--lt-ink)] py-2 pl-6">
      <p className="text-lg font-medium leading-normal text-[#5c6479]">
        {children}
      </p>
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-[#e6e6e6]" />;
}

function FlowArrow() {
  const { src, w, h } = ASSETS.flowArrow;
  return (
    <div className="flex h-8 w-10 shrink-0 items-center justify-center">
      <div className="relative shrink-0" style={{ width: w, height: h }}>
        <img
          src={src}
          alt=""
          width={w}
          height={h}
          className="absolute inset-0 max-w-none"
          style={{ width: w, height: h }}
        />
      </div>
    </div>
  );
}

function FlowNode({
  title,
  subtitle,
  accent = true,
  align = "left",
  className = "",
}: {
  title: string;
  subtitle?: string;
  accent?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-[#e6e6e6] bg-white p-5 ${
        accent ? "border-l-4" : ""
      } ${className}`}
    >
      <p
        className={`w-full text-[15px] font-bold leading-5 text-[var(--lt-ink)] ${
          align === "center" ? "text-center" : ""
        }`}
      >
        {title}
      </p>
      {subtitle ? (
        <p className="mt-2 w-full text-[13px] leading-[18px] text-[#333]">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function BranchLabel({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-full bg-[#f5f5f5] px-3 py-1.5">
      <p className="text-[15px] font-bold uppercase text-[var(--lt-ink)]">
        {children}
      </p>
    </div>
  );
}

function LayerBullet({ children }: { children: ReactNode }) {
  const { src, w, h } = ASSETS.bullet;
  return (
    <div className="flex w-full items-start gap-3">
      <div className="relative shrink-0" style={{ width: w, height: h }}>
        <img
          src={src}
          alt=""
          width={w}
          height={h}
          className="absolute inset-0 max-w-none"
          style={{ width: w, height: h }}
        />
      </div>
      <p className="min-w-0 flex-1 text-[15px] leading-6 text-[#333]">
        {children}
      </p>
    </div>
  );
}

function LayerCard({
  index,
  title,
  context,
  bullets,
}: {
  index: string;
  title: string;
  context: string;
  bullets: string[];
}) {
  return (
    <div className="flex w-full items-start gap-8 rounded-2xl border border-[#e6e6e6] bg-white p-8">
      <div className="flex w-16 shrink-0 justify-center">
        <p className="text-[48px] leading-none font-black text-[var(--lt-ink)]">
          {index}
        </p>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="flex flex-wrap items-baseline gap-3">
          <p className="text-xl font-extrabold text-[var(--lt-ink)]">{title}</p>
          <p className="text-sm font-semibold text-[#333]">{context}</p>
        </div>
        <div className="flex flex-col gap-2.5">
          {bullets.map((item) => (
            <LayerBullet key={item}>{item}</LayerBullet>
          ))}
        </div>
      </div>
    </div>
  );
}

export function InformationArchitecturePage() {
  return (
    <div
      className="linktext bg-white text-[var(--lt-ink)]"
      id="information-architecture"
      data-toc=""
      data-id="information-architecture"
    >
      <header className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-6 pt-16 pb-16 md:px-10 lg:px-[120px] lg:pt-[120px] lg:pb-16">
        <div className="flex flex-col gap-2">
          <p className="text-[72px] leading-none font-black text-[#e6e6e6]">
            02
          </p>
          <h2 className="text-[36px] leading-none font-extrabold text-[var(--lt-ink)]">
            UX / Information Architecture
          </h2>
        </div>
        <QuoteRule>
          Before redesigning the UI, I mapped out the core user journey and
          restructured the information architecture into three distinct layers —
          each serving a different cognitive need during the language learning
          process.
        </QuoteRule>
      </header>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 pb-[100px] md:px-10 lg:px-[120px]">
        <div className="flex flex-col gap-3">
          <h3
            className="text-2xl font-extrabold text-[var(--lt-ink)]"
            id="user-journey"
            data-toc=""
            data-id="user-journey"
          >
            User Journey Flowchart
          </h3>
          <p className="text-[15px] leading-[22px] text-[#333]">
            Tracing the split interaction models: immediate in-context assistant
            interaction (Branch A) vs. focused asynchronous learning review
            (Branch B).
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-8 rounded-[20px] border border-[#e6e6e6] bg-white p-6 md:p-10">
          <FlowNode
            title="Read Article"
            accent={false}
            align="center"
            className="w-full max-w-[300px]"
          />
          <FlowArrow />
          <div className="flex w-full flex-col items-stretch justify-center gap-10 lg:flex-row">
            <div className="flex w-full flex-col items-center gap-4 rounded-2xl border border-[#e6e6e6] bg-[#f5f5f5] p-8 lg:max-w-[440px]">
              <BranchLabel>Branch A · Reading Assistant</BranchLabel>
              <FlowNode
                title="Ask Questions, Get Instant Answers"
                subtitle="Choose suggested questions / custom questions"
                className="w-full"
              />
              <FlowArrow />
              <FlowNode
                title="View Knowledge Annotations"
                subtitle="In the Original Text"
                className="w-full"
              />
              <FlowArrow />
              <FlowNode
                title="Continue Reading"
                subtitle="Return to original text"
                className="w-full"
              />
            </div>
            <div className="flex w-full flex-col items-center gap-4 rounded-2xl border border-[#e6e6e6] bg-[#f5f5f5] p-8 lg:max-w-[440px]">
              <BranchLabel>Branch B · Retrospective Review</BranchLabel>
              <FlowNode
                title="Vocabulary / Expressions Review"
                subtitle="Grammar knowledge & context analysis"
                className="w-full"
              />
              <FlowArrow />
              <div className="flex w-full gap-4">
                <FlowNode
                  title="View Knowledge Details"
                  subtitle="Knowledge detail page"
                  className="min-w-0 flex-1"
                />
                <FlowNode
                  title="Flashcard Self-Test"
                  subtitle="Knowledge flashcards"
                  className="min-w-0 flex-1"
                />
              </div>
              <FlowArrow />
              <FlowNode
                title="View Example Sentences"
                subtitle="Knowledge detail page with reference context"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-[120px]">
        <Divider />
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 pt-[100px] pb-[120px] md:px-10 lg:px-[120px]">
        <div className="flex flex-col gap-3">
          <h3
            className="text-2xl font-extrabold text-[var(--lt-ink)]"
            id="knowledge-system"
            data-toc=""
            data-id="knowledge-system"
          >
            Structured Knowledge System — Three Layers of Information
          </h3>
          <p className="text-[15px] leading-[22px] text-[#333]">
            To bridge spontaneous assistant chat with permanent memory
            consolidation, generated answers are digested incrementally into
            three levels of access.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <LayerCard
            index="1"
            title="Chatbot Instant Q&A"
            context="(Reading Page)"
            bullets={[
              "Real-time response addressing direct inquiries.",
              "Quote the original text, ask context-dependent questions, and get precise, contextualized answers.",
            ]}
          />
          <LayerCard
            index="2"
            title="Knowledge Annotations"
            context="(Reading Page)"
            bullets={[
              "Asynchronous generation running quietly in the background.",
              "Summarizes the question content and creates concise, interactive annotations mapped to original sentences.",
              "When reopening the original text, you can quickly hover or click annotations to review your previous queries.",
            ]}
          />
          <LayerCard
            index="3"
            title="Knowledge Details & Flashcards"
            context="(Standalone Page)"
            bullets={[
              "Asynchronous compilation into your permanent vocabulary system.",
              "Summarizes assistant feedback, mapping key rules, grammar frameworks, and rich definitions.",
              "Collects all example sentences discovered during reading sessions, dynamically hyperlinking back to the source text.",
              "Flashcard mode: integrated spaced-repetition system for rapid self-testing, review, and retention.",
            ]}
          />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-[120px]">
        <Divider />
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-6 py-16 md:px-10 lg:px-[100px] lg:py-16">
        <h3
          className="text-[28px] leading-9 font-bold tracking-[-0.3px] text-[var(--lt-ink)]"
          id="wireframe-overview"
          data-toc=""
          data-id="wireframe-overview"
        >
          Wireframe Overview
        </h3>
        <p className="text-base leading-[26px] text-[#545454]">
          Low-fidelity wireframes mapping out core user flows - from landing page
          through reading, knowledge review, to flashcard self-testing. Each
          screen defines content hierarchy and interaction patterns before visual
          design.
        </p>
        <WireframeOverview />
      </div>
    </div>
  );
}

import type { ReactNode } from "react";
import { ArticleScrollMotion } from "./ArticleScrollMotion";

const ASSETS = {
  hero: {
    src: "/images/linktext/mobile/contextual/hero-devices.png",
    w: 1071,
    h: 542,
  },
  arrow: "/images/linktext/mobile/contextual/arrow-right.svg",
  volume: "/images/linktext/mobile/contextual/volume.svg",
  volume2: "/images/linktext/mobile/contextual/volume-2.svg",
  message: "/images/linktext/mobile/contextual/message-square.svg",
  message2: "/images/linktext/mobile/contextual/message-square-2.svg",
  messageIcon: "/images/linktext/mobile/contextual/message-icon.svg",
  close: "/images/linktext/mobile/contextual/icon-x.svg",
  close2: "/images/linktext/mobile/contextual/icon-x-2.svg",
  closeButton: "/images/linktext/mobile/contextual/close-button.svg",
  xCircle: "/images/linktext/mobile/contextual/icon-x-circle.svg",
  check: "/images/linktext/mobile/contextual/icon-check.svg",
  check2: "/images/linktext/mobile/contextual/icon-check-2.svg",
  speaker: "/images/linktext/mobile/contextual/speaker.svg",
  spinner: "/images/linktext/mobile/contextual/spinner.svg",
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

function FlowNode({ children }: { children: string }) {
  return (
    <div className="rounded border border-[#e6e6e6] bg-white px-3 py-2 text-sm font-semibold whitespace-nowrap text-[var(--lt-ink)]">
      {children}
    </div>
  );
}

function FlowArrow() {
  return (
    <img
      src={ASSETS.arrow}
      alt=""
      width={16}
      height={16}
      className="block size-4 shrink-0"
    />
  );
}

function FlowRow({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-8">
          {index > 0 ? <FlowArrow /> : null}
          <FlowNode>{step}</FlowNode>
        </div>
      ))}
    </div>
  );
}

function Chip({
  children,
  selected = false,
  check = false,
}: {
  children: string;
  selected?: boolean;
  check?: false | "check" | "check2";
}) {
  return (
    <div
      className={
        selected
          ? "flex items-center gap-1.5 rounded-lg border border-[#2db9a0] bg-[#eaf9f6] px-2.5 py-1.5"
          : "flex items-center gap-1.5 rounded-lg border border-[#eaeaed] bg-white px-2.5 py-1.5"
      }
    >
      {check === "check" ? <Glyph src={ASSETS.check} size={14} /> : null}
      {check === "check2" ? <Glyph src={ASSETS.check2} size={14} /> : null}
      <span
        className={
          selected
            ? "text-xs font-semibold text-[#229a85]"
            : "text-xs text-[#4b4b5a]"
        }
      >
        {children}
      </span>
    </div>
  );
}

function CardShell({
  children,
  padded = false,
  mutedBorder = false,
}: {
  children: ReactNode;
  padded?: boolean;
  mutedBorder?: boolean;
}) {
  return (
    <div
      className={
        padded
          ? "flex w-[360px] flex-col gap-4 rounded-xl border border-[#eaeaed] bg-white p-5 shadow-[0_1px_1.5px_rgba(0,0,0,0.06),0_4px_10px_rgba(0,0,0,0.07)]"
          : mutedBorder
            ? "flex w-[360px] flex-col gap-4 rounded-xl border border-[#f4f4f6] bg-white p-5 shadow-[0_1px_1.5px_rgba(0,0,0,0.06),0_4px_10px_rgba(0,0,0,0.07)]"
            : "flex w-[360px] flex-col gap-3 rounded-xl border border-[#eaeaed] bg-white p-4 shadow-[0_1px_1.5px_rgba(0,0,0,0.06),0_4px_10px_rgba(0,0,0,0.07)]"
      }
    >
      {children}
    </div>
  );
}

function StateBlock({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xs font-semibold tracking-[0.6px] text-[#666673] uppercase">
        {label}
      </p>
      {children}
    </div>
  );
}

export function MobileContextualReadingPage() {
  return (
    <div
      className="linktext bg-white text-[var(--lt-ink)]"
      id="contextual-reading"
      data-toc=""
      data-id="contextual-reading"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-6 pt-16 pb-16 md:px-10 lg:px-[120px] lg:pt-[100px] lg:pb-[120px]">
        <header className="flex w-full flex-col gap-6">
          <p className="text-sm font-extrabold tracking-[3px] text-[var(--lt-ink)] uppercase">
            01 — Contextual Reading
          </p>
          <div className="h-[2px] w-full bg-[var(--lt-ink)]" />
        </header>

        <h2 className="max-w-[400px] text-[32px] leading-[42px] font-extrabold text-[var(--lt-ink)] md:text-[36px]">
          From a separate Assistant to inline AI
        </h2>

        <div className="flex w-full justify-center py-[76px]">
          <img
            src={ASSETS.hero.src}
            alt="Desktop reading with a separate Assistant panel, compared with the focused mobile reading screen"
            width={ASSETS.hero.w}
            height={ASSETS.hero.h}
            className="block h-auto w-full"
            style={{ maxWidth: ASSETS.hero.w }}
          />
        </div>

        <p className="text-lg leading-7 text-[#333]">
          On web, Read and Assistant are separated into two dedicated areas.
          This works well on a larger screen, but creates unnecessary context
          switching on mobile.
        </p>

        <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-[34px]">
          <div className="flex max-w-[499px] flex-col gap-2">
            <p className="text-xs font-bold tracking-[1px] text-[#9898a6] uppercase">
              WEB EXPERIENCE — Read + Assistant
            </p>
            <p className="text-sm text-[#333]">
              Show the original desktop experience side by side: Read |
              Assistant Highlight the movement between the reading area and
              Assistant.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold tracking-[1px] text-[#9898a6] uppercase">
              MOBILE PROTOTYPE — Progressive Inline Card
            </p>
            <p className="text-sm text-[#333]">
              Show the interaction: Select text → Actions appear → Select action
              → Inline card expands
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-3 rounded-lg bg-white p-4">
            <p className="text-xs font-bold tracking-[1px] text-[#9898a6] uppercase">
              Web
            </p>
            <FlowRow
              steps={["Read", "Open Assistant", "Ask", "Return to reading"]}
            />
          </div>
          <div className="flex flex-col gap-3 rounded-lg bg-white p-4">
            <p className="text-xs font-bold tracking-[1px] text-[var(--lt-ink)] uppercase">
              Mobile
            </p>
            <FlowRow
              steps={[
                "Select",
                "Reveal relevant actions",
                "Expand",
                "Continue reading",
              ]}
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-[60px] bg-gradient-to-b from-white via-[#f5f5f5] to-white py-[30px]">
          <div className="flex w-full max-w-[859px] flex-col gap-[22px] overflow-hidden rounded-2xl p-6 lg:p-10">
            <p className="text-xl font-semibold text-[#1a1a1f]">
              Inline Card - All States
            </p>
            <div className="grid grid-cols-1 gap-y-[18px] md:grid-cols-2">
              <StateBlock label="1. Collapsed">
                <CardShell>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center gap-1.5 rounded-lg border border-[#eaeaed] bg-white py-1.5 pr-3.5 pl-3">
                        <Glyph src={ASSETS.volume} size={14} />
                        <span className="text-xs text-[#229a85]">Listen</span>
                      </div>
                      <div className="flex items-center justify-center rounded-lg border border-[#eaeaed] bg-white py-1.5 pr-3.5 pl-3">
                        <span className="text-xs text-[#229a85]">
                          Translation
                        </span>
                      </div>
                    </div>
                    <div className="flex size-7 items-center justify-center">
                      <Glyph src={ASSETS.close} size={14} />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Glyph src={ASSETS.message} size={16} />
                    <span className="text-xs text-[#4b4b5a]">Ask AI</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Chip>Meaning in context?</Chip>
                    <Chip selected check="check">
                      Grammatical role?
                    </Chip>
                  </div>
                </CardShell>
              </StateBlock>

              <StateBlock label="2. Expanded">
                <CardShell>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center gap-1.5 rounded-lg border border-[#eaeaed] bg-white py-1.5 pr-3.5 pl-3">
                        <Glyph src={ASSETS.volume2} size={14} />
                        <span className="text-xs text-[#229a85]">Listen</span>
                      </div>
                      <div className="flex items-center justify-center rounded-lg border border-[#229a85] bg-[#eaf9f6] py-1.5 pr-3.5 pl-3">
                        <span className="text-xs text-[#229a85]">
                          Translation
                        </span>
                      </div>
                    </div>
                    <div className="flex size-7 items-center justify-center">
                      <Glyph src={ASSETS.close2} size={14} />
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-1.5 rounded-xl bg-[#f4f4f6] p-4 text-xs">
                    <p className="text-[#1a1a2a]">
                      (Mock translation) English meaning of &quot;könnten&quot;
                    </p>
                    <p className="text-[#717182]">Auto translation</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Glyph src={ASSETS.message2} size={16} />
                    <span className="text-xs text-[#4b4b5a]">Ask AI</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Chip>Meaning in context?</Chip>
                    <Chip selected check="check">
                      Grammatical role?
                    </Chip>
                  </div>
                </CardShell>
              </StateBlock>

              <StateBlock label="3. AI Note">
                <CardShell padded>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center gap-2 rounded-lg border border-[#eaeaed] bg-white py-2 pr-4 pl-3.5">
                        <Glyph src={ASSETS.speaker} size={14} />
                        <span className="text-xs text-[#229a85]">Listen</span>
                      </div>
                      <div className="flex items-center justify-center rounded-lg border border-[#229a85] bg-[#eaf9f6] py-2 pr-4 pl-3.5">
                        <span className="text-xs text-[#229a85]">
                          Translation
                        </span>
                      </div>
                    </div>
                    <Glyph src={ASSETS.closeButton} size={32} />
                  </div>
                  <div className="flex w-full flex-col gap-2 rounded-2xl bg-[#f4f4f6] p-4 text-xs">
                    <p className="text-[#1a1a2a]">
                      (Mock translation) English meaning of &quot;könnten&quot;
                    </p>
                    <p className="text-[#717182]">Auto translation</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Glyph src={ASSETS.messageIcon} size={16} />
                    <span className="text-xs text-[#4b4b5a]">Ask AI</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Chip>Meaning in context?</Chip>
                    <Chip selected check="check2">
                      Grammatical role?
                    </Chip>
                  </div>
                  <div className="flex w-full flex-col gap-2.5 rounded-2xl border border-[#fafafa] bg-[#fafafa] p-4 text-xs">
                    <p className="text-[#1a1a2a]">[Grammatical role?]</p>
                    <p className="text-[#4b4b5a]">
                      About &quot;könnten&quot;: this is a sample AI answer. In
                      the real app, a detailed AI analysis of the word appears
                      here.
                    </p>
                  </div>
                </CardShell>
              </StateBlock>

              <StateBlock label="4. Generating">
                <CardShell padded mutedBorder>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center gap-2 rounded-lg border border-[#eaeaed] bg-white py-2 pr-4 pl-3.5">
                        <Glyph src={ASSETS.volume2} size={14} />
                        <span className="text-xs text-[#229a85]">Listen</span>
                      </div>
                      <div className="flex items-center justify-center rounded-lg border border-[#229a85] bg-[#eaf9f6] py-2 pr-4 pl-3.5">
                        <span className="text-xs text-[#229a85]">
                          Translation
                        </span>
                      </div>
                    </div>
                    <div className="flex size-8 items-center justify-center rounded-full">
                      <Glyph src={ASSETS.xCircle} size={14} />
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-2 rounded-2xl bg-[#f4f4f6] p-4 text-xs">
                    <p className="text-[#1a1a2a]">
                      (Mock translation) English meaning of &quot;könnten&quot;
                    </p>
                    <p className="text-[#717182]">Auto translation</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Glyph src={ASSETS.message2} size={16} />
                    <span className="text-xs text-[#4b4b5a]">Ask AI</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Chip selected>Meaning in context?</Chip>
                    <Chip selected check="check">
                      Grammatical role?
                    </Chip>
                  </div>
                  <div className="flex w-full flex-col gap-3 rounded-2xl border border-[#fafafa] bg-[#fafafa] p-4">
                    <p className="text-xs text-[#1a1a2a]">
                      [What does it mean here?]
                    </p>
                    <div className="flex items-center gap-2.5">
                      <img
                        src={ASSETS.spinner}
                        alt=""
                        width={26}
                        height={6}
                        className="block h-[6px] w-[26px] max-w-none shrink-0"
                      />
                      <p className="text-xs text-[#4b4b5a] italic">
                        Generating answer...
                      </p>
                    </div>
                  </div>
                </CardShell>
              </StateBlock>
            </div>
          </div>

          <ArticleScrollMotion />
        </div>
      </div>
    </div>
  );
}

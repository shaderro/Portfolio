import type { ReactNode } from "react";

const ASSETS = {
  hero: {
    src: "/images/linktext/cover/hero.png",
    w: 4056,
    h: 2584,
  },
  beforeReading: {
    src: "/images/linktext/cover/before-reading.png",
    w: 2560,
    h: 1380,
  },
  beforeReview: {
    src: "/images/linktext/cover/before-review.png",
    w: 2560,
    h: 1380,
  },
} as const;

function QuoteRule({ children }: { children: ReactNode }) {
  return (
    <div className="w-full border-l-4 border-[var(--lt-ink)] py-2 pl-6">
      <p className="text-lg font-medium leading-[1.6] text-[#333]">{children}</p>
    </div>
  );
}

function CroppedShot({
  src,
  alt,
  width,
  height,
  crop,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  crop: { width: string; height: string; top: string; left: string };
}) {
  return (
    <div className="relative aspect-[760/385] w-full min-h-0 min-w-0 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="absolute max-w-none"
          style={{
            width: crop.width,
            height: crop.height,
            top: crop.top,
            left: crop.left,
          }}
        />
      </div>
    </div>
  );
}

function AuditList({ items }: { items: string[] }) {
  return (
    <div className="flex w-full items-center justify-center p-2 lg:w-[376px] lg:shrink-0">
      <ul className="w-full list-disc pl-[27px] text-lg leading-7 text-[var(--lt-ink)]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function AuditRow({ children }: { children: ReactNode }) {
  return (
    <div className="grid w-full max-w-[1144px] grid-cols-1 items-center gap-2 lg:grid-cols-[minmax(0,760px)_376px] lg:items-stretch">
      {children}
    </div>
  );
}

function ProblemCard({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4 self-stretch rounded-lg border border-[#e6e6e6] bg-white p-6">
      <p className="text-2xl font-extrabold text-[var(--lt-ink)]">{index}</p>
      <div className="flex flex-col gap-2">
        <p className="text-lg font-bold text-[var(--lt-ink)]">{title}</p>
        <p className="text-sm leading-normal text-[#333]">{body}</p>
      </div>
    </div>
  );
}

export function Case01CoverPage() {
  return (
    <div className="linktext bg-white text-[var(--lt-ink)]">
      <section
        className="border-b border-[#e6e6e6] bg-white"
        id="opening"
        data-toc=""
        data-id="opening"
      >
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-6 pt-16 pb-16 md:px-10 lg:gap-6 lg:px-[100px] lg:pt-[120px] lg:pb-24">
          <p className="text-sm font-extrabold uppercase text-[var(--lt-ink)]">
            CASE 01
          </p>
          <h1 className="text-[36px] leading-[1.1] font-extrabold text-[var(--lt-ink)] md:text-[56px]">
            From Vibe Coding to Design System & Redesign
          </h1>
          <p className="text-xl font-medium leading-[1.4] text-[#333] md:text-2xl">
            LinkText — Interactive Reading for Language Learning
          </p>
          <div className="w-full min-w-0">
            <img
              src={ASSETS.hero.src}
              alt="LinkText product screens after redesign, overlapping on a light background"
              width={ASSETS.hero.w}
              height={ASSETS.hero.h}
              className="block h-auto w-full"
              style={{ maxWidth: ASSETS.hero.w }}
            />
          </div>
        </div>
      </section>

      <section
        className="bg-white"
        id="starting-point"
        data-toc=""
        data-id="starting-point"
      >
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 pt-16 pb-[120px] md:px-10 lg:gap-16 lg:px-[100px] lg:pt-[100px]">
          <div className="flex flex-col gap-3">
            <p className="text-[72px] leading-[0.8] font-black text-[#e5e5e3]">
              01
            </p>
            <h2 className="text-[36px] leading-none font-extrabold text-[#0b132b]">
              The Starting Point — Vibe-Coded UI
            </h2>
          </div>

          <QuoteRule>
            The initial product was built rapidly through AI-assisted vibe
            coding. It validated the core product idea, but the UI lacked
            consistency, hierarchy, and a scalable visual system.
          </QuoteRule>

          <div className="flex w-full flex-col gap-8 rounded-xl md:p-12">
            <AuditRow>
              <CroppedShot
                src={ASSETS.beforeReading.src}
                alt="Early vibe-coded reading interface with quote, chat, and controls"
                width={ASSETS.beforeReading.w}
                height={ASSETS.beforeReading.h}
                crop={{
                  width: "100.82%",
                  height: "107.26%",
                  top: "-7.24%",
                  left: "0",
                }}
              />
              <AuditList
                items={[
                  "Gray background area too large",
                  "Controls (toggle, play, back, send) not unified in color/style",
                  "No need for message timestamps",
                  "AI message gray background not suitable for long-form reading",
                  '"Quote" label unnecessary',
                  "Quote-related visuals not color-consistent (selection area, bottom bar, suggested prompts)",
                ]}
              />
            </AuditRow>
            <AuditRow>
              <CroppedShot
                src={ASSETS.beforeReview.src}
                alt="Early vibe-coded review list with weak hierarchy and no width adaptation"
                width={ASSETS.beforeReview.w}
                height={ASSETS.beforeReview.h}
                crop={{
                  width: "100.95%",
                  height: "107.46%",
                  top: "-7.46%",
                  left: "-0.01%",
                }}
              />
              <AuditList
                items={[
                  "Not adapted to different screen widths",
                  "No distinct visual differentiation between states",
                  "The entire page is pure white, feels fatiguing, No clear hierarchy",
                ]}
              />
            </AuditRow>
          </div>

          <div className="flex flex-col gap-8">
            <h3 className="text-2xl font-extrabold text-[var(--lt-ink)]">
              Key Problems Identified
            </h3>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6 md:flex-row">
                <ProblemCard
                  index="01"
                  title="Inconsistent Spacing & Layout"
                  body="Elements lacked a unified spacing system, creating visual tension and unpredictable layouts across screens."
                />
                <ProblemCard
                  index="02"
                  title="Weak Visual Hierarchy"
                  body="No clear typographic scale or color hierarchy to guide users through content and actions."
                />
              </div>
              <div className="flex flex-col gap-6 md:flex-row">
                <ProblemCard
                  index="03"
                  title="Fragmented Reading Experience"
                  body="The reading interface, vocabulary review, and learning assistant felt disconnected — different visual languages across modules."
                />
                <ProblemCard
                  index="04"
                  title="No Reusable Components"
                  body="Repeated UI patterns were hard-coded individually, making iteration slow and visual consistency impossible to maintain."
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

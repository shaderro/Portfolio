import type { ReactNode } from "react";

function GrayBar({ className }: { className?: string }) {
  return <div className={`h-1.5 rounded-sm bg-[#e5e5ea] ${className ?? ""}`} />;
}

function WfNav() {
  return (
    <div className="flex h-8 shrink-0 items-center gap-1.5 border-b border-[#eaeaed] bg-white px-2.5">
      <p className="text-[11px] font-extrabold text-[#1a1a2a]">L | LinkText</p>
      <div className="flex gap-2.5 pl-1.5 text-[9px] text-[#4d4d4d]">
        <span>Reading</span>
        <span>Insights</span>
      </div>
      <div className="min-w-0 flex-1" />
      <div className="flex items-center gap-1">
        <span className="flex size-3.5 items-center justify-center rounded-[3px] border border-[#eaeaed] bg-[#f4f4f6] text-[6px] font-bold text-[#8e8e93]">
          EN
        </span>
        <span className="rounded px-1 py-px text-[8px] font-bold text-[#1a1a2a] bg-[#f4f4f6]">
          120
        </span>
      </div>
    </div>
  );
}

function Screen({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[248px] w-full flex-col overflow-hidden rounded-md border border-[#eaeaed] bg-white">
      {children}
    </div>
  );
}

function Card({
  title,
  caption,
  children,
}: {
  title: string;
  caption: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2.5">
      <p className="text-[13px] font-bold text-[#1a1a2a]">{title}</p>
      {children}
      <p className="pt-1 text-[12px] leading-[18px] text-[#1a1a2a]">{caption}</p>
    </div>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-[#f4f4f6] px-1 py-px text-[8px] text-[#8e8e93]">
      {children}
    </span>
  );
}

function Landing() {
  return (
    <Screen>
      <WfNav />
      <div className="flex flex-col gap-2.5 p-2.5">
        <div className="flex flex-col gap-1">
          <p className="text-[15px] font-extrabold text-[#1a1a2a]">
            Welcome back, Learner
          </p>
          <GrayBar className="w-[88px]" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <p className="text-[11px] font-bold text-[#1a1a2a]">Recent Articles</p>
            <span className="rounded bg-[#d1d1d6] px-1 text-[8px] font-bold text-[#333]">
              3
            </span>
          </div>
          <p className="text-[10px] font-semibold text-[#8e8e93]">View all →</p>
        </div>
        <div className="flex gap-1.5">
          <div className="flex min-w-0 flex-1 flex-col gap-1 rounded border border-[#eaeaed] p-1.5">
            <p className="truncate text-[10px] font-bold text-[#1a1a2a]">
              Le Petit Prince
            </p>
            <div className="flex items-center gap-1">
              <Pill>A2</Pill>
              <span className="text-[8px] text-[#8e8e93]">450 words</span>
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1 rounded border border-[#eaeaed] p-1.5">
            <p className="truncate text-[10px] font-bold text-[#1a1a2a]">
              L&apos;Étranger - Ch. 1
            </p>
            <div className="flex items-center gap-1">
              <Pill>B2</Pill>
              <span className="text-[8px] text-[#8e8e93]">820 words</span>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}

function Library() {
  return (
    <Screen>
      <WfNav />
      <div className="flex flex-col gap-2.5 p-2.5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[15px] font-extrabold text-[#1a1a2a]">Your Library</p>
            <p className="text-[9px] text-[#8e8e93]">14 active articles</p>
          </div>
          <span className="rounded bg-[#1a1a2a] px-1.5 py-1 text-[9px] font-bold text-white">
            + Add Article
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          {[
            ["La Dernière Classe", "B1", "640w"],
            ["Les Misérables (Extract)", "C1", "1,200w"],
          ].map(([name, level, words]) => (
            <div
              key={name}
              className="flex flex-col gap-1 rounded border border-[#eaeaed] p-1.5"
            >
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold text-[#1a1a2a]">{name}</p>
                <div className="flex items-center gap-1">
                  <Pill>{level}</Pill>
                  <span className="text-[8px] text-[#8e8e93]">{words}</span>
                </div>
              </div>
              <GrayBar className="w-full" />
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}

function ReadingView() {
  return (
    <Screen>
      <WfNav />
      <div className="flex min-h-0 flex-1 flex-col gap-1.5 p-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-[9px] font-bold text-[#1a1a2a]">← Back</span>
            <span className="text-[11px] font-extrabold text-[#1a1a2a]">
              Le Petit Prince
            </span>
          </div>
          <span className="text-[9px] text-[#8e8e93]">450 words</span>
        </div>
        <div className="flex min-h-0 flex-1 gap-2.5">
          <div className="flex w-[55%] flex-col gap-1">
            <GrayBar className="w-full" />
            <div className="flex items-center gap-1">
              <GrayBar className="w-[70%]" />
              <span className="rounded bg-[#1a1a2a] px-1 py-px text-[8px] font-bold text-white">
                note
              </span>
            </div>
            <GrayBar className="w-full" />
            <GrayBar className="w-[80%]" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1 rounded border border-[#eaeaed] bg-[#f4f4f6] p-1.5">
            <p className="text-[10px] font-bold text-[#1a1a2a]">Word Lookup</p>
            <p className="text-[8px] text-[#8e8e93]">Click any word to look it up</p>
            <div className="h-px w-full bg-[#eaeaed]" />
            <GrayBar className="w-12" />
            <GrayBar className="w-full" />
          </div>
        </div>
      </div>
    </Screen>
  );
}

function Upload() {
  return (
    <Screen>
      <WfNav />
      <div className="flex flex-col gap-1.5 p-2.5">
        <div className="flex items-center gap-1">
          <span className="text-[9px] font-bold text-[#1a1a2a]">← Back</span>
          <span className="text-[11px] font-extrabold text-[#1a1a2a]">
            Upload New Article
          </span>
        </div>
        <p className="text-[9px] font-bold text-[#1a1a2a]">Sentence splitting mode</p>
        <div className="flex gap-1.5 text-[8px]">
          <span className="flex items-center gap-1 text-[#1a1a2a]">
            <span className="size-2 rounded-sm border border-[#eaeaed] bg-[#f4f4f6]" />
            By punctuation
          </span>
          <span className="flex items-center gap-1 text-[#8e8e93]">
            <span className="size-2 rounded-sm border border-[#eaeaed] bg-[#f4f4f6]" />
            By line
          </span>
        </div>
        <p className="text-[9px] font-bold text-[#1a1a2a]">Upload via URL</p>
        <div className="rounded border border-[#eaeaed] px-1.5 py-1 text-[8px] text-[#8e8e93]">
          https://example.com/french-article
        </div>
        <div className="rounded bg-[#1a1a2a] py-1.5 text-center text-[9px] font-bold text-white">
          Parse & Import
        </div>
      </div>
    </Screen>
  );
}

function KnowledgeList() {
  return (
    <Screen>
      <WfNav />
      <div className="flex flex-col gap-1.5 p-2.5">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-extrabold text-[#1a1a2a]">Knowledge</p>
          <span className="rounded bg-[#1a1a2a] px-1.5 py-1 text-[9px] font-bold text-white">
            Review (14)
          </span>
        </div>
        <div className="flex gap-1">
          <span className="min-w-0 flex-1 rounded border border-[#eaeaed] px-1.5 py-0.5 text-[8px] text-[#8e8e93]">
            Status: All
          </span>
          <span className="min-w-0 flex-1 rounded border border-[#eaeaed] px-1.5 py-0.5 text-[8px] text-[#8e8e93]">
            Sort: Newest
          </span>
        </div>
        {[
          ["apprivoiser", "to tame, domesticate"],
          ["crépuscule", "twilight, dusk"],
        ].map(([word, meaning]) => (
          <div
            key={word}
            className="flex items-center justify-between rounded border border-[#eaeaed] p-1.5"
          >
            <div>
              <p className="text-[10px] font-bold text-[#1a1a2a]">{word}</p>
              <p className="text-[8px] text-[#8e8e93]">{meaning}</p>
            </div>
            <span className="flex size-3 items-center justify-center rounded-sm border border-[#eaeaed] bg-[#f4f4f6] text-[7px] font-bold text-[#8e8e93]">
              L
            </span>
          </div>
        ))}
      </div>
    </Screen>
  );
}

function KnowledgeDetail() {
  return (
    <Screen>
      <WfNav />
      <div className="flex flex-col gap-1.5 p-2.5">
        <div className="flex items-center justify-between text-[9px]">
          <span className="font-bold text-[#1a1a2a]">← Back</span>
          <span className="text-[#8e8e93]">12 / 24</span>
        </div>
        <p className="text-lg font-extrabold text-[#1a1a2a]">apprivoiser</p>
        <p className="text-[9px] font-semibold text-[#8e8e93]">
          transitive verb • A2 level
        </p>
        <div className="h-px w-full bg-[#eaeaed]" />
        <p className="text-[10px] font-bold text-[#1a1a2a]">Definition</p>
        <p className="text-[9px] text-[#8e8e93]">
          To tame, to make familiar, or to domesticate a wild animal.
        </p>
        <p className="text-[10px] font-bold text-[#1a1a2a]">Word features</p>
        <div className="flex gap-1">
          <span className="rounded bg-[#f4f4f6] px-1.5 py-px text-[8px] text-[#1a1a2a]">
            regular -er
          </span>
          <span className="rounded bg-[#f4f4f6] px-1.5 py-px text-[8px] text-[#1a1a2a]">
            synonym: dompter
          </span>
        </div>
      </div>
    </Screen>
  );
}

function ReviewFront() {
  return (
    <Screen>
      <div className="flex h-full flex-col gap-2.5 p-2.5">
        <div className="flex items-center justify-between text-[9px] text-[#8e8e93]">
          <span>Review Mode</span>
          <span>3 / 14 words</span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-md border border-[#1a1a2a] px-3">
          <p className="text-[22px] font-extrabold text-[#1a1a2a]">apprivoiser</p>
          <p className="text-[9px] text-[#8e8e93]">verb</p>
          <p className="text-center text-[9px] text-[#1a1a2a]">
            Si tu m&apos; <span className="font-bold">apprivoises</span> , nous
            aurons besoin l&apos;un de l&apos;autre.
          </p>
        </div>
        <p className="text-center text-[10px] font-bold text-[#8e8e93]">
          Tap card to reveal definition
        </p>
      </div>
    </Screen>
  );
}

function ReviewBack() {
  return (
    <Screen>
      <div className="flex h-full flex-col gap-2 p-2.5">
        <div className="flex items-center justify-between text-[9px] text-[#8e8e93]">
          <span>Review Mode</span>
          <span>3 / 14 words</span>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-1.5 rounded-md border border-[#1a1a2a] px-3">
          <p className="text-lg font-extrabold text-[#1a1a2a]">apprivoiser</p>
          <p className="text-[11px] font-bold text-[#1a1a2a]">
            to tame / domesticate
          </p>
          <div className="h-px w-16 bg-[#eaeaed]" />
          <p className="text-center text-[8px] text-[#8e8e93]">
            Si tu m&apos;apprivoises, nous aurons besoin...
          </p>
        </div>
        <div className="flex gap-1.5">
          <span className="flex-1 rounded border border-[#1a1a2a] py-1 text-center text-[9px] font-bold text-[#1a1a2a]">
            Don&apos;t know
          </span>
          <span className="flex-1 rounded bg-[#1a1a2a] py-1 text-center text-[9px] font-bold text-white">
            Know it ✓
          </span>
        </div>
        <p className="text-center text-[8px] text-[#8e8e93]">
          Studying from HP1 • 14 words left
        </p>
      </div>
    </Screen>
  );
}

export function WireframeOverview() {
  return (
    <div className="grid w-full grid-cols-1 gap-x-11 gap-y-9 sm:grid-cols-2 xl:grid-cols-4">
      <Card
        title="1. Landing Page"
        caption="Landing Page - Personalized dashboard showing recent reading activity. Entry point to all features."
      >
        <Landing />
      </Card>
      <Card
        title="2. Library"
        caption="Library - Full article collection. Users can browse, search, and add new articles for study."
      >
        <Library />
      </Card>
      <Card
        title="3. Reading View"
        caption="Reading View - Immersive reader with inline word lookup. Tap any word to see definition in right panel. Supports grammar & knowledge inline notes."
      >
        <ReadingView />
      </Card>
      <Card
        title="4. Upload Article"
        caption="Upload Article - Content import form. Supports URL fetch and configurable sentence segmentation for different text types."
      >
        <Upload />
      </Card>
      <Card
        title="5. Knowledge List"
        caption="Knowledge List - All saved words with filters by status, source article, and sort order. Leads to review mode."
      >
        <KnowledgeList />
      </Card>
      <Card
        title="6. Knowledge Detail"
        caption="Knowledge Detail (Full) - Expanded word card with definition, grammatical features, and usage context."
      >
        <KnowledgeDetail />
      </Card>
      <Card
        title="7. Review Card - Front"
        caption="Review Card (Front) - Flashcard front showing word in context. User recalls meaning before flipping."
      >
        <ReviewFront />
      </Card>
      <Card
        title="8. Review Card - Back"
        caption="Review Card (Back) - Flashcard back with self-assessment. Spaced repetition drives review scheduling."
      >
        <ReviewBack />
      </Card>
    </div>
  );
}

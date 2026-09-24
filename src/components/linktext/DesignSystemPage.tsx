import type { ReactNode } from "react";
import { ReviewCard } from "./ReviewCard";
import {
  ArticleCard,
  FilterSelect,
  InlineNote,
  MetadataRow,
  NavButton,
  TextInput,
  TopNav,
  WordCard,
} from "./product";

const BRAND_SWATCHES = [
  { step: "50", hex: "#EAF9F6", token: "--lt-brand-50" },
  { step: "100", hex: "#C2EFE7", token: "--lt-brand-100" },
  { step: "200", hex: "#85DDD0", token: "--lt-brand-200" },
  { step: "300", hex: "#42C9B6", token: "--lt-brand-300" },
  { step: "400", hex: "#2DB9A0", token: "--lt-brand-400" },
  { step: "500", hex: "#229A85", token: "--lt-brand-500" },
  { step: "600", hex: "#197A6A", token: "--lt-brand-600" },
  { step: "700", hex: "#115B50", token: "--lt-brand-700" },
  { step: "800", hex: "#0B3D36", token: "--lt-brand-800" },
  { step: "900", hex: "#062019", token: "--lt-brand-900" },
] as const;

const NEUTRAL_SWATCHES = [
  { step: "50", hex: "#FAFAFA", token: "--lt-neutral-50" },
  { step: "100", hex: "#F4F4F6", token: "--lt-neutral-100" },
  { step: "200", hex: "#EAEAED", token: "--lt-neutral-200" },
  { step: "300", hex: "#D1D1D8", token: "--lt-neutral-300" },
  { step: "400", hex: "#9898A6", token: "--lt-neutral-400" },
  { step: "500", hex: "#717182", token: "--lt-neutral-500" },
  { step: "600", hex: "#4B4B5A", token: "--lt-neutral-600" },
  { step: "700", hex: "#2D2D3A", token: "--lt-neutral-700" },
  { step: "800", hex: "#1A1A2A", token: "--lt-neutral-800" },
  { step: "900", hex: "#0A0A14", token: "--lt-neutral-900" },
] as const;

const STATUS_SWATCHES = [
  {
    name: "Danger / Destructive",
    hex: "#B91C1C",
    token: "--lt-status-danger",
    usage: "Delete actions, don't-know recall, errors",
  },
  {
    name: "Warning / Processing",
    hex: "#F59E0B",
    token: "--lt-status-warning",
    usage: "In-progress states, caution notes",
  },
  {
    name: "Success / Confirmation",
    hex: "#10B981",
    token: "--lt-status-success",
    usage: "Positive feedback, completions",
  },
] as const;

const SPACING = [2, 4, 8, 12, 16, 24, 32, 40] as const;

const RADII = [
  { value: 2, label: "2" },
  { value: 4, label: "4" },
  { value: 6, label: "6 — inputs" },
  { value: 8, label: "8 — cards" },
  { value: 12, label: "12" },
  { value: 9999, label: "pill — badges" },
] as const;

function SpecCard({ children }: { children: ReactNode }) {
  return (
    <section className="flex w-full flex-col gap-4 rounded-2xl border border-[#eaeaed] bg-white p-6">
      {children}
    </section>
  );
}

function SpecHeader({ title, description }: { title: string; description: string }) {
  return (
    <header className="flex flex-col gap-1.5">
      <h2 className="text-lg font-bold text-[var(--lt-ink)]">{title}</h2>
      <p className="text-sm leading-[22px] text-[var(--lt-neutral-500)]">
        {description}
      </p>
    </header>
  );
}

function TokenChip({ children }: { children: string }) {
  return (
    <span className="rounded bg-[var(--lt-brand-50)] px-2 py-0.5 text-xs leading-4 text-[var(--lt-brand-500)]">
      {children}
    </span>
  );
}

function Swatch({
  color,
  step,
  hex,
}: {
  color: string;
  step: string;
  hex: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-[#eaeaed] bg-white">
      <div className="h-11 w-full" style={{ background: color }} />
      <div className="flex flex-col gap-0.5 px-2.5 py-2">
        <p className="text-xs font-semibold text-[var(--lt-neutral-700)]">{step}</p>
        <p className="text-[11px] text-[var(--lt-neutral-400)]">{hex}</p>
      </div>
    </div>
  );
}

export function DesignSystemPage() {
  return (
    <div
      className="linktext bg-white text-[var(--lt-ink)]"
      id="design-system"
      data-toc=""
      data-id="design-system"
    >
      <header className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-6 pt-16 pb-16 md:px-10 lg:px-[120px] lg:pt-[120px] lg:pb-16">
        <div className="flex flex-col gap-2">
          <p className="text-[72px] leading-none font-black text-[#e6e6e6]">03</p>
          <h1 className="text-[36px] leading-none font-extrabold text-[var(--lt-ink)]">
            Design System
          </h1>
        </div>
        <p className="border-l-4 border-[var(--lt-ink)] py-2 pl-6 text-lg leading-7 font-medium text-[#555]">
          To solve the consistency problems identified in the audit, I built a
          comprehensive design system — establishing tokens for color,
          typography, spacing, and elevation, then composing them into a
          reusable component library.
        </p>
      </header>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-6 pb-24 md:px-10 lg:px-[120px]">
        <SpecCard>
          <SpecHeader
            title="Brand Identity Color"
            description="Primary brand color #2DB9A0 (Teal), paired with black, white, and gray auxiliaries to build a clear visual hierarchy."
          />
          <p className="text-sm font-bold text-[var(--lt-ink)]">
            Primary Brand Color
          </p>
          <div className="flex flex-col gap-5 md:flex-row md:items-start">
            <div className="flex h-[120px] w-full max-w-[200px] flex-col overflow-hidden rounded-xl border border-[#eaeaed] bg-white">
              <div className="h-[60px] w-full bg-[var(--lt-brand-400)]" />
              <div className="flex flex-col gap-0.5 px-3 py-2.5">
                <p className="text-[13px] font-semibold text-[var(--lt-neutral-700)]">
                  Brand Primary
                </p>
                <p className="text-xs text-[var(--lt-neutral-400)]">#2DB9A0</p>
              </div>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2 rounded-xl bg-[var(--lt-neutral-50)] px-5 py-4">
              <p className="text-[13px] font-semibold text-[var(--lt-brand-500)]">
                Usage
              </p>
              <ul className="list-disc space-y-1 pl-4 text-xs text-[var(--lt-neutral-700)]">
                <li>Buttons &amp; CTA</li>
                <li>Links &amp; Active States</li>
                <li>Key Icons &amp; Indicators</li>
                <li>Accent &amp; Token Underlines</li>
              </ul>
            </div>
          </div>
        </SpecCard>

        <SpecCard>
          <h2 className="text-base font-bold text-black">Default Background</h2>
          <p className="text-xs leading-[18px] text-[#666673]">
            The application uses neutral/50 (#FAFAFA) as the default page
            background instead of pure white — reducing eye strain and giving
            white card surfaces a subtle lift. This creates a layered depth
            system: gray page → white cards → content.
          </p>
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
            <div className="relative flex h-[231px] w-full max-w-[482px] items-center justify-center overflow-hidden rounded-lg border border-[#eaeaed] bg-[var(--lt-neutral-50)]">
              <div className="h-[131px] w-[198px] rounded border-[0.5px] border-[#eaeaed] bg-white" />
            </div>
            <p className="text-xs text-[#4d4d59]">
              neutral/50 · #FAFAFA · rgb(250, 250, 250)
            </p>
          </div>
        </SpecCard>

        <SpecCard>
          <SpecHeader
            title="Color Palette"
            description="Teal brand accents paired with a neutral gray scale for structure and readability."
          />
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-[var(--lt-ink)]">
                Primary Brand - Teal
              </p>
              <TokenChip>brand.*</TokenChip>
            </div>
            <div className="grid grid-cols-5 gap-3 lg:grid-cols-10">
              {BRAND_SWATCHES.map((swatch) => (
                <Swatch
                  key={swatch.step}
                  color={`var(${swatch.token})`}
                  step={swatch.step}
                  hex={swatch.hex}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 pt-2">
              <span className="size-2 rounded bg-[var(--lt-brand-400)]" />
              <p className="text-xs leading-4 text-[var(--lt-neutral-400)]">
                400 is the base token - buttons, links, active states, token
                underlines
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-[var(--lt-ink)]">
                Neutral Scale
              </p>
              <TokenChip>neutral.*</TokenChip>
            </div>
            <div className="grid grid-cols-5 gap-3 lg:grid-cols-10">
              {NEUTRAL_SWATCHES.map((swatch) => (
                <Swatch
                  key={swatch.step}
                  color={`var(${swatch.token})`}
                  step={swatch.step}
                  hex={swatch.hex}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-bold text-[var(--lt-ink)]">
              Semantic Status Colors
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {STATUS_SWATCHES.map((swatch) => (
                <div key={swatch.name} className="flex flex-col gap-1.5">
                  <div className="overflow-hidden rounded-xl border border-[#eaeaed] bg-white">
                    <div
                      className="h-5 w-full"
                      style={{ background: `var(${swatch.token})` }}
                    />
                    <div className="flex flex-col gap-0.5 px-2.5 py-1.5">
                      <p className="text-xs font-semibold text-[var(--lt-neutral-700)]">
                        {swatch.name}
                      </p>
                      <p className="text-[11px] text-[var(--lt-neutral-400)]">
                        {swatch.hex}
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] leading-4 text-[var(--lt-neutral-400)]">
                    {swatch.usage}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SpecCard>

        <SpecCard>
          <SpecHeader
            title="Typography"
            description="Inter for all UI text, optimized for long-form reading and comfortable line-height."
          />
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-4 rounded-xl border border-[#eaeaed] p-3 md:flex-row md:items-center">
              <div className="w-[180px] shrink-0 text-xs">
                <p className="font-semibold text-[var(--lt-neutral-500)]">
                  Heading 1
                </p>
                <p className="text-[var(--lt-neutral-400)]">Inter • 22px • 600</p>
              </div>
              <p className="text-[22px] leading-[28.6px] font-semibold text-[var(--lt-ink)]">
                Die Berliner Mauer: Geschichte
              </p>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-[#eaeaed] p-3 md:flex-row md:items-center">
              <div className="w-[180px] shrink-0 text-xs">
                <p className="font-semibold text-[var(--lt-neutral-500)]">Body</p>
                <p className="text-[var(--lt-neutral-400)]">Inter • 14px • 400</p>
              </div>
              <p className="text-sm leading-[23.8px] text-[var(--lt-ink)]">
                Die Berliner Mauer war mehr als 28 Jahre lang das Symbol des
                Kalten Krieges und der Teilung Deutschlands.
              </p>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-[#eaeaed] p-3 md:flex-row md:items-center">
              <div className="w-[180px] shrink-0 text-xs">
                <p className="font-semibold text-[var(--lt-neutral-500)]">
                  Small / Meta
                </p>
                <p className="text-[var(--lt-neutral-400)]">Inter • 12px • 400</p>
              </div>
              <p className="text-xs leading-[18px] text-[var(--lt-neutral-500)]">
                984 words · 0 notes · Intermediate
              </p>
            </div>
          </div>
        </SpecCard>

        <SpecCard>
          <SpecHeader
            title="Components"
            description="Key UI elements built from the system tokens — buttons and badges."
          />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-3 rounded-xl border border-[#eaeaed] p-4">
              <p className="text-xs font-semibold text-[var(--lt-neutral-500)]">
                Buttons
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  className="rounded-[6px] bg-[var(--lt-brand-400)] px-4 py-2 text-[13px] font-medium leading-[19.5px] text-white"
                >
                  Primary
                </button>
                <button
                  type="button"
                  className="rounded-[6px] border border-[var(--lt-brand-300)] bg-white px-4 py-2 text-[13px] font-medium leading-[19.5px] text-[var(--lt-brand-500)]"
                >
                  Outline
                </button>
                <button
                  type="button"
                  className="rounded-[6px] border border-[#eaeaed] bg-white px-4 py-2 text-[13px] font-medium leading-[19.5px] text-[var(--lt-neutral-600)]"
                >
                  Ghost
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3 rounded-xl border border-[#eaeaed] p-4">
              <p className="text-xs font-semibold text-[var(--lt-neutral-500)]">
                Badges
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded border border-[var(--lt-brand-200)] bg-[var(--lt-brand-50)] px-2 py-0.5 text-xs font-medium leading-4 text-[var(--lt-brand-600)]">
                  Beginner
                </span>
                <span className="rounded border border-[#fcd34d] bg-[#fef3c7] px-2 py-0.5 text-xs font-medium leading-4 text-[#92400e]">
                  Intermediate
                </span>
                <span className="rounded border border-[#fca5a5] bg-[#fee2e2] px-2 py-0.5 text-xs font-medium leading-4 text-[#991b1b]">
                  Advanced
                </span>
              </div>
            </div>
          </div>
        </SpecCard>

        <SpecCard>
          <SpecHeader
            title="Spacing & Radius"
            description="4px base unit with a restrained radius scale for functional, not decorative, components."
          />
          <div className="flex flex-wrap items-end gap-3">
            {SPACING.map((size) => (
              <div
                key={size}
                className="flex w-16 flex-col items-center gap-1.5"
              >
                <div
                  className="rounded-[2px] bg-[var(--lt-brand-200)]"
                  style={{ width: size, height: size }}
                />
                <p className="text-[10px] leading-[15px] text-[var(--lt-neutral-400)]">
                  {size}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {RADII.map((item) => (
              <div
                key={item.label}
                className="flex w-16 flex-col items-center gap-1.5"
              >
                <div
                  className="size-10 border border-[var(--lt-brand-200)] bg-[var(--lt-brand-50)]"
                  style={{ borderRadius: item.value }}
                />
                <p className="text-center text-xs leading-4 text-[var(--lt-neutral-500)]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </SpecCard>

        <SpecCard>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-[var(--lt-text-primary)]">
                Base Components
              </p>
              <p className="text-[10px] font-semibold tracking-[0.8px] text-[#45bfb8]">
                COMPARISON
              </p>
            </div>
            <p className="max-w-[640px] text-xs leading-[17px] text-[#737380]">
              Content cards use elevation (drop shadow) to stand out;
              <br />
              Utility cards use a flat stroke border to stay recessive.
            </p>
            <div className="flex flex-wrap gap-6 bg-[var(--lt-neutral-50)] p-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1.5">
                  <p className="text-[13px] font-semibold text-[var(--lt-text-primary)]">
                    Content Card
                  </p>
                  <p className="text-[9px] font-semibold tracking-[0.8px] text-[#45bfb8]">
                    ◆ ELEVATED
                  </p>
                </div>
                <div className="h-40 w-[260px] rounded-xl bg-[var(--lt-surface-card)] shadow-[var(--lt-elevation-content)]" />
                <div className="text-[11px] leading-4">
                  <p className="text-[#59a69e]">✓ Drop shadow (elevation)</p>
                  <p className="text-[#737380]">✗ No stroke border</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1.5">
                  <p className="text-[13px] font-semibold text-[var(--lt-text-primary)]">
                    Utility Card
                  </p>
                  <p className="text-[9px] font-semibold tracking-[0.8px] text-[#80808c]">
                    ◇ FLAT
                  </p>
                </div>
                <div className="h-40 w-[260px] rounded-xl border border-[var(--lt-border-default)] bg-[var(--lt-surface-card)]" />
                <div className="text-[11px] leading-4">
                  <p className="text-[#737380]">✗ No drop shadow</p>
                  <p className="text-[#59a69e]">✓ Gray stroke border</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <p className="text-sm font-semibold text-[var(--lt-text-primary)]">
                Content Surfaces
              </p>
              <span className="rounded bg-[rgba(69,191,184,0.12)] px-2 py-[3px] text-[10px] font-semibold tracking-[0.8px] text-[#45bfb8]">
                ◆ ELEVATED
              </span>
            </div>
            <p className="text-xs leading-[17px] text-[#737380]">
              Knowledge details, review cards, article previews — raised with
              drop shadow for visual depth and prominence.
            </p>
            <div className="flex flex-col items-start gap-3 bg-[var(--lt-neutral-50)] p-4">
              <ArticleCard />
              <WordCard />
              <InlineNote
                className="max-w-[224px]"
                title="vocabulary →"
                body="This is an explanation of a vocab in the context of this sentence."
              />
              <InlineNote
                className="max-w-[555px]"
                title="Grammar →"
                body="This is an explanation of a grammar knowledge. This is an explanation of a grammar knowledge. This is an explanation of a grammar knowledge."
              />
              <ReviewCard />
            </div>
          </div>

          <div className="h-px w-full bg-[#e0e0e5]" />

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <p className="text-sm font-semibold text-[var(--lt-text-primary)]">
                Utility Surfaces
              </p>
              <span className="rounded bg-[rgba(153,153,166,0.15)] px-2 py-[3px] text-[10px] font-semibold tracking-[0.8px] text-[#80808c]">
                ◇ FLAT
              </span>
            </div>
            <p className="text-xs leading-[17px] text-[#737380]">
              Navigation, buttons, form controls, badges — flat against the
              background with no drop shadow.
            </p>
            <div className="flex flex-col gap-3 overflow-hidden bg-[var(--lt-neutral-50)] p-4">
              <div className="overflow-x-auto">
                <div className="min-w-[720px]">
                  <TopNav />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-[10px] font-medium tracking-[0.5px] text-[#737380]">
                  TextInput
                </p>
                <TextInput />
              </div>
              <FilterSelect />
              <div className="flex flex-col gap-1.5 rounded-lg border border-[#e5e5eb] px-3.5 py-2.5">
                <p className="text-[10px] font-medium tracking-[0.5px] text-[#737380]">
                  MetadataRow
                </p>
                <MetadataRow />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-[10px] font-medium tracking-[0.5px] text-[#737380]">
                  NavButton
                </p>
                <NavButton />
              </div>
            </div>
          </div>
        </SpecCard>
      </div>
    </div>
  );
}

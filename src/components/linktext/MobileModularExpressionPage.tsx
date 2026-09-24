import {
  DefinitionExpandPhone,
  VocabDetailPhone,
} from "./MobileExpressionPhones";

export function MobileModularExpressionPage() {
  return (
    <div
      className="linktext bg-white text-[var(--lt-ink)]"
      id="modular-expression"
      data-toc=""
      data-id="modular-expression"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-6 pt-16 pb-16 md:px-10 lg:px-[120px] lg:pt-[100px] lg:pb-[120px]">
        <header className="flex w-full flex-col gap-6">
          <p className="text-sm font-extrabold tracking-[3px] text-[var(--lt-ink)] uppercase">
            03 — One System, Different Expression
          </p>
          <div className="h-[2px] w-full bg-[var(--lt-ink)]" />
          <div className="flex flex-col gap-4">
            <h2 className="text-[32px] leading-[42px] font-extrabold text-[var(--lt-ink)] md:text-[36px]">
              Content feels tangible. Functions stay lightweight.
            </h2>
            <div className="flex flex-col gap-3 text-lg leading-7 text-[var(--lt-text-secondary)]">
              <p>
                The mobile experience keeps the same visual distinction
                established on web: Content feels tangible. Functions stay
                lightweight.
              </p>
              <p>
                On web, related knowledge can be grouped within a larger
                composite card. On mobile, limited space makes smaller, focused
                surfaces more effective.
              </p>
            </div>
          </div>
        </header>

        <div className="flex w-full flex-col gap-20">
          <div className="flex w-full items-start">
            <img
              src="/images/linktext/mobile/expression/hero-comparison.png"
              alt="Web composite vocabulary detail on a laptop, compared with the modular mobile word-detail screen"
              width={1071}
              height={542}
              className="block h-auto w-full"
              style={{ maxWidth: 1071 }}
            />
          </div>

          <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-8">
            <div className="flex min-w-px flex-1 flex-col gap-2">
              <p className="text-xs leading-[18px] font-semibold text-[var(--lt-text-muted)]">
                WEB EXPERIENCE — Composite Knowledge Card
              </p>
              <div className="text-sm leading-5 text-[var(--lt-text-secondary)]">
                <p>Show one web Knowledge Detail card.</p>
                <p>For example:</p>
                <p>All contained within one larger surface.</p>
              </div>
            </div>
            <div className="flex min-w-px flex-1 flex-col gap-2">
              <p className="text-xs leading-[18px] font-semibold text-[var(--lt-text-muted)]">
                MOBILE EXPERIENCE — Modular Content Cards
              </p>
              <div className="text-sm leading-5 text-[var(--lt-text-secondary)]">
                <p>
                  Show the same information decomposed into separate cards:
                </p>
                <p>
                  The same system is preserved, but its expression becomes more
                  modular on mobile — making the physical-card language more
                  prominent.
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-16 bg-gradient-to-b from-white via-[#f5f5f5] to-white px-6 py-16 lg:flex-row lg:items-center lg:justify-center lg:gap-[213px] lg:px-24 lg:py-[196px]">
            <VocabDetailPhone />
            <DefinitionExpandPhone />
          </div>
        </div>
      </div>
    </div>
  );
}

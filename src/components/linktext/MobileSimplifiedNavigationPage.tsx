import {
  NavSpacesPhone,
  ReviewHubPhone,
  WebTopNavMotion,
} from "./MobileNavPhones";

const SPACES = [
  {
    label: "READING",
    body: "Read and interact with content.",
  },
  {
    label: "REVIEW",
    body: "Review accumulated vocabulary and grammar knowledge.",
  },
  {
    label: "PROFILE",
    body: "Manage account, settings, and preferences.",
  },
] as const;

export function MobileSimplifiedNavigationPage() {
  return (
    <div
      className="linktext bg-white text-[var(--lt-ink)]"
      id="simplified-navigation"
      data-toc=""
      data-id="simplified-navigation"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-6 pt-16 pb-16 md:px-10 lg:px-[120px] lg:pt-[100px] lg:pb-[120px]">
        <header className="flex w-full flex-col gap-6">
          <p className="text-sm font-extrabold tracking-[3px] text-[var(--lt-ink)] uppercase">
            02 — Simplified Navigation
          </p>
          <div className="h-[2px] w-full bg-[var(--lt-ink)]" />
          <div className="flex flex-col gap-4">
            <h2 className="text-[32px] leading-[42px] font-extrabold text-[var(--lt-ink)] md:text-[36px]">
              From multiple web destinations to three focused mobile spaces
            </h2>
            <div className="text-lg leading-7 text-[var(--lt-text-secondary)]">
              <p>On web, the top navigation provides access to different areas of LinkText.</p>
              <p>On mobile, the navigation is reduced to the three core activities:</p>
              <p>Reading · Review · Profile</p>
              <p>
                Reading becomes the default entry point, while secondary features
                are accessed contextually from within these spaces.
              </p>
            </div>
          </div>
        </header>

        <section className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs leading-[18px] font-bold tracking-[1px] text-[var(--lt-text-muted)] uppercase">
              WEB EXPERIENCE — Top Navigation
            </p>
            <p className="text-sm text-[var(--lt-text-secondary)]">
              Show the original web navigation and label the different destinations.
            </p>
          </div>
          <div className="flex w-full flex-col items-start bg-gradient-to-b from-white via-[#f4f4f6] to-white px-4 py-[69px]">
            <WebTopNavMotion />
          </div>
        </section>

        <section className="flex w-full flex-col gap-6">
          <p className="text-xs leading-[18px] font-bold tracking-[1px] text-[var(--lt-text-muted)] uppercase">
            MOBILE IA — Three Core Spaces
          </p>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {SPACES.map((space) => (
              <article
                key={space.label}
                className="flex flex-col overflow-hidden rounded-[var(--lt-radius-card)] bg-[var(--lt-bg-brand-subtle)]"
              >
                <div className="border-b border-[var(--lt-border-brand)] bg-white px-4 py-2.5">
                  <p className="text-[10px] leading-[14px] font-bold tracking-[1px] text-[var(--lt-text-primary)] uppercase">
                    {space.label}
                  </p>
                </div>
                <div className="px-4 py-3">
                  <p className="text-[13px] leading-5 text-[var(--lt-text-secondary)]">
                    {space.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="flex w-full flex-col items-center gap-16 bg-gradient-to-b from-white via-[#f5f5f5] to-white px-6 py-16 lg:flex-row lg:items-start lg:justify-center lg:gap-[213px] lg:px-24 lg:py-[146px]">
          <NavSpacesPhone />
          <ReviewHubPhone />
        </div>
      </div>
    </div>
  );
}

import { FinalProductDemos } from "./FinalProductDemos";

const OUTCOMES = [
  {
    title: "01 - Reading",
    shift: "From fragmented interaction → to natural reading",
    body: "Preserving the structure and rhythm of the original text while making language learning directly interactive.",
  },
  {
    title: "02 - Learning",
    shift: "From isolated AI answers → to accumulated knowledge",
    body: "Turning questions and interactions into reusable vocabulary and grammar knowledge.",
  },
  {
    title: "03 - System",
    shift: "From implementation-driven UI → to a scalable design language",
    body: "Establishing reusable components, variables, and interaction patterns across the product.",
  },
] as const;

export function FinalProductOverviewPage() {
  return (
    <div
      className="linktext bg-white text-[var(--lt-ink)]"
      id="final-product-overview"
      data-toc=""
      data-id="final-product-overview"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-6 pt-16 pb-[120px] md:px-10 lg:px-[120px] lg:pt-[120px]">
        <header className="flex flex-col gap-2">
          <p className="text-[72px] leading-none font-black text-[#e6e6e3]">
            07
          </p>
          <h1 className="text-[36px] leading-none font-extrabold text-[var(--lt-ink)]">
            Final Product Overview
          </h1>
        </header>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-8">
            {OUTCOMES.map((item) => (
              <div key={item.title} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="size-3 shrink-0 rounded-[3px] bg-[var(--lt-bg-brand)]" />
                  <p className="text-base font-bold leading-normal text-[var(--lt-text-primary)]">
                    {item.title}
                  </p>
                </div>
                <p className="text-sm font-semibold leading-normal text-[var(--lt-text-brand-hover)]">
                  {item.shift}
                </p>
                <p className="text-sm leading-[22px] text-[var(--lt-text-secondary)]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <div className="h-px w-full bg-[var(--lt-border-default)]" />
          <p className="text-sm leading-[22px] text-[var(--lt-text-secondary)] italic">
            The goal was not to make LinkText look more polished. It was to make
            the product easier to understand, easier to extend, and more
            coherent as a system.
          </p>
        </div>

        <FinalProductDemos />
      </div>
    </div>
  );
}

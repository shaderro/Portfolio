import { MobilePhoneStage } from "./MobilePhoneStage";

const ASSETS = {
  chapterRule: {
    src: "/images/linktext/mobile/chapter-rule.svg",
    w: 80,
    h: 2,
  },
} as const;

export function MobileCaseOpeningPage() {
  return (
    <div
      className="linktext bg-white text-[var(--lt-ink)]"
      id="mobile-opening"
      data-toc=""
      data-id="mobile-opening"
    >
      <section className="bg-white">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col">
          <div className="flex flex-col gap-6 px-6 pt-16 pb-10 md:px-10 lg:px-[120px] lg:pt-[120px] lg:pb-[120px]">
            <p className="text-xs font-semibold uppercase tracking-[0.05px] text-[var(--lt-ink)]">
              Mobile Case — Opening
            </p>
            <div className="flex flex-col gap-4">
              <h1 className="text-[36px] leading-[1.1] font-extrabold text-[var(--lt-ink)] md:text-[56px]">
                LinkText — Web to Mobile
              </h1>
              <p className="text-xl font-medium leading-[1.4] text-[#333] md:text-2xl">
                Designing a focused reading experience for smaller screens.
              </p>
            </div>
          </div>

          <div className="w-full px-6 md:px-10 lg:px-0">
            <MobilePhoneStage />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-10 px-6 py-16 md:px-10 lg:flex-row lg:items-center lg:gap-20 lg:px-[120px] lg:py-[120px]">
          <div className="flex w-full shrink-0 flex-col gap-4 lg:w-[320px]">
            <p className="text-sm font-extrabold uppercase text-[var(--lt-ink)]">
              Opening / Overview
            </p>
            <img
              src={ASSETS.chapterRule.src}
              alt=""
              width={ASSETS.chapterRule.w}
              height={ASSETS.chapterRule.h}
              className="block"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-6 text-lg leading-7 text-[#0f172a]">
            <p>
              LinkText was originally designed around a desktop reading
              experience, with reading, AI assistance, and knowledge management
              distributed across a larger interface.
            </p>
            <p>
              Adapting it to mobile meant more than scaling down the existing
              UI. I rethought how users interact with AI, navigate between core
              activities, and consume structured knowledge within a smaller,
              more focused space.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

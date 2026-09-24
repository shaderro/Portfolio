"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { landingContent } from "@/data/landing";

export function FeaturedProjectCard() {
  const { locale } = useLanguage();
  const featured = landingContent[locale].featured;

  return (
    <section aria-labelledby="featured-heading" className="pb-8">
      <article className="rounded-xl border border-border bg-white p-6 md:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
          {featured.label}
        </p>

        <h2
          id="featured-heading"
          className="mt-1 text-[1.75rem] font-bold leading-[1.25] tracking-[-0.025em] text-neutral-950 md:text-[30px]"
        >
          {featured.title}
        </h2>

        <p className="mt-0.5 text-sm leading-[21px] text-neutral-500">
          {featured.subtitle}
        </p>

        <p className="mt-3 max-w-[672px] text-sm leading-[22.75px] text-neutral-600">
          {featured.description}
        </p>

        <p className="mt-3 font-mono text-[11px] tracking-[0.025em] text-neutral-400">
          {featured.tags}
        </p>

        <Link
          href={featured.href}
          className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium leading-[19.5px] text-neutral-900 transition-opacity duration-200 hover:opacity-60"
        >
          {featured.viewProject}
          <span aria-hidden="true">→</span>
        </Link>

        <div className="mt-5 border-t border-border pt-5">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-400">
            {featured.casesLabel}
          </p>
          <p className="mt-1 text-[13px] leading-[19.5px] text-neutral-500">
            {featured.casesIntro}
          </p>

          <ul className="mt-5 flex flex-col gap-5">
            {featured.cases.map((item) => (
              <li key={item.href}>
                <div className="flex gap-1.5">
                  <span className="mt-1 shrink-0 font-mono text-[11px] leading-[16.5px] text-neutral-400">
                    {item.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={item.href}
                      className="group/case inline-flex max-w-full items-center gap-1 text-[15px] font-semibold leading-[22.5px] tracking-[-0.025em] text-neutral-900 transition-opacity duration-200 hover:opacity-60"
                    >
                      <span className="min-w-0">{item.title}</span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-[13px] font-medium leading-none"
                      >
                        →
                      </span>
                    </Link>
                    <p className="mt-1 text-[13px] leading-[21px] text-neutral-500">
                      {item.description}
                    </p>
                    <p className="mt-1.5 font-mono text-[11px] tracking-[0.025em] text-neutral-400">
                      {item.tags}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
}

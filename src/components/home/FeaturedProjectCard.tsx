"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { landingContent } from "@/data/landing";

export function FeaturedProjectCard() {
  const { locale } = useLanguage();
  const featured = landingContent[locale].featured;

  return (
    <section aria-labelledby="featured-heading" className="pb-4">
      <Link
        href={featured.href}
        className="group block rounded-lg border border-border bg-white px-6 py-5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-neutral-400 hover:bg-neutral-50 md:px-8 md:py-6"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-400">
          {featured.label}
        </p>

        <h2
          id="featured-heading"
          className="mt-2 text-[1.5rem] font-semibold leading-tight tracking-tight text-neutral-950 md:text-[1.75rem]"
        >
          {featured.title}
        </h2>

        <p className="mt-1 text-base leading-snug text-neutral-500">
          {featured.subtitle}
        </p>

        <p className="mt-3 max-w-3xl text-base leading-snug text-neutral-600">
          {featured.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
          {featured.tags.map((tag) => (
            <li
              key={tag}
              className="font-mono text-xs tracking-wide text-neutral-400 transition-colors duration-200 group-hover:text-neutral-500"
            >
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </section>
  );
}

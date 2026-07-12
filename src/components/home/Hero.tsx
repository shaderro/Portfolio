"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Container } from "@/components/layout/Container";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="shrink-0 pt-6 pb-5 md:pt-8 md:pb-6"
    >
      <Container size="landing">
        <div className="max-w-3xl">
          <h1
            id="hero-heading"
            className="text-[2.25rem] font-semibold leading-none tracking-tight text-neutral-950 md:text-[2.75rem]"
          >
            {t.hero.name}
          </h1>

          <p className="mt-3 text-lg leading-snug text-neutral-500 md:text-xl">
            {t.hero.role}
          </p>

          <p className="mt-4 max-w-2xl text-base leading-snug text-neutral-600 md:text-lg">
            {t.hero.intro}
          </p>
        </div>
      </Container>
    </section>
  );
}

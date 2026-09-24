"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Container } from "@/components/layout/Container";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="pt-16 pb-12 md:pt-20 md:pb-12"
    >
      <Container size="landing">
        <div className="max-w-[576px]">
          <h1
            id="hero-heading"
            className="text-[2.5rem] font-bold leading-none tracking-[-0.04em] text-neutral-950 md:text-[68px] md:tracking-[-1.7px]"
          >
            {t.hero.name}
          </h1>

          <p className="mt-3 text-[15px] leading-[22.5px] text-neutral-500">
            {t.hero.role}
          </p>

          <p className="mt-5 text-base leading-[26px] text-neutral-700">
            {t.hero.intro}
          </p>
        </div>
      </Container>
    </section>
  );
}

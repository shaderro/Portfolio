"use client";

import { Container } from "@/components/layout/Container";
import { useLanguage } from "@/contexts/LanguageContext";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-12 border-t border-border py-8 md:py-8"
    >
      <Container size="landing">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[160px_minmax(0,512px)] md:gap-16">
          <h2
            id="about-heading"
            className="text-[13px] font-semibold leading-[19.5px] text-neutral-900"
          >
            {t.about.label}
          </h2>
          <div>
            <p className="text-[15px] font-medium leading-[24.5px] text-neutral-700">
              {t.about.lead}
            </p>
            <p className="mt-3 text-sm leading-[22.75px] text-neutral-500">
              {t.about.p1}
            </p>
            <p className="mt-3 text-sm leading-[22.75px] text-neutral-500">
              {t.about.p2}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

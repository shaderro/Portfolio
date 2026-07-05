"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Container } from "@/components/layout/Container";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-padding"
    >
      <Container size="narrow">
        <h2
          id="about-heading"
          className="font-mono text-xs uppercase tracking-widest text-muted"
        >
          {t.about.title}
        </h2>

        <div className="mt-8 max-w-xl space-y-4 text-base leading-relaxed text-neutral-600 md:text-lg">
          <p>{t.about.bio}</p>
          <p>{t.about.previous}</p>
        </div>

        <div className="mt-12">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {t.about.educationLabel}
          </p>
          <ul className="mt-4 space-y-2">
            {t.about.education.map((item) => (
              <li
                key={item}
                className="text-sm text-neutral-600 md:text-base"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

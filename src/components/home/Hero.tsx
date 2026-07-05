"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Container } from "@/components/layout/Container";

export function Hero() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 50);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="section-padding min-h-[85vh] flex flex-col justify-center"
    >
      <Container>
        <div
          className={`max-w-3xl transition-all duration-200 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <h1
            id="hero-heading"
            className="text-3xl font-medium tracking-tight text-neutral-950 md:text-4xl lg:text-5xl"
          >
            Ranxin Zhou
          </h1>

          <p className="mt-3 text-lg text-neutral-500 md:text-xl">
            {t.hero.role}
          </p>

          <div className="mt-10 space-y-1">
            {t.hero.tagline.map((line) => (
              <p
                key={line}
                className="text-balance text-2xl font-normal leading-snug tracking-tight text-neutral-950 md:text-3xl lg:text-[2rem]"
              >
                {line}
              </p>
            ))}
          </div>

          <p className="mt-12 max-w-xl text-base leading-relaxed text-neutral-500 md:text-lg">
            {t.hero.intro}
          </p>

          <div className="mt-10">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {t.hero.interestsLabel}
            </p>
            <ul className="mt-4 space-y-2">
              {t.hero.interests.map((interest) => (
                <li
                  key={interest}
                  className="flex items-baseline gap-2 text-sm text-neutral-600 md:text-base"
                >
                  <span className="text-neutral-400" aria-hidden="true">
                    ·
                  </span>
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ScrollIndicator label={t.hero.scroll} />
      </Container>
    </section>
  );
}

function ScrollIndicator({ label }: { label: string }) {
  return (
    <div
      className="mt-24 flex flex-col items-start gap-2 md:mt-32"
      aria-hidden="true"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
        {label}
      </span>
      <div className="h-8 w-px bg-neutral-300" />
    </div>
  );
}

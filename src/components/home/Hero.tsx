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
      className="pt-6 pb-4 md:pt-8 md:pb-6"
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
            {t.hero.name}
          </h1>

          <p className="mt-3 text-lg text-neutral-500 md:text-xl">
            {t.hero.role}
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600 md:text-lg">
            {t.hero.intro}
          </p>
        </div>
      </Container>
    </section>
  );
}

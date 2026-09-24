"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Container } from "./Container";
import { LanguageToggle } from "./LanguageToggle";

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-[8px]">
      <Container
        size="landing"
        className="flex h-12 items-center justify-between"
      >
        <Link
          href="/"
          className="text-[13px] font-medium leading-[19.5px] text-neutral-900 transition-opacity duration-200 hover:opacity-60"
          aria-label="Portfolio home"
        >
          {t.hero.name}
        </Link>

        <nav className="flex shrink-0 items-center gap-3 md:gap-6" aria-label="Primary">
          <Link
            href="/#selected-work"
            className="text-[13px] leading-[19.5px] text-neutral-500 transition-colors duration-200 hover:text-neutral-900"
          >
            {t.nav.work}
          </Link>
          <Link
            href="/#about"
            className="text-[13px] leading-[19.5px] text-neutral-500 transition-colors duration-200 hover:text-neutral-900"
          >
            {t.nav.about}
          </Link>
          <LanguageToggle />
        </nav>
      </Container>
    </header>
  );
}

"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Container } from "@/components/layout/Container";
import { LanguageToggle } from "@/components/layout/LanguageToggle";

export function ContactSection() {
  const { t } = useLanguage();

  return (
    <footer
      id="contact"
      className="border-t border-border py-8"
    >
      <Container
        size="landing"
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <p className="text-[13px] leading-[19.5px]">
          <span className="font-medium text-neutral-900">{t.hero.name}</span>
          <span className="ml-3 text-neutral-400">{t.hero.role}</span>
        </p>

        <nav className="flex items-center gap-5" aria-label="Footer">
          <Link
            href="/#selected-work"
            className="text-[13px] leading-[19.5px] text-neutral-400 transition-colors duration-200 hover:text-neutral-700"
          >
            {t.nav.work}
          </Link>
          <Link
            href="/#about"
            className="text-[13px] leading-[19.5px] text-neutral-400 transition-colors duration-200 hover:text-neutral-700"
          >
            {t.nav.about}
          </Link>
          <LanguageToggle />
        </nav>
      </Container>
    </footer>
  );
}

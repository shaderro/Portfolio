"use client";

import Link from "next/link";
import { siteConfig } from "@/data/site";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

export function Header() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/90 backdrop-blur-sm">
      <Container className="flex h-14 items-center justify-between md:h-16">
        <Link
          href="/"
          className="text-sm font-medium tracking-tight text-neutral-950 transition-opacity duration-200 hover:opacity-60"
          aria-label={`${t.hero.name} home`}
        >
          {t.hero.name}
        </Link>

        <nav aria-label="Site links">
          <ul className="flex items-center gap-3 text-[13px] sm:gap-5 sm:text-sm md:gap-6">
            <li>
              <a
                href={`mailto:${siteConfig.social.email}`}
                className="text-neutral-500 transition-colors duration-200 hover:text-neutral-950"
              >
                Email
              </a>
            </li>
            <li>
              <Link
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 transition-colors duration-200 hover:text-neutral-950"
              >
                GitHub
              </Link>
            </li>
            <li>
              <Link
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 transition-colors duration-200 hover:text-neutral-950"
              >
                LinkedIn
              </Link>
            </li>
            <li>
              <div
                className="flex items-center gap-1 text-sm"
                role="group"
                aria-label="Language"
              >
                <button
                  type="button"
                  onClick={() => setLocale("zh")}
                  className={cn(
                    "transition-colors duration-200",
                    locale === "zh"
                      ? "font-medium text-neutral-950"
                      : "text-neutral-400 hover:text-neutral-600",
                  )}
                >
                  中文
                </button>
                <span className="text-neutral-300" aria-hidden="true">
                  /
                </span>
                <button
                  type="button"
                  onClick={() => setLocale("en")}
                  className={cn(
                    "transition-colors duration-200",
                    locale === "en"
                      ? "font-medium text-neutral-950"
                      : "text-neutral-400 hover:text-neutral-600",
                  )}
                >
                  EN
                </button>
              </div>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

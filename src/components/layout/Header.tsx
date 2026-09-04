"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

export function Header() {
  const { locale, setLocale } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/90 backdrop-blur-sm">
      <Container
        size="landing"
        className="flex h-14 items-center justify-between md:h-16"
      >
        <Link
          href="/"
          className="text-sm font-medium tracking-tight text-neutral-950 transition-opacity duration-200 hover:opacity-60"
          aria-label="Portfolio home"
        >
          Portfolio
        </Link>

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
      </Container>
    </header>
  );
}

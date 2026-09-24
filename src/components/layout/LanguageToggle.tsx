"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={cn("flex items-center gap-1 text-[13px] leading-[19.5px]", className)}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLocale("zh")}
        className={cn(
          "transition-colors duration-200",
          locale === "zh"
            ? "text-neutral-900"
            : "text-neutral-400 hover:text-neutral-600",
        )}
      >
        中文
      </button>
      <span className="text-neutral-400" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "transition-colors duration-200",
          locale === "en"
            ? "text-neutral-900"
            : "text-neutral-400 hover:text-neutral-600",
        )}
      >
        EN
      </button>
    </div>
  );
}

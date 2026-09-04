import type { Locale } from "@/data/site";

export const LOCALE_COOKIE = "portfolio-locale";

export function parseLocale(value: string | undefined | null): Locale {
  return value === "en" ? "en" : "zh";
}

export function localeToHtmlLang(locale: Locale): string {
  return locale === "zh" ? "zh-CN" : "en";
}

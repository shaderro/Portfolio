"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import { homeContent, type Locale } from "@/data/site";

/** Site is Chinese-only in the UI; English copy remains in data files for later use. */
const ACTIVE_LOCALE: Locale = "zh";

interface LanguageContextValue {
  locale: Locale;
  t: (typeof homeContent)[Locale];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = "zh-CN";
  }, []);

  const value = useMemo(
    () => ({
      locale: ACTIVE_LOCALE,
      t: homeContent[ACTIVE_LOCALE],
    }),
    [],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

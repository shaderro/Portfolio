"use client";

import { Header } from "@/components/layout/Header";
import { LanguageProvider } from "@/contexts/LanguageContext";
import type { Locale } from "@/data/site";

export function AppShell({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  return (
    <LanguageProvider initialLocale={initialLocale}>
      <Header />
      <main className="flex-1">{children}</main>
    </LanguageProvider>
  );
}

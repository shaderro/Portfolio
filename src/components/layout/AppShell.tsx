"use client";

import { Header } from "@/components/layout/Header";
import { LanguageProvider } from "@/contexts/LanguageContext";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Header />
      <main className="flex-1">{children}</main>
    </LanguageProvider>
  );
}

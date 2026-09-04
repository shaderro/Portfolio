"use client";

import { Container } from "@/components/layout/Container";
import { useLanguage } from "@/contexts/LanguageContext";
import { siteConfig } from "@/data/site";

export function ProjectFooter() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12 md:py-16">
      <Container size="article">
        <p className="text-sm text-neutral-500">
          {t.contact.label}:{" "}
          <a
            href={`mailto:${siteConfig.social.email}`}
            className="transition-colors duration-200 hover:text-neutral-950"
          >
            {siteConfig.social.email}
          </a>
        </p>

        <p className="mt-8 font-mono text-xs text-neutral-400">
          {t.contact.copyright(year)}
        </p>
      </Container>
    </footer>
  );
}

"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/data/site";

export function ContactSection() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="shrink-0 border-t border-border py-4 md:py-5"
    >
      <Container size="landing">
        <h2 id="contact-heading" className="sr-only">
          Contact
        </h2>

        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <p className="text-sm text-neutral-500">
            {t.contact.label}:{" "}
            <a
              href={`mailto:${siteConfig.social.email}`}
              className="transition-colors duration-200 hover:text-neutral-950"
            >
              {siteConfig.social.email}
            </a>
          </p>

          <p className="font-mono text-xs text-neutral-400">
            {t.contact.copyright(year)}
          </p>
        </div>
      </Container>
    </footer>
  );
}

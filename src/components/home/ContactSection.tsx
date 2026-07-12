"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Container } from "@/components/layout/Container";

const contactEmail = "ranxinzhou2000@gmail.com";

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
            contact:{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="transition-colors duration-200 hover:text-neutral-950"
            >
              {contactEmail}
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

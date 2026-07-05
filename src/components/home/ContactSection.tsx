"use client";

import Link from "next/link";
import { siteConfig } from "@/data/site";
import { useLanguage } from "@/contexts/LanguageContext";
import { Container } from "@/components/layout/Container";

export function ContactSection() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-border py-16 md:py-20"
    >
      <Container>
        <h2 id="contact-heading" className="sr-only">
          Contact
        </h2>

        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          <li>
            <a
              href={`mailto:${siteConfig.social.email}`}
              className="text-sm text-neutral-500 transition-colors duration-200 hover:text-neutral-950"
            >
              Email
            </a>
          </li>
          <li>
            <Link
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-500 transition-colors duration-200 hover:text-neutral-950"
            >
              GitHub
            </Link>
          </li>
          <li>
            <Link
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-500 transition-colors duration-200 hover:text-neutral-950"
            >
              LinkedIn
            </Link>
          </li>
        </ul>

        <p className="mt-10 font-mono text-xs text-neutral-400">
          {t.contact.copyright(year)}
        </p>
      </Container>
    </footer>
  );
}

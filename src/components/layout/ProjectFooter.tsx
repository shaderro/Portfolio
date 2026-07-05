import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/data/site";

export function ProjectFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12 md:py-16">
      <Container size="article">
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

        <p className="mt-8 font-mono text-xs text-neutral-400">
          © {year} {siteConfig.name}
        </p>
      </Container>
    </footer>
  );
}

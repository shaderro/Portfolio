import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/data/site";

const contactEmail = "ranxinzhou2000@gmail.com";

export function ProjectFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12 md:py-16">
      <Container size="article">
        <p className="text-sm text-neutral-500">
          contact:{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="transition-colors duration-200 hover:text-neutral-950"
          >
            {contactEmail}
          </a>
        </p>

        <p className="mt-8 font-mono text-xs text-neutral-400">
          © {year} {siteConfig.name}
        </p>
      </Container>
    </footer>
  );
}

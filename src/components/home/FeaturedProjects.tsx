"use client";

import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { useLanguage } from "@/contexts/LanguageContext";
import { Container } from "@/components/layout/Container";
import type { IndexItem } from "@/types/index";

interface FeaturedProjectsProps {
  sections: IndexItem[];
  labItems: IndexItem[];
}

export function FeaturedProjects({ sections, labItems }: FeaturedProjectsProps) {
  const { t } = useLanguage();

  return (
    <section
      id="selected-work"
      aria-labelledby="featured-heading"
      className="border-t border-border pt-24 md:pt-32 lg:pt-40 pb-0"
    >
      <Container>
        <h2
          id="featured-heading"
          className="font-mono text-xs uppercase tracking-widest text-muted"
        >
          {t.featured.title}
        </h2>

        <div className="mt-10" id="lab">
          <ProjectIndex
            sections={sections}
            labItems={labItems}
            labTitle={t.lab.title}
          />
        </div>
      </Container>
    </section>
  );
}

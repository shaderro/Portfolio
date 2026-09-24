"use client";

import { Container } from "@/components/layout/Container";
import { FeaturedProjectCard } from "@/components/home/FeaturedProjectCard";
import { ProjectCard } from "@/components/home/ProjectCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { landingContent } from "@/data/landing";

export function SelectedWorks() {
  const { locale } = useLanguage();
  const { selectedWorks } = landingContent[locale];

  return (
    <section
      id="selected-work"
      aria-label={selectedWorks.label}
      className="scroll-mt-12 pb-8"
    >
      <Container size="landing">
        <FeaturedProjectCard />

        <h2 className="text-[13px] font-semibold leading-[19.5px] tracking-[-0.025em] text-neutral-900">
          {selectedWorks.label}
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <ProjectCard
            title={selectedWorks.xreal.title}
            description={selectedWorks.xreal.description}
            items={selectedWorks.xreal.items}
          />
          <ProjectCard
            title={selectedWorks.research.title}
            items={selectedWorks.research.items}
          />
        </div>
      </Container>
    </section>
  );
}

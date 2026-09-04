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
      className="min-h-0 flex-1 pb-4 md:pb-5"
    >
      <Container size="landing">
        <FeaturedProjectCard />

        <div className="mb-3">
          <h2 className="text-[1.25rem] font-semibold leading-tight tracking-tight text-neutral-950 md:text-[1.35rem]">
            {selectedWorks.label}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
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

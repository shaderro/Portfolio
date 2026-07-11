"use client";

import { useMemo } from "react";
import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { useLanguage } from "@/contexts/LanguageContext";
import { Container } from "@/components/layout/Container";
import { localizeIndexItems } from "@/lib/localize-index";
import type { IndexItem } from "@/types/index";

interface FeaturedProjectsProps {
  sections: IndexItem[];
  labItems: IndexItem[];
}

export function FeaturedProjects({ sections, labItems }: FeaturedProjectsProps) {
  const { locale, t } = useLanguage();

  const localizedSections = useMemo(
    () => localizeIndexItems(sections, locale),
    [sections, locale],
  );

  const localizedLabItems = useMemo(
    () => localizeIndexItems(labItems, locale),
    [labItems, locale],
  );

  return (
    <section id="selected-work" aria-label="Projects">
      <Container>
        <div id="lab">
          <ProjectIndex
            sections={localizedSections}
            labItems={localizedLabItems}
            labTitle={t.lab.title}
          />
        </div>
      </Container>
    </section>
  );
}

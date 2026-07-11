import { Container } from "@/components/layout/Container";
import type { Project } from "@/types/project";

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section aria-labelledby="project-title">
      <Container size="article" className="pt-16 pb-6 md:pt-24 md:pb-8">
        <h1
          id="project-title"
          className="text-4xl font-medium tracking-tight text-neutral-950 md:text-5xl lg:text-6xl"
        >
          {project.title}
        </h1>
      </Container>
    </section>
  );
}

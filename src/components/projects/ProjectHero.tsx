import { Container } from "@/components/layout/Container";

interface ProjectHeroProps {
  title: string;
}

export function ProjectHero({ title }: ProjectHeroProps) {
  return (
    <section aria-labelledby="project-title">
      <Container size="article" className="pt-16 pb-6 md:pt-24 md:pb-8">
        <h1
          id="project-title"
          className="text-4xl font-medium tracking-tight text-neutral-950 md:text-5xl lg:text-6xl"
        >
          {title}
        </h1>
      </Container>
    </section>
  );
}

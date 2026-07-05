import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/types/project";

interface ProjectHeroProps {
  project: Project;
  readingTime?: number;
}

export function ProjectHero({ project, readingTime }: ProjectHeroProps) {
  const summary = project.summary ?? project.description;
  const subtitle = project.subtitle ?? project.meta;

  return (
    <section aria-labelledby="project-title" className="border-b border-border">
      <Container size="article" className="py-16 md:py-24 lg:py-28">
        <Link
          href="/#selected-work"
          className="mb-12 inline-block text-sm text-neutral-400 transition-colors duration-200 hover:text-neutral-950"
        >
          ← Back
        </Link>

        <div className="max-w-3xl">
          <h1
            id="project-title"
            className="text-4xl font-medium tracking-tight text-neutral-950 md:text-5xl lg:text-6xl"
          >
            {project.title}
          </h1>

          {subtitle && (
            <p className="mt-4 text-lg text-neutral-500 md:text-xl">
              {subtitle}
            </p>
          )}

          <p className="mt-6 text-base leading-relaxed text-neutral-600 md:text-lg">
            {summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>

            <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-neutral-400">
              {project.year && <span>{project.year}</span>}
              {readingTime && (
                <>
                  {project.year && (
                    <span aria-hidden="true" className="text-neutral-300">
                      ·
                    </span>
                  )}
                  <span>{readingTime} min read</span>
                </>
              )}
            </div>
          </div>
        </div>

        {project.coverImage && (
          <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-lg border border-border bg-neutral-50 md:mt-16">
            <Image
              src={project.coverImage}
              alt={project.coverAlt}
              fill
              priority
              sizes="(max-width: 820px) 100vw, 820px"
              className="object-cover"
            />
          </div>
        )}
      </Container>
    </section>
  );
}

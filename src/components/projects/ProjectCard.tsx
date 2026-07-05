import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getProjectHref } from "@/lib/projects";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-md",
        className,
      )}
    >
      <Link
        href={getProjectHref(project.path)}
        className="flex flex-1 flex-col"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
          <Image
            src={project.coverImage}
            alt={project.coverAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold tracking-tight text-neutral-950 transition-colors group-hover:text-accent">
              {project.title}
            </h2>
            <ArrowUpRight
              className="size-5 shrink-0 text-neutral-400 transition-colors group-hover:text-accent"
              aria-hidden="true"
            />
          </div>

          <p className="flex-1 text-sm leading-relaxed text-neutral-500">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>

        <span className="sr-only">View {project.title} case study</span>
      </Link>
    </article>
  );
}

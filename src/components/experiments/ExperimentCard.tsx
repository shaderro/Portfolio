import Image from "next/image";
import { ExperimentMedia } from "@/components/experiments/ExperimentMedia";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";
import type { Experiment } from "@/types/experiment";

interface ExperimentCardProps {
  experiment: Experiment;
  className?: string;
}

export function ExperimentCard({ experiment, className }: ExperimentCardProps) {
  const { embed } = experiment;

  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-white",
        className,
      )}
    >
      {embed ? (
        <ExperimentMedia embed={embed} />
      ) : (
        <div className="relative aspect-[16/9] bg-neutral-100">
          <Image
            src={experiment.thumbnail}
            alt={experiment.thumbnailAlt}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}

      <div className="space-y-4 p-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-neutral-950">
            {experiment.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-500">
            {experiment.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {experiment.techStack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      </div>
    </article>
  );
}

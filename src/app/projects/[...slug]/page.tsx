import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { ProjectFooter } from "@/components/layout/ProjectFooter";
import { NotionContent } from "@/components/notion/NotionContent";
import { NotionContentSkeleton } from "@/components/notion/NotionContentSkeleton";
import { NotionContainer } from "@/components/notion/NotionContainer";
import { getAllProjectPaths, getProjectByPath } from "@/lib/projects";
import { getNotionPage } from "@/lib/notion";
import { estimateReadingTime } from "@/lib/reading-time";

export const revalidate = 3600;

interface ProjectPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  return getAllProjectPaths().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectByPath(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary ?? project.description,
    openGraph: {
      title: project.title,
      description: project.summary ?? project.description,
      images: [{ url: project.coverImage }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectByPath(slug);

  if (!project) notFound();

  let readingTime: number | undefined;
  if (project.pageId) {
    try {
      const recordMap = await getNotionPage(project.pageId);
      readingTime = estimateReadingTime(recordMap);
    } catch {
      readingTime = undefined;
    }
  }

  return (
    <article>
      <ProjectHero project={project} readingTime={readingTime} />
      <Suspense
        fallback={
          <NotionContainer>
            <NotionContentSkeleton />
          </NotionContainer>
        }
      >
        <NotionContent pageId={project.pageId} />
      </Suspense>
      <ProjectFooter />
    </article>
  );
}

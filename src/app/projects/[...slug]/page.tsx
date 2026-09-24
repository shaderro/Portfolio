import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { ProjectFooter } from "@/components/layout/ProjectFooter";
import { NotionContent } from "@/components/notion/NotionContent";
import { NotionContentSkeleton } from "@/components/notion/NotionContentSkeleton";
import { NotionContainer } from "@/components/notion/NotionContainer";
import { parseLocale, LOCALE_COOKIE } from "@/lib/locale";
import {
  getNotionProjectPaths,
  getProjectByPath,
  getProjectPageId,
  getProjectSummary,
  getProjectTitle,
} from "@/lib/projects";

/** Locale comes from cookie — always render per-request. */
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ProjectPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  return getNotionProjectPaths().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectByPath(slug);
  if (!project) return {};

  const cookieStore = await cookies();
  const locale = parseLocale(cookieStore.get(LOCALE_COOKIE)?.value);
  const title = getProjectTitle(project, locale);
  const description = getProjectSummary(project, locale);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: project.coverImage }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectByPath(slug);

  if (!project) notFound();

  const cookieStore = await cookies();
  const locale = parseLocale(cookieStore.get(LOCALE_COOKIE)?.value);
  const pageId = getProjectPageId(project, locale);
  const title = getProjectTitle(project, locale);

  return (
    <article>
      <ProjectHero title={title} />
      <Suspense
        key={`${locale}-${pageId}`}
        fallback={
          <NotionContainer>
            <NotionContentSkeleton />
          </NotionContainer>
        }
      >
        <NotionContent key={`${locale}-${pageId}`} pageId={pageId} />
      </Suspense>
      <ProjectFooter />
    </article>
  );
}

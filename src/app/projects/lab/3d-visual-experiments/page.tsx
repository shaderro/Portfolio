import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ThreeDVisualExperimentsContent } from "@/components/projects/ThreeDVisualExperimentsContent";
import { LOCALE_COOKIE, parseLocale } from "@/lib/locale";
import {
  getProjectByPath,
  getProjectSummary,
  getProjectTitle,
} from "@/lib/projects";

const path = ["lab", "3d-visual-experiments"];

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const project = getProjectByPath(path);
  if (!project) return {};

  const cookieStore = await cookies();
  const locale = parseLocale(cookieStore.get(LOCALE_COOKIE)?.value);

  return {
    title: getProjectTitle(project, locale),
    description: getProjectSummary(project, locale),
  };
}

export default function ThreeDVisualExperimentsPage() {
  const project = getProjectByPath(path);

  if (!project) notFound();

  return (
    <article className="bg-black">
      <ThreeDVisualExperimentsContent />
    </article>
  );
}

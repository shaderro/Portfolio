import { projectTree } from "@/data/projects";
import type { Locale } from "@/data/site";
import { normalizePageId } from "@/lib/notion-id";
import type { Project, ProjectNode } from "@/types/project";

function nodeToProject(
  node: ProjectNode,
  path: string[],
  depth: number,
): Project {
  return { ...node, path, depth };
}

function walkTree(
  nodes: ProjectNode[],
  parentPath: string[] = [],
  visitor: (project: Project) => void,
) {
  for (const node of nodes) {
    const path = [...parentPath, node.slug];
    visitor(nodeToProject(node, path, parentPath.length));

    if (node.children?.length) {
      walkTree(node.children, path, visitor);
    }
  }
}

export function getAllProjects(): Project[] {
  const projects: Project[] = [];
  walkTree(projectTree, [], (project) => projects.push(project));
  return projects;
}

export function getAllProjectPaths(): string[][] {
  return getAllProjects().map((project) => project.path);
}

export function getNotionProjectPaths(): string[][] {
  return getAllProjects()
    .filter((project) => !project.standalone)
    .map((project) => project.path);
}

export function getProjectByPath(path: string[]): Project | undefined {
  return getAllProjects().find(
    (project) => project.path.join("/") === path.join("/"),
  );
}

export function getProjectByPageId(pageId: string): Project | undefined {
  const normalized = normalizePageId(pageId);
  if (!normalized) return undefined;
  return getAllProjects().find(
    (project) =>
      normalizePageId(project.pageId) === normalized ||
      normalizePageId(project.pageIdEn ?? "") === normalized,
  );
}

export function getProjectPageId(
  project: ProjectNode,
  locale: Locale = "zh",
): string {
  if (locale === "en" && project.pageIdEn) {
    return project.pageIdEn;
  }
  return project.pageId;
}

export function getProjectTitle(
  project: ProjectNode,
  locale: Locale = "zh",
): string {
  if (locale === "en" && project.titleEn) {
    return project.titleEn;
  }
  return project.title;
}

export function getProjectDescription(
  project: ProjectNode,
  locale: Locale = "zh",
): string {
  if (locale === "en" && project.descriptionEn) {
    return project.descriptionEn;
  }
  return project.description;
}

export function getProjectSummary(
  project: ProjectNode,
  locale: Locale = "zh",
): string {
  if (locale === "en") {
    return project.summaryEn ?? project.descriptionEn ?? project.summary ?? project.description;
  }
  return project.summary ?? project.description;
}

export function getProjectHref(path: string[]): string {
  return `/projects/${path.join("/")}`;
}

export { projectTree };

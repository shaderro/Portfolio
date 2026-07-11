import { projectTree } from "@/data/projects";
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
    (project) => normalizePageId(project.pageId) === normalized,
  );
}

export function getProjectHref(path: string[]): string {
  return `/projects/${path.join("/")}`;
}

export { projectTree };

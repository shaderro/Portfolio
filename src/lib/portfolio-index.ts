import { projectTree } from "@/data/projects";
import type { IndexItem } from "@/types/index";
import type { ProjectNode } from "@/types/project";

function getProjectHref(path: string[]): string {
  return `/projects/${path.join("/")}`;
}

function projectNodeToIndexItem(
  node: ProjectNode,
  parentPath: string[] = [],
): IndexItem {
  const path = [...parentPath, node.slug];

  return {
    title: node.title,
    description: node.description,
    tags: node.tags,
    href: getProjectHref(path),
    year: node.year,
    meta: node.meta,
    collapsible: node.collapsible,
    optional: node.optional,
    children: node.children
      ?.filter((child) => !child.optional)
      .map((child) => projectNodeToIndexItem(child, path)),
  };
}

/** Top-level portfolio sections: LinkText, XREAL, Lab */
export function getPortfolioIndex(): IndexItem[] {
  return projectTree.map((node) => projectNodeToIndexItem(node));
}

export function getWorkIndexItems(): IndexItem[] {
  return getPortfolioIndex().filter((item) =>
    ["linktext", "xreal"].includes(item.href.replace("/projects/", "")),
  );
}

export function getLabIndexItems(): IndexItem[] {
  const lab = getPortfolioIndex().find((item) => item.href === "/projects/lab");
  return lab?.children ?? [];
}

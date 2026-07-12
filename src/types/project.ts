export interface ProjectNode {
  /** URL path segment for this node */
  slug: string;
  title: string;
  description: string;
  tags: string[];
  coverImage: string;
  coverAlt: string;
  /**
   * Notion page ID (32-char hex, no dashes).
   * Leave empty until connected — run `npm run notion:sync` to discover IDs.
   */
  pageId: string;
  year?: string;
  /** Subtitle line shown under the title, e.g. "AI · PRODUCT DESIGN" */
  meta?: string;
  /** Editorial subtitle for case study hero */
  subtitle?: string;
  /** One-line summary for case study hero */
  summary?: string;
  /** When true, top-level title is plain text (not a link), styled as a section heading */
  collapsible?: boolean;
  /** When true, uses a custom page instead of Notion CMS */
  standalone?: boolean;
  optional?: boolean;
  children?: ProjectNode[];
}

export interface Project extends ProjectNode {
  /** Full path from root, e.g. ["xreal", "gesture-interaction"] */
  path: string[];
  depth: number;
}

export type NotionErrorCode =
  | "MISSING_PAGE_ID"
  | "PAGE_NOT_FOUND"
  | "PERMISSION_DENIED"
  | "FETCH_FAILED";

import Link from "next/link";
import type { NotionErrorCode } from "@/types/project";

const ERROR_COPY: Record<
  NotionErrorCode,
  { title: string; description: string }
> = {
  MISSING_PAGE_ID: {
    title: "Content not connected",
    description:
      "This page has not been linked to a Notion document yet. Add a pageId in src/data/projects.ts.",
  },
  PAGE_NOT_FOUND: {
    title: "Page not found",
    description:
      "The linked Notion page could not be found. Verify the pageId in src/data/projects.ts and ensure the page is shared with your integration.",
  },
  PERMISSION_DENIED: {
    title: "Access restricted",
    description:
      "This page is not accessible. Share it with your Notion integration and confirm NOTION_TOKEN is set in .env.local.",
  },
  FETCH_FAILED: {
    title: "Unable to load content",
    description:
      "Something went wrong while fetching this page. Please try again later.",
  },
};

interface NotionErrorStateProps {
  code: NotionErrorCode;
}

export function NotionErrorState({ code }: NotionErrorStateProps) {
  const copy = ERROR_COPY[code];

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-border bg-surface px-8 py-10 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          {code.replace(/_/g, " ")}
        </p>
        <h2 className="mt-4 text-xl font-semibold text-neutral-950">
          {copy.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-neutral-500">
          {copy.description}
        </p>
        <Link
          href="/projects"
          className="mt-8 inline-flex text-sm font-medium text-neutral-950 transition-colors hover:text-accent"
        >
          Back to projects
        </Link>
    </div>
  );
}

import { Client } from "@notionhq/client";
import { NotionCompatAPI } from "notion-compat";
import { cache } from "react";
import type { ExtendedRecordMap } from "notion-types";
import type { NotionErrorCode } from "@/types/project";
import { flattenNotionRecordMap } from "@/lib/flatten-notion-record-map";
import { normalizePageId } from "@/lib/notion-id";

export { normalizePageId };

function createNotionClient(): NotionCompatAPI | null {
  const token = process.env.NOTION_TOKEN;
  if (!token) return null;
  return new NotionCompatAPI(new Client({ auth: token }));
}

export class NotionFetchError extends Error {
  readonly code: NotionErrorCode;

  constructor(code: NotionErrorCode, message: string) {
    super(message);
    this.name = "NotionFetchError";
    this.code = code;
  }
}

function classifyFetchError(error: unknown): NotionFetchError {
  const message =
    error instanceof Error ? error.message.toLowerCase() : String(error);

  if (!process.env.NOTION_TOKEN) {
    return new NotionFetchError(
      "PERMISSION_DENIED",
      "NOTION_TOKEN is not configured. Add it to .env.local.",
    );
  }

  if (
    message.includes("forbidden") ||
    message.includes("unauthorized") ||
    message.includes("restricted") ||
    message.includes("not_shared")
  ) {
    return new NotionFetchError(
      "PERMISSION_DENIED",
      "This Notion page is not shared with your integration.",
    );
  }

  if (
    message.includes("not found") ||
    message.includes("404") ||
    message.includes("could not find")
  ) {
    return new NotionFetchError(
      "PAGE_NOT_FOUND",
      "The Notion page could not be found. Check the pageId in src/data/projects.ts.",
    );
  }

  return new NotionFetchError(
    "FETCH_FAILED",
    "Failed to load Notion content. Please try again later.",
  );
}

/**
 * Fetches a Notion page recordMap via the official API (notion-compat).
 * Works with private pages shared to your integration.
 */
export const getNotionPage = cache(
  async (pageId: string): Promise<ExtendedRecordMap> => {
    const normalizedId = normalizePageId(pageId);

    if (!normalizedId) {
      throw new NotionFetchError(
        "MISSING_PAGE_ID",
        "No Notion page ID configured for this project.",
      );
    }

    const notion = createNotionClient();
    if (!notion) {
      throw new NotionFetchError(
        "PERMISSION_DENIED",
        "NOTION_TOKEN is not configured. Add it to .env.local.",
      );
    }

    try {
      const recordMap = await notion.getPage(normalizedId);
      return flattenNotionRecordMap(recordMap);
    } catch (error) {
      if (error instanceof NotionFetchError) throw error;
      throw classifyFetchError(error);
    }
  },
);

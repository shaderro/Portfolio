import { Client, APIErrorCode, isHTTPResponseError } from "@notionhq/client";
import https from "node:https";
import { connection } from "next/server";
import { cache } from "react";
import type { ExtendedRecordMap } from "notion-types";
import type { NotionErrorCode } from "@/types/project";
import { StableNotionCompatAPI } from "@/lib/notion-compat-client";
import { flattenNotionRecordMap } from "@/lib/flatten-notion-record-map";
import { readNotionPageCache, writeNotionPageCache } from "@/lib/notion-cache";
import { normalizePageId } from "@/lib/notion-id";

export { normalizePageId };

const NOTION_FETCH_ATTEMPTS = 5;
const NOTION_RETRY_DELAY_MS = 2000;

const notionHttpsAgent = new https.Agent({
  keepAlive: false,
  maxSockets: 4,
  family: 4,
});

function notionFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  return fetch(input, {
    ...init,
    cache: "no-store",
    // Node fetch accepts agent for outbound HTTPS connections.
    agent: notionHttpsAgent,
  } as RequestInit);
}

function createNotionClient(): StableNotionCompatAPI | null {
  const token = process.env.NOTION_TOKEN;
  if (!token) return null;
  return new StableNotionCompatAPI(
    new Client({
      auth: token,
      fetch: notionFetch,
      timeoutMs: 120_000,
    }),
  );
}

function shouldPreferDevCache(): boolean {
  return (
    process.env.NODE_ENV === "development" &&
    process.env.NOTION_DEV_CACHE !== "false" &&
    process.env.NOTION_FORCE_REFRESH !== "true"
  );
}

function isTransientNetworkError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;

  const message = error.message.toLowerCase();
  const cause = (error as Error & { cause?: unknown }).cause;
  const causeMessage =
    cause instanceof Error ? cause.message.toLowerCase() : String(cause ?? "");
  const causeCode =
    typeof cause === "object" &&
    cause !== null &&
    "code" in cause &&
    typeof cause.code === "string"
      ? cause.code.toLowerCase()
      : "";

  return (
    message.includes("fetch failed") ||
    message.includes("econnreset") ||
    message.includes("etimedout") ||
    message.includes("enotfound") ||
    message.includes("socket hang up") ||
    causeMessage.includes("fetch failed") ||
    causeMessage.includes("econnreset") ||
    causeMessage.includes("etimedout") ||
    causeCode === "econnreset" ||
    causeCode === "etimedout" ||
    causeCode === "und_err_connect_timeout"
  );
}

async function fetchNotionPage(
  notion: StableNotionCompatAPI,
  pageId: string,
): Promise<ExtendedRecordMap> {
  let lastError: unknown;

  for (let attempt = 0; attempt < NOTION_FETCH_ATTEMPTS; attempt++) {
    try {
      return await notion.getPage(pageId);
    } catch (error) {
      lastError = error;

      if (
        isTransientNetworkError(error) &&
        attempt < NOTION_FETCH_ATTEMPTS - 1
      ) {
        const delay = NOTION_RETRY_DELAY_MS * (attempt + 1);
        if (process.env.NODE_ENV === "development") {
          console.warn(
            `[Notion] Network error for ${pageId}, retrying in ${delay}ms (${attempt + 1}/${NOTION_FETCH_ATTEMPTS - 1})`,
          );
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      throw error;
    }
  }

  throw lastError;
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
  if (!process.env.NOTION_TOKEN) {
    return new NotionFetchError(
      "PERMISSION_DENIED",
      "NOTION_TOKEN is not configured. Add it to .env.local.",
    );
  }

  if (isHTTPResponseError(error)) {
    if (
      error.status === 401 ||
      error.status === 403 ||
      error.code === APIErrorCode.Unauthorized ||
      error.code === APIErrorCode.RestrictedResource
    ) {
      return new NotionFetchError(
        "PERMISSION_DENIED",
        "This Notion page is not shared with your integration.",
      );
    }

    if (
      error.status === 404 ||
      error.code === APIErrorCode.ObjectNotFound
    ) {
      return new NotionFetchError(
        "PAGE_NOT_FOUND",
        "The Notion page could not be found. Check the pageId in src/data/projects.ts.",
      );
    }
  }

  const message =
    error instanceof Error ? error.message.toLowerCase() : String(error);

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
    message.includes("could not find") ||
    message.includes("object_not_found")
  ) {
    return new NotionFetchError(
      "PAGE_NOT_FOUND",
      "The Notion page could not be found. Check the pageId in src/data/projects.ts.",
    );
  }

  if (
    message.includes("timed out") ||
    message.includes("timeout") ||
    message.includes("rate_limited") ||
    message.includes("network") ||
    message.includes("fetch failed") ||
    message.includes("econnreset") ||
    message.includes("enotfound")
  ) {
    return new NotionFetchError(
      "FETCH_FAILED",
      "Notion API is unreachable from this network. In development, run `npm run notion:warm-cache` while online (or on VPN), then reload.",
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
    await connection();

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

    if (shouldPreferDevCache()) {
      const cached = await readNotionPageCache(normalizedId);
      if (cached) {
        return cached;
      }
    }

    try {
      const recordMap = flattenNotionRecordMap(
        await fetchNotionPage(notion, normalizedId),
      );
      await writeNotionPageCache(normalizedId, recordMap);
      return recordMap;
    } catch (error) {
      if (error instanceof NotionFetchError) throw error;

      if (isTransientNetworkError(error)) {
        const cached = await readNotionPageCache(normalizedId);
        if (cached) {
          if (process.env.NODE_ENV === "development") {
            console.warn(
              `[Notion] Using cached content for ${normalizedId} after network failure.`,
            );
          }
          return cached;
        }
      }

      if (process.env.NODE_ENV === "development") {
        const cause = error instanceof Error ? (error as Error & { cause?: unknown }).cause : undefined;
        console.error("[Notion] Failed to fetch page:", normalizedId, error, cause);
      }
      throw classifyFetchError(error);
    }
  },
);

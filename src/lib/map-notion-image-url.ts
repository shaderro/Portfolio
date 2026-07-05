import type { Block } from "notion-types";
import { defaultMapImageUrl, idToUuid } from "notion-utils";

function toApiBlockId(id: string): string {
  if (id.includes("-")) return id;
  return idToUuid(id);
}

function isSignedAwsUrl(url: URL): boolean {
  return (
    url.hostname.endsWith(".amazonaws.com") &&
    url.searchParams.has("X-Amz-Signature") &&
    url.searchParams.has("X-Amz-Credential")
  );
}

/**
 * notion-compat returns temporary S3 signed URLs from the official API.
 * defaultMapImageUrl rewrites them to notion.so/image/... which only works
 * for public pages. We proxy private images through our API for fresh URLs.
 */
export function mapNotionImageUrl(
  url: string | undefined,
  block: Block,
): string | undefined {
  if (!url) return undefined;

  if (url.startsWith("data:") || url.startsWith("https://images.unsplash.com")) {
    return url;
  }

  try {
    const parsed = new URL(url);
    if (isSignedAwsUrl(parsed)) {
      const blockId = toApiBlockId(block.id);
      return `/api/notion-image?blockId=${encodeURIComponent(blockId)}`;
    }
    if (parsed.hostname === "img.notionusercontent.com") {
      return url;
    }
  } catch {
    // fall through to default handler
  }

  return defaultMapImageUrl(url, block);
}

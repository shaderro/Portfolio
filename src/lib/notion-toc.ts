import type { ExtendedRecordMap, PageBlock } from "notion-types";
import { getBlockValue, getPageTableOfContents, idToUuid } from "notion-utils";
import type { NotionTocItem } from "@/types/notion-toc";

function findPageBlock(
  recordMap: ExtendedRecordMap,
  pageId: string,
): PageBlock | null {
  const candidates = new Set([
    pageId,
    pageId.includes("-") ? pageId : idToUuid(pageId),
    pageId.replace(/-/g, ""),
  ]);

  for (const id of candidates) {
    const block = getBlockValue(recordMap.block[id]);
    if (block?.type === "page") return block as PageBlock;
  }

  const fallback = Object.values(recordMap.block)
    .map((entry) => getBlockValue(entry))
    .find((block) => block?.type === "page");

  return (fallback as PageBlock | undefined) ?? null;
}

export function getNotionTableOfContents(
  recordMap: ExtendedRecordMap,
  pageId: string,
): NotionTocItem[] {
  const page = findPageBlock(recordMap, pageId);
  if (!page) return [];

  return getPageTableOfContents(page, recordMap)
    .filter((item) => item.text.trim())
    .map((item) => ({
      id: item.id,
      text: item.text,
      indentLevel: item.indentLevel,
    }));
}

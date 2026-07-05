import type { ExtendedRecordMap } from "notion-types";
import { getBlockTitle, getBlockValue, getTextContent } from "notion-utils";

const WORDS_PER_MINUTE = 200;

function extractTextFromRecordMap(recordMap: ExtendedRecordMap): string {
  const parts: string[] = [];

  for (const block of Object.values(recordMap.block)) {
    const value = getBlockValue(block);
    if (!value) continue;

    if ("properties" in value && value.properties?.title) {
      parts.push(getTextContent(value.properties.title));
    }

    if (value.type === "page") {
      const title = getBlockTitle(value, recordMap);
      if (title) parts.push(title);
    }
  }

  return parts.join(" ");
}

export function estimateReadingTime(recordMap: ExtendedRecordMap): number {
  const text = extractTextFromRecordMap(recordMap);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}

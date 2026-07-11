import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ExtendedRecordMap } from "notion-types";

const CACHE_DIR = path.join(process.cwd(), ".cache", "notion");

function isDevCacheEnabled(): boolean {
  return (
    process.env.NODE_ENV === "development" &&
    process.env.NOTION_DEV_CACHE !== "false"
  );
}

function cachePath(pageId: string): string {
  return path.join(CACHE_DIR, `${pageId}.json`);
}

export async function readNotionPageCache(
  pageId: string,
): Promise<ExtendedRecordMap | null> {
  if (!isDevCacheEnabled()) return null;

  try {
    const raw = await readFile(cachePath(pageId), "utf8");
    return JSON.parse(raw) as ExtendedRecordMap;
  } catch {
    return null;
  }
}

export async function writeNotionPageCache(
  pageId: string,
  recordMap: ExtendedRecordMap,
): Promise<void> {
  if (!isDevCacheEnabled()) return;

  await mkdir(CACHE_DIR, { recursive: true });
  await writeFile(cachePath(pageId), JSON.stringify(recordMap), "utf8");
}

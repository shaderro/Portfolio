import type { Block, ExtendedRecordMap } from "notion-types";
import { getBlockValue } from "notion-utils";

/**
 * react-notion-x renders heading/toggle blocks without their nested children.
 * notion-compat (official API) nests content under headings — hoist those
 * children to sibling position so text, images, and lists actually render.
 */
const BLOCK_TYPES_THAT_HOIST_CHILDREN = new Set([
  "header",
  "sub_header",
  "sub_sub_header",
  "header_4",
  "toggle",
]);

function flattenContentIds(
  contentIds: string[],
  blockMap: ExtendedRecordMap["block"],
): string[] {
  const flattened: string[] = [];

  for (const blockId of contentIds) {
    const block = getBlockValue(blockMap[blockId]);
    if (!block) continue;

    flattened.push(blockId);

    const nested = block.content;
    if (!nested?.length) continue;

    if (BLOCK_TYPES_THAT_HOIST_CHILDREN.has(block.type)) {
      flattened.push(...flattenContentIds(nested, blockMap));
      (block as Block).content = [];
    }
  }

  return flattened;
}

export function flattenNotionRecordMap(
  recordMap: ExtendedRecordMap,
): ExtendedRecordMap {
  for (const blockPointer of Object.values(recordMap.block)) {
    const block = getBlockValue(blockPointer);
    if (block?.content?.length) {
      block.content = flattenContentIds(block.content, recordMap.block);
    }
  }

  return recordMap;
}

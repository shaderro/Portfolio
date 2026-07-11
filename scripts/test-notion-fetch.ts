import { Client } from "@notionhq/client";
import { readFileSync } from "fs";
import { join } from "path";
import { StableNotionCompatAPI } from "../src/lib/notion-compat-client";
import { flattenNotionRecordMap } from "../src/lib/flatten-notion-record-map";
import { writeNotionPageCache } from "../src/lib/notion-cache";

process.env.NODE_ENV ??= "development";

function loadEnv(): Record<string, string> {
  const raw = readFileSync(join(process.cwd(), ".env.local"), "utf8");
  return Object.fromEntries(
    raw
      .split("\n")
      .filter((l) => l && !l.startsWith("#"))
      .map((l) => {
        const i = l.indexOf("=");
        return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
      }),
  );
}

async function main() {
  const env = loadEnv();
  const client = new Client({ auth: env.NOTION_TOKEN });
  const notion = new StableNotionCompatAPI(client);
  const pageIds = [
    ["linktext", "35f3e8e3610f80788222e6cd6fbf31e8"],
    ["xreal", "38e3e8e3610f805abb66e929b5a75542"],
    ["quick-menu", "37b3e8e3610f8039a2d8e4e2c165fc4c"],
    ["input-model", "3823e8e3610f80ba903bc2dd9d16955f"],
    ["spatial-anchor", "38e3e8e3610f8027acd6d1dfcd9acd61"],
    ["ai-agent-simulator", "3933e8e3610f807b80a5c52670bf92fb"],
  ] as const;

  for (const [slug, pageId] of pageIds) {
    try {
      const map = await notion.getPage(pageId);
      const recordMap = flattenNotionRecordMap(map);
      await writeNotionPageCache(pageId, recordMap);
      console.log(`OK ${slug}:`, Object.keys(recordMap.block ?? {}).length, "blocks");
    } catch (e) {
      console.log(`FAIL ${slug}:`, e);
    }
  }
}

main();

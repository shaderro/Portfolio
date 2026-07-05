import { Client } from "@notionhq/client";
import { NotionCompatAPI } from "notion-compat";
import { readFileSync } from "fs";
import { join } from "path";

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
  const notion = new NotionCompatAPI(client);
  const pageId = "35f3e8e3610f80788222e6cd6fbf31e8";

  try {
    const map = await notion.getPage(pageId);
    console.log("OK:", Object.keys(map.block ?? {}).length, "blocks");
  } catch (e) {
    console.log("FAIL:", e);
  }
}

main();

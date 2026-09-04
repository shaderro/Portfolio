/**
 * Verify English Notion pages are shared with the integration.
 * Run: npx tsx scripts/verify-notion-en.ts
 */
import { Client } from "@notionhq/client";
import { readFileSync } from "fs";
import { join } from "path";

function loadEnvLocal(): Record<string, string> {
  try {
    const raw = readFileSync(join(process.cwd(), ".env.local"), "utf8");
    return Object.fromEntries(
      raw
        .split("\n")
        .filter((line) => line && !line.startsWith("#"))
        .map((line) => {
          const idx = line.indexOf("=");
          return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
        }),
    );
  } catch {
    return {};
  }
}

const pages: Array<[string, string]> = [
  ["linktext-en", "3b13e8e3610f801cafb2e2f9c5a588fa"],
  ["gesture-en", "3b23e8e3610f80099e79eb642ed016d3"],
  ["menu-en", "3b23e8e3610f802fa2aae5dad6de7697"],
  ["window-en", "3b23e8e3610f80a48cf4ebcceb5465f7"],
  ["anchor-en", "3b33e8e3610f80ce8254ca8c1d20cfee"],
  ["agent-en", "3b33e8e3610f8062a5deed18bd40f73e"],
];

async function main() {
  const env = { ...process.env, ...loadEnvLocal() };
  const notion = new Client({ auth: env.NOTION_TOKEN });

  for (const [name, id] of pages) {
    try {
      const page = await notion.pages.retrieve({ page_id: id });
      const props = "properties" in page ? page.properties : {};
      const titleProp = Object.values(props).find(
        (prop) => prop.type === "title",
      );
      const title =
        titleProp && titleProp.type === "title"
          ? titleProp.title.map((t) => t.plain_text).join("")
          : "(no title)";
      console.log(`OK ${name} → ${title}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.log(`FAIL ${name} ${id} → ${message}`);
    }
  }
}

main();

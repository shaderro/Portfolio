import { Client } from "@notionhq/client";
import { readFileSync } from "fs";
import { join } from "path";

function loadEnvLocal(): Record<string, string> {
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
}

async function main() {
  const env = { ...process.env, ...loadEnvLocal() };
  const notion = new Client({ auth: env.NOTION_TOKEN! });
  const queries = ["XREAL", "Lab", "3D Visual", "其他贡献", "手势交互"];

  for (const q of queries) {
    const res = await notion.search({
      query: q,
      filter: { property: "object", value: "page" },
      page_size: 5,
    });
    console.log(`\nSearch: "${q}"`);
    for (const r of res.results) {
      if (r.object === "page" && "properties" in r) {
        const title =
          r.properties.title?.type === "title"
            ? r.properties.title.title.map((t) => t.plain_text).join("")
            : r.properties.Name?.type === "title"
              ? r.properties.Name.title.map((t) => t.plain_text).join("")
              : "(no title)";
        console.log(`  ${title} → ${r.id.replace(/-/g, "")}`);
      }
    }
  }
}

main().catch(console.error);

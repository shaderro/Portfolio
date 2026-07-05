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

function normalizePageId(id: string): string {
  return id.replace(/-/g, "").toLowerCase();
}

async function listAllBlocks(notion: Client, blockId: string, depth = 0) {
  let cursor: string | undefined;
  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    });
    for (const block of response.results) {
      const indent = "  ".repeat(depth);
      const id = normalizePageId(block.id);
      if (block.type === "child_page" && "child_page" in block) {
        console.log(`${indent}[child_page] ${block.child_page.title} → ${id}`);
        await listAllBlocks(notion, block.id, depth + 1);
      } else if (block.type === "child_database" && "child_database" in block) {
        console.log(
          `${indent}[child_database] ${block.child_database.title} → ${id}`,
        );
      } else if (block.type === "link_to_page" && "link_to_page" in block) {
        console.log(`${indent}[link_to_page] → ${JSON.stringify(block.link_to_page)}`);
      } else {
        console.log(`${indent}[${block.type}] → ${id}`);
      }
    }
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);
}

async function main() {
  const env = { ...process.env, ...loadEnvLocal() };
  const notion = new Client({ auth: env.NOTION_TOKEN! });
  const root = normalizePageId(env.NOTION_ROOT_PAGE_ID!);
  console.log("Scanning:", root, "\n");
  await listAllBlocks(notion, root);
}

main().catch(console.error);

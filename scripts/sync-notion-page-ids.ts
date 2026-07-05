/**
 * Discovers Notion page IDs under the Portfolio root via the official API.
 * Run: npm run notion:sync
 */
import { Client } from "@notionhq/client";
import { readFileSync } from "fs";
import { join } from "path";

/** Maps Notion page titles → site slugs (extend as your workspace grows) */
const TITLE_TO_SLUG: Record<string, string> = {
  LinkText: "linktext",
  XREAL: "xreal",
  "手势快捷交互系统（New）": "xreal",
  手势交互: "gesture-interaction",
  "手势快捷方案：全局菜单": "quick-menu",
  "手势快捷方案：窗口调整": "window-resize",
  "Spatial Anchor": "spatial-anchor",
  "Spatial Anchor 算法产品化探索": "spatial-anchor",
  其他贡献: "other-contributions",
  Lab: "lab",
  "AI Agent 商业模拟器": "ai-agent-simulator",
  "商学模拟器AI Agent": "ai-agent-simulator",
  "3D Visual Experiments": "3d-visual-experiments",
};

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

function normalizePageId(id: string): string {
  return id.replace(/-/g, "").toLowerCase();
}

async function listChildPages(
  notion: Client,
  blockId: string,
): Promise<Array<{ title: string; id: string }>> {
  const pages: Array<{ title: string; id: string }> = [];
  let cursor: string | undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    });

    for (const block of response.results) {
      if (block.type === "child_page" && "child_page" in block) {
        pages.push({
          title: block.child_page.title,
          id: normalizePageId(block.id),
        });
      }
    }

    cursor = response.has_more
      ? (response.next_cursor ?? undefined)
      : undefined;
  } while (cursor);

  return pages;
}

async function scanTree(
  notion: Client,
  blockId: string,
  depth = 0,
  discovered: Record<string, string> = {},
): Promise<Record<string, string>> {
  const pages = await listChildPages(notion, blockId);
  const indent = "  ".repeat(depth);

  for (const page of pages) {
    const slug = TITLE_TO_SLUG[page.title];
    if (slug && !discovered[slug]) {
      discovered[slug] = page.id;
      console.log(`${indent}${page.title} → ${slug} → ${page.id}`);
    } else if (!slug) {
      console.log(`${indent}(unmapped) ${page.title} → ${page.id}`);
    }
    await scanTree(notion, page.id, depth + 1, discovered);
  }

  return discovered;
}

async function main() {
  const env = { ...process.env, ...loadEnvLocal() };
  const token = env.NOTION_TOKEN;
  const rootId = env.NOTION_ROOT_PAGE_ID;

  if (!token || !rootId) {
    console.error("Missing NOTION_TOKEN or NOTION_ROOT_PAGE_ID in .env.local");
    process.exit(1);
  }

  const notion = new Client({ auth: token });
  const root = normalizePageId(rootId);

  console.log(`Portfolio root: ${root}\n`);

  const discovered = await scanTree(notion, root);
  discovered.portfolio = root;

  console.log("\n--- Paste into src/data/projects.ts ---");
  console.log(JSON.stringify(discovered, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

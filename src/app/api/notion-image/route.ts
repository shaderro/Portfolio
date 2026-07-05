import { Client } from "@notionhq/client";
import { NextRequest, NextResponse } from "next/server";
import { normalizePageId } from "@/lib/notion-id";

function createClient(): Client | null {
  const token = process.env.NOTION_TOKEN;
  if (!token) return null;
  return new Client({ auth: token });
}

/** Proxies Notion file images so browsers get fresh signed URLs from the server. */
export async function GET(request: NextRequest) {
  const blockId = request.nextUrl.searchParams.get("blockId");
  if (!blockId) {
    return NextResponse.json({ error: "blockId is required" }, { status: 400 });
  }

  const notion = createClient();
  if (!notion) {
    return NextResponse.json({ error: "Notion is not configured" }, { status: 503 });
  }

  try {
    const block = await notion.blocks.retrieve({
      block_id: blockId.includes("-") ? blockId : normalizePageId(blockId),
    });

    if (!("type" in block) || block.type !== "image" || !block.image) {
      return NextResponse.json({ error: "Not an image block" }, { status: 404 });
    }

    const source =
      block.image.type === "file"
        ? block.image.file.url
        : block.image.type === "external"
          ? block.image.external.url
          : null;

    if (!source) {
      return NextResponse.json({ error: "Image source missing" }, { status: 404 });
    }

    const upstream = await fetch(source);
    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image from Notion" },
        { status: upstream.status },
      );
    }

    const bytes = await upstream.arrayBuffer();

    return new NextResponse(bytes, {
      headers: {
        "Content-Type":
          upstream.headers.get("content-type") ?? "application/octet-stream",
        "Cache-Control": "private, max-age=1800, stale-while-revalidate=600",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to load image" }, { status: 500 });
  }
}

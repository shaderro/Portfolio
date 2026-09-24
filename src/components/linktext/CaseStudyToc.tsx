"use client";

import { NotionToc } from "@/components/notion/NotionToc";
import type { NotionTocItem } from "@/types/notion-toc";

export function CaseStudyToc({ items }: { items: readonly NotionTocItem[] }) {
  return (
    <NotionToc
      items={[...items]}
      headingSelector="[data-toc]"
      getAnchorId={(item) => item.id}
    />
  );
}

"use client";

import dynamic from "next/dynamic";
import type { ExtendedRecordMap } from "notion-types";
import { NotionContainer } from "@/components/notion/NotionContainer";
import { NotionContentSkeleton } from "@/components/notion/NotionContentSkeleton";
import type { NotionTocItem } from "@/types/notion-toc";

const NotionPageClient = dynamic(
  () =>
    import("@/components/notion/NotionPageClient").then(
      (module) => module.NotionPageClient,
    ),
  {
    ssr: false,
    loading: () => (
      <NotionContainer>
        <NotionContentSkeleton />
      </NotionContainer>
    ),
  },
);

interface NotionContentShellProps {
  recordMap: ExtendedRecordMap;
  toc: NotionTocItem[];
}

export function NotionContentShell({
  recordMap,
  toc,
}: NotionContentShellProps) {
  return <NotionPageClient recordMap={recordMap} toc={toc} />;
}

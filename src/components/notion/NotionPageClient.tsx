"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import type { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import { NotionCode } from "@/components/notion/NotionCode";
import { NotionImage } from "@/components/notion/NotionImage";
import { NotionToc } from "@/components/notion/NotionToc";
import { NotionContainer } from "@/components/notion/NotionContainer";
import { mapNotionImageUrl } from "@/lib/map-notion-image-url";
import { getProjectByPageId, getProjectHref } from "@/lib/projects";
import type { NotionTocItem } from "@/types/notion-toc";

const Collection = dynamic(
  () =>
    import("react-notion-x/build/third-party/collection").then(
      (module) => module.Collection,
    ),
  { ssr: false },
);

const Equation = dynamic(
  () =>
    import("react-notion-x/build/third-party/equation").then(
      (module) => module.Equation,
    ),
  { ssr: false },
);

const Pdf = dynamic(
  () =>
    import("react-notion-x/build/third-party/pdf").then((module) => module.Pdf),
  { ssr: false },
);

const Modal = dynamic(
  () =>
    import("react-notion-x/build/third-party/modal").then(
      (module) => module.Modal,
    ),
  { ssr: false },
);

interface NotionPageClientProps {
  recordMap: ExtendedRecordMap;
  toc: NotionTocItem[];
}

function mapPageUrl(pageId: string): string {
  const project = getProjectByPageId(pageId);
  if (project) return getProjectHref(project.path);
  return "/projects";
}

export function NotionPageClient({ recordMap, toc }: NotionPageClientProps) {
  return (
    <>
      <NotionContainer>
        <div className="notion-page">
          <NotionRenderer
            recordMap={recordMap}
            fullPage={false}
            darkMode={false}
            disableHeader
            previewImages={false}
            forceCustomImages
            mapPageUrl={mapPageUrl}
            mapImageUrl={mapNotionImageUrl}
            components={{
              Code: NotionCode,
              Collection,
              Equation,
              Modal,
              Pdf,
              Image: NotionImage,
              nextLink: Link,
            }}
          />
        </div>
      </NotionContainer>
      <NotionToc items={toc} />
    </>
  );
}

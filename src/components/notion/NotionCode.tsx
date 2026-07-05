"use client";

import type { Block } from "notion-types";
import { getBlockTitle } from "notion-utils";
import { useNotionContext } from "react-notion-x";

/** Lightweight code block — avoids heavy third-party bundle hydration issues. */
export function NotionCode({
  block,
  className,
}: {
  block: Block;
  className?: string;
}) {
  const { recordMap } = useNotionContext();
  const content = getBlockTitle(block, recordMap);
  const language =
    block.properties?.language?.[0]?.[0]?.toLowerCase() ?? "plain";

  return (
    <pre
      className={`notion-code language-${language}${className ? ` ${className}` : ""}`}
      tabIndex={0}
    >
      <code className={`language-${language}`}>{content}</code>
    </pre>
  );
}

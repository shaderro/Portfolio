import { NotionErrorState } from "@/components/notion/NotionErrorState";
import { NotionContainer } from "@/components/notion/NotionContainer";
import { NotionContentShell } from "@/components/notion/NotionContentShell";
import { getNotionPage, NotionFetchError } from "@/lib/notion";
import { getNotionTableOfContents } from "@/lib/notion-toc";

interface NotionContentProps {
  pageId: string;
}

/** Server component — fetches Notion by pageId and renders inside site layout */
export async function NotionContent({ pageId }: NotionContentProps) {
  try {
    const recordMap = await getNotionPage(pageId);
    const toc = getNotionTableOfContents(recordMap, pageId);

    return <NotionContentShell recordMap={recordMap} toc={toc} />;
  } catch (error) {
    if (error instanceof NotionFetchError) {
      return (
        <NotionContainer>
          <NotionErrorState code={error.code} />
        </NotionContainer>
      );
    }
    return (
      <NotionContainer>
        <NotionErrorState code="FETCH_FAILED" />
      </NotionContainer>
    );
  }
}

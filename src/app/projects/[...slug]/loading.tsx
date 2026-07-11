import { NotionContentSkeleton } from "@/components/notion/NotionContentSkeleton";
import { NotionContainer } from "@/components/notion/NotionContainer";
import { Container } from "@/components/layout/Container";

export default function ProjectLoading() {
  return (
    <article>
      <Container size="article" className="pt-16 pb-6 md:pt-24 md:pb-8">
        <div className="animate-pulse">
          <div className="h-12 w-2/3 rounded bg-neutral-100 md:h-14" />
        </div>
      </Container>
      <NotionContainer>
        <NotionContentSkeleton />
      </NotionContainer>
    </article>
  );
}

import { NotionContentSkeleton } from "@/components/notion/NotionContentSkeleton";
import { NotionContainer } from "@/components/notion/NotionContainer";
import { Container } from "@/components/layout/Container";

export default function ProjectLoading() {
  return (
    <article>
      <Container className="border-b border-border py-12 md:py-16">
        <div className="animate-pulse space-y-6">
          <div className="h-4 w-24 rounded bg-neutral-100" />
          <div className="h-10 w-2/3 rounded bg-neutral-100" />
          <div className="h-5 w-full max-w-xl rounded bg-neutral-100" />
        </div>
      </Container>
      <NotionContainer>
        <NotionContentSkeleton />
      </NotionContainer>
    </article>
  );
}

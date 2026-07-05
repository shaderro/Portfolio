import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function ProjectNotFound() {
  return (
    <Container className="py-24">
      <div className="mx-auto max-w-lg text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          404
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950">
          Project not found
        </h1>
        <p className="mt-3 text-neutral-500">
          This project does not exist in the portfolio index.
        </p>
        <Link
          href="/projects"
          className="mt-8 inline-flex text-sm font-medium text-neutral-950 transition-colors hover:text-accent"
        >
          View all projects
        </Link>
      </div>
    </Container>
  );
}

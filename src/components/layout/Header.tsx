import Link from "next/link";
import { Container } from "./Container";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/90 backdrop-blur-sm">
      <Container size="landing" className="flex h-14 items-center md:h-16">
        <Link
          href="/"
          className="text-sm font-medium tracking-tight text-neutral-950 transition-opacity duration-200 hover:opacity-60"
          aria-label="Portfolio home"
        >
          Portfolio
        </Link>
      </Container>
    </header>
  );
}

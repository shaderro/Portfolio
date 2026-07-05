import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "ghost";

interface ButtonProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: ButtonVariant;
  showArrow?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "inline-flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800",
  ghost:
    "inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-950",
};

export function Button({
  variant = "primary",
  showArrow = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <Link className={cn(variantClasses[variant], className)} {...props}>
      {children}
      {showArrow && <ArrowRight className="size-4" aria-hidden="true" />}
    </Link>
  );
}

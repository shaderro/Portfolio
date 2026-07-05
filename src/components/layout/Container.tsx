import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  as?: "div" | "section" | "article";
  size?: "default" | "narrow" | "wide" | "article";
}

const sizeClasses = {
  default: "max-w-6xl",
  narrow: "max-w-3xl",
  wide: "max-w-7xl",
  article: "max-w-[820px]",
} as const;

export function Container({
  as: Component = "div",
  size = "default",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn("mx-auto w-full px-6 md:px-10", sizeClasses[size], className)}
      {...props}
    >
      {children}
    </Component>
  );
}

import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

/** Layout wrapper for Notion CMS content — editorial article width. */
export function NotionContainer({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[820px] px-6 pb-12 md:px-10 md:pb-[4.5rem]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

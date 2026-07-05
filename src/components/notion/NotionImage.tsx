"use client";

import type { ImgHTMLAttributes } from "react";

/** Native img with silent failure — prevents unhandled Event rejections in dev. */
export function NotionImage({
  src,
  alt,
  className,
  style,
  onError,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ""}
      className={className}
      style={style}
      loading="lazy"
      decoding="async"
      onError={(event) => {
        event.preventDefault?.();
        event.currentTarget.style.visibility = "hidden";
        onError?.(event);
      }}
      {...rest}
    />
  );
}

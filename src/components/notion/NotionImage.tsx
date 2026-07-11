"use client";

import type { ImgHTMLAttributes } from "react";

type NotionImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** Passed by react-notion-x for Next.js Image — not valid on native img. */
  priority?: boolean;
  placeholder?: string;
  blurDataURL?: string;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  unoptimized?: boolean;
};

/** Native img with silent failure — prevents unhandled Event rejections in dev. */
export function NotionImage({
  src,
  alt,
  className,
  style,
  width,
  height,
  onError,
  priority: _priority,
  placeholder: _placeholder,
  blurDataURL: _blurDataURL,
  fill: _fill,
  sizes: _sizes,
  quality: _quality,
  unoptimized: _unoptimized,
  ...rest
}: NotionImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ""}
      className={className}
      style={style}
      {...(typeof width === "number" ? { width } : {})}
      {...(typeof height === "number" ? { height } : {})}
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

const ICONS = {
  close: { src: "/images/linktext/icon-close.svg", size: 13 },
  speakerWord: { src: "/images/linktext/icon-speaker-word.svg", size: 18 },
  speakerSentence: { src: "/images/linktext/icon-speaker-sentence.svg", size: 13 },
  eye: { src: "/images/linktext/icon-eye.svg", size: 15 },
  chevronLeft: { src: "/images/linktext/icon-chevron-left.svg", size: 20 },
  avatar: { src: "/images/linktext/avatar.svg", size: 26 },
  logo: { src: "/images/linktext/logo.png", size: 25 },
} as const;

export type LtIconName = keyof typeof ICONS;

export function LtIcon({
  name,
  alt = "",
}: {
  name: LtIconName;
  alt?: string;
}) {
  const { src, size } = ICONS[name];
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="block max-w-none"
      style={{ width: size, height: size }}
    />
  );
}

export { ICONS };

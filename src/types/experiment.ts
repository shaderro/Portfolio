export type ExperimentEmbed =
  | { type: "iframe"; src: string; title: string; aspectRatio?: string }
  | { type: "video"; src: string; poster?: string; aspectRatio?: string }
  | { type: "unity"; src: string; title: string; aspectRatio?: string };

export interface Experiment {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  thumbnailAlt: string;
  techStack: string[];
  embed?: ExperimentEmbed;
  href?: string;
}

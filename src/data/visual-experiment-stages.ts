import type { UnityBuild } from "@/data/unity-builds";
import { unityBuilds } from "@/data/unity-builds";
import type { Locale } from "@/data/site";

export type ScrollStage =
  | {
      type: "unity";
      build: UnityBuild;
      title: string;
      description?: string;
      /** Optional scene name sent to Unity via SendMessage on section activate. */
      unityScene?: string;
      unityMessageTarget?: string;
    }
  | {
      type: "placeholder";
      title: string;
      description?: string;
      background?: "white" | "black";
    };

const interactionDemo = unityBuilds.find(
  (build) => build.id === "interaction-demo",
);
const interactionDemo1 = unityBuilds.find(
  (build) => build.id === "interaction-demo1",
);
const interactionDemo2 = unityBuilds.find(
  (build) => build.id === "interaction-demo2",
);

const stagesByLocale: Record<Locale, ScrollStage[]> = {
  zh: [
    ...(interactionDemo
      ? [
          {
            type: "unity" as const,
            build: interactionDemo,
            title: "Unity 交互实验",
            description: "移动鼠标体验交互",
          },
        ]
      : []),
    ...(interactionDemo1
      ? [
          {
            type: "unity" as const,
            build: interactionDemo1,
            title: "Unity 交互实验",
            description: "按空格键跳跃，然后按 wasd 键移动",
          },
        ]
      : []),
    ...(interactionDemo2
      ? [
          {
            type: "unity" as const,
            build: interactionDemo2,
            title: "Unity 交互实验",
            description: "按空格键投掷骰子",
          },
        ]
      : []),
  ],
  en: [
    ...(interactionDemo
      ? [
          {
            type: "unity" as const,
            build: interactionDemo,
            title: "Unity Interaction Experiment",
            description: "Move the mouse to interact",
          },
        ]
      : []),
    ...(interactionDemo1
      ? [
          {
            type: "unity" as const,
            build: interactionDemo1,
            title: "Unity Interaction Experiment",
            description: "Press Space to jump, then use WASD to move",
          },
        ]
      : []),
    ...(interactionDemo2
      ? [
          {
            type: "unity" as const,
            build: interactionDemo2,
            title: "Unity Interaction Experiment",
            description: "Press Space to throw the dice",
          },
        ]
      : []),
  ],
};

/** @deprecated Prefer getVisualExperimentStages(locale) */
export const visualExperimentStages: ScrollStage[] = stagesByLocale.zh;

export function getVisualExperimentStages(locale: Locale = "zh"): ScrollStage[] {
  return stagesByLocale[locale];
}

/** Viewport height below the site header (h-14). */
export const STAGE_HEIGHT_CLASS = "h-[calc(100svh-3.5rem)]";
export const STAGE_TOP_CLASS = "top-14";

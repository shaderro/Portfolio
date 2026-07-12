import type { UnityBuild } from "@/data/unity-builds";
import { unityBuilds } from "@/data/unity-builds";

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

export const visualExperimentStages: ScrollStage[] = [
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
          description: "按空格键跳跃，然后按wasd键移动",
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
];

/** Viewport height below the site header (h-14). */
export const STAGE_HEIGHT_CLASS = "h-[calc(100svh-3.5rem)]";
export const STAGE_TOP_CLASS = "top-14";

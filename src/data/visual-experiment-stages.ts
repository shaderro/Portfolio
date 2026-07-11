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
          description: "在浏览器中体验空间交互原型。",
        },
      ]
    : []),
  ...(interactionDemo1
    ? [
        {
          type: "unity" as const,
          build: interactionDemo1,
          title: "生成式视觉",
          description: "参数化形态与实时渲染实验。",
        },
      ]
    : []),
  ...(interactionDemo2
    ? [
        {
          type: "unity" as const,
          build: interactionDemo2,
          title: "Offertory Box",
          description: "空间交互与物理反馈实验。",
        },
      ]
    : []),
];

/** Viewport height below the site header (h-14). */
export const STAGE_HEIGHT_CLASS = "h-[calc(100svh-3.5rem)]";
export const STAGE_TOP_CLASS = "top-14";

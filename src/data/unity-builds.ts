/** Unity WebGL build placed under public/unity/{id}/Build/ */
export interface UnityBuild {
  /** Folder name under public/unity/ */
  id: string;
  /** File prefix, e.g. "FinalSceneBuild" → FinalSceneBuild.loader.js */
  buildName: string;
  /** Unity publish compression setting */
  compression?: "gzip" | "brotli" | "none";
  title: string;
  description?: string;
  /** Full reload after this many ms while the section is active. */
  autoReloadMs?: number;
}

export const unityBuilds: UnityBuild[] = [
  {
    id: "interaction-demo",
    buildName: "FinalSceneBuild",
    compression: "gzip",
    title: "Unity 交互实验",
    description: "在浏览器中体验空间交互原型。",
    autoReloadMs: 90_000,
  },
  {
    id: "interaction-demo1",
    buildName: "EyeballJumpBuild",
    compression: "gzip",
    title: "生成式视觉",
    description: "参数化形态与实时渲染实验。",
  },
  {
    id: "interaction-demo2",
    buildName: "OffertoryBoxBuild",
    compression: "brotli",
    title: "Offertory Box",
    description: "空间交互与物理反馈实验。",
  },
];

import type { Locale } from "@/data/site";

/** Localized copy for the home page project index / project metadata. */
export const indexContent: Record<
  Locale,
  Record<string, { title?: string; description?: string }>
> = {
  zh: {
    "/projects/linktext": {
      title: "LinkText",
      description:
        "从阅读出发，构建 AI 驱动的语言学习体验，将碎片化内容转化为持续积累的知识。",
    },
    "/projects/xreal": {
      title: "XREAL",
      description:
        "围绕消费级 AR 眼镜，探索自然、高效且可规模化的空间交互体验。",
    },
    "/projects/xreal/gesture-interaction": {
      title: "手势快捷交互系统",
      description: "构建适用于空间界面的手势交互语言与输入模型。",
    },
    "/projects/xreal/gesture-interaction/quick-menu": {
      title: "全局菜单",
      description: "通过注视与手势组合，实现高效的全局功能调用。",
    },
    "/projects/xreal/gesture-interaction/input-model": {
      title: "窗口调整",
      description: "面向三维空间的窗口移动、缩放与旋转交互。",
    },
    "/projects/xreal/spatial-anchor": {
      title: "Spatial Anchor算法产品化探索",
      description:
        "探索空间锚点能力如何转化为用户可理解、可使用的产品体验。",
    },
    "/projects/lab/ai-agent-simulator": {
      title: "商业模拟游戏中的 AI Agent",
      description:
        "酒店经营商业模拟游戏中的 AI Learning Agent，为玩家提供持续的商业学习支持。",
    },
    "/projects/lab/3d-visual-experiments": {
      title: "3D 交互与创意编程",
      description: "围绕 Unity 与生成式视觉进行交互实验。",
    },
  },
  en: {
    "/projects/linktext": {
      title: "LinkText",
      description:
        "Building AI-driven language learning from reading, turning fragmented content into accumulated knowledge.",
    },
    "/projects/xreal": {
      title: "XREAL",
      description:
        "Exploring natural, efficient, and scalable spatial interaction for consumer AR glasses.",
    },
    "/projects/xreal/gesture-interaction": {
      title: "Gesture Interaction System",
      description:
        "Building gesture interaction language and input models for spatial interfaces.",
    },
    "/projects/xreal/gesture-interaction/quick-menu": {
      title: "Gesture-Based Spatial Menu",
      description:
        "Efficient global function access through gaze and gesture combinations.",
    },
    "/projects/xreal/gesture-interaction/input-model": {
      title: "Gesture Interaction Solution: Window Adjustment",
      description:
        "Move, scale, and rotate windows in three-dimensional space.",
    },
    "/projects/xreal/spatial-anchor": {
      title: "Spatial Anchor Productization Exploration",
      description:
        "Translating spatial anchor capabilities into product experiences users can understand and use.",
    },
    "/projects/lab/ai-agent-simulator": {
      title: "Business Simulation AI Agent",
      description:
        "An AI Learning Agent in a hotel management simulation game that provides ongoing business learning support for players.",
    },
    "/projects/lab/3d-visual-experiments": {
      title: "3D & Creative Coding",
      description:
        "Interaction experiments with Unity and generative visuals.",
    },
  },
};

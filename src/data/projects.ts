import type { ProjectNode } from "@/types/project";

/**
 * Portfolio CMS configuration.
 *
 * Structure mirrors your Notion workspace under the Portfolio root page.
 * Replace `pageId` values here only — routes and UI update automatically.
 *
 * Run `npm run notion:sync` to discover page IDs from Notion.
 */
export const projectTree: ProjectNode[] = [
  {
    slug: "linktext",
    title: "LinkText",
    subtitle: "AI-native Language Learning System",
    summary:
      "从阅读出发，构建 AI 驱动的语言学习体验，将碎片化内容转化为持续积累的知识。",
    description:
      "从阅读出发，构建 AI 驱动的语言学习体验，将碎片化内容转化为持续积累的知识。",
    tags: ["AI Workflow", "Knowledge Structure", "Prompt Design", "LLM"],
    coverImage: "/images/projects/linktext.svg",
    coverAlt: "LinkText AI language learning app",
    pageId: "35f3e8e3610f80788222e6cd6fbf31e8",
  },
  {
    slug: "xreal",
    title: "XREAL",
    subtitle: "XR Interaction Design",
    summary:
      "围绕消费级 AR 眼镜，探索自然、高效且可规模化的空间交互体验。",
    description:
      "围绕消费级 AR 眼镜，\n探索自然、高效且可规模化的空间交互体验。",
    tags: [],
    coverImage: "/images/projects/xreal.svg",
    coverAlt: "XREAL spatial interaction system",
    pageId: "38e3e8e3610f805abb66e929b5a75542",
    collapsible: true,
    children: [
      {
        slug: "gesture-interaction",
        title: "手势快捷交互系统",
        description: "构建适用于空间界面的手势交互语言与输入模型。",
        tags: [],
        coverImage: "/images/projects/gesture-interaction.svg",
        coverAlt: "XREAL gesture interaction",
        pageId: "38e3e8e3610f805abb66e929b5a75542",
        children: [
          {
            slug: "quick-menu",
            title: "全局菜单",
            description: "通过注视与手势组合，实现高效的全局功能调用。",
            tags: [],
            coverImage: "/images/projects/gesture-interaction.svg",
            coverAlt: "XREAL global menu",
            pageId: "37b3e8e3610f8039a2d8e4e2c165fc4c",
          },
          {
            slug: "input-model",
            title: "窗口调整",
            description: "面向三维空间的窗口移动、缩放与旋转交互。",
            tags: [],
            coverImage: "/images/projects/gesture-interaction.svg",
            coverAlt: "XREAL window manipulation",
            pageId: "3823e8e3610f80ba903bc2dd9d16955f",
          },
        ],
      },
      {
        slug: "spatial-anchor",
        title: "Spatial Anchor算法产品化探索",
        description:
          "探索空间锚点能力如何转化为用户可理解、可使用的产品体验。",
        tags: [],
        coverImage: "/images/projects/spatial-anchor.svg",
        coverAlt: "XREAL spatial anchor",
        pageId: "38e3e8e3610f8027acd6d1dfcd9acd61",
      },
    ],
  },
  {
    slug: "lab",
    title: "Lab",
    description: "Interactive prototypes, demos, and spatial UI explorations.",
    tags: [],
    coverImage: "/images/lab/3d-visual-experiments.svg",
    coverAlt: "Lab experiments",
    pageId: "",
    children: [
      {
        slug: "ai-agent-simulator",
        title: "商业模拟游戏中的AI Agent",
        description:
          "酒店经营商业模拟游戏中的 AI Learning Agent，为玩家提供持续的商业学习支持。",
        tags: [],
        coverImage: "/images/lab/ai-agent-simulator.svg",
        coverAlt: "AI Agent business simulator",
        pageId: "3933e8e3610f807b80a5c52670bf92fb",
      },
      {
        slug: "3d-visual-experiments",
        title: "3D 交互与创意编程",
        description: "围绕 Unity 与生成式视觉进行交互实验。",
        tags: [],
        coverImage: "/images/lab/3d-visual-experiments.svg",
        coverAlt: "3D interaction and creative coding",
        pageId: "",
        standalone: true,
      },
    ],
  },
];

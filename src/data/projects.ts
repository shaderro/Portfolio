import type { ProjectNode } from "@/types/project";

/**
 * Portfolio CMS configuration.
 *
 * `pageId` = Chinese Notion page · `pageIdEn` = English Notion page
 * Run `npm run notion:sync` to discover page IDs from Notion.
 */
export const projectTree: ProjectNode[] = [
  {
    slug: "linktext",
    title: "LinkText",
    titleEn: "LinkText",
    subtitle: "AI 原生语言学习系统",
    subtitleEn: "AI-native Language Learning System",
    summary:
      "从阅读出发，构建 AI 驱动的语言学习体验，将碎片化内容转化为持续积累的知识。",
    summaryEn:
      "Building AI-driven language learning from reading, turning fragmented content into accumulated knowledge.",
    description:
      "从阅读出发，构建 AI 驱动的语言学习体验，将碎片化内容转化为持续积累的知识。",
    descriptionEn:
      "Building AI-driven language learning from reading, turning fragmented content into accumulated knowledge.",
    tags: ["AI Workflow", "Knowledge Structure", "Prompt Design", "LLM"],
    coverImage: "/images/projects/linktext.svg",
    coverAlt: "LinkText AI language learning app",
    pageId: "35f3e8e3610f80788222e6cd6fbf31e8",
    pageIdEn: "3b13e8e3610f801cafb2e2f9c5a588fa",
  },
  {
    slug: "xreal",
    title: "XREAL",
    titleEn: "XREAL",
    subtitle: "XR 交互设计",
    subtitleEn: "XR Interaction Design",
    summary:
      "围绕消费级 AR 眼镜，探索自然、高效且可规模化的空间交互体验。",
    summaryEn:
      "Exploring natural, efficient, and scalable spatial interaction for consumer AR glasses.",
    description:
      "围绕消费级 AR 眼镜，探索自然、高效且可规模化的空间交互体验。",
    descriptionEn:
      "Exploring natural, efficient, and scalable spatial interaction for consumer AR glasses.",
    tags: [],
    coverImage: "/images/projects/xreal.svg",
    coverAlt: "XREAL spatial interaction system",
    // Parent index page shares the gesture-system Notion doc in both locales.
    pageId: "38e3e8e3610f805abb66e929b5a75542",
    pageIdEn: "3b23e8e3610f80099e79eb642ed016d3",
    collapsible: true,
    children: [
      {
        slug: "gesture-interaction",
        title: "手势快捷交互系统",
        titleEn: "Gesture Interaction System",
        description: "构建适用于空间界面的手势交互语言与输入模型。",
        descriptionEn:
          "Building gesture interaction language and input models for spatial interfaces.",
        tags: [],
        coverImage: "/images/projects/gesture-interaction.svg",
        coverAlt: "XREAL gesture interaction",
        pageId: "38e3e8e3610f805abb66e929b5a75542",
        pageIdEn: "3b23e8e3610f80099e79eb642ed016d3",
        children: [
          {
            slug: "quick-menu",
            title: "全局菜单",
            titleEn: "Gesture-Based Spatial Menu",
            description: "通过注视与手势组合，实现高效的全局功能调用。",
            descriptionEn:
              "Efficient global function access through gaze and gesture combinations.",
            tags: [],
            coverImage: "/images/projects/gesture-interaction.svg",
            coverAlt: "XREAL global menu",
            pageId: "37b3e8e3610f8039a2d8e4e2c165fc4c",
            pageIdEn: "3b23e8e3610f802fa2aae5dad6de7697",
          },
          {
            slug: "input-model",
            title: "窗口调整",
            titleEn: "Gesture Interaction Solution: Window Adjustment",
            description: "面向三维空间的窗口移动、缩放与旋转交互。",
            descriptionEn:
              "Move, scale, and rotate windows in three-dimensional space.",
            tags: [],
            coverImage: "/images/projects/gesture-interaction.svg",
            coverAlt: "XREAL window manipulation",
            pageId: "3823e8e3610f80ba903bc2dd9d16955f",
            pageIdEn: "3b23e8e3610f80a48cf4ebcceb5465f7",
          },
        ],
      },
      {
        slug: "spatial-anchor",
        title: "Spatial Anchor算法产品化探索",
        titleEn: "Spatial Anchor Productization Exploration",
        description:
          "探索空间锚点能力如何转化为用户可理解、可使用的产品体验。",
        descriptionEn:
          "Translating spatial anchor capabilities into product experiences users can understand and use.",
        tags: [],
        coverImage: "/images/projects/spatial-anchor.svg",
        coverAlt: "XREAL spatial anchor",
        pageId: "38e3e8e3610f8027acd6d1dfcd9acd61",
        pageIdEn: "3b33e8e3610f80ce8254ca8c1d20cfee",
      },
    ],
  },
  {
    slug: "lab",
    title: "Lab",
    titleEn: "Lab",
    description: "交互原型、演示与空间 UI 探索。",
    descriptionEn:
      "Interactive prototypes, demos, and spatial UI explorations.",
    tags: [],
    coverImage: "/images/lab/3d-visual-experiments.svg",
    coverAlt: "Lab experiments",
    pageId: "",
    children: [
      {
        slug: "ai-agent-simulator",
        title: "商业模拟游戏中的AI Agent",
        titleEn: "Business Simulation AI Agent",
        description:
          "酒店经营商业模拟游戏中的 AI Learning Agent，为玩家提供持续的商业学习支持。",
        descriptionEn:
          "An AI Learning Agent in a hotel management simulation game that provides ongoing business learning support for players.",
        tags: [],
        coverImage: "/images/lab/ai-agent-simulator.svg",
        coverAlt: "AI Agent business simulator",
        pageId: "3933e8e3610f807b80a5c52670bf92fb",
        pageIdEn: "3b33e8e3610f8062a5deed18bd40f73e",
      },
      {
        slug: "3d-visual-experiments",
        title: "3D 交互与创意编程",
        titleEn: "3D & Creative Coding",
        description: "围绕 Unity 与生成式视觉进行交互实验。",
        descriptionEn:
          "Interaction experiments with Unity and generative visuals.",
        tags: [],
        coverImage: "/images/lab/3d-visual-experiments.svg",
        coverAlt: "3D interaction and creative coding",
        // Standalone Unity page; Chinese Notion doc exists but no EN counterpart yet.
        pageId: "3943e8e3610f803fa112e75b7ccebc2b",
        standalone: true,
      },
    ],
  },
];

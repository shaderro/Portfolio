/** Homepage landing content — Chinese-first UI; keep structure easy to extend. */
export const landingContent = {
  featured: {
    href: "/projects/linktext",
    title: "LinkText",
    subtitle: "AI-native Language Learning System",
    description:
      "从阅读出发，构建 AI 驱动的语言学习体验，将碎片化内容转化为持续积累的知识。",
    tags: ["AI Workflow", "Knowledge Structure", "Prompt Design", "LLM"],
  },
  selectedWorks: {
    label: "Selected Works",
    xreal: {
      title: "XREAL",
      description:
        "围绕消费级 AR 眼镜，探索自然、高效且可规模化的空间交互体验。",
      items: [
        {
          title: "手势快捷交互系统",
          href: "/projects/xreal/gesture-interaction",
          children: [
            {
              title: "全局菜单",
              href: "/projects/xreal/gesture-interaction/quick-menu",
            },
            {
              title: "窗口调整",
              href: "/projects/xreal/gesture-interaction/input-model",
            },
          ],
        },
        {
          title: "Spatial Anchor算法产品化探索",
          href: "/projects/xreal/spatial-anchor",
        },
      ],
    },
    research: {
      title: "Research",
      items: [
        {
          title: "商业模拟游戏中的 AI Agent",
          description:
            "酒店经营商业模拟游戏中的 AI Learning Agent，为玩家提供持续的商业学习支持。",
          href: "/projects/lab/ai-agent-simulator",
        },
        {
          title: "3D 交互与创意编程",
          description: "围绕 Unity 与生成式视觉进行交互实验。",
          href: "/projects/lab/3d-visual-experiments",
        },
      ],
    },
  },
} as const;

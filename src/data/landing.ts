import type { Locale } from "@/data/site";

export type LandingItem = {
  title: string;
  description?: string;
  href: string;
  children?: readonly LandingItem[];
};

export type LandingContent = {
  featured: {
    label: string;
    href: string;
    title: string;
    subtitle: string;
    description: string;
    tags: readonly string[];
  };
  selectedWorks: {
    label: string;
    xreal: {
      title: string;
      description: string;
      items: readonly LandingItem[];
    };
    research: {
      title: string;
      items: readonly LandingItem[];
    };
  };
};

const landingZh: LandingContent = {
  featured: {
    label: "精选项目",
    href: "/projects/linktext",
    title: "LinkText",
    subtitle: "AI 原生语言学习系统",
    description:
      "从阅读出发，构建 AI 驱动的语言学习体验，将碎片化内容转化为持续积累的知识。",
    tags: ["AI Workflow", "Knowledge Structure", "Prompt Design", "LLM"],
  },
  selectedWorks: {
    label: "精选作品",
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
      title: "研究",
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
};

const landingEn: LandingContent = {
  featured: {
    label: "Featured Project",
    href: "/projects/linktext",
    title: "LinkText",
    subtitle: "AI-native Language Learning System",
    description:
      "Building AI-driven language learning from reading, turning fragmented content into accumulated knowledge.",
    tags: ["AI Workflow", "Knowledge Structure", "Prompt Design", "LLM"],
  },
  selectedWorks: {
    label: "Selected Works",
    xreal: {
      title: "XREAL",
      description:
        "Exploring natural, efficient, and scalable spatial interaction for consumer AR glasses.",
      items: [
        {
          title: "Gesture Interaction System",
          href: "/projects/xreal/gesture-interaction",
          children: [
            {
              title: "Gesture-Based Spatial Menu",
              href: "/projects/xreal/gesture-interaction/quick-menu",
            },
            {
              title: "Gesture Interaction Solution: Window Adjustment",
              href: "/projects/xreal/gesture-interaction/input-model",
            },
          ],
        },
        {
          title: "Spatial Anchor Productization Exploration",
          href: "/projects/xreal/spatial-anchor",
        },
      ],
    },
    research: {
      title: "Research",
      items: [
        {
          title: "Business Simulation AI Agent",
          description:
            "An AI Learning Agent in a hotel management simulation game that provides ongoing business learning support for players.",
          href: "/projects/lab/ai-agent-simulator",
        },
        {
          title: "3D & Creative Coding",
          description:
            "Interaction experiments with Unity and generative visuals.",
          href: "/projects/lab/3d-visual-experiments",
        },
      ],
    },
  },
};

export const landingContent: Record<Locale, LandingContent> = {
  zh: landingZh,
  en: landingEn,
};

import type { Locale } from "@/data/site";

export type LandingItem = {
  title: string;
  description?: string;
  href: string;
  children?: readonly LandingItem[];
};

export type FeaturedCase = {
  number: string;
  title: string;
  description: string;
  tags: string;
  href: string;
};

export type LandingContent = {
  featured: {
    label: string;
    href: string;
    title: string;
    subtitle: string;
    description: string;
    tags: string;
    viewProject: string;
    casesLabel: string;
    casesIntro: string;
    cases: readonly FeaturedCase[];
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
      "围绕真实阅读构建 AI 驱动的语言学习系统，将碎片化交互转化为可积累的结构化知识。",
    tags: "AI Product · Knowledge Structure · LLM · 0→1",
    viewProject: "查看项目",
    casesLabel: "UI/UX 案例",
    casesIntro: "两段设计探索，重新思考 LinkText 如何运作、呈现与扩展。",
    cases: [
      {
        number: "01",
        title: "从 Vibe Coding 到设计系统",
        description:
          "将 LinkText 从功能原型重构为连贯的产品体验。",
        tags: "UX Architecture · UI Design · Design System",
        href: "/projects/linktext/design-system",
      },
      {
        number: "02",
        title: "从桌面到移动端",
        description: "为更小的屏幕重新思考交互式阅读。",
        tags: "Responsive Design · Mobile UX · Interaction Design · Prototyping",
        href: "/projects/linktext/mobile",
      },
    ],
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
          description:
            "为空间计算设计基于手势的交互模型，从交互原则到产品化落地。",
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
          title: "Spatial Anchor 产品化",
          description:
            "探索空间锚点如何成为可规模化的消费级 AR 交互能力。",
          href: "/projects/xreal/spatial-anchor",
        },
      ],
    },
    research: {
      title: "实验",
      items: [
        {
          title: "商业模拟游戏中的 AI Agent",
          description:
            "嵌入酒店经营模拟游戏的 AI 学习助手，通过玩法为玩家提供持续的商业学习支持。",
          href: "/projects/lab/ai-agent-simulator",
        },
        {
          title: "3D 交互与创意编程",
          description:
            "围绕 Unity、生成式视觉、3D 环境与创意编程的交互实验。",
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
      "Building an AI-driven language learning system around real-world reading — turning fragmented interactions into structured, accumulated knowledge.",
    tags: "AI Product · Knowledge Structure · LLM · 0→1",
    viewProject: "View Project",
    casesLabel: "UI/UX Case Studies",
    casesIntro:
      "Two design explorations that rethink how LinkText works, looks, and scales.",
    cases: [
      {
        number: "01",
        title: "From Vibe Coding to a Design System",
        description:
          "Reframing LinkText from a functional prototype into a coherent product experience.",
        tags: "UX Architecture · UI Design · Design System",
        href: "/projects/linktext/design-system",
      },
      {
        number: "02",
        title: "From Desktop to Mobile",
        description: "Re-thinking interactive reading for smaller screens.",
        tags: "Responsive Design · Mobile UX · Interaction Design · Prototyping",
        href: "/projects/linktext/mobile",
      },
    ],
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
          description:
            "Designing a gesture-based interaction model for spatial computing, from interaction principles to productization.",
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
          title: "Spatial Anchor Productization",
          description:
            "Exploring how spatial anchors could become a scalable consumer AR interaction capability.",
          href: "/projects/xreal/spatial-anchor",
        },
      ],
    },
    research: {
      title: "Experiment",
      items: [
        {
          title: "Business Simulation AI Agent",
          description:
            "An AI learning agent embedded in a hotel management simulation game, providing ongoing business learning support through gameplay.",
          href: "/projects/lab/ai-agent-simulator",
        },
        {
          title: "3D & Creative Coding",
          description:
            "Interaction experiments exploring Unity, generative visuals, 3D environments, and creative coding.",
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

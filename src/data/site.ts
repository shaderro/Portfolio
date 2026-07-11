export type Locale = "en" | "zh";

export const siteConfig = {
  name: "周染心",
  description:
    "产品设计师 / 独立开发者，专注于 AI 原生产品、交互系统与空间计算。",
  social: {
    email: "ranxin.zhou@example.com",
    github: "https://github.com/ranxinzhou",
    linkedin: "https://linkedin.com/in/ranxinzhou",
  },
} as const;

export const homeContent = {
  en: {
    hero: {
      name: "Ranxin Zhou",
      role: "Product Designer / Independent Developer",
      intro:
        "Focused on AI-native products, interaction systems, and spatial computing.",
    },
    lab: {
      title: "Lab",
    },
    contact: {
      copyright: (year: number) => `© ${year} Ranxin Zhou`,
    },
    toc: "Contents",
  },
  zh: {
    hero: {
      name: "周染心",
      role: "产品设计师 / 独立开发者",
      intro: "专注于 AI 原生产品、交互系统与空间计算。",
    },
    lab: {
      title: "Lab",
    },
    contact: {
      copyright: (year: number) => `© ${year} 周染心`,
    },
    toc: "目录",
  },
} as const;

export const featuredProjects = [
  {
    slug: "linktext",
    subtitle: {
      en: "AI Language Learning Platform",
      zh: "AI 语言学习平台",
    },
    description: {
      en: "Building AI-driven language learning from reading, turning fragmented content into accumulated knowledge.",
      zh: "从阅读出发，构建 AI 驱动的语言学习体验，将碎片化内容转化为持续积累的知识。",
    },
  },
  {
    slug: "xreal",
    subtitle: {
      en: "XR Interaction Design",
      zh: "XR 交互设计",
    },
    description: {
      en: "Exploring natural, efficient, and scalable spatial interaction for consumer AR glasses.",
      zh: "围绕消费级 AR 眼镜，探索自然、高效且可规模化的空间交互体验。",
    },
  },
] as const;

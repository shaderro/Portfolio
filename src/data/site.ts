export type Locale = "en" | "zh";

export const siteConfig = {
  name: "Ranxin Zhou",
  description:
    "AI Product Designer focused on AI-native products, spatial computing, and intelligent interfaces.",
  social: {
    email: "ranxin.zhou@example.com",
    github: "https://github.com/ranxinzhou",
    linkedin: "https://linkedin.com/in/ranxinzhou",
  },
} as const;

export const homeContent = {
  en: {
    hero: {
      role: "AI Product Designer",
      tagline: [
        "Designing AI-native products,",
        "Spatial Computing,",
        "and Intelligent Interfaces.",
      ],
      intro:
        "I design intelligent systems that bridge AI capabilities and human interaction.",
      interestsLabel: "Current interests",
      interests: [
        "AI Agents",
        "Spatial Computing",
        "Language Learning",
        "Human-AI Interaction",
      ],
      scroll: "Scroll",
    },
    featured: {
      title: "Selected Work",
      cta: "Read Case Study",
    },
    lab: {
      title: "Lab",
    },
    about: {
      title: "About",
      bio: "I'm an AI Product Designer interested in AI-native products, XR interaction and spatial computing.",
      previous: "Previously Product Designer at XREAL.",
      educationLabel: "Education",
      education: [
        "RISD",
        "Brown University (Computer Science coursework)",
        "Harvard Business School Online CORe",
      ],
    },
    contact: {
      copyright: (year: number) => `© ${year} Ranxin Zhou`,
    },
    toc: "Contents",
  },
  zh: {
    hero: {
      role: "AI 产品设计师",
      tagline: [
        "设计 AI 原生产品、",
        "空间计算",
        "与智能交互界面。",
      ],
      intro: "我设计连接 AI 能力与人类交互的智能系统。",
      interestsLabel: "当前关注",
      interests: [
        "AI Agent",
        "空间计算",
        "语言学习",
        "人机交互",
      ],
      scroll: "向下滚动",
    },
    featured: {
      title: "精选项目",
      cta: "阅读案例",
    },
    lab: {
      title: "实验室",
    },
    about: {
      title: "关于",
      bio: "我是一名 AI 产品设计师，关注 AI 原生产品、XR 交互与空间计算。",
      previous: "曾任 XREAL 产品设计师。",
      educationLabel: "教育背景",
      education: [
        "罗德岛设计学院 RISD",
        "布朗大学（计算机科学课程）",
        "哈佛商学院在线 CORe",
      ],
    },
    contact: {
      copyright: (year: number) => `© ${year} Ranxin Zhou`,
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
      en: "Building an AI-powered reading system that transforms natural language into structured knowledge and interactive learning.",
      zh: "构建 AI 驱动的阅读系统，将自然语言转化为结构化知识与交互式学习体验。",
    },
  },
  {
    slug: "xreal",
    subtitle: {
      en: "XR Interaction Design",
      zh: "XR 交互设计",
    },
    description: {
      en: "Designing interaction systems for consumer AR glasses, including gesture interaction and spatial computing research.",
      zh: "为消费级 AR 眼镜设计交互系统，涵盖手势交互与空间计算研究。",
    },
  },
] as const;

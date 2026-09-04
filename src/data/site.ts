export type Locale = "en" | "zh";

export const siteConfig = {
  name: "周染心",
  nameEn: "Ranxin Zhou",
  description:
    "AI Product Designer / XR Product Designer。擅长从 0→1 定义产品形态，将复杂系统能力抽象为清晰的产品模型，并转化为自然、易理解、可落地的用户体验。",
  descriptionEn:
    "AI Product Designer / XR Product Designer. Defines product form from 0→1, abstracts complex system capabilities into clear product models, and turns them into natural, understandable, and shippable user experiences.",
  social: {
    email: "ranxinzhou2000@gmail.com",
    github: "https://github.com/ranxinzhou",
    linkedin: "https://linkedin.com/in/ranxinzhou",
  },
} as const;

export const homeContent = {
  en: {
    hero: {
      name: "Ranxin Zhou",
      role: "AI Product Designer / XR Product Designer",
      intro:
        "Defines product form from 0→1, abstracts complex system capabilities into clear product models, and turns them into natural, understandable, and shippable user experiences.",
    },
    lab: {
      title: "Research",
    },
    contact: {
      label: "contact",
      copyright: (year: number) => `© ${year} Ranxin Zhou`,
    },
    toc: "Contents",
    ui: {
      back: "← Back",
      labEyebrow: "3D Lab",
      featuredLabel: "Featured Project",
      selectedWorksLabel: "Selected Works",
    },
  },
  zh: {
    hero: {
      name: "周染心",
      role: "AI Product Designer / XR Product Designer",
      intro:
        "擅长从 0→1 定义产品形态，将复杂系统能力抽象为清晰的产品模型，并转化为自然、易理解、可落地的用户体验。",
    },
    lab: {
      title: "研究",
    },
    contact: {
      label: "contact",
      copyright: (year: number) => `© ${year} 周染心`,
    },
    toc: "目录",
    ui: {
      back: "← 返回",
      labEyebrow: "3D Lab",
      featuredLabel: "精选项目",
      selectedWorksLabel: "精选作品",
    },
  },
} as const;

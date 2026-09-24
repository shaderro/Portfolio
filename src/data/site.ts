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
        "I define product form from 0→1, turn complex systems into clear interaction models, and translate them into thoughtful, understandable, and shippable experiences.",
    },
    nav: {
      work: "Work",
      about: "About",
    },
    about: {
      label: "About",
      lead: "Product designer working across AI, XR, and interactive systems.",
      p1: "I enjoy working at the intersection of product thinking, interaction design, and technology — especially when the product is still being figured out.",
      p2: "From defining product models and interaction systems to building prototypes and working directly with code, I like turning ambiguous ideas into things people can actually use.",
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
        "我从 0→1 定义产品形态，把复杂系统转成清晰的交互模型，并落地为克制、易理解、可交付的体验。",
    },
    nav: {
      work: "作品",
      about: "关于",
    },
    about: {
      label: "关于",
      lead: "面向 AI、XR 与交互系统的产品设计师。",
      p1: "我喜欢在产品思考、交互设计与技术的交汇处工作——尤其是产品形态仍在被定义的时候。",
      p2: "从定义产品模型与交互系统，到亲手做原型、直接写代码，我习惯把模糊的想法做成人们真正能用的东西。",
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

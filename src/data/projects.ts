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
    subtitle: "AI Language Learning Platform",
    summary:
      "Building an AI-powered reading system that transforms natural language into structured knowledge and interactive learning.",
    meta: "AI · PRODUCT DESIGN · FOUNDING DESIGNER",
    description: "AI language learning that reads what you read.",
    tags: ["AI", "PRODUCT", "0->1"],
    coverImage: "/images/projects/linktext.svg",
    coverAlt: "LinkText AI language learning app",
    pageId: "35f3e8e3610f80788222e6cd6fbf31e8",
    year: "2025",
  },
  {
    slug: "xreal",
    title: "XREAL",
    subtitle: "XR Interaction Design",
    summary:
      "Designing interaction systems for consumer AR glasses, including gesture interaction and spatial computing research.",
    meta: "XR · SPATIAL INTERACTION · FOUNDING DESIGNER",
    description: "Spatial interaction system for consumer AR glasses.",
    tags: ["XR", "INTERACTION"],
    coverImage: "/images/projects/xreal.svg",
    coverAlt: "XREAL spatial interaction system",
    pageId: "38e3e8e3610f805abb66e929b5a75542",
    year: "2024",
    collapsible: true,
    children: [
      {
        slug: "gesture-interaction",
        title: "手势交互",
        description:
          "Hand-gesture interaction vocabulary for spatial UIs.",
        tags: ["XR", "GESTURE"],
        coverImage: "/images/projects/gesture-interaction.svg",
        coverAlt: "XREAL gesture interaction",
        pageId: "38e3e8e3610f805abb66e929b5a75542",
        children: [
          {
            slug: "quick-menu",
            title: "快捷菜单",
            description:
              "Rapid-access spatial menu triggered by gaze + pinch.",
            tags: ["XR", "GESTURE"],
            coverImage: "/images/projects/gesture-interaction.svg",
            coverAlt: "XREAL quick menu",
            pageId: "",
          },
          {
            slug: "input-model",
            title: "双阶段输入模型",
            description:
              "Gaze-to-select, gesture-to-confirm: a two-stage input grammar.",
            tags: ["XR", "GESTURE"],
            coverImage: "/images/projects/gesture-interaction.svg",
            coverAlt: "XREAL two-stage input model",
            pageId: "",
          },
        ],
      },
      {
        slug: "spatial-anchor",
        title: "Spatial Anchor",
        description:
          "Persistent spatial anchors for multi-user shared AR experiences.",
        tags: ["XR", "SPATIAL"],
        coverImage: "/images/projects/spatial-anchor.svg",
        coverAlt: "XREAL spatial anchor",
        pageId: "38e3e8e3610f8027acd6d1dfcd9acd61",
      },
    ],
  },
  {
    slug: "lab",
    title: "Lab",
    meta: "LAB · EXPERIMENTS · PROTOTYPES",
    description: "Interactive prototypes, demos, and spatial UI explorations.",
    tags: ["LAB"],
    coverImage: "/images/lab/3d-visual-experiments.svg",
    coverAlt: "Lab experiments",
    pageId: "",
    children: [
      {
        slug: "ai-agent-simulator",
        title: "AI Agent 商业模拟器",
        description:
          "Simulated business environments for testing AI agent decision-making.",
        tags: ["AI", "SIMULATION"],
        coverImage: "/images/lab/ai-agent-simulator.svg",
        coverAlt: "AI Agent business simulator",
        pageId: "3933e8e3610f807b80a5c52670bf92fb",
      },
      {
        slug: "3d-visual-experiments",
        title: "3D Visual Experiments",
        description:
          "WebGL and spatial rendering explorations.",
        tags: ["THREE.JS", "WEBGL"],
        coverImage: "/images/lab/3d-visual-experiments.svg",
        coverAlt: "3D visual experiments",
        pageId: "",
      },
    ],
  },
];

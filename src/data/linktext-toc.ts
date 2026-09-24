import type { NotionTocItem } from "@/types/notion-toc";

export const designSystemToc: NotionTocItem[] = [
  { id: "opening", text: "Opening", indentLevel: 0 },
  { id: "starting-point", text: "The Starting Point", indentLevel: 0 },
  {
    id: "information-architecture",
    text: "UX / Information Architecture",
    indentLevel: 0,
  },
  { id: "user-journey", text: "User Journey Flowchart", indentLevel: 1 },
  {
    id: "knowledge-system",
    text: "Structured Knowledge System",
    indentLevel: 1,
  },
  { id: "wireframe-overview", text: "Wireframe Overview", indentLevel: 1 },
  { id: "design-system", text: "Design System", indentLevel: 0 },
  { id: "reading-experience", text: "The Reading Experience", indentLevel: 0 },
  { id: "read-select", text: "Read & Select", indentLevel: 1 },
  { id: "ask-questions", text: "Ask Questions", indentLevel: 1 },
  { id: "inline-notes", text: "Inline Notes", indentLevel: 1 },
  { id: "review", text: "Review", indentLevel: 0 },
  { id: "knowledge-overview", text: "Knowledge Overview", indentLevel: 1 },
  { id: "knowledge-detail", text: "Knowledge Detail", indentLevel: 1 },
  { id: "review-mode", text: "Review Mode", indentLevel: 1 },
  {
    id: "supporting-experiences",
    text: "Supporting Experiences",
    indentLevel: 0,
  },
  {
    id: "final-product-overview",
    text: "Final Product Overview",
    indentLevel: 0,
  },
];

export const mobileToc: NotionTocItem[] = [
  { id: "mobile-opening", text: "Opening", indentLevel: 0 },
  {
    id: "contextual-reading",
    text: "Contextual Reading",
    indentLevel: 0,
  },
  {
    id: "simplified-navigation",
    text: "Simplified Navigation",
    indentLevel: 0,
  },
  {
    id: "modular-expression",
    text: "One System, Different Expression",
    indentLevel: 0,
  },
];

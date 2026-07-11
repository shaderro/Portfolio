import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ThreeDVisualExperimentsContent } from "@/components/projects/ThreeDVisualExperimentsContent";
import { getProjectByPath } from "@/lib/projects";

const path = ["lab", "3d-visual-experiments"];

export const metadata: Metadata = {
  title: "3D 交互与创意编程",
  description: "围绕 Unity 与生成式视觉进行交互实验。",
};

export default function ThreeDVisualExperimentsPage() {
  const project = getProjectByPath(path);

  if (!project) notFound();

  return (
    <article className="bg-black">
      <ThreeDVisualExperimentsContent />
    </article>
  );
}

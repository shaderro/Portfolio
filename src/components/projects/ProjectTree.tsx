import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { getPortfolioIndex } from "@/lib/portfolio-index";

export function ProjectTree() {
  const sections = getPortfolioIndex();

  return <ProjectIndex sections={sections} />;
}

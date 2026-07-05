import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { AboutSection } from "@/components/home/AboutSection";
import { ContactSection } from "@/components/home/ContactSection";
import { getLabIndexItems, getWorkIndexItems } from "@/lib/portfolio-index";

export default function HomePage() {
  const workSections = getWorkIndexItems();
  const labItems = getLabIndexItems();

  return (
    <>
      <Hero />
      <FeaturedProjects sections={workSections} labItems={labItems} />
      <AboutSection />
      <ContactSection />
    </>
  );
}

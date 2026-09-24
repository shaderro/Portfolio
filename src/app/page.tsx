import { Hero } from "@/components/home/Hero";
import { SelectedWorks } from "@/components/home/SelectedWorks";
import { AboutSection } from "@/components/home/AboutSection";
import { ContactSection } from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <div className="bg-[#fafafa]">
      <Hero />
      <SelectedWorks />
      <AboutSection />
      <ContactSection />
    </div>
  );
}

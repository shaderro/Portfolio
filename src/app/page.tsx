import { Hero } from "@/components/home/Hero";
import { SelectedWorks } from "@/components/home/SelectedWorks";
import { ContactSection } from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100svh-3.5rem)] flex-col md:min-h-[calc(100svh-4rem)]">
      <Hero />
      <SelectedWorks />
      <ContactSection />
    </div>
  );
}

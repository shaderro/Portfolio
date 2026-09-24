import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Case01CoverPage } from "@/components/linktext/Case01CoverPage";
import { DesignSystemPage } from "@/components/linktext/DesignSystemPage";
import { InformationArchitecturePage } from "@/components/linktext/InformationArchitecturePage";
import { ReadingExperiencePage } from "@/components/linktext/ReadingExperiencePage";
import { ReviewPage } from "@/components/linktext/ReviewPage";
import { FinalProductOverviewPage } from "@/components/linktext/FinalProductOverviewPage";
import { SupportingExperiencesPage } from "@/components/linktext/SupportingExperiencesPage";
import { CaseStudyToc } from "@/components/linktext/CaseStudyToc";
import { designSystemToc } from "@/data/linktext-toc";
import "@/styles/linktext.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-linktext",
});

export const metadata: Metadata = {
  title: "LinkText Design System",
  description:
    "Color, type, spacing, and component library for the LinkText product.",
};

export default function LinktextDesignSystemRoute() {
  return (
    <div className={`${inter.variable} ${inter.className}`}>
      <Case01CoverPage />
      <InformationArchitecturePage />
      <DesignSystemPage />
      <ReadingExperiencePage />
      <ReviewPage />
      <SupportingExperiencesPage />
      <FinalProductOverviewPage />
      <CaseStudyToc items={designSystemToc} />
    </div>
  );
}

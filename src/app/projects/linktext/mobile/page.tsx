import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MobileCaseOpeningPage } from "@/components/linktext/MobileCaseOpeningPage";
import { MobileContextualReadingPage } from "@/components/linktext/MobileContextualReadingPage";
import { MobileSimplifiedNavigationPage } from "@/components/linktext/MobileSimplifiedNavigationPage";
import { MobileModularExpressionPage } from "@/components/linktext/MobileModularExpressionPage";
import { CaseStudyToc } from "@/components/linktext/CaseStudyToc";
import { mobileToc } from "@/data/linktext-toc";
import "@/styles/linktext.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-linktext",
});

export const metadata: Metadata = {
  title: "LinkText — Web to Mobile",
  description:
    "Designing a focused reading experience for smaller screens.",
};

export default function LinktextMobileCaseRoute() {
  return (
    <div className={`${inter.variable} ${inter.className}`}>
      <MobileCaseOpeningPage />
      <MobileContextualReadingPage />
      <MobileSimplifiedNavigationPage />
      <MobileModularExpressionPage />
      <CaseStudyToc items={mobileToc} />
    </div>
  );
}

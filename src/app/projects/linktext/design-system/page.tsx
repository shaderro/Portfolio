import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DesignSystemPage } from "@/components/linktext/DesignSystemPage";
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
      <DesignSystemPage />
    </div>
  );
}

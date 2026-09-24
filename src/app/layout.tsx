import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import { siteConfig } from "@/data/site";
import { LOCALE_COOKIE, localeToHtmlLang, parseLocale } from "@/lib/locale";
import "./globals.css";
import "@/styles/notion.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = parseLocale(cookieStore.get(LOCALE_COOKIE)?.value);

  return (
    <html
      lang={localeToHtmlLang(locale)}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col font-sans`}
        suppressHydrationWarning
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `window.addEventListener("unhandledrejection",function(e){if(e.reason instanceof Event)e.preventDefault();});`,
          }}
        />
        <AppShell initialLocale={locale}>{children}</AppShell>
      </body>
    </html>
  );
}

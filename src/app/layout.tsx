import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { LeadAttributionCapture } from "@/components/lead-attribution-capture";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { NavigationScrollManager } from "@/components/navigation-scroll-manager";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { homeTitle, socialImage } from "@/lib/metadata";
import { isPreviewDeploy, site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0b2140",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title: {
    default: homeTitle,
    template: "%s | Waikiki Dental",
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: homeTitle,
    description: site.description,
    url: site.baseUrl,
    siteName: "Waikiki Dental",
    locale: "en_US",
    type: "website",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: site.description,
    images: [socialImage],
  },
  robots: isPreviewDeploy
    ? { index: false, follow: false }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
        },
      },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-ink">
        <LeadAttributionCapture />
        <NavigationScrollManager />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-deep focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-cream focus:outline-none focus-visible:ring-4 focus-visible:ring-ocean-200"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 scroll-mt-20 outline-none"
        >
          {children}
        </main>
        <SiteFooter />
        <MobileCtaBar />
      </body>
    </html>
  );
}

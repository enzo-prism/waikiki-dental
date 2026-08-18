import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { MobileCtaBar, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { site } from "@/lib/site";
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
    default: "Waikiki Dental | Dentist in Roseville, CA",
    template: "%s | Waikiki Dental",
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Waikiki Dental | Dentist in Roseville, CA",
    description: site.description,
    url: site.baseUrl,
    siteName: "Waikiki Dental",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${fraunces.variable} ${manrope.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-ink">
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

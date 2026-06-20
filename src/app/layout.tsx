import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title: {
    default: "Waikiki Dental | Roseville, CA Dentist",
    template: "%s | Waikiki Dental",
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Waikiki Dental | Roseville, CA Dentist",
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
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <MobileCtaBar />
      </body>
    </html>
  );
}

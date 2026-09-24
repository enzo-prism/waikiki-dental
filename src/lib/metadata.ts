import type { Metadata } from "next";
import { absoluteUrl, site } from "@/lib/site";

export const homeTitle =
  "Roseville Dentist for Comfortable Care | Waikiki Dental";

export const socialImage = {
  url: absoluteUrl("/social/waikiki-dental-share-v3.jpg"),
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "Waikiki Dental: Dentistry that feels like a deep breath. A painted Pacific horizon at sunset beside a portrait of Michael Narodovich, DMD.",
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
};

/**
 * Keep canonical, Open Graph, and X/Twitter metadata complete on every page.
 * Next.js replaces nested metadata objects instead of deeply merging them, so
 * page routes should use this helper rather than defining a partial object.
 */
export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = `${title} | ${site.name}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: site.name,
      locale: "en_US",
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage],
    },
  };
}

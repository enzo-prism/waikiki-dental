import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SedationArticlePage } from "@/components/page-templates";
import { createPageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

const sedationSlug = "2746154-say-goodbye-to-dental-anxiety-with-iv-sedation";

export function generateStaticParams() {
  return [{ slug: sedationSlug }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== sedationSlug) return {};

  return createPageMetadata({
    title: "IV Sedation Dentistry in Roseville, CA",
    description:
      "Learn how IV sedation can help anxious dental patients receive comfortable care at Waikiki Dental in Roseville.",
    // Canonicalize this legacy article to the primary service page.
    path: "/iv-sedation/",
  });
}

export default async function DentalBlogPage({ params }: Props) {
  const { slug } = await params;
  if (slug !== sedationSlug) notFound();
  return <SedationArticlePage />;
}

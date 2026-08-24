import type { MetadataRoute } from "next";
import { absoluteUrl, canonicalPageRoutes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return canonicalPageRoutes.map((path) => ({
    url: absoluteUrl(path ? `/${path}/` : "/"),
    lastModified: now,
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.75 : 1,
  }));
}

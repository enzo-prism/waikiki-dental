import type { MetadataRoute } from "next";
import { absoluteUrl, canonicalPageRoutes, siteLastUpdated } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return canonicalPageRoutes.map((path) => ({
    url: absoluteUrl(path ? `/${path}/` : "/"),
    lastModified: new Date(siteLastUpdated),
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.75 : 1,
  }));
}

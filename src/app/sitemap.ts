import type { MetadataRoute } from "next";
import { absoluteUrl, canonicalPageRoutes, siteLastUpdated } from "@/lib/site";

/** Pages whose visible content changed after `siteLastUpdated`. */
const pageUpdated: Record<string, string> = {};

export default function sitemap(): MetadataRoute.Sitemap {
  return canonicalPageRoutes.map((path) => ({
    url: absoluteUrl(path ? `/${path}/` : "/"),
    lastModified: new Date(pageUpdated[path] ?? siteLastUpdated),
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.75 : 1,
  }));
}

import type { MetadataRoute } from "next";
import { absoluteUrl, pageRoutes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return pageRoutes.map((path) => ({
    url: absoluteUrl(path ? `/${path}/` : "/"),
    lastModified: now,
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.75 : 1,
  }));
}

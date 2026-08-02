import type { MetadataRoute } from "next";

import { getTools } from "@/features/tools/registry";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/tools/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/categories/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const toolRoutes: MetadataRoute.Sitemap = getTools().map((tool) => ({
    url: absoluteUrl(`/tools/${tool.slug}/`),
    lastModified,
    changeFrequency: "monthly",
    priority: tool.isMvp ? 0.8 : 0.6,
  }));

  return [...staticRoutes, ...toolRoutes];
}

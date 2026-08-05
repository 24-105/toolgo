import type { MetadataRoute } from "next";

import { getCategories, getTools } from "@/features/tools/registry";
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
    {
      url: absoluteUrl("/terms/"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/privacy-policy/"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/about/"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: absoluteUrl("/contact/"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const toolRoutes: MetadataRoute.Sitemap = getTools().map((tool) => ({
    url: absoluteUrl(`/tools/${tool.slug}/`),
    lastModified,
    changeFrequency: "monthly",
    priority: tool.isMvp ? 0.8 : 0.6,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = getCategories().map((category) => ({
    url: absoluteUrl(`/categories/${category.slug}/`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...toolRoutes];
}

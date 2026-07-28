import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-28");

  return [
    {
      url: "https://whago.net",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}

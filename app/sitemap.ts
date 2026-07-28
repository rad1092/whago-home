import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-28");

  return [
    {
      url: "https://whago.net",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://whago.net/daymark/",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://whago.net/repolens/",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://whago.net/siteboard/",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}

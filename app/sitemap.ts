import type { MetadataRoute } from "next";
import { lastUpdated, products } from "../lib/catalog";
import { SITE_URL, localePath } from "../lib/site";

export const dynamic = "force-static";

const pages = [
  "/",
  "/software",
  ...products.map((product) => `/software/${product.slug}`),
  "/releases",
  "/support",
  "/house",
  "/archive",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${lastUpdated}T00:00:00Z`);
  return pages.map((path) => ({
    url: `${SITE_URL}${localePath("en", path)}`,
    lastModified,
    alternates: {
      languages: {
        en: `${SITE_URL}${localePath("en", path)}`,
        ko: `${SITE_URL}${localePath("ko", path)}`,
      },
    },
  }));
}

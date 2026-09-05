import type { MetadataRoute } from "next";
import { languageUrls } from "@/lib/locale";
import { pageSeo, SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(pageSeo).map((page) => {
    const url = `${SITE_URL}${page.path}`;
    return {
      url,
      lastModified: new Date(),
      changeFrequency: page.path === "/" ? "weekly" : "monthly",
      priority: page.path === "/" ? 1 : 0.7,
      alternates: {
        languages: languageUrls(page.path, SITE_URL),
      },
    };
  });
}

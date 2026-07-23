import type { MetadataRoute } from "next";
import { BIZ } from "@/lib/business";
import { SERVICES } from "@/content/services";
import { AREAS } from "@/lib/areas";
import { BLOG_POSTS } from "@/content/blog";

/** GitHub Pages export uses trailingSlash; sitemap URLs must match live canonical URLs. */
const TRAILING_SLASH = process.env.NEXT_EXPORT === "1";

export function sitemapUrl(path: string): string {
  const base = BIZ.url.replace(/\/$/, "");
  if (!path || path === "/") return `${base}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return TRAILING_SLASH ? `${base}${normalized}/` : `${base}${normalized}`;
}

/** Curated indexable routes only — no API, thank-you, OG images, or zip-area stubs. */
export function buildSitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/quote", priority: 0.95, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" },
    { path: "/service-areas", priority: 0.9, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.85, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/gallery", priority: 0.8, changeFrequency: "monthly" },
    { path: "/reviews", priority: 0.8, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.75, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.75, changeFrequency: "weekly" },
    { path: "/hours", priority: 0.7, changeFrequency: "monthly" },
    { path: "/license", priority: 0.65, changeFrequency: "yearly" },
  ];

  return [
    ...staticPages.map(({ path, priority, changeFrequency }) => ({
      url: sitemapUrl(path),
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...SERVICES.map((s) => ({
      url: sitemapUrl(`/services/${s.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: s.intent === "emergency" ? 0.92 : 0.88,
    })),
    ...BLOG_POSTS.map((p) => ({
      url: sitemapUrl(`/blog/${p.slug}`),
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...AREAS.filter((a) => a.kind !== "zip-area").map((a) => ({
      url: sitemapUrl(`/service-areas/${a.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: a.main ? 0.82 : a.kind === "city" ? 0.72 : 0.65,
    })),
  ];
}

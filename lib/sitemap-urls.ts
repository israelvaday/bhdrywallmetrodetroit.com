import { execFileSync } from "node:child_process";
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

/**
 * Last-commit author date for every path in history, from ONE `git log` pass.
 *
 * lastmod has to be the date the page's content actually changed. Stamping the
 * build time is a misstatement in the same way a frozen date is: this site
 * rebuilds daily, so `new Date()` told Google that /faq, /license, /gallery and
 * /service-areas had all changed today when their last real edit was 2026-07-21.
 * A sitemap that claims 124 pages change every day teaches Google to discount
 * the signal entirely, and then the days something DID change say nothing.
 */
let commitDates: Map<string, string> | undefined;
function lastCommitDates(): Map<string, string> {
  if (commitDates) return commitDates;
  const dates = new Map<string, string>();
  try {
    const log = execFileSync("git", ["log", "--format=@@%aI", "--name-only"], {
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
    let current = "";
    for (const line of log.split("\n")) {
      const entry = line.trim();
      if (!entry) continue;
      // log is newest-first, so the first time a path appears is its last change
      if (entry.startsWith("@@")) current = entry.slice(2);
      else if (!dates.has(entry)) dates.set(entry, current);
    }
  } catch {
    // no git, or a shallow clone with no history: every url falls back to BUILD_TIME
  }
  commitDates = dates;
  return dates;
}

/** Fallback only. Never the primary source of a lastmod — see lastCommitDates. */
const BUILD_TIME = new Date();

/** Newest last-commit date across the sources that render a url. */
function revised(...sources: string[]): Date {
  const dates = lastCommitDates();
  let newest: number | undefined;
  for (const source of sources) {
    const iso = dates.get(source);
    if (!iso) continue;
    const at = Date.parse(iso);
    if (Number.isFinite(at) && (newest === undefined || at > newest)) newest = at;
  }
  return newest === undefined ? BUILD_TIME : new Date(newest);
}

/** The files behind every /services/<slug> and /service-areas/<slug> page. */
const SERVICE_SOURCES = ["content/services.ts", "app/services/[slug]/page.tsx"];
const AREA_SOURCES = [
  "lib/areas.ts",
  "content/service-areas.json",
  "content/service-areas-main.json",
  "content/area-insights.json",
  "app/service-areas/[slug]/page.tsx",
];

/** Curated indexable routes only — no API, thank-you, OG images, or zip-area stubs. */
export function buildSitemap(): MetadataRoute.Sitemap {
  const staticPages: {
    path: string;
    source: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
  }[] = [
    { path: "/", source: "app/page.tsx", priority: 1.0, changeFrequency: "weekly" },
    { path: "/quote", source: "app/quote/page.tsx", priority: 0.95, changeFrequency: "weekly" },
    { path: "/services", source: "app/services/page.tsx", priority: 0.9, changeFrequency: "weekly" },
    { path: "/service-areas", source: "app/service-areas/page.tsx", priority: 0.9, changeFrequency: "weekly" },
    { path: "/contact", source: "app/contact/page.tsx", priority: 0.85, changeFrequency: "monthly" },
    { path: "/about", source: "app/about/page.tsx", priority: 0.8, changeFrequency: "monthly" },
    { path: "/gallery", source: "app/gallery/page.tsx", priority: 0.8, changeFrequency: "monthly" },
    { path: "/reviews", source: "app/reviews/page.tsx", priority: 0.8, changeFrequency: "monthly" },
    { path: "/faq", source: "app/faq/page.tsx", priority: 0.75, changeFrequency: "monthly" },
    { path: "/blog", source: "app/blog/page.tsx", priority: 0.75, changeFrequency: "weekly" },
    { path: "/hours", source: "app/hours/page.tsx", priority: 0.7, changeFrequency: "monthly" },
    { path: "/license", source: "app/license/page.tsx", priority: 0.65, changeFrequency: "yearly" },
  ];

  return [
    ...staticPages.map(({ path, source, priority, changeFrequency }) => ({
      url: sitemapUrl(path),
      lastModified: revised(source),
      changeFrequency,
      priority,
    })),
    ...SERVICES.map((s) => ({
      url: sitemapUrl(`/services/${s.slug}`),
      lastModified: revised(...SERVICE_SOURCES),
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
      lastModified: revised(...AREA_SOURCES),
      changeFrequency: "monthly" as const,
      priority: a.main ? 0.82 : a.kind === "city" ? 0.72 : 0.65,
    })),
  ];
}

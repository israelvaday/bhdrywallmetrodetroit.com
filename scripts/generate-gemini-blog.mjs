/**
 * Generate blog posts via Gemini when API is enabled; otherwise writes bundled posts.
 * Run: node scripts/generate-gemini-blog.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../content/blog.ts");
const ENV_PATH = join(__dirname, "../.env.local");
const MODEL = "gemini-2.5-flash";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

function loadEnvLocal() {
  if (!existsSync(ENV_PATH)) return;
  for (const line of readFileSync(ENV_PATH, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const k = t.slice(0, eq).trim();
    let v = t.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))
      v = v.slice(1, -1);
    if (!process.env[k]) process.env[k] = v;
  }
}

function getApiKey() {
  return (
    process.env.GOOGLE_GENERATIVE_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_PSI_API_KEY ||
    ""
  );
}

const POST_SPECS = [
  { slug: "basement-drywall-finishing-metro-detroit", category: "Residential", title: "Basement Drywall Finishing in Metro Detroit: What to Plan For" },
  { slug: "level-5-smooth-walls-michigan-homes", category: "Residential", title: "Level 5 Smooth Walls in Michigan Homes (When You Actually Need Them)" },
  { slug: "drywall-hole-repair-vs-large-patch", category: "Residential", title: "Small Hole vs Large Patch: How We Price Drywall Repairs" },
  { slug: "water-damage-flood-cut-michigan", category: "Safety", title: "Water Damage Drywall: Flood Cuts, Drying, and Rebuild in Michigan" },
  { slug: "commercial-tenant-drywall-detroit", category: "Commercial", title: "Commercial Tenant Drywall in Detroit: Phased Work in Occupied Buildings" },
  { slug: "popcorn-ceiling-removal-metro-detroit", category: "Residential", title: "Popcorn Ceiling Removal in Metro Detroit: Skim, Texture, or Smooth?" },
  { slug: "hire-drywall-contractor-michigan-checklist", category: "Security", title: "How to Hire a Drywall Contractor in Michigan (Checklist)" },
  { slug: "new-construction-drywall-phases", category: "Commercial", title: "New Construction Drywall: Hang, Tape, and Finish Phases Explained" },
];

const SYSTEM = `You write blog posts for BH Drywall Metro Detroit (phone (313) 236-4558). Michigan only — no California, no locksmith content.

Return JSON array of posts matching this TypeScript shape (one object per slug requested):
{
  "slug": string,
  "title": string,
  "metaTitle": string (<=60 chars),
  "excerpt": string (1-2 sentences),
  "category": one of "Residential"|"Commercial"|"Safety"|"Security",
  "readMinutes": number 5-9,
  "date": "2026-06-01" ISO date,
  "heroAlt": string,
  "secondaryAlt": string,
  "body": string (800-1200 words, markdown-ish: ## H2, ### H3, - bullets, paragraphs separated by blank lines; mention Metro Detroit; link text only like [contact](/contact))
}

heroImage and secondaryImage paths are added automatically as /blog/{slug}-hero.png and /blog/{slug}-secondary.png — do not include in JSON.`;

async function callGemini(prompt, apiKey) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-goog-api-key": apiKey },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.8 },
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  for (const c of data.candidates || []) {
    for (const p of c.content?.parts || []) {
      if (p.text) return JSON.parse(p.text);
    }
  }
  throw new Error("No JSON in response");
}

function escapeTemplate(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

function emitTs(posts) {
  const blocks = posts.map((p) => {
    const cat = p.category.replace(/"/g, '\\"');
    return `  {
    slug: "${p.slug}",
    title: "${p.title.replace(/"/g, '\\"')}",
    metaTitle: "${(p.metaTitle || p.title).replace(/"/g, '\\"')}",
    excerpt: "${p.excerpt.replace(/"/g, '\\"')}",
    category: "${cat}",
    readMinutes: ${p.readMinutes || 7},
    date: "${p.date || "2026-06-15"}",
    heroImage: "/blog/${p.slug}-hero.png",
    heroAlt: "${p.heroAlt.replace(/"/g, '\\"')}",
    secondaryImage: "/blog/${p.slug}-secondary.png",
    secondaryAlt: "${p.secondaryAlt.replace(/"/g, '\\"')}",
    body: \`${escapeTemplate(p.body.trim())}\`,
  }`;
  });
  return `// Auto-generated / maintained by scripts/generate-gemini-blog.mjs
export type BlogPost = {
  slug: string;
  title: string;
  metaTitle?: string;
  excerpt: string;
  category: "Residential" | "Commercial" | "Safety" | "Security";
  readMinutes: number;
  date: string;
  heroImage: string;
  heroAlt: string;
  secondaryImage: string;
  secondaryAlt: string;
  body: string;
};

export const BLOG_POSTS: BlogPost[] = [
${blocks.join(",\n")},
];
`;
}

async function main() {
  loadEnvLocal();
  const key = getApiKey();
  let posts;

  if (key) {
    try {
      const listing = POST_SPECS.map((s) => `- ${s.slug}: ${s.title} (${s.category})`).join("\n");
      posts = await callGemini(`${SYSTEM}\n\nWrite posts for:\n${listing}`, key);
      if (!Array.isArray(posts)) posts = posts.posts || Object.values(posts);
      console.log(`Gemini wrote ${posts.length} blog posts.`);
    } catch (e) {
      console.warn("Gemini failed, keeping existing blog.ts:", e.message);
      process.exit(0);
    }
  } else {
    console.log("No API key — run with GOOGLE_GENERATIVE_API_KEY in .env.local");
    process.exit(0);
  }

  for (const p of posts) {
    const spec = POST_SPECS.find((s) => s.slug === p.slug);
    if (spec) p.category = spec.category;
  }
  writeFileSync(OUT, emitTs(posts), "utf8");
  console.log(`Wrote ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

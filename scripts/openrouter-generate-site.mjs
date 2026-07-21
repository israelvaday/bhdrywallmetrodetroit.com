/**
 * Generate site assets + refresh location copy via OpenRouter.
 *
 * Usage:
 *   node scripts/openrouter-generate-site.mjs --test
 *   node scripts/openrouter-generate-site.mjs --images-blog
 *   node scripts/openrouter-generate-site.mjs --images-gallery
 *   node scripts/openrouter-generate-site.mjs --images-gallery-pro
 *   node scripts/openrouter-generate-site.mjs --images-brand
 *   node scripts/openrouter-generate-site.mjs --images-quote
 *   node scripts/openrouter-generate-site.mjs --areas
 *   node scripts/openrouter-generate-site.mjs --all
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  loadEnvLocal,
  getOpenRouterKey,
  chatJson,
  generateImage,
  sleep,
} from "./openrouter-lib.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BIZ = "BH Drywall Metro Detroit";
const PHONE = "(313) 236-4558";

const PHOTO_REALISM =
  "Ultra photorealistic documentary construction photo, shot on full-frame DSLR 35mm, natural Michigan daylight, authentic jobsite detail, real gypsum dust and tools, shallow depth of field, no text, no watermark, no CGI gloss, not illustration";

const BLOG_SLUGS = [
  "basement-drywall-finishing-metro-detroit",
  "level-5-smooth-walls-michigan-homes",
  "drywall-hole-repair-vs-large-patch",
  "water-damage-flood-cut-michigan",
  "commercial-tenant-drywall-detroit",
  "popcorn-ceiling-removal-metro-detroit",
  "hire-drywall-contractor-michigan-checklist",
  "new-construction-drywall-phases",
];

const BLOG_PROMPTS = {
  "basement-drywall-finishing-metro-detroit": {
    hero: "Professional photo: finished basement drywall in Michigan home, recessed lights, smooth walls, realistic construction photography, no text",
    secondary: "Drywall taper applying joint compound on basement wall, Michigan job site, realistic",
  },
  "level-5-smooth-walls-michigan-homes": {
    hero: "Bright modern Michigan living room with perfectly smooth Level 5 white walls, natural light, interior photo",
    secondary: "Contractor skim coating wall with wide knife, smooth finish, trade photography",
  },
  "drywall-hole-repair-vs-large-patch": {
    hero: "Drywall repair patch on interior wall before paint, Michigan home, realistic",
    secondary: "Close-up drywall patch around electrical box, professional repair",
  },
  "water-damage-flood-cut-michigan": {
    hero: "Basement flood cut drywall removed showing studs, water damage restoration Michigan",
    secondary: "New drywall sheets installed on basement wall after water damage",
  },
  "commercial-tenant-drywall-detroit": {
    hero: "Commercial retail interior metal stud framing and drywall, Detroit tenant buildout",
    secondary: "Workers hanging drywall in commercial office after hours",
  },
  "popcorn-ceiling-removal-metro-detroit": {
    hero: "Worker removing popcorn ceiling texture in Michigan home, dust protection visible",
    secondary: "Smooth skimmed ceiling ready for paint after popcorn removal",
  },
  "hire-drywall-contractor-michigan-checklist": {
    hero: "Drywall contractor reviewing written estimate with homeowner at kitchen table, Michigan",
    secondary: "Licensed contractor showing insurance certificate and scope document",
  },
  "new-construction-drywall-phases": {
    hero: "New construction home interior with drywall hung and taped, Michigan subdivision",
    secondary: "Stack of gypsum boards and finishing tools on new build job site",
  },
};

const GALLERY = [
  { file: "gen--residential-finish.png", prompt: "Residential Level 4 drywall finish ready for paint, Michigan basement, realistic photo" },
  { file: "gen--commercial-buildout.png", prompt: "Commercial office drywall partition install, Metro Detroit tenant improvement" },
  { file: "gen--repair-patch.png", prompt: "Drywall hole patch blended with knockdown texture, close detail" },
  { file: "gen--ceiling-grid.png", prompt: "Suspended acoustical ceiling grid installation in office" },
  { file: "gen--texture-knockdown.png", prompt: "Knockdown ceiling texture application, professional trade photo" },
  { file: "gen--water-damage.png", prompt: "Flood cut and new drywall in Michigan basement after water damage" },
  { file: "gen--metal-framing.png", prompt: "Metal stud wall framing for commercial interior" },
  { file: "gen--basement-finish.png", prompt: "Finished basement with smooth drywall and egress window, Michigan" },
];

/** Additional hyper-real gallery shots (OpenRouter pro model / 2K) */
const GALLERY_EXTRA = [
  { file: "gen-v2--mud-taping-joint.png", prompt: "Drywall finisher applying joint compound with 10-inch knife on taped seam, Michigan home interior" },
  { file: "gen-v2--level5-skim.png", prompt: "Level 5 skim coat on bright white wall, critical light raking across surface, luxury Michigan living room" },
  { file: "gen-v2--corner-bead.png", prompt: "Metal corner bead installation on drywall outside corner, close trade detail" },
  { file: "gen-v2--drywall-lift-hang.png", prompt: "Crew using drywall lift to hang 4x12 sheet on ceiling, new construction Michigan" },
  { file: "gen-v2--office-buildout-night.png", prompt: "Commercial office tenant buildout at night, drywall hung under construction lights, Detroit style high-rise interior" },
  { file: "gen-v2--kitchen-remodel.png", prompt: "Kitchen remodel drywall around new cabinets removed, smooth finish ready for paint, suburban Michigan" },
  { file: "gen-v2--garage-drywall.png", prompt: "Garage converted to workspace with finished drywall and insulation visible at one stud bay" },
  { file: "gen-v2--stairwell-smooth.png", prompt: "Stairwell walls with flawless smooth drywall and handrail shadow, residential Michigan" },
  { file: "gen-v2--fire-rated-taping.png", prompt: "Fire-taped Type X drywall seam in commercial corridor, red tape visible" },
  { file: "gen-v2--orange-peel-match.png", prompt: "Contractor spraying orange peel texture to match existing ceiling repair" },
  { file: "gen-v2--bathroom-greenboard.png", prompt: "Moisture-resistant green board drywall in bathroom shower surround before tile" },
  { file: "gen-v2--condo-highrise.png", prompt: "High-rise condo unit drywall finishing with floor-to-ceiling windows, downtown Detroit view blurred outside" },
  { file: "gen-v2--retail-soffit.png", prompt: "Retail store soffit and bulkhead drywall framing above display area" },
  { file: "gen-v2--warehouse-partition.png", prompt: "Warehouse interior non-load partition with metal studs and hung drywall sheets" },
  { file: "gen-v2--popcorn-removal.png", prompt: "Popcorn ceiling removal in progress with plastic containment and worker on ladder" },
  { file: "gen-v2--crew-sanding.png", prompt: "Drywall crew pole-sanding finished wall, dust in sunbeam, Michigan jobsite" },
  { file: "gen-v2--multi-family-hall.png", prompt: "Apartment building hallway new drywall and doors, multi-family Michigan project" },
  { file: "gen-v2--exterior-soffit.png", prompt: "Exterior porch soffit new drywall and fascia detail on Michigan colonial home" },
];

/** Square tiles for /quote wizard — one image per tap option */
const QUOTE_WIZARD = [
  { file: "emergency.png", prompt: "Same-day drywall patch repair: worker filling hole in living room wall before texture, Michigan home interior" },
  { file: "residential.png", prompt: "Residential basement drywall finishing, smooth taped walls, recessed lights, Michigan ranch home" },
  { file: "commercial.png", prompt: "Commercial office tenant improvement, drywall hung on metal studs, wide corridor, Metro Detroit" },
  { file: "storefront.png", prompt: "Retail storefront buildout, drywall soffits above display windows, restaurant interior under construction" },
  { file: "smart-locks.png", prompt: "Level 5 skim coat smooth white walls, critical side lighting showing flawless finish, modern Michigan living room, no locks no doors hardware focus" },
  { file: "access-control.png", prompt: "Metal stud partition framing for commercial interior, studs and track before drywall hang" },
  { file: "automotive.png", prompt: "Basement flood cut: lower drywall removed exposing studs, water damage restoration Michigan" },
  { file: "safes.png", prompt: "Suspended acoustical drop ceiling grid with gypsum board perimeter, commercial office Michigan" },
  { file: "rekey.png", prompt: "New construction drywall phase: crew hanging sheets on walls and ceilings, multi-family unit Michigan" },
  { file: "property-home.png", prompt: "Single-family Michigan house interior, finished drywall living room, suburban home" },
  { file: "property-business.png", prompt: "Commercial office suite interior with fresh drywall partitions, empty tenant space" },
  { file: "property-vehicle.png", prompt: "Apartment building hallway with new drywall, multiple unit doors, multi-family Michigan" },
  { file: "property-other.png", prompt: "Garage or basement workspace with drywall repair and ceiling patch, Michigan home" },
];

const SERVICE_HERO = [
  { slug: "emergency", prompt: "Same-day drywall hole repair in living room, Michigan home, realistic" },
  { slug: "residential", prompt: "Residential basement drywall finishing, smooth walls, Michigan" },
  { slug: "commercial", prompt: "Commercial drywall hang in open office buildout" },
  { slug: "storefront", prompt: "Retail storefront interior drywall and soffits under construction" },
  { slug: "smart-locks", prompt: "Level 5 smooth white walls in modern home critical lighting, no locks" },
  { slug: "access-control", prompt: "Metal stud partition framing commercial corridor" },
  { slug: "automotive", prompt: "Water damaged drywall flood cut in basement Michigan" },
  { slug: "specialty", prompt: "Knockdown texture matching on repaired wall" },
  { slug: "safes", prompt: "Suspended drop ceiling tiles in commercial office" },
  { slug: "rekey", prompt: "New construction drywall hang and tape multi-family unit" },
];

async function saveImage(buf, outPath) {
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, buf);
  console.log("  wrote", outPath.replace(ROOT, ""));
}

async function genBlogImages(key, imageModel) {
  const blogDir = join(ROOT, "public/blog");
  mkdirSync(blogDir, { recursive: true });
  for (const slug of BLOG_SLUGS) {
    const p = BLOG_PROMPTS[slug];
    for (const [kind, prompt] of [
      ["hero", p.hero],
      ["secondary", p.secondary],
    ]) {
      const out = join(blogDir, `${slug}-${kind}.png`);
      try {
        console.log(`Blog ${slug} ${kind}…`);
        const buf = await generateImage(key, `${prompt}. Brand context: ${BIZ}, Metro Detroit Michigan. Photorealistic, no watermark, no text overlay.`, {
          model: imageModel,
          aspect_ratio: "16:9",
        });
        await saveImage(buf, out);
        await sleep(1500);
      } catch (e) {
        console.error("  failed:", e.message);
      }
    }
  }
}

async function genGalleryImages(key, imageModel, opts = {}) {
  const { pro = false, extraOnly = false, force = false } = opts;
  const list = extraOnly ? GALLERY_EXTRA : pro ? [...GALLERY, ...GALLERY_EXTRA] : GALLERY;
  const imageOpts = pro
    ? { model: imageModel, aspect_ratio: "16:9", resolution: "2K", quality: "high" }
    : { model: imageModel, aspect_ratio: "16:9", resolution: "1K", quality: "medium" };
  const dir = join(ROOT, "public/photos");
  mkdirSync(dir, { recursive: true });
  for (const g of list) {
    const out = join(dir, g.file);
    if (existsSync(out) && !force) {
      console.log("Gallery skip (exists)", g.file);
      continue;
    }
    try {
      console.log(`Gallery ${pro ? "pro" : "std"}`, g.file, "…");
      const buf = await generateImage(
        key,
        `${g.prompt}. ${PHOTO_REALISM}. ${BIZ}, Metro Detroit Michigan.`,
        imageOpts
      );
      await saveImage(buf, out);
      await sleep(pro ? 2200 : 1500);
    } catch (e) {
      console.error("  failed:", e.message);
    }
  }
}

async function genQuoteWizardImages(key, imageModel, force = false) {
  const dir = join(ROOT, "public/photos/quote");
  mkdirSync(dir, { recursive: true });
  for (const q of QUOTE_WIZARD) {
    const out = join(dir, q.file);
    if (existsSync(out) && !force) {
      console.log("Quote skip (exists)", q.file);
      continue;
    }
    try {
      console.log("Quote wizard", q.file, "…");
      const buf = await generateImage(
        key,
        `${q.prompt}. ${PHOTO_REALISM}. ${BIZ}, Metro Detroit Michigan drywall contractor jobsite.`,
        { model: imageModel, aspect_ratio: "1:1", resolution: "1K", quality: "high" }
      );
      await saveImage(buf, out);
      await sleep(1800);
    } catch (e) {
      console.error("  failed:", e.message);
    }
  }
}

async function genBrandImages(key, imageModel, opts = {}) {
  const { logoOnly = false, force = false } = opts;
  const pub = join(ROOT, "public");
  const photos = join(pub, "photos");
  mkdirSync(photos, { recursive: true });

  const jobs = [
    {
      out: join(pub, "logo.png"),
      prompt:
        "Professional logo icon for BH Drywall Metro Detroit: navy shield shape with gold/brass drywall trowel and gypsum board panel, clean flat vector logo mark, centered, no long text, no watermark, Michigan contractor brand",
      aspect_ratio: "1:1",
    },
    {
      out: join(photos, "branding-generated--hero-drywall-metro-detroit.png"),
      prompt: "Wide hero photo professional drywall crew finishing smooth walls in new Michigan home construction, cinematic 16:9",
      aspect_ratio: "16:9",
    },
    {
      out: join(photos, "branding-generated--metro-detroit-map-mockup.png"),
      prompt: "Marketing photo paper map of Metro Detroit Michigan with location pins on Detroit Warren Troy Dearborn, desk mockup navy gold accents",
      aspect_ratio: "16:9",
    },
  ];

  const runJobs = logoOnly ? jobs.slice(0, 1) : jobs;

  for (const j of runJobs) {
    if (existsSync(j.out) && !force && !logoOnly) {
      console.log("Brand skip (exists)", j.out.replace(ROOT, ""));
      continue;
    }
    try {
      console.log("Brand", j.out.replace(ROOT, ""), "…");
      const buf = await generateImage(key, j.prompt, { model: imageModel, aspect_ratio: j.aspect_ratio });
      await saveImage(buf, j.out);
      if (j.out.endsWith("logo.png")) {
        writeFileSync(join(pub, "logo-256.png"), buf);
        writeFileSync(join(pub, "logo-512.png"), buf);
      }
      await sleep(1500);
    } catch (e) {
      console.error("  failed:", e.message);
    }
  }

  if (logoOnly) return;

  for (const s of SERVICE_HERO) {
    const out = join(photos, `service-hero-${s.slug}.png`);
    try {
      console.log("Service hero", s.slug, "…");
      const buf = await generateImage(key, `${s.prompt}. ${BIZ}. Photorealistic drywall work, no text.`, {
        model: imageModel,
        aspect_ratio: "16:9",
      });
      await saveImage(buf, out);
      await sleep(1200);
    } catch (e) {
      console.error("  failed:", e.message);
    }
  }
}

async function refreshAreas(key, chatModel) {
  const areasPath = join(ROOT, "content/service-areas.json");
  const outPath = join(ROOT, "content/area-insights.json");
  const areas = JSON.parse(readFileSync(areasPath, "utf8"));
  let out = existsSync(outPath) ? JSON.parse(readFileSync(outPath, "utf8")) : {};
  const BATCH = 8;
  const system = `You write local SEO JSON for ${BIZ} (${PHONE}), drywall contractor in Metro Detroit MI only. Output JSON object keyed by slug. Each value: tagline (max 14 words), landmarks (3 real MI places), common_calls (3 short drywall jobs), neighborhood_notes (2-3 sentences, Michigan housing/climate), keywords (6-7 lowercase MI drywall SEO terms). No locksmith content.`;

  for (let i = 0; i < areas.length; i += BATCH) {
    const batch = areas.slice(i, i + BATCH);
    const listing = batch.map((a) => `- ${a.slug}: ${a.name} (${a.kind})`).join("\n");
    try {
      console.log(`Areas batch ${i / BATCH + 1}…`);
      const data = await chatJson(key, chatModel, system, `Write insights for:\n${listing}`);
      for (const [slug, info] of Object.entries(data)) {
        if (info && typeof info === "object") out[slug] = info;
      }
      writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n");
      await sleep(800);
    } catch (e) {
      console.error("  batch failed:", e.message);
    }
  }
  console.log(`Areas: ${Object.keys(out).length}/${areas.length} slugs`);
}

async function main() {
  loadEnvLocal();
  const key = getOpenRouterKey();
  if (!key) {
    console.error("Set OPENROUTER_API_KEY in .env.local");
    process.exit(1);
  }
  const chatModel = process.env.OPENROUTER_CHAT_MODEL || "google/gemini-2.5-flash";
  const imageModel =
    process.env.OPENROUTER_IMAGE_MODEL || "google/gemini-3-pro-image-preview";
  const args = process.argv.slice(2);
  const force = args.includes("--force");

  if (args.includes("--test")) {
    const buf = await generateImage(key, "Simple test: one drywall trowel on white background product photo", {
      model: imageModel,
      aspect_ratio: "1:1",
    });
    await saveImage(buf, join(ROOT, "public/photos/openrouter-test.png"));
    console.log("OpenRouter image OK");
    return;
  }

  if (args.includes("--images-blog") || args.includes("--all")) await genBlogImages(key, imageModel);
  if (args.includes("--images-gallery") || args.includes("--all"))
    await genGalleryImages(key, imageModel, { pro: false, force });
  if (args.includes("--images-gallery-pro"))
    await genGalleryImages(key, imageModel, { pro: true, extraOnly: true, force });
  if (args.includes("--images-brand") || args.includes("--all")) await genBrandImages(key, imageModel);
  if (args.includes("--images-logo"))
    await genBrandImages(key, imageModel, { logoOnly: true, force });
  if (args.includes("--images-quote") || args.includes("--all"))
    await genQuoteWizardImages(key, imageModel, force);
  if (args.includes("--areas") || args.includes("--all")) await refreshAreas(key, chatModel);

  if (!args.length) {
    console.log(
      "Pass --test, --images-blog, --images-gallery, --images-gallery-pro, --images-brand, --images-quote, --areas, or --all"
    );
  } else {
    console.log("Running rebuild-photos-gallery…");
    const { execSync } = await import("node:child_process");
    execSync("node scripts/rebuild-photos-gallery.mjs", { cwd: ROOT, stdio: "inherit" });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

/**
 * Batch-refresh content/area-insights.json via Gemini (optional).
 * Reads API key from .env.local: GOOGLE_GENERATIVE_API_KEY, GEMINI_API_KEY, or GOOGLE_PSI_API_KEY.
 *
 * Usage:
 *   node scripts/generate-gemini-content.mjs           # refresh missing slugs only
 *   node scripts/generate-gemini-content.mjs --all     # refresh every area
 *   node scripts/generate-gemini-content.mjs --slug=detroit-midtown
 */
import {
  readFileSync,
  writeFileSync,
  existsSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const AREAS_PATH = join(ROOT, "content", "service-areas.json");
const OUT_PATH = join(ROOT, "content", "area-insights.json");
const ENV_PATH = join(ROOT, ".env.local");

const MODEL = "gemini-2.5-flash";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const BATCH_SIZE = 10;

const SYSTEM = `You write hyper-local SEO content for "BH Drywall Metro Detroit", a residential and commercial drywall contractor serving Wayne, Oakland, and Macomb counties, Michigan. Services: hang, finish, repair, texture, metal framing, ceilings, water damage restoration.

For each area return STRICTLY valid JSON (no markdown) keyed by slug:
{
  "<slug>": {
    "tagline": string (max 14 words, reference the area name),
    "landmarks": [3 real landmarks, plazas, schools, parks, or well-known businesses in Michigan — not California],
    "common_calls": [3 short drywall-related job types, each <= 8 words],
    "neighborhood_notes": string (2-3 sentences about local housing stock and drywall needs; mention Michigan climate/freeze-thaw where relevant; NO drywall contractor content),
    "keywords": [6-7 long-tail SEO keywords for drywall services in that location, lowercase, include MI or Michigan not CA]
  }
}
Vary wording across areas. Output JSON ONLY.`;

function loadEnvLocal() {
  if (!existsSync(ENV_PATH)) return;
  const text = readFileSync(ENV_PATH, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
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

async function callGemini(prompt, apiKey) {
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.85,
    },
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errText.slice(0, 400)}`);
  }

  const data = await res.json();
  for (const cand of data.candidates || []) {
    for (const part of cand.content?.parts || []) {
      if (part.text) return part.text;
    }
  }
  throw new Error("No text in Gemini response");
}

function parseJsonObject(text) {
  try {
    return JSON.parse(text);
  } catch {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start >= 0 && end > start) {
      return JSON.parse(text.slice(start, end + 1));
    }
    throw new Error("Could not parse JSON from model output");
  }
}

async function processBatch(batch, apiKey, out) {
  const listing = batch
    .map(
      (a) =>
        `- slug=${a.slug} | name=${a.name} | city=${a.city} | kind=${a.kind} | lat=${a.lat} lng=${a.lng}`
    )
    .join("\n");

  const prompt = `${SYSTEM}\n\nAREAS (one entry per slug, keys must match exactly):\n${listing}`;
  const text = await callGemini(prompt, apiKey);
  const data = parseJsonObject(text);
  if (typeof data !== "object" || data === null) {
    throw new Error("Model returned non-object JSON");
  }
  for (const [slug, info] of Object.entries(data)) {
    if (info && typeof info === "object") out[slug] = info;
  }
  writeFileSync(OUT_PATH, JSON.stringify(out, null, 2) + "\n", "utf8");
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  loadEnvLocal();
  const apiKey = getApiKey();

  if (!existsSync(AREAS_PATH)) {
    console.error(`Missing ${AREAS_PATH}. Run generate-metro-detroit.mjs first.`);
    process.exit(1);
  }

  const areas = JSON.parse(readFileSync(AREAS_PATH, "utf8"));
  let out = {};
  if (existsSync(OUT_PATH)) {
    out = JSON.parse(readFileSync(OUT_PATH, "utf8"));
  }

  const args = process.argv.slice(2);
  const slugArg = args.find((a) => a.startsWith("--slug="));
  const slugFilter = slugArg ? slugArg.split("=")[1] : null;
  const refreshAll = args.includes("--all");

  let pending = areas.filter((a) => refreshAll || !(a.slug in out));
  if (slugFilter) {
    pending = areas.filter((a) => a.slug === slugFilter);
  }

  if (!apiKey) {
    console.log(
      "Gemini API disabled: set GOOGLE_GENERATIVE_API_KEY, GEMINI_API_KEY, or GOOGLE_PSI_API_KEY in .env.local to batch-refresh area insights."
    );
    console.log(
      `Local insights file unchanged (${Object.keys(out).length}/${areas.length} slugs present). Pending: ${pending.length}.`
    );
    process.exit(0);
  }

  console.log(
    `Gemini refresh: ${pending.length} area(s), batch size ${BATCH_SIZE}, model ${MODEL}`
  );

  for (let i = 0; i < pending.length; i += BATCH_SIZE) {
    const batch = pending.slice(i, i + BATCH_SIZE);
    const label = `${batch[0].slug} … ${batch[batch.length - 1].slug}`;
    console.log(`[${Math.floor(i / BATCH_SIZE) + 1}] ${label}`);
    try {
      await processBatch(batch, apiKey, out);
    } catch (err) {
      console.error(`  Batch failed: ${err.message}`);
    }
    await sleep(650);
  }

  console.log(`Done. ${Object.keys(out).length}/${areas.length} slugs in ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

/**
 * Generate images via Google Imagen (Gemini API) when enabled.
 * Saves PNGs under public/blog/ and public/photos/gen/
 *
 * Requires GOOGLE_GENERATIVE_API_KEY (or GEMINI_API_KEY / GOOGLE_PSI_API_KEY) in .env.local
 * and Generative Language API enabled on the Google Cloud project.
 *
 * Usage:
 *   node scripts/generate-gemini-images.mjs --blog     # all blog hero/secondary pairs
 *   node scripts/generate-gemini-images.mjs --gallery  # work gallery set
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const ENV_PATH = join(ROOT, ".env.local");
const MODEL = "imagen-3.0-generate-002";

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

const BLOG_JOBS = [
  "basement-drywall-finishing-metro-detroit",
  "level-5-smooth-walls-michigan-homes",
  "drywall-hole-repair-vs-large-patch",
  "water-damage-flood-cut-michigan",
  "commercial-tenant-drywall-detroit",
  "popcorn-ceiling-removal-metro-detroit",
  "hire-drywall-contractor-michigan-checklist",
  "new-construction-drywall-phases",
].flatMap((slug) => [
  {
    out: join(ROOT, "public/blog", `${slug}-hero.png`),
    prompt: `Professional photo for blog "${slug}", Metro Detroit drywall contractor, realistic, 16:9, no text overlay`,
  },
  {
    out: join(ROOT, "public/blog", `${slug}-secondary.png`),
    prompt: `Detail photo related to ${slug}, Michigan drywall job site, realistic, 16:9, no text`,
  },
]);

const GALLERY_JOBS = [
  { file: "gen--residential-finish.png", prompt: "Residential drywall Level 4 finish ready for paint, Michigan home interior" },
  { file: "gen--commercial-buildout.png", prompt: "Commercial office drywall and metal studs, Detroit tenant improvement" },
  { file: "gen--repair-patch.png", prompt: "Drywall hole patch blended with knockdown texture" },
  { file: "gen--ceiling-grid.png", prompt: "Suspended acoustical ceiling installation office" },
  { file: "gen--texture-knockdown.png", prompt: "Knockdown ceiling texture application" },
  { file: "gen--water-damage.png", prompt: "Flood cut and new drywall sheets basement Michigan" },
  { file: "gen--metal-framing.png", prompt: "Metal stud wall framing commercial" },
  { file: "gen--basement-finish.png", prompt: "Finished basement drywall with egress window" },
].map((j) => ({ out: join(ROOT, "public/photos", j.file), prompt: j.prompt }));

async function imagen(prompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:predict`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-goog-api-key": apiKey },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: { sampleCount: 1, aspectRatio: "16:9" },
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  const b64 = data?.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) throw new Error("No image bytes in response");
  return Buffer.from(b64, "base64");
}

async function runJobs(jobs, apiKey) {
  mkdirSync(join(ROOT, "public/blog"), { recursive: true });
  mkdirSync(join(ROOT, "public/photos"), { recursive: true });
  for (const job of jobs) {
    try {
      console.log("Generating", job.out.replace(ROOT, ""));
      const buf = await imagen(job.prompt, apiKey);
      writeFileSync(job.out, buf);
      await new Promise((r) => setTimeout(r, 1200));
    } catch (e) {
      console.error("  Failed:", e.message);
    }
  }
}

async function main() {
  loadEnvLocal();
  const key = getApiKey();
  if (!key) {
    console.log("No API key in .env.local — enable Generative Language API and set GOOGLE_GENERATIVE_API_KEY.");
    process.exit(0);
  }
  const args = process.argv.slice(2);
  if (args.includes("--blog")) await runJobs(BLOG_JOBS, key);
  if (args.includes("--gallery")) await runJobs(GALLERY_JOBS, key);
  if (!args.includes("--blog") && !args.includes("--gallery")) {
    console.log("Pass --blog and/or --gallery");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

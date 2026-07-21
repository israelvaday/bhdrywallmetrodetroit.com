/**
 * Bulk copy replacements for BH Drywall Metro Detroit rebrand.
 * Run: node scripts/apply-copy-replacements.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SKIP = new Set(["node_modules", ".next", ".git", "scripts/generate-metro-detroit.mjs"]);
const EXT = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".txt"]);

const REPLACEMENTS = [
  [/OH Lock & Key Solutions/g, "BH Drywall Metro Detroit"],
  [/OH Lock &amp; Key Solutions/g, "BH Drywall Metro Detroit"],
  [/OH Lock & Key/g, "BH Drywall Metro Detroit"],
  [/OH Lock &amp; Key/g, "BH Drywall Metro Detroit"],
  [/ohlockandkey\.com/g, "bhdrywallmetrodetroit.com"],
  [/Orange County, California/g, "Metro Detroit, Michigan"],
  [/Orange County, CA/g, "Metro Detroit, MI"],
  [/Orange County/g, "Metro Detroit"],
  [/Southern California/g, "Southeast Michigan"],
  [/California BSIS/g, "Michigan licensed"],
  [/BSIS-licensed/g, "Licensed & insured"],
  [/BSIS license/g, "contractor license"],
  [/BSIS #/g, "Licensed · "],
  [/BSIS #{BIZ\.bsis}/g, "Licensed & insured"],
  [/locksmith/gi, "drywall contractor"],
  [/Locksmith/g, "Drywall Contractor"],
  [/Santa Ana/g, "Detroit"],
  [/CA BSIS/g, "MI licensed"],
  [/Solutions · OC/g, "Metro Detroit"],
  [/ORANGE COUNTY/g, "METRO DETROIT"],
  [/Open 24 \/ 7/g, "Sun–Thu 9am–5pm · Fri 9am–12pm"],
  [/24\/7/g, "Sun–Thu 9am–5pm"],
  [/24-hour/gi, "same-day"],
  [/15–30 min ETA/g, "free estimate scheduling"],
  [/15 to 30 minutes/g, "your scheduled window"],
];

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (EXT.has(path.extname(ent.name))) out.push(p);
  }
  return out;
}

let files = 0;
let touched = 0;
for (const file of walk(ROOT)) {
  if (file.includes("apply-copy-replacements.mjs")) continue;
  if (file.endsWith("photos.json")) continue; // patched separately
  if (file.endsWith("area-insights.json")) continue;
  if (file.endsWith("service-areas.json")) continue;
  if (file.endsWith("service-areas-main.json")) continue;
  let text = fs.readFileSync(file, "utf8");
  const before = text;
  for (const [from, to] of REPLACEMENTS) {
    text = text.replace(from, to);
  }
  if (text !== before) {
    fs.writeFileSync(file, text);
    touched++;
  }
  files++;
}
console.log(`Scanned ${files} files, updated ${touched}.`);

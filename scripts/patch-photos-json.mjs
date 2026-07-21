/**
 * Update photos.json alt text for BH Drywall.
 */
import fs from "node:fs";
import path from "node:path";

const photosPath = path.resolve(import.meta.dirname, "../content/photos.json");
const photos = JSON.parse(fs.readFileSync(photosPath, "utf8"));
const BIZ = "BH Drywall Metro Detroit";
const REGION = "Metro Detroit, MI";

for (const p of photos) {
  let alt = p.alt || "";
  alt = alt
    .replace(/OH Lock & Key Solutions/g, BIZ)
    .replace(/OH Lock & Key/g, BIZ)
    .replace(/Orange County \(BSIS #8663\)/g, REGION)
    .replace(/Orange County \(BSIS #\d+\)/g, REGION)
    .replace(/Orange County/g, "Metro Detroit")
    .replace(/locksmith job/gi, "drywall project")
    .replace(/locksmith/gi, "drywall")
    .replace(/BSIS #8663/g, "licensed contractor")
    .replace(/California BSIS locksmith license #8663/g, "licensed drywall contractor")
    .replace(/smart lock install job/gi, "finish work")
    .replace(/storefront door job/gi, "commercial drywall")
    .replace(/access control job/gi, "metal framing")
    .replace(/auto locksmith job/gi, "water damage repair")
    .replace(/safe locksmith job/gi, "ceiling install")
    .replace(/specialty hardware job/gi, "texture finish")
    .replace(/rekey/gi, "finish");
  p.alt = alt;

  if (p.id === "logo-master-on-navy" || p.id === "logo-icon-square") {
    p.src = "/logo.png";
    p.alt = `${BIZ} logo`;
  }
  if (p.id === "branding-generated-hero-locksmith-hands-installing-deadbolt") {
    p.src = "/photos/branding-generated--hero-drywall-metro-detroit.png";
    p.alt = `${BIZ} crew finishing drywall in a Metro Detroit home`;
  }
  if (p.id.startsWith("service-hero-")) {
    p.alt = `${p.id.replace("service-hero-", "").replace(/-/g, " ")} service — ${BIZ}, ${REGION}`;
  }
  if (p.id === "license-bsis-license-8663") {
    p.kind = "brand";
    p.category = "trust";
    p.alt = `${BIZ} — licensed & insured drywall contractor, ${REGION}`;
  }
}

fs.writeFileSync(photosPath, JSON.stringify(photos, null, 2) + "\n");
console.log(`Updated ${photos.length} photo records.`);

/**
 * Rebuild content/photos.json for BH Drywall — generated + branding assets only.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PHOTOS_DIR = join(ROOT, "public/photos");
const OUT = join(ROOT, "content/photos.json");
const BIZ = "BH Drywall Metro Detroit";
const REGION = "Metro Detroit, MI";

const SERVICE_SLUGS = [
  "emergency",
  "residential",
  "commercial",
  "storefront",
  "smart-locks",
  "access-control",
  "automotive",
  "specialty",
  "safes",
  "rekey",
];

const SERVICE_SHORT = {
  emergency: "Repair",
  residential: "Residential",
  commercial: "Commercial",
  storefront: "Retail",
  "smart-locks": "Smooth Finish",
  "access-control": "Framing",
  automotive: "Water Damage",
  specialty: "Texture",
  safes: "Ceilings",
  rekey: "New Build",
};

const GEN_LABELS = {
  "gen--residential-finish.png": { cat: "residential", services: ["residential"], alt: "Level 4 residential drywall finish" },
  "gen--commercial-buildout.png": { cat: "commercial", services: ["commercial", "storefront"], alt: "Commercial tenant drywall buildout" },
  "gen--repair-patch.png": { cat: "repair", services: ["emergency", "residential"], alt: "Drywall patch and texture blend" },
  "gen--ceiling-grid.png": { cat: "ceilings", services: ["safes"], alt: "Suspended acoustical ceiling install" },
  "gen--texture-knockdown.png": { cat: "texture", services: ["specialty"], alt: "Knockdown ceiling texture" },
  "gen--water-damage.png": { cat: "water", services: ["automotive"], alt: "Water damage drywall replacement" },
  "gen--metal-framing.png": { cat: "framing", services: ["access-control"], alt: "Metal stud partition framing" },
  "gen--basement-finish.png": { cat: "residential", services: ["residential", "rekey"], alt: "Finished basement drywall" },
  "gen-v2--mud-taping-joint.png": { cat: "residential", services: ["residential", "rekey"], alt: "Mud and tape on drywall joint" },
  "gen-v2--level5-skim.png": { cat: "residential", services: ["residential", "smart-locks"], alt: "Level 5 skim coat smooth wall" },
  "gen-v2--corner-bead.png": { cat: "framing", services: ["residential", "commercial"], alt: "Corner bead on drywall outside corner" },
  "gen-v2--drywall-lift-hang.png": { cat: "framing", services: ["rekey", "commercial"], alt: "Drywall lift hanging ceiling sheet" },
  "gen-v2--office-buildout-night.png": { cat: "commercial", services: ["commercial", "storefront"], alt: "After-hours commercial drywall buildout" },
  "gen-v2--kitchen-remodel.png": { cat: "residential", services: ["residential", "emergency"], alt: "Kitchen remodel drywall finish" },
  "gen-v2--garage-drywall.png": { cat: "residential", services: ["residential"], alt: "Garage drywall finish" },
  "gen-v2--stairwell-smooth.png": { cat: "residential", services: ["residential"], alt: "Smooth drywall stairwell" },
  "gen-v2--fire-rated-taping.png": { cat: "commercial", services: ["commercial", "access-control"], alt: "Fire-rated drywall taping" },
  "gen-v2--orange-peel-match.png": { cat: "texture", services: ["specialty"], alt: "Orange peel texture match" },
  "gen-v2--bathroom-greenboard.png": { cat: "residential", services: ["residential"], alt: "Bathroom moisture-resistant drywall" },
  "gen-v2--condo-highrise.png": { cat: "commercial", services: ["commercial", "residential"], alt: "Condo high-rise drywall finish" },
  "gen-v2--retail-soffit.png": { cat: "commercial", services: ["storefront", "commercial"], alt: "Retail soffit drywall" },
  "gen-v2--warehouse-partition.png": { cat: "commercial", services: ["commercial", "access-control"], alt: "Warehouse partition drywall" },
  "gen-v2--popcorn-removal.png": { cat: "texture", services: ["specialty", "residential"], alt: "Popcorn ceiling removal" },
  "gen-v2--crew-sanding.png": { cat: "residential", services: ["residential", "rekey"], alt: "Drywall crew pole sanding" },
  "gen-v2--multi-family-hall.png": { cat: "commercial", services: ["rekey", "commercial"], alt: "Multi-family hallway drywall" },
  "gen-v2--exterior-soffit.png": { cat: "residential", services: ["residential", "storefront"], alt: "Exterior soffit drywall repair" },
};

function meta(w = 1600, h = 900) {
  return {
    width: w,
    height: h,
    ratio: +(w / h).toFixed(3),
    orientation: w >= h ? "landscape" : "portrait",
    bytes: 120000,
    source: "generated",
  };
}

function labelForFile(file) {
  if (GEN_LABELS[file]) return GEN_LABELS[file];
  const slug = file.replace(/^gen(-v2)?--/, "").replace(".png", "").replace(/-/g, " ");
  return {
    cat: "residential",
    services: ["residential"],
    alt: slug.charAt(0).toUpperCase() + slug.slice(1),
  };
}

const photos = [];

for (const slug of SERVICE_SLUGS) {
  const label = SERVICE_SHORT[slug] ?? slug.replace(/-/g, " ");
  photos.push({
    id: `service-hero-${slug}`,
    src: `/photos/service-hero-${slug}.png`,
    alt: `${label} — ${BIZ}, ${REGION}`,
    category: "service-hero",
    kind: "hero",
    services: [slug],
    ...meta(),
  });
}

photos.push({
  id: "logo-master-on-navy",
  src: "/logo.png",
  alt: `${BIZ} logo`,
  category: "brand",
  kind: "brand",
  services: ["brand"],
  ...meta(512, 512),
});

photos.push({
  id: "logo-icon-square",
  src: "/logo.png",
  alt: `${BIZ} icon`,
  category: "brand",
  kind: "brand",
  services: ["brand"],
  ...meta(512, 512),
});

photos.push({
  id: "branding-hero-metro",
  src: "/photos/branding-generated--hero-drywall-metro-detroit.png",
  alt: `${BIZ} crew finishing walls in a Michigan home`,
  category: "branding-generated",
  kind: "hero",
  services: ["residential", "commercial"],
  ...meta(),
});

photos.push({
  id: "branding-map-metro",
  src: "/photos/branding-generated--metro-detroit-map-mockup.png",
  alt: `${BIZ} Metro Detroit service area map`,
  category: "branding-generated",
  kind: "brand",
  services: ["brand"],
  ...meta(),
});

const fallback = join(PHOTOS_DIR, "branding-generated--hero-drywall-metro-detroit.png");
const genFiles = existsSync(PHOTOS_DIR)
  ? readdirSync(PHOTOS_DIR).filter((f) => /^gen(-v2)?--.+\.png$/i.test(f)).sort()
  : [];

for (const file of genFiles) {
  const path = join(PHOTOS_DIR, file);
  if (!existsSync(path)) continue;
  const info = labelForFile(file);
  photos.push({
    id: file.replace(".png", "").replace(/\//g, "-"),
    src: `/photos/${file}`,
    alt: `${info.alt} — ${BIZ}, ${REGION}`,
    category: info.cat,
    kind: "work",
    services: info.services,
    ...meta(),
  });
}

writeFileSync(OUT, JSON.stringify(photos, null, 2) + "\n");
console.log(`Wrote ${photos.length} photos to content/photos.json (${genFiles.length} gallery work shots)`);

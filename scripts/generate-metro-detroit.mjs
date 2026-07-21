/**
 * Generates Metro Detroit (Wayne, Oakland, Macomb) service areas + local drywall insights.
 * Output: content/service-areas.json, service-areas-main.json, area-insights.json
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, "..", "content");

function slugify(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** @type {Array<{ name: string; lat: number; lng: number; main?: boolean }>} */
const CITIES = [
  { name: "Detroit", lat: 42.3314, lng: -83.0458, main: true },
  { name: "Dearborn", lat: 42.3223, lng: -83.1763, main: true },
  { name: "Livonia", lat: 42.3684, lng: -83.3527, main: true },
  { name: "Westland", lat: 42.3242, lng: -83.4002, main: true },
  { name: "Canton", lat: 42.3087, lng: -83.4822, main: false },
  { name: "Taylor", lat: 42.2409, lng: -83.2697, main: false },
  { name: "Redford", lat: 42.3964, lng: -83.2966, main: false },
  { name: "Garden City", lat: 42.3256, lng: -83.331, main: false },
  { name: "Inkster", lat: 42.2942, lng: -83.3099, main: false },
  { name: "Romulus", lat: 42.2223, lng: -83.3966, main: false },
  { name: "Wayne", lat: 42.2814, lng: -83.3863, main: false },
  { name: "Highland Park", lat: 42.4056, lng: -83.0978, main: false },
  { name: "Hamtramck", lat: 42.3928, lng: -83.0496, main: false },
  { name: "Dearborn Heights", lat: 42.3369, lng: -83.2733, main: false },
  { name: "Lincoln Park", lat: 42.2506, lng: -83.1785, main: false },
  { name: "Allen Park", lat: 42.2575, lng: -83.211, main: false },
  { name: "Wyandotte", lat: 42.2142, lng: -83.1499, main: false },
  { name: "Southgate", lat: 42.2139, lng: -83.1938, main: false },
  { name: "Grosse Pointe", lat: 42.3861, lng: -82.9118, main: false },
  { name: "Harper Woods", lat: 42.4331, lng: -82.9248, main: false },
  { name: "Troy", lat: 42.6064, lng: -83.1498, main: true },
  { name: "Rochester Hills", lat: 42.6583, lng: -83.1499, main: true },
  { name: "Southfield", lat: 42.4734, lng: -83.2219, main: true },
  { name: "Farmington Hills", lat: 42.4988, lng: -83.3677, main: true },
  { name: "Pontiac", lat: 42.6389, lng: -83.291, main: true },
  { name: "Royal Oak", lat: 42.4895, lng: -83.1446, main: true },
  { name: "Birmingham", lat: 42.5467, lng: -83.2113, main: false },
  { name: "Bloomfield Hills", lat: 42.5836, lng: -83.2455, main: false },
  { name: "West Bloomfield", lat: 42.5689, lng: -83.3836, main: false },
  { name: "Novi", lat: 42.4806, lng: -83.4755, main: false },
  { name: "Auburn Hills", lat: 42.6875, lng: -83.2341, main: false },
  { name: "Madison Heights", lat: 42.4859, lng: -83.1052, main: false },
  { name: "Ferndale", lat: 42.4606, lng: -83.1346, main: false },
  { name: "Oak Park", lat: 42.4595, lng: -83.1827, main: false },
  { name: "Rochester", lat: 42.6806, lng: -83.1338, main: false },
  { name: "Warren", lat: 42.5145, lng: -83.0147, main: true },
  { name: "Sterling Heights", lat: 42.5803, lng: -83.0302, main: true },
  { name: "Clinton Township", lat: 42.5869, lng: -82.9195, main: false },
  { name: "Shelby Township", lat: 42.6704, lng: -83.032, main: false },
  { name: "Macomb Township", lat: 42.6695, lng: -82.959, main: false },
  { name: "St. Clair Shores", lat: 42.497, lng: -82.8968, main: false },
  { name: "Roseville", lat: 42.4972, lng: -82.9371, main: false },
  { name: "Fraser", lat: 42.5553, lng: -82.9494, main: false },
  { name: "Mount Clemens", lat: 42.5973, lng: -82.8779, main: false },
  { name: "Utica", lat: 42.6261, lng: -83.0335, main: false },
  { name: "Eastpointe", lat: 42.468, lng: -82.9554, main: false },
];

/** @type {Array<{ name: string; lat: number; lng: number }>} */
const COMMUNITIES = [
  { name: "Grosse Pointe Park", lat: 42.3753, lng: -82.9374 },
  { name: "Grosse Pointe Woods", lat: 42.4436, lng: -82.9069 },
  { name: "Belleville", lat: 42.2048, lng: -83.4852 },
  { name: "Chesterfield Township", lat: 42.6728, lng: -82.8423 },
  { name: "New Baltimore", lat: 42.6811, lng: -82.7368 },
];

/** @type {Record<string, string[]>} */
const NEIGHBORHOODS = {
  Detroit: [
    "Downtown",
    "Midtown",
    "New Center",
    "Corktown",
    "Greektown",
    "Eastern Market",
    "Brush Park",
    "Woodbridge",
    "Indian Village",
    "Boston-Edison",
    "Palmer Woods",
    "Palmer Park",
    "Lafayette Park",
    "Mexicantown",
    "Southwest Detroit",
    "North End",
    "East English Village",
    "Jefferson-Chalmers",
    "Warrendale",
    "Grandmont-Rosedale",
    "Rosedale Park",
    "Northwest Detroit",
    "East Side",
    "West Side",
  ],
  Dearborn: ["West Dearborn", "East Dearborn", "Ford Rouge area", "Southend Dearborn"],
  Livonia: ["Rosedale Gardens", "Greenmead", "Livonia Downtown"],
  "Royal Oak": ["Downtown Royal Oak", "Norman Oaks", "Northwood-Ferndale border"],
  Troy: ["Big Beaver Corridor", "Somerset area", "Troy Historic Village area"],
  Warren: ["Warren Civic Center", "Van Dyke Corridor", "Warren Woods"],
  "Sterling Heights": ["Sterling Heights Utica corridor", "Dodge Park area"],
  "Farmington Hills": ["Downtown Farmington", "Heritage Park area"],
  Southfield: ["Southfield Town Center", "Northland area"],
  Pontiac: ["Downtown Pontiac", "Phoenix Center area"],
  "Rochester Hills": ["Rochester Hills Downtown", "Stoney Creek area"],
};

/** Curated landmarks + housing notes keyed by slug (fallbacks generated otherwise). */
const CURATED = {
  detroit: {
    landmarks: ["Detroit Institute of Arts", "Ford Field", "Eastern Market"],
    notes:
      "Detroit's housing mix spans pre-war brick flats, mid-century bungalows, and renovated lofts—each with different drywall repair and finishing needs. Freeze-thaw cycles and older plumbing often cause ceiling and basement wall damage that needs moisture-safe board replacement. Renovation activity in core neighborhoods keeps steady demand for smooth Level 4–5 finishes and texture matching.",
    calls: ["water-damaged ceiling repair", "basement drywall hang", "historic home skim coat"],
  },
  "detroit-midtown": {
    landmarks: ["Detroit Institute of Arts", "Wayne State University", "Whole Foods Midtown"],
    notes:
      "Midtown blends student housing, condos, and restored mansions where owners expect crisp, modern drywall lines. Common jobs include patching after HVAC or electrical upgrades in older multi-unit buildings. Sound isolation and fire-rated assemblies show up often in mixed-use rehab work.",
    calls: ["condo drywall patch", "Level 5 finish living room", "metal stud partition"],
  },
  "detroit-corktown": {
    landmarks: ["Michigan Central Station", "Corktown Park", "Trumbull Avenue strip"],
    notes:
      "Corktown's Victorian workers' cottages and newer infill need careful texture blending on plaster-to-drywall transitions. Restaurant and retail build-outs along Michigan Avenue drive commercial hanging and fire-taped assemblies. Many basements still get first-time drywall after waterproofing.",
    calls: ["restaurant soffit framing", "exposed brick edge drywall", "basement finish hang"],
  },
  dearborn: {
    landmarks: ["Henry Ford Museum", "Ford World Headquarters", "Fairlane Town Center"],
    notes:
      "Dearborn has dense post-war ranch neighborhoods plus steady commercial work near the auto corridor. We often repair garage-to-house firewall drywall and finish bonus rooms over attached garages. Humid summers make mold-resistant board a smart choice in lower levels.",
    calls: ["garage firewall repair", "popcorn ceiling removal", "office partition framing"],
  },
  livonia: {
    landmarks: ["Greenmead Historical Park", "Livonia Civic Center Library", "Laurel Park Place"],
    notes:
      "Livonia's 1950s–70s subdivisions mean lots of textured ceilings, paneling removal, and whole-room re-skims. Families finishing basements for home offices is a year-round trend. Matching orange-peel or knockdown in older ranches takes experienced finish work.",
    calls: ["basement drywall finish", "textured ceiling skim", "patch after plumbing leak"],
  },
  troy: {
    landmarks: ["Somerset Collection", "Troy Historic Village", "Big Beaver Road corridor"],
    notes:
      "Troy combines executive homes with large commercial build-outs along the I-75 corridor. High-end remodels request smooth ceilings, recessed detail, and clean corner bead work. Office tenant improvements need fast hang-and-tape turnover with minimal dust.",
    calls: ["smooth ceiling remodel", "commercial TI drywall", "water damage patch"],
  },
  warren: {
    landmarks: ["General Motors Technical Center", "Warren City Hall", "Universal Mall area"],
    notes:
      "Warren's stock is largely mid-century brick ranches and bungalows with finished basements that flood after heavy rain. We handle a steady volume of lower-level board replacement and mold-treated hanging. GM-adjacent facilities sometimes need commercial metal framing and abuse-resistant gypsum.",
    calls: ["basement flood drywall replace", "ceiling texture match", "shop wall metal studs"],
  },
  "sterling-heights": {
    landmarks: ["Dodge Park", "Sterling Heights Nature Center", "Hall Road retail corridor"],
    notes:
      "Sterling Heights families often expand living space with basement builds and two-story additions that need full hang, tape, and prime. 1980s–90s homes may still have dated popcorn ceilings targeted for removal. Subdivision HOA repairs require neat patch blending on shared walls.",
    calls: ["addition drywall hang", "popcorn removal skim", "shared wall patch"],
  },
  "rochester-hills": {
    landmarks: ["Rochester Hills Museum", "Yates Cider Mill", "Rochester College area"],
    notes:
      "Upscale subdivisions and custom homes in Rochester Hills favor flawless Level 5 finishes and tall great-room ceilings. New construction and whole-home remodels keep crews busy on board hang and custom soffits. Cold winters highlight the need for proper vapor barriers behind basement drywall.",
    calls: ["great room ceiling hang", "custom soffit framing", "Level 5 skim coat"],
  },
  "royal-oak": {
    landmarks: ["Royal Oak Music Theatre", "Detroit Zoo", "Downtown Royal Oak dining district"],
    notes:
      "Royal Oak mixes walkable downtown lofts with tidy bungalows on tree-lined streets. Downtown tenants need quick patch-and-paint drywall after build-out changes. Older homes often hide plaster walls—we integrate drywall where walls were opened for wiring upgrades.",
    calls: ["loft partition wall", "downtown patch repair", "knob-and-tube wall restore"],
  },
  "farmington-hills": {
    landmarks: ["Heritage Park", "Farmington Hills City Hall", "Twelve Oaks Mall vicinity"],
    notes:
      "Farmington Hills has large colonials and condos with finished lower levels that need periodic leak repairs. Condo associations request uniform ceiling texture after bathroom fan relocations. Office parks along Grand River Avenue need commercial hanging for spec suites.",
    calls: ["condo ceiling repair", "colonial room re-drywall", "spec office hang"],
  },
  southfield: {
    landmarks: ["Southfield Town Center", "Northland Center site", "Lawrence Technological University"],
    notes:
      "Southfield's office towers and apartment high-rises require commercial drywall crews familiar with fire ratings and lift access. Residential pockets nearby have 1960s ranches needing modernization—removing paneling and hanging fresh board. Elevator lobby refreshes are common in multi-family buildings.",
    calls: ["high-rise corridor patch", "ranch modernization hang", "fire-rated shaft repair"],
  },
  pontiac: {
    landmarks: ["Pontiac Silverdome site area", "Phoenix Center", "Oakland County courthouse district"],
    notes:
      "Pontiac is seeing rehab of historic commercial shells alongside affordable housing updates. Landlords need durable rental-unit patches between tenants. Older homes near downtown often need plaster crack stabilization covered with drywall overlays.",
    calls: ["rental unit turnover patch", "commercial shell hang", "plaster overlay board"],
  },
  westland: {
    landmarks: ["Westland Shopping Center", "Hines Park", "Wayne County Lightfest area"],
    notes:
      "Westland's post-war suburbs feature ranch homes with finished basements and attached garages—prime territory for firewall repairs and ceiling retexturing. Shopping center back-of-house areas need periodic gypsum maintenance. Summer storms push water-damage calls on lower levels.",
    calls: ["garage-to-house wall repair", "storm water drywall replace", "retail backroom patch"],
  },
};

const DRYWALL_CALLS = [
  "drywall water damage repair",
  "ceiling texture matching",
  "basement finishing hang and tape",
  "metal stud framing partition",
  "popcorn ceiling removal skim",
  "drywall patch after plumbing",
  "commercial hang and finish",
  "Level 5 smooth wall finish",
];

function pickCalls(seed, extra) {
  const base = extra?.length ? extra : [];
  const pool = [...base, ...DRYWALL_CALLS];
  const out = [];
  for (let i = 0; i < pool.length && out.length < 3; i++) {
    const item = pool[(seed + i) % pool.length];
    if (!out.includes(item)) out.push(item);
  }
  while (out.length < 3) out.push(DRYWALL_CALLS[out.length]);
  return out;
}

function defaultLandmarks(area) {
  const city = area.city;
  return [
    `${city} City Hall`,
    `${city} public library`,
    `Major retail corridor in ${city}`,
  ];
}

function buildKeywords(area) {
  const loc = area.name.toLowerCase();
  const city = area.city.toLowerCase();
  return [
    `${loc} drywall contractor`,
    `drywall repair ${city} mi`,
    `drywall finishing ${loc}`,
    `ceiling repair ${city} michigan`,
    `commercial drywall ${city}`,
    `basement drywall ${loc}`,
    `water damage drywall ${city} mi`,
  ];
}

function insightFor(area) {
  const c = CURATED[area.slug];
  const seed = area.slug.split("").reduce((n, ch) => n + ch.charCodeAt(0), 0);
  const display = area.kind === "city" ? area.name : `${area.name}, ${area.city}`;
  return {
    tagline: c?.tagline ?? `Professional drywall hang, finish, and repair in ${display}.`,
    landmarks: c?.landmarks ?? defaultLandmarks(area),
    common_calls: pickCalls(seed, c?.calls),
    neighborhood_notes:
      c?.notes ??
      `${area.city} homes and businesses rely on quality drywall for comfort, fire separation, and clean interiors. ` +
        `In ${area.name}, we see steady demand for patch work after Michigan freeze-thaw cycles, basement finishing, and texture matching on mid-century walls. ` +
        `BH Drywall Metro Detroit handles residential and light commercial hang, tape, repair, and metal framing throughout Wayne, Oakland, and Macomb counties.`,
    keywords: buildKeywords(area),
  };
}

function buildEntries() {
  /** @type {Array<Record<string, unknown>>} */
  const entries = [];
  const citySlugs = {};

  for (const c of CITIES) {
    const slug = slugify(c.name);
    citySlugs[c.name] = slug;
    entries.push({
      slug,
      name: c.name,
      city: c.name,
      kind: "city",
      lat: c.lat,
      lng: c.lng,
      parent: null,
      main: Boolean(c.main),
    });
  }

  for (const c of COMMUNITIES) {
    const slug = slugify(c.name);
    entries.push({
      slug,
      name: c.name,
      city: c.name,
      kind: "community",
      lat: c.lat,
      lng: c.lng,
      parent: null,
      main: false,
    });
  }

  for (const [cityName, hoods] of Object.entries(NEIGHBORHOODS)) {
    const parentSlug = citySlugs[cityName];
    if (!parentSlug) continue;
    const parent = CITIES.find((x) => x.name === cityName);
    if (!parent) continue;
    hoods.forEach((hood, i) => {
      const jitterLat = ((i % 5) - 2) * 0.004;
      const jitterLng = (Math.floor(i / 5) - 2) * 0.004;
      entries.push({
        slug: `${parentSlug}-${slugify(hood)}`,
        name: hood,
        city: cityName,
        kind: "neighborhood",
        lat: Math.round((parent.lat + jitterLat) * 10000) / 10000,
        lng: Math.round((parent.lng + jitterLng) * 10000) / 10000,
        parent: parentSlug,
        main: false,
      });
    });
  }

  return entries;
}

function main() {
  mkdirSync(CONTENT_DIR, { recursive: true });
  const entries = buildEntries();
  const mainEntries = entries.filter((e) => e.main);

  const insights = {};
  for (const area of entries) {
    insights[area.slug] = insightFor(area);
  }

  const fullPath = join(CONTENT_DIR, "service-areas.json");
  const mainPath = join(CONTENT_DIR, "service-areas-main.json");
  const insightsPath = join(CONTENT_DIR, "area-insights.json");

  writeFileSync(fullPath, JSON.stringify(entries, null, 2) + "\n", "utf8");
  writeFileSync(mainPath, JSON.stringify(mainEntries, null, 2) + "\n", "utf8");
  writeFileSync(insightsPath, JSON.stringify(insights, null, 2) + "\n", "utf8");

  const byKind = {};
  for (const e of entries) {
    byKind[e.kind] = (byKind[e.kind] || 0) + 1;
  }

  console.log(`Wrote ${entries.length} areas → ${fullPath}`);
  console.log(`Wrote ${mainEntries.length} main cities → ${mainPath}`);
  console.log(`Wrote ${Object.keys(insights).length} insights → ${insightsPath}`);
  console.log("Breakdown:", byKind);
  console.log(`Sample slug: ${entries[0]?.slug}`);
}

main();

import {
  Hammer, Home, Building2, Store, Paintbrush, Columns3,
  Droplets, Layers, Grid3X3, HardHat, Siren,
} from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  icon: typeof Hammer;
  tagline: string;
  description: string;
  bullets: string[];
  intent: "emergency" | "service" | "trust";
  keywords: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "emergency",
    name: "Same-Day Drywall Repair",
    shortName: "Repair",
    icon: Siren,
    tagline: "Holes, cracks, water stains — patched and blended fast.",
    description:
      "Need drywall fixed before a showing, tenant move-in, or insurance walkthrough? BH Drywall Metro Detroit handles same-day and next-day patch work across Wayne, Oakland, and Macomb counties — from nail pops and doorknob holes to larger cut-outs after plumbing or electrical.",
    bullets: [
      "Hole & crack patching",
      "Texture blending to match",
      "Insurance photo-ready repairs",
      "Tenant turnover punch lists",
      "Ceiling patch & skim",
    ],
    intent: "emergency",
    keywords: ["drywall repair detroit", "same day drywall patch", "hole in wall repair mi"],
  },
  {
    slug: "residential",
    name: "Residential Drywall",
    shortName: "Residential",
    icon: Home,
    tagline: "Basements, additions, remodels — smooth walls that paint right.",
    description:
      "We hang, tape, and finish drywall for Metro Detroit homeowners — basement refinishing, kitchen gut rehabs, garage conversions, and whole-room skim coats. Level 4 and Level 5 finishes available for critical lighting areas.",
    bullets: [
      "Basement finishing & framing",
      "Room additions & soffits",
      "Skim coat over old texture",
      "Garage & attic drywall",
      "Fireplace surrounds & niches",
    ],
    intent: "service",
    keywords: ["residential drywall detroit", "basement drywall mi", "drywall finishing metro detroit"],
  },
  {
    slug: "commercial",
    name: "Commercial Drywall",
    shortName: "Commercial",
    icon: Building2,
    tagline: "Offices, medical, industrial — schedule-driven crews.",
    description:
      "General contractors and property managers rely on us for tenant improvements, office build-outs, and phased drywall in occupied buildings. We coordinate with your GC schedule and deliver documented daily progress.",
    bullets: [
      "Office & medical build-outs",
      "Warehouse & industrial partitions",
      "After-hours occupied work",
      "Fire-rated assemblies",
      "GC schedule coordination",
    ],
    intent: "service",
    keywords: ["commercial drywall detroit", "tenant improvement drywall", "office drywall contractor mi"],
  },
  {
    slug: "storefront",
    name: "Retail & Restaurant Buildouts",
    shortName: "Retail",
    icon: Store,
    tagline: "Fast-turn storefronts, kitchens, and lease spaces.",
    description:
      "Retail and restaurant openings run on hard dates. We drywall new storefronts, back-of-house kitchens, and mall kiosks with crews sized to your permit schedule — including bulkheads, soffits, and chase walls.",
    bullets: [
      "Storefront & kiosk walls",
      "Restaurant kitchen liners",
      "Mall & strip-center TI",
      "Bulkheads & soffits",
      "Landlord punch-list closeout",
    ],
    intent: "service",
    keywords: ["retail drywall detroit", "restaurant buildout drywall", "storefront contractor mi"],
  },
  {
    slug: "smart-locks",
    name: "Level 5 Smooth Finish",
    shortName: "Smooth Finish",
    icon: Paintbrush,
    tagline: "Mirror-smooth walls for modern paint and wallpaper.",
    description:
      "Critical-light rooms, high-end paint, and wallpaper need a true Level 5 finish — skim coat over the entire surface so joints disappear under raking light. We specialize in smooth-wall conversions in older Metro Detroit homes.",
    bullets: [
      "Full-room skim coat",
      "Level 5 for critical lighting",
      "Wallpaper-ready surfaces",
      "Popcorn removal prep",
      "Orange-peel to smooth conversion",
    ],
    intent: "service",
    keywords: ["level 5 drywall finish", "smooth wall skim coat detroit", "drywall for wallpaper mi"],
  },
  {
    slug: "access-control",
    name: "Metal Stud Framing",
    shortName: "Framing",
    icon: Columns3,
    tagline: "Non-load and partition framing for commercial & residential.",
    description:
      "We lay out and build metal stud partitions, soffits, and shaft walls to spec — including sound batten layouts, fire-stopping coordination, and backing for grab bars, TVs, and cabinetry.",
    bullets: [
      "Metal stud partitions",
      "Soffits & bulkheads",
      "Shaft & chase walls",
      "Backing & blocking layout",
      "Sound-rated assemblies",
    ],
    intent: "service",
    keywords: ["metal stud framing detroit", "commercial framing contractor mi", "drywall framing metro detroit"],
  },
  {
    slug: "automotive",
    name: "Water Damage Restoration",
    shortName: "Water Damage",
    icon: Droplets,
    tagline: "Flood cuts, drying coordination, and insurance-ready rebuild.",
    description:
      "Burst pipes, roof leaks, and basement flooding often mean removed drywall before mold sets in. We work with restoration timelines — flood cuts, replacement hang, texture match, and documentation for adjusters.",
    bullets: [
      "Flood cut & removal",
      "Mold-safe replacement hang",
      "Texture & color match",
      "Basement & ceiling drying rebuild",
      "Insurance scope support",
    ],
    intent: "service",
    keywords: ["water damage drywall detroit", "flood cut drywall mi", "basement drywall after flood"],
  },
  {
    slug: "specialty",
    name: "Texture & Custom Finishes",
    shortName: "Texture",
    icon: Layers,
    tagline: "Knockdown, orange peel, skip trowel — matched to your home.",
    description:
      "Michigan homes span 1920s plaster, 1970s popcorn, and modern smooth coat. We sample existing texture, document the match, and reproduce knockdown, orange peel, skip trowel, and hand-troweled finishes.",
    bullets: [
      "Knockdown & orange peel",
      "Skip trowel & hand texture",
      "Popcorn removal & retexture",
      "Ceiling texture repair",
      "Sample boards for approval",
    ],
    intent: "service",
    keywords: ["drywall texture detroit", "knockdown texture mi", "popcorn ceiling removal detroit"],
  },
  {
    slug: "safes",
    name: "Acoustical Ceilings",
    shortName: "Ceilings",
    icon: Grid3X3,
    tagline: "Suspended grid, tile, and gypsum ceiling systems.",
    description:
      "We install and repair suspended acoustical ceilings for offices, schools, and retail — grid layout, seismic bracing where required, tile replacement, and transitions to gypsum perimeter bulkheads.",
    bullets: [
      "2×2 & 2×4 grid systems",
      "Tile replacement & cleaning",
      "Gypsum ceiling liners",
      "Perimeter bulkheads",
      "Seismic & fire-rated details",
    ],
    intent: "service",
    keywords: ["acoustical ceiling detroit", "drop ceiling installation mi", "suspended ceiling contractor"],
  },
  {
    slug: "rekey",
    name: "New Construction Hang & Finish",
    shortName: "New Build",
    icon: HardHat,
    tagline: "Production hang, tape, and finish for builders.",
    description:
      "Builders and developers across Metro Detroit use us for production drywall — multi-unit apartments, spec homes, and custom builds. Hang crews, finish crews, and punch-list teams available by phase.",
    bullets: [
      "Production hang crews",
      "Tape, mud & sand",
      "Multi-family & spec homes",
      "Garage & common-area packages",
      "Final walk punch closeout",
    ],
    intent: "service",
    keywords: ["new construction drywall detroit", "production drywall mi", "builder drywall contractor"],
  },
];

export const SERVICES_BY_SLUG: Record<string, Service> = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s])
);

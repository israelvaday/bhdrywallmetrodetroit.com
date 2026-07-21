export type FAQ = { q: string; a: string };

export type FAQSection = {
  id: string;
  title: string;
  emoji: string;
  description: string;
  items: FAQ[];
};

export const FAQ_HERO_IMAGE = "/photos/branding-generated--hero-drywall-metro-detroit.png";
export const FAQ_HERO_ALT = "BH Drywall Metro Detroit estimator reviewing a drywall finish with a homeowner";

export const FAQ_SECTIONS: FAQSection[] = [
  {
    id: "general",
    title: "General",
    emoji: "🛡️",
    description: "Who we are and how we work.",
    items: [
      {
        q: "Are you a local drywall company or a referral service?",
        a: "BH Drywall Metro Detroit is a local, licensed & insured drywall contractor. You speak with our team directly — not a national lead broker.",
      },
      {
        q: "What areas do you serve?",
        a: "Wayne, Oakland, and Macomb counties — Detroit, Dearborn, Warren, Sterling Heights, Troy, Livonia, Royal Oak, and 90+ cities and neighborhoods. See our service-area map.",
      },
      {
        q: "What are your hours?",
        a: "Sunday–Thursday 9:00 AM–5:00 PM, Friday 9:00 AM–12:00 PM. Closed Saturday. Same-day repair slots when crews are available.",
      },
      {
        q: "Do you offer free estimates?",
        a: "Yes. We provide written estimates for hang, finish, repair, and commercial projects before work begins.",
      },
      {
        q: "What payment methods do you accept?",
        a: "Check, card, and ACH for commercial accounts. Invoices include scope, materials, and labor line items.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing",
    emoji: "💰",
    description: "How drywall bids are built.",
    items: [
      {
        q: "How do you price drywall work?",
        a: "By scope: square footage, finish level (Level 4 vs Level 5), ceiling height, texture match, and access. We measure on-site or from plans — not vague per-square-foot phone quotes without context.",
      },
      {
        q: "How much does drywall repair cost?",
        a: "Small patches often start around $200–$400. Larger repairs, ceiling work, or texture blending are quoted after photos or a site visit.",
      },
      {
        q: "Do you charge a trip fee?",
        a: "Diagnostic visits for small repairs may include a minimum service charge credited toward the repair when you approve the work.",
      },
      {
        q: "Are there hidden fees?",
        a: "No. Change orders are written and signed before extra work — especially on commercial and insurance jobs.",
      },
    ],
  },
  {
    id: "services",
    title: "Services",
    emoji: "🔨",
    description: "What we hang, finish, and fix.",
    items: [
      {
        q: "Do you match existing texture?",
        a: "Yes. We sample your wall, document the match (orange peel, knockdown, smooth), and blend repairs before paint.",
      },
      {
        q: "Can you work with my general contractor?",
        a: "Yes. We sub to GCs on new construction, tenant improvements, and phased occupied buildings.",
      },
      {
        q: "Do you handle water damage drywall?",
        a: "Yes — flood cuts, replacement hang, finish, and documentation for insurance scopes when needed.",
      },
      {
        q: "Do you install ceilings?",
        a: "Yes — gypsum ceilings and suspended acoustical grid/tile systems for offices and retail.",
      },
    ],
  },
  {
    id: "trust",
    title: "Trust & quality",
    emoji: "✅",
    description: "Credentials and expectations.",
    items: [
      {
        q: "Are you licensed and insured?",
        a: "Yes. We carry general liability and workers comp. Certificate of insurance available for commercial clients.",
      },
      {
        q: "Who will be on my job?",
        a: "BH Drywall Metro Detroit crews — not anonymous subcontractors sent by a call center.",
      },
      {
        q: "Do you protect floors and furniture?",
        a: "Yes. We mask and cover work areas; daily cleanup is standard on occupied homes and offices.",
      },
    ],
  },
];

export const ALL_FAQ_ITEMS = FAQ_SECTIONS.flatMap((s) => s.items);

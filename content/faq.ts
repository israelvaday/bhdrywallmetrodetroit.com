export type FAQ = { q: string; a: string };

export type FAQSection = {
  id: string;
  title: string;
  emoji: string;
  description: string;
  items: FAQ[];
};

export const FAQ_HERO_IMAGE = "/photos/branding-generated--hero-drywall-metro-detroit.png";
export const FAQ_HERO_ALT = "BH Drywall Metro Detroit crew lead reviewing a drywall finish with a homeowner";

export const FAQ_SECTIONS: FAQSection[] = [
  {
    id: "general",
    title: "General",
    emoji: "🛡️",
    description: "Who we are and how we work.",
    items: [
      {
        q: "Are you a local drywall company or a referral service?",
        a: "BH Drywall Metro Detroit is a local drywall contractor. You speak with our team directly, not a national lead broker.",
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
        q: "How do I get a price for my job?",
        a: "Call (313) 236-4558 for a price on your job, or send us a message with photos. We confirm the scope, finish level, and access, and put the job in writing before work begins.",
      },
      {
        q: "What payment methods do you accept?",
        a: "Check, card, and ACH for commercial accounts. Invoices include scope, materials, and labor line items.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Cost factors",
    emoji: "📐",
    description: "What drives the cost of drywall work.",
    items: [
      {
        q: "What drives the cost of drywall work?",
        a: "The scope: square footage, finish level (Level 4 vs Level 5), ceiling height, texture match, and access. We measure on site or from plans rather than guessing over the phone. Call (313) 236-4558 for a price on your job.",
      },
      {
        q: "How much does drywall repair cost?",
        a: "It depends on the size of the damage, whether the board behind it is dry and sound, the texture that has to be matched, the ceiling height, and how much priming and blending the wall needs before paint. A small patch on a smooth wall is a very different job from a stained ceiling. Call (313) 236-4558 for a price on your job, or text photos for a faster answer.",
      },
      {
        q: "What if the scope changes once work starts?",
        a: "Change orders are written and signed before extra work, especially on commercial and insurance jobs.",
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
    description: "What to expect on the job.",
    items: [
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

"use client";
import { Star, MapPin, Quote } from "lucide-react";

type Review = {
  name: string;
  area: string;
  service: string;
  text: string;
  stars: number;
};

const REVIEWS: Review[] = [
  { name: "Maria G.", area: "Detroit", service: "Drywall Repair", stars: 5,
    text: "Had a big hole from a plumbing access in our Corktown flat. They patched, textured to match, and you cannot find the repair after paint." },
  { name: "Daniel R.", area: "Troy", service: "Basement Finish", stars: 5,
    text: "Full basement hang and Level 4 finish. Crew was on schedule, cleaned up daily, and passed our painter's walkthrough first try." },
  { name: "Jennifer L.", area: "Dearborn", service: "Smooth Skim Coat", stars: 5,
    text: "Converted our living room from orange peel to smooth walls. Long job but the quote was honest and the result is flawless." },
  { name: "Marcus T.", area: "Warren", service: "Water Damage", stars: 5,
    text: "Basement flood cut and rebuild after a sump failure. Documented everything for insurance and matched the ceiling texture." },
  { name: "Priya S.", area: "Royal Oak", service: "Commercial TI", stars: 5,
    text: "Retail build-out on Main Street — metal framing and drywall done in phases while we stayed open weekends." },
  { name: "Eric B.", area: "Sterling Heights", service: "Patch & Paint Prep", stars: 5,
    text: "Nail pops and corner cracks throughout our ranch. Flat price, same-day start, ready for primer in two days." },
  { name: "Linda H.", area: "Livonia", service: "Popcorn Removal", stars: 5,
    text: "Removed popcorn ceilings in three bedrooms and skimmed smooth. Protected floors and furniture — no dust disaster." },
  { name: "Tony V.", area: "Southfield", service: "New Construction", stars: 5,
    text: "Our builder's drywall sub fell through. BH stepped in, finished hang and tape on our new build ahead of trim." },
  { name: "Aisha K.", area: "Farmington Hills", service: "Ceiling Grid", stars: 5,
    text: "Replaced water-stained drop ceiling tiles and realigned the grid in our office suite. In and out in one day." },
  { name: "Rob D.", area: "Clinton Twp", service: "Metal Framing", stars: 5,
    text: "Partition walls for a medical tenant — fire-rated assembly coordinated with our GC. Inspection passed clean." },
  { name: "Sofia M.", area: "Pontiac", service: "Texture Match", stars: 5,
    text: "Kitchen demo left huge patches. They matched our knockdown perfectly — even I can't see the seams." },
  { name: "Kevin P.", area: "Westland", service: "Garage Drywall", stars: 5,
    text: "Insulated and drywalled our attached garage. Clean edges at the house door and fire separation done right." },
];

function ReviewCard({ r }: { r: Review }) {
  return (
    <div className="w-[320px] shrink-0 rounded-2xl border border-ink-800 bg-ink-900/60 p-5 shadow-lg shadow-black/30 md:w-[380px]">
      <div className="flex items-center gap-1 text-brass-400">
        {Array.from({ length: r.stars }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-brass-400" />
        ))}
      </div>
      <Quote className="mt-3 h-5 w-5 text-brass-500/50" />
      <p className="mt-1 text-sm leading-relaxed text-ink-100">{r.text}</p>
      <div className="mt-4 flex items-center justify-between border-t border-ink-800 pt-3">
        <div>
          <div className="text-sm font-semibold text-ink-50">{r.name}</div>
          <div className="text-[11px] uppercase tracking-wider text-ink-400">{r.service}</div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-brass-500/40 bg-ink-950/60 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-brass-300">
          <MapPin className="h-3 w-3" /> {r.area}
        </span>
      </div>
    </div>
  );
}

export function Reviews() {
  const loop = [...REVIEWS, ...REVIEWS];
  return (
    <section className="relative overflow-hidden border-t border-ink-800 py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex flex-col items-center text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">Customers say</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Five-star drywall work across Metro Detroit.
          </h2>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1 text-brass-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-brass-400" />
            ))}
            <span className="ml-2 text-sm text-ink-300">Reviews from Michigan homeowners & businesses</span>
          </div>
        </div>
      </div>
      <div className="reviews-marquee relative">
        <div className="reviews-track flex gap-5">
          {loop.map((r, i) => (
            <ReviewCard key={i} r={r} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink-950 to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink-950 to-transparent md:w-32" />
      </div>
      <style jsx>{`
        .reviews-marquee {
          width: 100%;
          overflow: hidden;
          padding-block: 1rem;
        }
        .reviews-track {
          width: max-content;
          animation: reviews-scroll 80s linear infinite;
        }
        .reviews-marquee:hover .reviews-track {
          animation-play-state: paused;
        }
        @keyframes reviews-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .reviews-track { animation: none; }
        }
      `}</style>
    </section>
  );
}

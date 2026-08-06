import { MapPin, Star } from "lucide-react";
import { BIZ } from "@/lib/business";

// This section previously rendered twelve invented customer testimonials with
// fabricated names, cities and five-star ratings. The Business Profile has no
// reviews, so none of them were real. They are removed rather than rewritten:
// there is no honest way to display a review that does not exist.
//
// When real reviews come in, render them from the Business Profile rather than
// hardcoding them here, and only add aggregateRating schema once the profile
// actually has a rating to report.

const WRITE_REVIEW =
  "https://search.google.com/local/writereview?placeid=ChIJ0VpZwM9uQWURDZ53Ncn4Ocs";
const PROFILE = "https://maps.google.com/maps?cid=14644009206441025037";

export function Reviews() {
  return (
    <section className="relative overflow-hidden border-t border-ink-800 py-20">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">
          Reviews
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
          Worked with us? Tell Metro Detroit.
        </h2>
        <div className="mt-3 flex items-center justify-center gap-1 text-brass-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5" />
          ))}
        </div>
        <p className="mt-5 text-ink-300 md:text-lg">
          Our Google Business Profile is new and we would rather earn reviews
          than invent them. If we have hung, taped, finished or patched
          something for you, a few honest lines help the next homeowner decide.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={WRITE_REVIEW}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brass-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-ink-950 transition hover:bg-brass-400"
          >
            Leave a Google review
          </a>
          <a
            href={PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ink-700 px-6 py-3 text-sm font-semibold text-ink-100 transition hover:border-brass-500/60"
          >
            <MapPin className="h-4 w-4" /> See our profile
          </a>
        </div>
        <p className="mt-6 text-sm text-ink-400">
          Prefer to tell us directly? Call{" "}
          <a href={BIZ.phoneHref} className="text-brass-300 underline-offset-4 hover:underline">
            {BIZ.phone}
          </a>
          .
        </p>
      </div>
    </section>
  );
}

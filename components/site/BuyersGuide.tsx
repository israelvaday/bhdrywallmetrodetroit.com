import { BIZ } from "@/lib/business";

export function BuyersGuide() {
  return (
    <section className="border-t border-ink-800 py-16">
      <div className="mx-auto max-w-3xl space-y-5 px-4 text-sm text-ink-200 md:px-6 md:text-base">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wider text-brass-400">Buyer&apos;s guide</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
            How to hire a drywall contractor in Metro Detroit
          </h2>
          <p className="mt-3 text-ink-300">
            A good drywall bid is specific. A bad one is a single number with no finish level, no scope, and no start
            date. Use this checklist before you sign.
          </p>
        </header>

        <p>
          <strong className="text-white">1. Verify license and insurance.</strong> Ask for proof of general liability
          and workers comp. For commercial jobs, request a certificate naming your building or GC as additional
          insured.
        </p>
        <p>
          <strong className="text-white">2. Define finish level.</strong> Level 4 vs Level 5 changes labor cost more
          than board cost. Put it in the quote.
        </p>
        <p>
          <strong className="text-white">3. Texture match in writing.</strong> &quot;Match existing&quot; should name
          the style (orange peel, knockdown, smooth) and include a sample board when possible.
        </p>
        <p>
          <strong className="text-white">4. Separate hang, finish, and paint.</strong> Know who primes. Many paint
          failures are skipped primer on new mud — clarify before close-in.
        </p>
        <p>
          <strong className="text-white">5. Schedule and access.</strong> Occupied homes need daily cleanup and
          dust control. Commercial TI needs phased work and after-hours if the suite stays open.
        </p>
        <p>
          <strong className="text-white">6. Change orders.</strong> Extra soffits, niches, or fire caulking should be
          written and signed — not verbal add-ons at invoice time.
        </p>
        <p>
          {BIZ.name} provides written estimates, serves Wayne, Oakland, and Macomb counties, and answers questions at{" "}
          {BIZ.phone}. Compare two bids using the same finish level and scope — then decide on crew quality and schedule,
          not just the lowest number.
        </p>
      </div>
    </section>
  );
}

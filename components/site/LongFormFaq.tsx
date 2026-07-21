import { BIZ } from "@/lib/business";

function Q({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-lg font-bold text-white">{q}</h3>
      <div className="mt-2 space-y-3 text-ink-200">{children}</div>
    </div>
  );
}

export function LongFormFaq({ subject, kind }: { subject: string; kind: "area" | "service" }) {
  const place = kind === "area" ? subject : "Metro Detroit";
  const topic =
    kind === "area" ? `drywall service in ${subject}` : `${subject.toLowerCase()} across Metro Detroit`;

  return (
    <section className="border-t border-ink-800 py-16">
      <div className="mx-auto max-w-3xl space-y-7 px-4 text-sm text-ink-200 md:px-6 md:text-base">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wider text-brass-400">In depth</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
            Questions about {topic}
          </h2>
          <p className="mt-3">
            Straight answers from {BIZ.name} — useful whether you hire us or another licensed drywall crew in{" "}
            {place}.
          </p>
        </header>

        <Q q={`Do you serve ${place} on short notice?`}>
          <p>
            For repairs and small patches we often book same-day or next-day when a crew is in your area. Larger hang
            and finish jobs are scheduled from a written estimate. Call {BIZ.phone} with photos for the fastest quote.
          </p>
        </Q>

        <Q q="What finish level do I need before paint?">
          <p>
            Most rooms are <strong className="text-white">Level 4</strong> — taped joints, screws covered, ready for
            flat or eggshell paint. Rooms with big windows, gloss paint, or wallpaper need{" "}
            <strong className="text-white">Level 5</strong> (full skim). We note this on every estimate so your painter
            does not reject the walls on walkthrough.
          </p>
        </Q>

        <Q q="Can you match my existing texture?">
          <p>
            Yes. We take a sample, test orange peel, knockdown, or skip trowel on a board, and blend repairs so the
            patch disappears after paint. Older Metro Detroit homes often mix smooth additions with textured main
            floors — we plan transitions so they are not visible at doorways.
          </p>
        </Q>

        <Q q="How do you price drywall work?">
          <p>
            By scope: square footage, ceiling height, finish level, texture, and access (occupied vs empty). Repairs
            are usually a minimum visit plus labor and materials. Commercial work is bid from plans or a site walk with
            phased schedules for occupied buildings.
          </p>
        </Q>

        <Q q="Do you work with general contractors and property managers?">
          <p>
            Yes. We sub hang/finish crews to GCs, handle tenant-improvement drywall, and invoice on net terms for
            repeat clients. COIs and W-9 available on request.
          </p>
        </Q>

        <Q q="What about water damage and insurance jobs?">
          <p>
            After drying is confirmed, we flood-cut, remove damaged board, hang replacement, finish, and texture-match.
            We document square footage and photos for adjusters. Do not close walls until moisture readings are in
            range — we can coordinate with your restoration company&apos;s timeline.
          </p>
        </Q>

        <Q q={`Why choose a licensed crew in ${place}?`}>
          <p>
            Drywall looks simple until corners, fire ratings, or occupied spaces are involved. Licensed & insured
            contractors carry liability and workers comp — protecting you if something goes wrong. {BIZ.name} puts scope,
            price, and schedule in writing before work starts.
          </p>
        </Q>
      </div>
    </section>
  );
}

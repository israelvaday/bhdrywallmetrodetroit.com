import type { Metadata } from "next";
import { Clock, ShieldCheck } from "lucide-react";
import { BIZ } from "@/lib/business";
import { ContactCTA } from "@/components/site/ContactCTA";

export const metadata: Metadata = {
  title: `Hours — Sun–Thu 9am–5pm · Fri 9am–12pm`,
  description: "BH Drywall Metro Detroit is open Sunday through Thursday 9am to 5pm and Friday 9am to 12pm, closed Saturday — for all of Metro Detroit, MI.",
  alternates: { canonical: "/hours" },
};

/** "09:00" → "9am", "17:00" → "5pm", "12:00" → "12pm" */
function fmt12(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "pm" : "am";
  const h12 = ((h + 11) % 12) + 1;
  return m === 0 ? `${h12}${period}` : `${h12}:${String(m).padStart(2, "0")}${period}`;
}

export default function HoursPage() {
  return (
    <section className="relative overflow-hidden bg-aurora py-24">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-brass-500/40 bg-brass-500/10 px-4 py-2 text-sm font-semibold text-brass-300">
          <Clock className="h-4 w-4" /> Sun–Thu 9am–5pm · Fri 9am–12pm
        </div>
        <h1 className="mt-6 font-display text-5xl font-extrabold tracking-tight md:text-7xl">
          <span className="text-brass-gradient">Sun–Thu 9am–5pm</span>
          <span className="mt-2 block text-2xl font-bold tracking-tight text-ink-100 md:text-4xl">
            Fri 9am–12pm · Sat closed
          </span>
        </h1>
        <p className="mt-4 text-xl text-ink-100">
          We answer the phone Sunday through Thursday 9am to 5pm and Friday until noon.
        </p>
        <p className="mt-2 text-ink-300">
          Sun–Thu 9am–5pm · Fri 9am–12pm · Sat closed. No call-center, no markup, no waiting.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-7">
          {BIZ.hours.map((d) => {
            const isClosed = "closed" in d && d.closed;
            return (
              <div
                key={d.label}
                className={
                  isClosed
                    ? "rounded-2xl border border-red-500/30 bg-red-500/5 px-3 py-4 text-center"
                    : "rounded-2xl border border-emerald-500/30 bg-emerald-500/5 px-3 py-4 text-center"
                }
              >
                <p
                  className={
                    isClosed
                      ? "text-xs font-semibold uppercase tracking-wider text-red-300"
                      : "text-xs font-semibold uppercase tracking-wider text-emerald-300"
                  }
                >
                  {d.label.slice(0, 3)}
                </p>
                <p
                  className={
                    isClosed
                      ? "mt-2 font-mono text-sm font-bold text-ink-300"
                      : "mt-2 font-mono text-sm font-bold text-white"
                  }
                >
                  {isClosed ? "Closed" : `${fmt12(d.open)}–${fmt12(d.close)}`}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <ContactCTA size="lg" />
        </div>

        <p className="mt-8 inline-flex items-center gap-2 text-xs text-ink-400">
          <ShieldCheck className="h-3.5 w-3.5 text-brass-400" />
          Michigan licensed #{BIZ.bsis} · Licensed & insured
        </p>
      </div>
    </section>
  );
}

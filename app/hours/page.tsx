import type { Metadata } from "next";
import { Clock, ShieldCheck } from "lucide-react";
import { BIZ } from "@/lib/business";
import { ContactCTA } from "@/components/site/ContactCTA";

export const metadata: Metadata = {
  title: `Hours — Open Mon–Sat`,
  description: "BH Drywall Metro Detroit is open 24 hours a day, 7 days a week, every day of the year — for all of Metro Detroit, MI.",
  alternates: { canonical: "/hours" },
};

export default function HoursPage() {
  return (
    <section className="relative overflow-hidden bg-aurora py-24">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
          <Clock className="h-4 w-4" /> Open right now · Dispatching
        </div>
        <h1 className="mt-6 font-display text-5xl font-extrabold tracking-tight md:text-7xl">
          <span className="text-brass-gradient">24 / 7</span>
        </h1>
        <p className="mt-4 text-xl text-ink-100">
          We answer the phone every hour of every day.
        </p>
        <p className="mt-2 text-ink-300">
          365 days a year — including weekends and holidays. No call-center, no markup, no waiting.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-7">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div
              key={d}
              className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 px-3 py-4 text-center"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">{d}</p>
              <p className="mt-2 font-mono text-sm font-bold text-white">24 hrs</p>
            </div>
          ))}
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

import type { Metadata } from "next";
import { MapPin, Clock, ShieldCheck } from "lucide-react";
import { BIZ } from "@/lib/business";
import { LongFormFaq } from "@/components/site/LongFormFaq";
import { ContactCTA } from "@/components/site/ContactCTA";
import { ServiceMap } from "@/components/site/ServiceMap";

export const metadata: Metadata = {
  title: `Contact — Mon–Sat Metro Detroit drywall contractor`,
  description:
    "Reach BH Drywall Metro Detroit any time. Tap to call, text photos, or request a free quote. Licensed & insured — serving all of Metro Detroit, MI.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-800 bg-aurora py-20">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
            <Clock className="h-3.5 w-3.5" /> Mon–Sat service · Dispatching now
          </div>
          <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
            Get a <span className="text-brass-gradient">licensed drywall contractor</span>.
          </h1>
          <p className="mt-4 text-ink-200">
            Skip the small talk. Tap a button — we&apos;ll dispatch a Licensed & insured technician anywhere in Metro Detroit.
          </p>
          <div className="mt-7 flex justify-center">
            <ContactCTA size="lg" showEmail />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3 md:px-6">
          <div className="rounded-3xl border border-brass-500/30 bg-brass-500/5 p-6">
            <div className="flex items-center gap-2 text-brass-300">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Licensed</span>
            </div>
            <p className="mt-3 text-sm text-ink-200">
              {BIZ.bsis} — liability and workers comp. Background-checked crews on every job.
            </p>
          </div>
          <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-6">
            <div className="flex items-center gap-2 text-emerald-300">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Hours</span>
            </div>
            <p className="mt-3 text-sm text-ink-200">
              <strong className="text-white">Mon–Sat</strong> — see our{" "}
              <a href="/hours" className="text-brass-300 underline-offset-2 hover:underline">hours page</a>{" "}
              for same-day repair when crews are available. Real people answer — not a robocall.
            </p>
          </div>
          <div className="rounded-3xl border border-ink-800 bg-ink-900/50 p-6">
            <div className="flex items-center gap-2 text-ink-100">
              <MapPin className="h-5 w-5 text-brass-400" />
              <span className="text-sm font-semibold uppercase tracking-wider">Service area</span>
            </div>
            <p className="mt-3 text-sm text-ink-200">
              Wayne, Oakland, and Macomb counties — Detroit through the northern suburbs. Mobile crews from our Metro Detroit base.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-ink-800 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">Office location</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
              {BIZ.address.full}
            </h2>
          </div>
          <ServiceMap
            lat={BIZ.geo.lat}
            lng={BIZ.geo.lng}
            zoom={BIZ.metroMap.zoom}
            title={BIZ.name}
            height={460}
          />
        </div>
      </section>

      <section className="border-t border-ink-800 py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">How to reach us</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Three fast ways to talk to a real Metro Detroit drywall contractor.
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-ink-800 bg-ink-900/50 p-6">
              <h3 className="font-display text-xl font-bold text-white">Call</h3>
              <p className="mt-2 text-sm text-ink-200">
                Call {BIZ.name} at {BIZ.phone}. You&apos;ll reach someone who schedules drywall work — not a national call center. Share your city, finish level, and timeline; we&apos;ll book a walk-through or photo-based estimate.
              </p>
              <a href={BIZ.phoneHref} className="mt-4 inline-block font-mono text-brass-300 underline-offset-4 hover:underline">
                {BIZ.phone}
              </a>
            </div>
            <div className="rounded-2xl border border-ink-800 bg-ink-900/50 p-6">
              <h3 className="font-display text-xl font-bold text-white">Text photos</h3>
              <p className="mt-2 text-sm text-ink-200">
                Text photos of the wall, ceiling, or damage to {BIZ.phone}. Wide shots plus close-ups help us quote patch work, texture match, or full-room finish without an extra trip. Great for basement projects, tenant punch lists, and insurance documentation.
              </p>
              <a href={BIZ.smsHref} className="mt-4 inline-block text-sm font-semibold text-brass-300 underline-offset-4 hover:underline">
                Text {BIZ.phone} →
              </a>
            </div>
            <div className="rounded-2xl border border-ink-800 bg-ink-900/50 p-6">
              <h3 className="font-display text-xl font-bold text-white">Free written quote</h3>
              <p className="mt-2 text-sm text-ink-200">
                Want everything in writing first? Use our picture-driven quote tool. You&apos;ll answer a handful of plain-language questions, upload any photos that help, and get a clear written quote back — no hidden trip fees, no surprise add-ons, and no obligation. Most quotes go out the same day, usually within an hour during business hours.
              </p>
              <a href="/quote" className="mt-4 inline-block text-sm font-semibold text-brass-300 underline-offset-4 hover:underline">
                Start the quote →
              </a>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-ink-800 bg-ink-900/40 p-6 text-sm text-ink-200">
            <p>
              <strong className="text-white">What we cover.</strong> {BIZ.name} provides residential and commercial drywall — hang, tape, mud, Level 4 and Level 5 finish, texture matching, patch repair, metal stud framing, suspended ceilings, popcorn removal, water-damage rebuild, and new-construction packages across Wayne, Oakland, and Macomb counties.
            </p>
            <p className="mt-3">
              <strong className="text-white">Where we go.</strong> Detroit, Dearborn, Warren, Sterling Heights, Troy, Livonia, Royal Oak, Farmington Hills, Pontiac, Southfield, Clinton Township, and 90+ cities and neighborhoods — see our{" "}
              <a href="/service-areas" className="text-brass-300 underline-offset-2 hover:underline">service area map</a>.
            </p>
          </div>
        </div>
      </section>

      <LongFormFaq subject="Metro Detroit Drywall" kind="service" />

      <section className="border-t border-ink-800 bg-aurora py-16 text-center">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">
            Ready when you are.
          </h2>
          <p className="mt-3 text-ink-200">One tap reaches a real drywall contractor.</p>
          <div className="mt-6 flex justify-center">
            <ContactCTA size="lg" showEmail />
          </div>
        </div>
      </section>
    </>
  );
}

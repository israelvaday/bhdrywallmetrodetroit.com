import type { Metadata } from "next";
import { BIZ } from "@/lib/business";
import { QuoteWizard } from "@/components/site/QuoteWizard";
import { ContactCTA } from "@/components/site/ContactCTA";
import { LongFormFaq } from "@/components/site/LongFormFaq";

export const metadata: Metadata = {
  title: `Send Us a Message`,
  description: "Send BH Drywall Metro Detroit a message about your drywall job. Picture-driven, one step at a time. Upload photos or documents and we will call or text you back.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <>
      <section className="relative bg-aurora py-14 md:py-20">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-3xl px-4 text-center md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">Contact Us</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
            Send us a message, one question at a <span className="text-brass-gradient">time</span>.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ink-200">
            Tap pictures. Upload anything. We&apos;ll call or text you back, fast.
          </p>
          <div className="mt-6 flex justify-center">
            <ContactCTA size="md" />
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <QuoteWizard />
        </div>
      </section>

      <section className="border-t border-ink-800 py-16">
        <div className="mx-auto max-w-3xl space-y-6 px-4 text-sm text-ink-200 md:px-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">How the message form works</h2>
            <p className="mt-3">
              The picture-driven form above is the fastest way to tell a real Metro Detroit drywall contractor about your job. Instead of a long form, it shows you small images and chips; you just tap what matches your situation. Most people finish in under two minutes. There&apos;s nothing to download, no account to create, and no obligation to book.
            </p>
            <p className="mt-3">
              You can attach photos of walls, ceilings, damage, or plans. Pictures help us confirm finish level, texture, and scope before we visit.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">What you can ask about</h2>
            <p className="mt-3">
              Repairs, residential hang/finish, Level 5 skim, commercial TI, metal framing, acoustical ceilings, popcorn removal, water-damage rebuild, and new-construction work. Pick the closest category and we&apos;ll clarify when we call you back.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">What happens next</h2>
            <p className="mt-3">
              We call or text you back, confirm the scope, and put labor, materials, finish level, and timeline in writing. Change orders are written before extra work. For a price on your job, call {BIZ.phone}. You can also text photos to {BIZ.phone} whenever it suits you; the same team replies Sunday through Thursday 9am to 5pm and Friday until noon.
            </p>
          </div>
        </div>
      </section>
      <LongFormFaq subject="Metro Detroit Drywall" kind="service" />
    </>
  );
}

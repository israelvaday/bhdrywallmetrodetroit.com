import type { Metadata } from "next";
import { Reviews } from "@/components/sections/Reviews";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LongFormFaq } from "@/components/site/LongFormFaq";
import { BIZ } from "@/lib/business";

export const metadata: Metadata = {
  title: "Reviews — BH Drywall Metro Detroit",
  description: "Leave a review for BH Drywall Metro Detroit, or read our Google Business Profile. Drywall hanging, taping, finishing and repair across Wayne, Oakland and Macomb counties.",
  alternates: { canonical: `${BIZ.url}/reviews` },
};

export default function ReviewsPage() {
  return (
    <>
      <section className="relative bg-aurora py-20">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">Reviews</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
            Reviews.
          </h1>
        </div>
      </section>
      <Reviews />
      <LongFormFaq subject="Metro Detroit Drywall" kind="service" />
      <FinalCTA />
    </>
  );
}

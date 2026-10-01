import type { Metadata } from "next";
import Image from "next/image";
import { Info } from "lucide-react";
import { LOGO_PHOTO } from "@/lib/photos";
import { BIZ } from "@/lib/business";
import { FinalCTA } from "@/components/sections/FinalCTA";

// Owner decision 2026-09-30: this business holds no licence. This page used to claim
// "Licensed & insured" with the placeholder "Insured" as its licence id. The URL stays and
// answers 200, but it claims nothing, it is noindex, and no nav or footer link points here.
export const metadata: Metadata = {
  title: "Business Details",
  description: `Questions about ${BIZ.name}? Call ${BIZ.phone} or email ${BIZ.email} and ask us for the business details you need.`,
  alternates: { canonical: `${BIZ.url}/license` },
  robots: { index: false, follow: true },
};

export default function LicensePage() {
  const logo = LOGO_PHOTO;
  return (
    <>
      <section className="relative bg-aurora py-20">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-3xl px-4 text-center md:px-6">
          <Info className="mx-auto h-10 w-10 text-brass-400" />
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
            Business details
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ink-200">
            Need details about {BIZ.name} for your records, your property manager or your general contractor?
            Ask us directly and we will tell you what we can provide.
          </p>
        </div>
      </section>
      {logo && (
        <section className="py-12">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            <div className="overflow-hidden rounded-2xl border border-brass-500/30 bg-ink-900/50 p-6 text-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={256}
                height={256}
                className="mx-auto h-32 w-32 object-contain"
              />
              <p className="mt-4 text-sm text-ink-300">
                Questions? Call {BIZ.phone} or email {BIZ.email}.
              </p>
            </div>
          </div>
        </section>
      )}
      <FinalCTA />
    </>
  );
}

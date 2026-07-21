import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { LOGO_PHOTO } from "@/lib/photos";
import { BIZ } from "@/lib/business";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Licensed & Insured Drywall Contractor",
  description: `${BIZ.name} is a licensed and insured drywall contractor serving Wayne, Oakland, and Macomb counties.`,
  alternates: { canonical: `${BIZ.url}/license` },
};

export default function LicensePage() {
  const logo = LOGO_PHOTO;
  return (
    <>
      <section className="relative bg-aurora py-20">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-3xl px-4 text-center md:px-6">
          <ShieldCheck className="mx-auto h-10 w-10 text-brass-400" />
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
            Licensed &amp; insured
          </h1>
          <p className="mt-3 font-mono text-brass-300">{BIZ.licenseId}</p>
          <p className="mx-auto mt-4 max-w-xl text-ink-200">
            {BIZ.name} carries general liability and workers compensation for residential and commercial drywall
            work across Metro Detroit. Certificates of insurance are available for property managers and general
            contractors.
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
                Questions about coverage? Call {BIZ.phone} or email {BIZ.email}.
              </p>
            </div>
          </div>
        </section>
      )}
      <FinalCTA />
    </>
  );
}

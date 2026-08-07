import type { Metadata } from "next";
import { SERVICES } from "@/content/services";
import { BIZ } from "@/lib/business";
import { serviceHero } from "@/lib/photos";
import { ServiceCard } from "@/components/site/ServiceCard";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LongFormFaq } from "@/components/site/LongFormFaq";

export const metadata: Metadata = {
  title: "drywall contractor Services in Metro Detroit",
  description:
    "All drywall services from BH Drywall Metro Detroit — repair, residential, commercial, smooth finish, framing, water damage, texture, ceilings, and new construction.",
  alternates: { canonical: `${BIZ.url}/services` },
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative bg-aurora py-20">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-5xl px-4 text-center md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">Services</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
            Full-service <span className="text-brass-gradient">Metro Detroit</span> drywall contractor.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-ink-200">
            Eleven specialized service lines, one Licensed & insured team. Tap any card for details, pricing factors, and example jobs.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-2 md:px-6 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const hero = serviceHero(s.slug);
            if (!hero) return null;
            return (
              <ServiceCard
                key={s.slug}
                slug={s.slug}
                name={s.name}
                shortName={s.shortName}
                tagline={s.tagline}
                Icon={s.icon}
                photoSrc={hero.src}
                photoAlt={hero.alt}
                photoW={hero.width}
                photoH={hero.height}
                city="Metro Detroit, MI"
                priority={i < 3}
              />
            );
          })}
        </div>
      </section>
      <LongFormFaq subject="Metro Detroit Drywall" kind="service" />
      <FinalCTA />
    </>
  );
}


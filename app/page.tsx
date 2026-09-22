import type { Metadata } from "next";
import { BIZ } from "@/lib/business";
import { Hero } from "@/components/sections/Hero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { BrandShowcase } from "@/components/sections/BrandShowcase";
import { PhotoMarquee } from "@/components/sections/PhotoMarquee";
import { AreaTeaser } from "@/components/sections/AreaTeaser";
import { Reviews } from "@/components/sections/Reviews";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ServiceMap } from "@/components/site/ServiceMap";
import { HomeDispatchTracker } from "@/components/site/HomeDispatchTracker";
import { Reveal } from "@/components/site/Reveal";
import { LazyParallax, LazyFloatOnScroll } from "@/components/site/LazyScrollFx";
import { LongFormFaq } from "@/components/site/LongFormFaq";
import { BuyersGuide } from "@/components/site/BuyersGuide";
import { DrywallGlossary } from "@/components/site/DrywallGlossary";

// The homepage was the one page both geo-title passes skipped. ec258ff gave the 101
// area pages "Drywall Repair in <City>, MI" and d31c5e0 gave the 11 service pages
// "<Service> in Metro Detroit, MI", but the site's largest page still rendered
// "Drywall Contractor — Hang, Finish & Repair — BH Drywall Metro Detroit" — 69 chars,
// so the only geography sat past the truncation point inside the brand suffix.
// MEASURED: all 27 named queries on / are geo-modified Detroit terms and all 27 take
// zero clicks — "drywall repair detroit" 23 impr at 38.4, "commercial drywall
// contractor detroit" 10 at 60.7, "drywall contractor in detroit" 6 at 49.8. On that
// last one /about outranks the homepage at 33.0, because /about's h1 reads "A real
// Metro Detroit drywall contractor" and the homepage never pairs "contractor" with a
// city anywhere. absolute, so the geo does not repeat against the layout suffix; the
// head term is "contractor" rather than "repair" so this does not re-enter the
// /service-areas/<city> "Drywall Repair in <City>, MI" cluster.
export const metadata: Metadata = {
  title: { absolute: `Drywall Contractor in Detroit, MI | BH Drywall` },
  description:
    `Drywall contractor in Detroit, MI — residential and commercial hang, finish, repair, patching, texture, and metal framing across Metro Detroit. Free estimates.`,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="border-y border-ink-800 bg-ink-950/60 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Reveal variant="zoom">
            <LazyFloatOnScroll>
              <HomeDispatchTracker />
            </LazyFloatOnScroll>
          </Reveal>
        </div>
      </section>
      <ServiceGrid />
      <BrandShowcase />
      <PhotoMarquee />
      <Reveal variant="bounce">
        <AreaTeaser />
      </Reveal>
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Reveal variant="bounce">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">Coverage</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
                All of Metro Detroit — service coverage map.
              </h2>
            </div>
          </Reveal>
          <LazyParallax strength={-40}>
            <Reveal variant="zoom" delay={0.05}>
              <ServiceMap
                lat={BIZ.metroMap.lat}
                lng={BIZ.metroMap.lng}
                zoom={BIZ.metroMap.zoom}
                title="Metro Detroit, MI"
                height={420}
              />
            </Reveal>
          </LazyParallax>
        </div>
      </section>
      <Reveal variant="bounce">
        <Reviews />
      </Reveal>
      <LongFormFaq subject="Metro Detroit Drywall" kind="service" />
      <BuyersGuide />
      <DrywallGlossary />
      <Reveal variant="zoom">
        <FinalCTA />
      </Reveal>
    </>
  );
}

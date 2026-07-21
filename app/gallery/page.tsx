import type { Metadata } from "next";
import { BIZ } from "@/lib/business";
import { PHOTOS } from "@/lib/photos";
import { ContactCTA } from "@/components/site/ContactCTA";
import { LongFormFaq } from "@/components/site/LongFormFaq";
import { BuyersGuide } from "@/components/site/BuyersGuide";
import { DrywallGlossary } from "@/components/site/DrywallGlossary";
import { GalleryClient } from "./gallery-client";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Drywall project photos from ${BIZ.name} — residential, commercial, repair, texture, and ceilings across Metro Detroit.`,
  alternates: { canonical: "/gallery" },
};

const CATEGORIES: { key: string; label: string; match: (id: string, cat: string, kind: string) => boolean }[] = [
  { key: "all", label: "All", match: (_, __, k) => k === "work" || k === "hero" || k === "brand" },
  { key: "hero", label: "Featured", match: (_, __, k) => k === "hero" },
  { key: "residential", label: "Residential", match: (id, cat) => cat === "residential" || id.includes("basement") },
  { key: "commercial", label: "Commercial", match: (id, cat) => cat === "commercial" || id.includes("commercial") },
  { key: "repair", label: "Repair", match: (_, cat) => cat === "repair" || cat === "water" },
  { key: "texture", label: "Texture", match: (_, cat) => cat === "texture" },
  { key: "framing", label: "Framing", match: (_, cat) => cat === "framing" },
  { key: "ceilings", label: "Ceilings", match: (_, cat) => cat === "ceilings" },
  { key: "brand", label: "Brand", match: (_, __, k) => k === "brand" },
];

export default function GalleryPage() {
  const groups = CATEGORIES.map((c) => ({
    key: c.key,
    label: c.label,
    photos: PHOTOS.filter((p) => c.match(p.id, p.category, p.kind)).map((p) => ({
      id: p.id, src: p.src, alt: p.alt, width: p.width, height: p.height,
    })),
  })).filter((g) => g.photos.length > 0);

  return (
    <>
      <section className="border-b border-ink-800 bg-aurora py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">Gallery</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
            Real Metro Detroit <span className="text-brass-gradient">drywall work</span>.
          </h1>
          <p className="mt-4 max-w-2xl text-ink-200">
            Hang, finish, repair, texture, framing, and ceilings — project photos from {BIZ.name}. Tap any image for
            full size.
          </p>
          <div className="mt-6">
            <ContactCTA size="md" />
          </div>
        </div>
      </section>

      <GalleryClient groups={groups} />

      <section className="border-t border-ink-800 py-16">
        <div className="mx-auto max-w-3xl space-y-6 px-4 text-sm text-ink-200 md:px-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">About this gallery</h2>
            <p className="mt-3">
              Images represent the type of work we perform daily in Wayne, Oakland, and Macomb counties — from basement
              finishes in Detroit to tenant buildouts in Troy and flood-cut rebuilds after Michigan freeze-thaw leaks.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">Before you hire</h2>
            <p className="mt-3">
              Every job starts with a written scope: finish level, texture, timeline, and price. Send photos to{" "}
              {BIZ.phone} for a faster estimate.
            </p>
          </div>
        </div>
      </section>

      <LongFormFaq subject="Gallery" kind="service" />
      <BuyersGuide />
      <DrywallGlossary />
    </>
  );
}

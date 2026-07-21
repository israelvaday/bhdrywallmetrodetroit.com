import type { Metadata } from "next";
import Image from "next/image";
import { BIZ } from "@/lib/business";
import { FAQ_SECTIONS, FAQ_HERO_IMAGE, FAQ_HERO_ALT, ALL_FAQ_ITEMS } from "@/content/faq";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LongFormFaq } from "@/components/site/LongFormFaq";

export const metadata: Metadata = {
  title: "FAQ — Metro Detroit drywall contractor Questions Answered",
  description:
    "Answers about drywall pricing, service areas, finish levels, repairs, and hiring a licensed contractor in Metro Detroit.",
  alternates: { canonical: `${BIZ.url}/faq` },
};

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ALL_FAQ_ITEMS.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="relative bg-aurora py-20">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-2 md:px-6">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">FAQ</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
              <span className="text-brass-gradient">Real answers</span> from a real drywall contractor.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-ink-200 md:mx-0">
              Pricing. Licensing. Finish levels. Repairs & estimates. Everything Metro Detroit customers ask {BIZ.name}, in one place.
            </p>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-brass-500/30">
            <Image
              src={FAQ_HERO_IMAGE}
              alt={FAQ_HERO_ALT}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Quick jump */}
      <section className="border-y border-ink-800 bg-ink-950 py-6">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <ul className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider md:text-sm">
            {FAQ_SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink-700 bg-ink-900/70 px-3 py-1.5 text-ink-200 transition hover:border-brass-500/60 hover:text-brass-300"
                >
                  <span>{s.emoji}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sections */}
      <section className="py-12 md:py-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-12 px-4 md:px-6">
          {FAQ_SECTIONS.map((s) => (
            <div key={s.id} id={s.id} className="scroll-mt-28">
              <div className="mb-5 text-center">
                <div className="text-3xl">{s.emoji}</div>
                <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                  {s.title}
                </h2>
                <p className="mt-1 text-sm text-ink-400">{s.description}</p>
              </div>
              <FAQAccordion items={s.items} sectionId={s.id} />
            </div>
          ))}
        </div>
      </section>

      <LongFormFaq subject="Metro Detroit Drywall" kind="service" />
      <FinalCTA />
    </>
  );
}

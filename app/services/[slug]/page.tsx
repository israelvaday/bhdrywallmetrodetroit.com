import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ShieldCheck, Clock, MapPin } from "lucide-react";
import { BIZ } from "@/lib/business";
import { SERVICES } from "@/content/services";
import { photosForService, serviceHero } from "@/lib/photos";
import { metaDescription } from "@/lib/meta";
import { ContactCTA } from "@/components/site/ContactCTA";
import { LogoMark } from "@/components/site/Logo";
import { ServiceMap } from "@/components/site/ServiceMap";
import { HomeDispatchTracker } from "@/components/site/HomeDispatchTracker";
import { LongFormFaq } from "@/components/site/LongFormFaq";
import { Reveal, RevealItem, RevealStagger } from "@/components/site/Reveal";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) return {};
  // Every query with volume on this property carries a geo modifier, and the pages that
  // win them are the service-area ones, titled "Drywall Repair in <City>, MI". Service
  // page titles carried no geography, so the topically-exact page never competed: all
  // 101 area pages name popcorn ceiling removal in body copy and Google ranks Troy and
  // Sterling Heights at position 7 for it while /services/popcorn-ceiling-removal sits
  // at zero. absolute, so the geo does not repeat against the layout's brand suffix.
  return {
    title: { absolute: `${s.name} in Metro Detroit, MI | BH Drywall` },
    description: metaDescription(s.description),
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) return notFound();
  const hero = serviceHero(s.slug);
  const Icon = s.icon;
  const allShots = photosForService(s.slug).filter((p) => p.kind === "work").slice(0, 8);

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-800 bg-ink-950">
        {hero && (
          <>
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              priority
              sizes="100vw"
              className="absolute inset-0 z-0 object-cover opacity-60"
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-ink-950 via-ink-950/80 to-ink-950/40" />
          </>
        )}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-brass-500/40 bg-ink-950/70 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-brass-300 backdrop-blur">
              <LogoMark className="h-4 w-4" />
              BH Drywall Metro Detroit · Licensed · {BIZ.bsis}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur">
              <Clock className="h-3.5 w-3.5" /> Sun–Thu 9am–5pm · Fri 9am–12pm
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-950/60 px-3 py-1.5 text-xs font-semibold text-ink-200 backdrop-blur">
              <MapPin className="h-3.5 w-3.5 text-brass-400" /> All of Metro Detroit
            </span>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <Icon className="h-7 w-7 text-brass-400" />
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-brass-400">
              {s.shortName}
            </p>
          </div>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            {s.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-200">{s.tagline}</p>
          <div className="mt-7">
            <ContactCTA size="lg" />
          </div>
        </div>
      </section>

      <section className="border-b border-ink-800 bg-ink-950 py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <Reveal variant="zoom">
            <HomeDispatchTracker
              service={{
                slug: s.slug,
                name: s.name,
                shortName: s.shortName,
                tagline: s.tagline,
                bullets: s.bullets,
              }}
            />
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-3 md:px-6">
          <Reveal className="md:col-span-2">
            <h2 className="font-display text-2xl font-bold md:text-3xl">What&apos;s included</h2>
            <p className="mt-4 text-ink-200">{s.description}</p>
            <RevealStagger className="mt-6 grid gap-3 sm:grid-cols-2" stagger={0.06}>
              {s.bullets.map((b) => (
                <RevealItem key={b}>
                  <div className="flex h-full items-start gap-3 rounded-2xl border border-ink-800 bg-ink-900/50 p-4 transition hover:-translate-y-0.5 hover:border-brass-500/40">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brass-500/15 text-brass-400">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm text-ink-100">{b}</span>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </Reveal>
          <Reveal delay={0.1} variant="tilt" className="space-y-4">
            <div className="rounded-3xl border border-brass-500/30 bg-brass-500/5 p-5">
              <div className="flex items-center gap-2 text-brass-300">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Licensed & insured</span>
              </div>
              <p className="mt-2 text-sm text-ink-200">
                {BIZ.name} is licensed and {BIZ.bsis.toLowerCase()} for residential and commercial drywall in Michigan. General liability and workers compensation certificates available for property managers and GCs.
              </p>
            </div>
            <div className="rounded-3xl border border-ink-800 bg-ink-900/50 p-5">
              <h3 className="font-display text-lg font-bold">Request this service</h3>
              <p className="mt-1 text-sm text-ink-300">Tap any button — we&apos;re dispatching now.</p>
              <div className="mt-4">
                <ContactCTA size="md" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {allShots.length > 0 && (
        <section className="border-t border-ink-800 py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal>
              <h2 className="font-display text-2xl font-bold md:text-3xl">Real {s.shortName.toLowerCase()} jobs</h2>
              <p className="mt-2 text-ink-300">Photos from real Metro Detroit jobs by our licensed crew.</p>
            </Reveal>
            <RevealStagger className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
              {allShots.map((p) => (
                <RevealItem key={p.id}>
                  <div className="group overflow-hidden rounded-2xl border border-ink-800 transition hover:-translate-y-1 hover:border-brass-500/40 hover:shadow-xl hover:shadow-brass-500/10">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      width={p.width}
                      height={p.height}
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>
      )}

      <section className="border-t border-ink-800 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Reveal>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">Service area</p>
                <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
                  {s.shortName} service across Metro Detroit
                </h2>
                <p className="mt-2 max-w-2xl text-ink-300">
                  Crews across Wayne, Oakland & Macomb counties — Sunday through Thursday 9am to 5pm and Friday until noon.
                </p>
              </div>
              <Link href="/service-areas" className="hidden text-sm font-semibold text-brass-400 hover:text-brass-300 md:inline-flex">
                All service areas →
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1} variant="zoom">
            <ServiceMap
              lat={BIZ.geo.lat}
              lng={BIZ.geo.lng}
              zoom={BIZ.metroMap.zoom}
              title={`${s.shortName} — Metro Detroit, MI`}
              height={420}
            />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink-800 py-16">
        <div className="mx-auto max-w-3xl space-y-5 px-4 text-sm text-ink-200 md:px-6 md:text-base">
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            More about {s.shortName.toLowerCase()} in Metro Detroit
          </h2>
          <p>
            {s.description} Every {s.shortName.toLowerCase()} job is handled by {BIZ.name} — {BIZ.bsis.toLowerCase()}, background-checked finishers and hangers with stocked trucks. When you call or text, you talk directly with our team, not a remote call center.
          </p>
          <p>
            We serve all of Metro Detroit for {s.shortName.toLowerCase()} — Detroit, Dearborn, Warren, Sterling Heights, Troy, Livonia, Royal Oak, Farmington Hills, Pontiac, Southfield, Westland, Taylor, and every city in our{" "}
            <a href="/service-areas" className="text-brass-300 underline-offset-2 hover:underline">coverage map</a>. Estimates are scheduled; same-day repair when crews are available.
          </p>
          <p>
            Pricing for {s.shortName.toLowerCase()} is transparent: itemized where scope varies and flat packages where it doesn&apos;t. You get a written quote before work starts, and the number we agree on is the number you pay — no hidden trip fees and no surprise add-ons. If something on site changes the scope, we explain it, put a new number in writing, and you can decline without owing anything.
          </p>
          <p>
            We document finish level, texture, and materials so you have records for paint contractors, property managers, and insurance. That&apos;s the difference between a dedicated Metro Detroit drywall crew and a low-bid handyman without insurance.
          </p>
        </div>
      </section>

      <LongFormFaq subject={s.shortName} kind="service" />

      <section className="border-t border-ink-800 bg-aurora py-16 text-center">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">
              Need {s.shortName.toLowerCase()} service now?
            </h2>
            <p className="mt-3 text-ink-200">A Licensed & insured drywall contractor is one tap away.</p>
            <div className="mt-6 flex justify-center">
              <ContactCTA size="lg" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

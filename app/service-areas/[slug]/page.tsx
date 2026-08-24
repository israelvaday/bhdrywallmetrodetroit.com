import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, ShieldCheck, MapPin, ArrowRight, Sparkles, Compass, Wrench, Tag } from "lucide-react";
import { AREAS, AREAS_BY_SLUG, nearbyAreas } from "@/lib/areas";
import { SERVICES } from "@/content/services";
import { BIZ } from "@/lib/business";
import { ContactCTA } from "@/components/site/ContactCTA";
import { ServiceMap } from "@/components/site/ServiceMap";
import { DispatchTracker } from "@/components/site/DispatchTracker";
import { LongFormFaq } from "@/components/site/LongFormFaq";
import { serviceHero } from "@/lib/photos";
import { breadcrumbJsonLd } from "@/lib/schema";
import { metaDescription } from "@/lib/meta";
import insightsJson from "@/content/area-insights.json";

type Insight = {
  tagline?: string;
  landmarks?: string[];
  common_calls?: string[];
  neighborhood_notes?: string;
  keywords?: string[];
};
const INSIGHTS = insightsJson as Record<string, Insight>;

export function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = AREAS_BY_SLUG[slug];
  if (!a) return {};
  const info = INSIGHTS[slug];
  // "drywall repair near me" is this site's largest query and every page-1 position it
  // holds sits on a service-area page, so title and snippet lead with repair intent
  // instead of "contractor" and the generic tagline. The tagline still renders on-page.
  //
  // 50 of the 101 areas are neighbourhoods, and 36 of those carry a name that never
  // names its own city, so the geo read "Midtown, MI" / "East Side, MI" — places that
  // do not exist. Every query these pages actually draw carries the parent city
  // instead ("drywall contractor in detroit" on /detroit-midtown/ and /detroit-north-end/),
  // so the city goes in. The other 14 already say it ("Southwest Detroit", "Downtown
  // Royal Oak") and the 51 city pages are unaffected: both keep the exact string they
  // have today.
  const needsCity = Boolean(a.parent) && !a.name.toLowerCase().includes(a.city.toLowerCase());
  const geo = needsCity ? `${a.name}, ${a.city}, MI` : `${a.name}, MI`;
  const desc = metaDescription(
    `Drywall repair, hang, and finish in ${geo} — patches, cracks, water damage, texture matching, and Level 5 smooth walls. Free written estimates.`
  );
  return {
    // Absolute only where a city was added: "Detroit" would otherwise repeat against the
    // layout's "— BH Drywall Metro Detroit" suffix and push the tail past truncation.
    // Same reason d31c5e0 set the 11 service page titles absolute.
    title: needsCity
      ? { absolute: `Drywall Repair in ${geo} | BH Drywall` }
      : `Drywall Repair in ${geo}`,
    description: desc,
    keywords: info?.keywords,
    alternates: { canonical: `/service-areas/${a.slug}` },
  };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = AREAS_BY_SLUG[slug];
  if (!a) return notFound();
  const nearby = nearbyAreas(a, 6);
  const hero = serviceHero("emergency") ?? serviceHero("residential");
  const info: Insight = INSIGHTS[slug] ?? {};

  // 50 of the 101 areas are neighbourhoods with a real parent city in the data, but that
  // hierarchy was expressed nowhere Google could read it. Trailing slashes match the
  // canonical this page emits.
  const parent = a.parent ? AREAS_BY_SLUG[a.parent] : null;
  const crumbs = breadcrumbJsonLd([
    { name: "Home", url: `${BIZ.url}/` },
    { name: "Service Areas", url: `${BIZ.url}/service-areas/` },
    ...(parent ? [{ name: parent.name, url: `${BIZ.url}/service-areas/${parent.slug}/` }] : []),
    { name: a.name, url: `${BIZ.url}/service-areas/${a.slug}/` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <section className="relative overflow-hidden border-b border-ink-800 bg-ink-950">
        {hero && (
          <>
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              priority
              sizes="100vw"
              className="absolute inset-0 z-0 object-cover opacity-40"
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-ink-950 via-ink-950/85 to-ink-950/50" />
          </>
        )}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_minmax(360px,440px)]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-brass-500/40 bg-ink-950/70 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-brass-300 backdrop-blur">
                  <ShieldCheck className="h-3.5 w-3.5" /> Licensed · {BIZ.bsis}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur">
                  <Clock className="h-3.5 w-3.5" /> Sun–Thu 9am–5pm · Fri 9am–12pm
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-950/60 px-3 py-1.5 text-xs font-semibold text-ink-200 backdrop-blur">
                  <MapPin className="h-3.5 w-3.5 text-brass-400" /> {a.kind === "city" ? "City" : "Neighborhood"}
                </span>
              </div>
              <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
                Drywall Contractor in <span className="text-brass-gradient">{a.name}</span>, MI
              </h1>
              {info.tagline && (
                <p className="mt-3 text-lg font-medium text-brass-200 md:text-xl">{info.tagline}</p>
              )}
              {info.neighborhood_notes && (
                <p className="mt-4 max-w-2xl text-base text-ink-200 md:text-lg">
                  {info.neighborhood_notes}
                </p>
              )}
              <div className="mt-7">
                <ContactCTA size="lg" />
              </div>
            </div>
            <DispatchTracker areaName={a.name} areaSlug={a.slug} />
          </div>
        </div>
      </section>

      {/* Hyper-local strip */}
      {(info.landmarks?.length || info.common_calls?.length) && (
        <section className="border-b border-ink-800 bg-ink-950/60 py-12">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2 md:px-6">
            {info.landmarks && info.landmarks.length > 0 && (
              <div className="rounded-2xl border border-ink-800 bg-ink-900/50 p-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brass-300">
                  <Compass className="h-4 w-4" /> Known spots in {a.name}
                </div>
                <ul className="mt-3 space-y-2">
                  {info.landmarks.map((l) => (
                    <li key={l} className="flex items-start gap-2 text-sm text-ink-100">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass-400" />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {info.common_calls && info.common_calls.length > 0 && (
              <div className="rounded-2xl border border-ink-800 bg-ink-900/50 p-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brass-300">
                  <Wrench className="h-4 w-4" /> What we get called for here
                </div>
                <ul className="mt-3 space-y-2">
                  {info.common_calls.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-ink-100">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brass-400" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="border-t border-ink-800 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">{a.name} map</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Exact coverage centered on {a.name}
            </h2>
            <p className="mt-2 text-sm text-ink-300">
              Map centered on {a.name} — {a.lat.toFixed(3)}°, {a.lng.toFixed(3)}°
            </p>
          </div>
          <ServiceMap
            lat={a.lat}
            lng={a.lng}
            zoom={a.kind === "city" ? 13 : 14}
            title={`${a.name}, MI`}
            height={460}
          />
        </div>
      </section>

      <section className="border-t border-ink-800 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">Full service menu</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
              All drywall services in {a.name}
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex items-start gap-3 rounded-2xl border border-ink-800 bg-ink-900/50 p-4 transition-all hover:-translate-y-0.5 hover:border-brass-500/50"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brass-500/10 text-brass-400">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-ink-100">{s.shortName} in {a.name}</h3>
                    <p className="mt-1 text-sm text-ink-300 line-clamp-2">{s.tagline}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-ink-500 transition-all group-hover:translate-x-1 group-hover:text-brass-400" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {info.keywords && info.keywords.length > 0 && (
        <section className="border-t border-ink-800 py-12">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brass-300">
              <Tag className="h-4 w-4" /> What people search for in {a.name}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {info.keywords.map((k) => (
                <span
                  key={k}
                  className="rounded-full border border-ink-700 bg-ink-900/60 px-3 py-1.5 text-xs text-ink-200"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {nearby.length > 0 && (
        <section className="border-t border-ink-800 py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="font-display text-2xl font-bold md:text-3xl">Nearby areas we serve</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {nearby.map((n) => (
                <Link
                  key={n.slug}
                  href={`/service-areas/${n.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-ink-800 bg-ink-900/50 p-4 hover:border-brass-500/40"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-brass-400" />
                    <span className="font-semibold">{n.name}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-ink-500 group-hover:text-brass-400" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-ink-800 py-16">
        <div className="mx-auto max-w-3xl space-y-5 px-4 text-sm text-ink-200 md:px-6 md:text-base">
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            Drywall work we do in {a.name}
          </h2>
          <p>
            {a.name} is inside our regular Metro Detroit service area. {BIZ.name} schedules free estimates for hang,
            finish, repair, and commercial projects — with written scope before crews mobilize. Call {BIZ.phone} or
            request a quote online; a real estimator reviews photos or walks the site, not a national call center.
          </p>
          <p>
            Residential jobs in {a.name} often include basement finishing, patch-and-texture after plumbing or
            electrical, Level 5 skim in open floor plans, garage fire-separation board, and popcorn ceiling removal.
            Many neighborhoods mix brick colonials, mid-century ranches, and newer subdivisions — each needs a different
            texture and finish plan.
          </p>
          <p>
            Commercial and multi-family work includes tenant-improvement partitions, suspended ceilings, metal stud
            framing, and after-hours punch for property managers. We coordinate with GC schedules and document daily
            progress for occupied buildings.
          </p>
          <p>
            Pricing is itemized: board, finish level, texture, ceiling height, and access. Compare bids using the same
            finish spec — Level 4 vs Level 5 changes cost more than brand of gypsum. We carry liability and workers
            comp; certificates are available for commercial clients.
          </p>
        </div>
      </section>

      <LongFormFaq subject={a.name} kind="area" />

      <section className="border-t border-ink-800 bg-aurora py-16 text-center">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">
            Need a drywall contractor in {a.name} now?
          </h2>
          <p className="mt-3 text-ink-200">One tap reaches {BIZ.name} — licensed & insured drywall.</p>
          <div className="mt-6 flex justify-center">
            <ContactCTA size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}

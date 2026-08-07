import Link from "next/link";
import { SERVICES } from "@/content/services";
import { serviceHero } from "@/lib/photos";
import { ServiceCard } from "@/components/site/ServiceCard";
import { Reveal } from "@/components/site/Reveal";

export function ServiceGrid({ city }: { city?: string }) {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex flex-col items-center text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">What we do</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Hang, finish, repair &amp; build out.
          </h2>
          <p className="mt-3 max-w-2xl text-ink-300">
            Eleven drywall service lines across Metro Detroit. Tap a card for scope, photos, and a free estimate.
          </p>
          <Link href="/services" className="mt-4 text-sm font-semibold text-brass-400 hover:text-brass-300">
            View all services →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const hero = serviceHero(s.slug);
            if (!hero) return null;
            return (
              <Reveal key={s.slug} delay={(i % 3) * 0.06} y={14} variant="fade">
                <ServiceCard
                  slug={s.slug}
                  name={s.name}
                  shortName={s.shortName}
                  tagline={s.tagline}
                  Icon={s.icon}
                  photoSrc={hero.src}
                  photoAlt={hero.alt}
                  photoW={hero.width}
                  photoH={hero.height}
                  city={city ?? "Metro Detroit, MI"}
                  priority={false}
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

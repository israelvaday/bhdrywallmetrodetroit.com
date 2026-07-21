import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Award, Wrench, Users, Phone, MapPin, Clock } from "lucide-react";
import { BIZ } from "@/lib/business";
import { LICENSE_PHOTO, BRAND_PHOTOS } from "@/lib/photos";
import { ContactCTA } from "@/components/site/ContactCTA";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LongFormFaq } from "@/components/site/LongFormFaq";

export const metadata: Metadata = {
  title: "About — BH Drywall Metro Detroit",
  description: `Meet the ${BIZ.name} team — licensed & insured drywall across Wayne, Oakland, and Macomb counties.`,
  alternates: { canonical: `${BIZ.url}/about` },
};

export default function AboutPage() {
  const brand = BRAND_PHOTOS.slice(0, 2);
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/about/about-hero.png"
            alt="The BH Drywall Metro Detroit team in Detroit"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/55 to-ink-950" />
        </div>
        <div className="relative mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-4 py-20 text-center md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">About</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] md:text-6xl">
            A real <span className="text-brass-gradient">Metro Detroit</span> drywall contractor — not a call center.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-ink-200">
            BH Drywall Metro Detroit is a small, owner-operated drywall contractor team based in Detroit.
            We answer our own phones, crews show up with the right materials, and every job is scoped in writing before we start.
          </p>
          <div className="mt-7">
            <ContactCTA size="lg" />
          </div>
        </div>
      </section>

      {/* Story + License */}
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2 md:px-6">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Built on trust, not call-center tricks.
            </h2>
            <p className="mt-4 text-ink-300">
              Most online &ldquo;drywall&rdquo; ads are lead brokers. We&apos;re a local crew — licensed &amp; insured, and you talk to the estimator scheduling your job.
            </p>
            <p className="mt-4 text-ink-300">
              We handle basements, remodels, commercial tenant improvements, texture matching, flood-cut rebuilds, and new-construction hang &amp; finish across Metro Detroit.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { Icon: ShieldCheck, label: "Licensed & Insured", value: "COI on request" },
                { Icon: Award,       label: "5-Star Rated", value: "Local reviews" },
                { Icon: Wrench,      label: "Finish levels", value: "Level 4 & 5" },
                { Icon: Users,       label: "Local Team",  value: "Metro Detroit" },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="rounded-2xl border border-ink-800 bg-ink-900/50 p-4">
                  <Icon className="h-5 w-5 text-brass-400" />
                  <div className="mt-3 text-sm text-ink-400">{label}</div>
                  <div className="font-display font-bold">{value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {LICENSE_PHOTO && (
              <div className="col-span-2 overflow-hidden rounded-2xl border border-brass-500/30">
                <Image
                  src={LICENSE_PHOTO.src}
                  alt={LICENSE_PHOTO.alt}
                  width={LICENSE_PHOTO.width}
                  height={LICENSE_PHOTO.height}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full"
                />
              </div>
            )}
            <div className="col-span-2 overflow-hidden rounded-2xl border border-ink-800">
              <Image
                src="/about/about-workshop.png"
                alt="Inside the BH Drywall Metro Detroit mobile workshop"
                width={1536}
                height={1024}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="h-auto w-full object-cover"
              />
            </div>
            {brand.map((p) => (
              <div key={p.id} className="overflow-hidden rounded-2xl border border-ink-800">
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  sizes="25vw"
                  className="h-48 w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-ink-800 bg-ink-950 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 flex flex-col items-center text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">Our promise</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
              Four things we&apos;ll never do.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Never bait & switch.", body: "The price we quote on the phone is the price on your invoice — not a $19 lure that becomes $400 at your door." },
              { title: "Never unmarked.", body: "Our trucks are branded, our uniforms have a name tag, and our contractor license rides in every glovebox." },
              { title: "Never drill first.", body: "Non-destructive entry is the standard. Drilling is a last resort, and only after we've explained why." },
              { title: "Never anonymous.", body: "You'll know the dispatcher's name. You'll know the tech's name. You'll have a receipt with our license number." },
            ].map((v) => (
              <div key={v.title} className="rounded-2xl border border-ink-800 bg-ink-900/50 p-6">
                <h3 className="font-display text-lg font-extrabold">{v.title}</h3>
                <p className="mt-2 text-sm text-ink-300">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact card */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="rounded-3xl border border-brass-500/30 bg-gradient-to-br from-brass-500/10 to-ink-900/40 p-8 text-center">
            <h2 className="font-display text-2xl font-bold md:text-3xl">Talk to a real human.</h2>
            <p className="mt-2 text-ink-300">Open Mon–Sat. We pick up.</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-700 bg-ink-900/70 px-3 py-1.5">
                <Phone className="h-4 w-4 text-brass-400" /> {BIZ.phone}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-700 bg-ink-900/70 px-3 py-1.5">
                <MapPin className="h-4 w-4 text-brass-400" /> Detroit, MI
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-700 bg-ink-900/70 px-3 py-1.5">
                <Clock className="h-4 w-4 text-brass-400" /> Mon–Sat service
              </span>
            </div>
            <div className="mt-6 flex justify-center">
              <ContactCTA size="lg" />
            </div>
          </div>
        </div>
      </section>

      <LongFormFaq subject="Metro Detroit Drywall" kind="service" />
      <FinalCTA />
    </>
  );
}

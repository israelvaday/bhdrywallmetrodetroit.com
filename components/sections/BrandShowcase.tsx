import Image from "next/image";
import { Truck, Map as MapIcon, CreditCard, MailOpen } from "lucide-react";
import { PHOTOS_BY_ID } from "@/lib/photos";
import { Reveal } from "@/components/site/Reveal";

export function BrandShowcase() {
  // Match by suffix (id naming may vary across regenerations)
  const all = Object.values(PHOTOS_BY_ID);
  const pick = (suffix: string) =>
    all.find((p) => p.id.includes(suffix));

  const frames = [
    { p: pick("service-van-three-quarter-front"), Icon: Truck,      label: "Mobile drywall contractor Van" },
    { p: pick("service-van-side-magnet-daylight"), Icon: Truck,     label: "Branded Side Magnet" },
    { p: pick("orange-county-map-physical-mockup"), Icon: MapIcon,  label: "Serving All of OC" },
    { p: pick("business-card-mockup-photo"),       Icon: CreditCard, label: "Business Card" },
    { p: pick("social-tile-emergency-callout-real"), Icon: MailOpen, label: "Emergency Callout" },
  ].filter((f) => f.p);

  if (frames.length === 0) return null;

  return (
    <section className="relative border-t border-ink-800 bg-ink-950 py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex flex-col items-center text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">Our Brand</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
            A real, local drywall contractor — not a call-center middleman.
          </h2>
          <p className="mt-3 max-w-2xl text-ink-300">
            Branded vans, a real Detroit office, and a Licensed & insured crew you can actually meet.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-6">
          {/* big feature tile */}
          <Reveal y={16} variant="fade" className="md:col-span-4 md:row-span-2 relative overflow-hidden rounded-3xl border border-ink-800">
            {frames[0]?.p && (() => {
              const F = frames[0];
              const FIcon = F.Icon;
              return (
                <>
                  <Image
                    src={F.p!.src}
                    alt={F.p!.alt}
                    width={F.p!.width}
                    height={F.p!.height}
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="h-full max-h-[34rem] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="inline-flex items-center gap-2 rounded-full border border-brass-500/40 bg-ink-950/70 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-brass-300 backdrop-blur">
                      <FIcon className="h-3.5 w-3.5" />
                      {F.label}
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-extrabold text-white md:text-3xl">
                      Branded mobile drywall contractor — dispatched Sun–Thu, plus Friday mornings.
                    </h3>
                  </div>
                </>
              );
            })()}
          </Reveal>

          {frames.slice(1).map((f, i) => {
            const FIcon = f.Icon;
            return (
              <Reveal
                key={i}
                y={16}
                variant="fade"
                delay={i * 0.05}
                className="md:col-span-2 relative overflow-hidden rounded-3xl border border-ink-800"
              >
                {f.p && (
                  <>
                    <Image
                      src={f.p.src}
                      alt={f.p.alt}
                      width={f.p.width}
                      height={f.p.height}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="h-56 w-full object-cover md:h-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-brass-500/40 bg-ink-950/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brass-300 backdrop-blur">
                        <FIcon className="h-3 w-3" />
                        {f.label}
                      </div>
                    </div>
                  </>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

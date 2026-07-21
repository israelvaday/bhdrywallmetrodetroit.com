import Image from "next/image";
import { WORK_PHOTOS } from "@/lib/photos";

export function PhotoMarquee() {
  const photos = WORK_PHOTOS.slice(0, 24);
  const doubled = [...photos, ...photos];
  if (photos.length === 0) return null;
  return (
    <section className="relative overflow-hidden border-y border-ink-800 bg-ink-950 py-12">
      <div className="mx-auto mb-6 flex max-w-7xl flex-col items-center px-4 text-center md:px-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-brass-400">Real jobs</p>
        <h2 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">
          Real work, in real Metro Detroit homes &amp; businesses.
        </h2>
      </div>
      <div className="relative">
        <div className="marquee-track flex gap-4 w-max">
          {doubled.map((p, i) => (
            <div
              key={`${p.id}-${i}`}
              className="relative h-44 w-64 shrink-0 overflow-hidden rounded-2xl border border-ink-800 md:h-56 md:w-80"
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(max-width: 768px) 256px, 320px"
                draggable={false}
                className="pointer-events-none h-full w-full select-none object-cover"
              />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-ink-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-ink-950 to-transparent" />
      </div>
    </section>
  );
}

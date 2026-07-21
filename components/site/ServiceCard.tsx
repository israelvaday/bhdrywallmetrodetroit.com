import Image from "next/image";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { LogoMark } from "@/components/site/Logo";
import { cn } from "@/lib/cn";

export type ServiceCardProps = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  photoSrc: string;
  photoAlt: string;
  photoW: number;
  photoH: number;
  city?: string;
  priority?: boolean;
};

export function ServiceCard({
  slug, name, shortName, tagline, Icon, photoSrc, photoAlt, photoW, photoH, city, priority,
}: ServiceCardProps) {
  return (
    <Link
      href={`/services/${slug}`}
      className="group relative block overflow-hidden rounded-3xl border border-ink-800 bg-ink-900/60 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] transition-all hover:-translate-y-1 hover:border-brass-500/60"
    >
      {/* Photo */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={photoSrc}
          alt={photoAlt}
          width={photoW}
          height={photoH}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          priority={priority}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Bottom gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />

        {/* Logo watermark, top-left */}
        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-xl border border-brass-500/40 bg-ink-950/70 px-2.5 py-1.5 backdrop-blur">
          <LogoMark className="h-5 w-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-brass-300">
            BH Drywall Metro Detroit
          </span>
        </div>

        {/* Map / location pill, top-right */}
        {city && (
          <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-ink-700/60 bg-ink-950/70 px-2.5 py-1 backdrop-blur">
            <MapPin className="h-3 w-3 text-brass-400" />
            <span className="text-[10px] font-semibold text-ink-100">{city}</span>
          </div>
        )}

        {/* Title overlay, bottom */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="flex items-center gap-2">
            <Icon className={cn("h-5 w-5 text-brass-400")} />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brass-300">
              {shortName}
            </span>
          </div>
          <h3 className="mt-1.5 font-display text-2xl font-extrabold leading-tight text-white">
            {name}
          </h3>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 p-5">
        <p className="text-sm text-ink-300">{tagline}</p>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-ink-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass-400" />
      </div>
    </Link>
  );
}

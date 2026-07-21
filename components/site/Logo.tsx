import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * BH Drywall Metro Detroit brand mark.
 */
export function LogoMark({
  className,
  title = "BH Drywall Metro Detroit",
  priority = false,
}: { className?: string; title?: string; priority?: boolean }) {
  return (
    <Image
      src="/logo.png"
      alt={title}
      width={512}
      height={512}
      priority={priority}
      sizes="(max-width: 768px) 56px, 96px"
      className={cn("h-10 w-10 object-contain select-none", className)}
    />
  );
}

export function Logo({
  className,
  showWordmark = true,
  size = "md",
}: { className?: string; showWordmark?: boolean; size?: "sm" | "md" | "lg" }) {
  const dim = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10";
  const text = size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-base";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={dim} />
      {showWordmark && (
        <span className={cn("font-display font-extrabold tracking-tight leading-none flex flex-col", text)}>
          <span>BH Drywall</span>
          <span className="mt-1 text-[9px] font-semibold tracking-[0.25em] text-brass-400/80 uppercase">
            Metro Detroit
          </span>
        </span>
      )}
    </span>
  );
}

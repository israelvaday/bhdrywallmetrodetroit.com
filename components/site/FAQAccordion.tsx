"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/content/faq";

export function FAQAccordion({ items, sectionId }: { items: FAQ[]; sectionId: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/40">
      {items.map((it, i) => {
        const isOpen = openIdx === i;
        return (
          <div key={`${sectionId}-${i}`} className={i === 0 ? "" : "border-t border-ink-800"}>
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-ink-900/60 md:px-6"
            >
              <span className="font-display text-base font-bold md:text-lg">{it.q}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-brass-400 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid overflow-hidden transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-ink-300 md:px-6 md:text-lg">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

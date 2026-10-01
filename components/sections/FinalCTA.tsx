import { Clock } from "lucide-react";
import { ContactCTA } from "@/components/site/ContactCTA";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-ink-800 bg-aurora py-20">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-brass-500/30 bg-brass-500/10 px-3 py-1.5 text-xs font-semibold text-brass-300">
          <Clock className="h-3.5 w-3.5" /> Open Sun–Thu 9am–5pm · Wayne, Oakland &amp; Macomb
        </div>
        <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight md:text-5xl">
          Need a drywall contractor in Metro Detroit right now?
        </h2>
        <p className="mt-4 text-ink-200">
          Tap a button and a drywall crew lead will follow up fast.
        </p>
        <div className="mt-7 flex justify-center">
          <ContactCTA size="lg" />
        </div>
      </div>
    </section>
  );
}

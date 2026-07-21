import { Phone, Mail, ClipboardList } from "lucide-react";
import { BIZ } from "@/lib/business";

export function MobileDock() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-800 bg-ink-900/95 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-3">
        <a
          href={BIZ.phoneHref}
          aria-label="Call drywall contractor now"
          className="flex flex-col items-center gap-1 py-3 text-xs font-semibold text-brass-300"
        >
          <Phone className="h-5 w-5" />
          Call
        </a>
        <a
          href={BIZ.emailHref}
          aria-label="Email us"
          className="flex flex-col items-center gap-1 py-3 text-xs font-semibold text-emerald-300"
        >
          <Mail className="h-5 w-5" />
          Email
        </a>
        <a
          href="/quote"
          aria-label="Get a free quote"
          className="flex flex-col items-center gap-1 py-3 text-xs font-semibold text-ink-100"
        >
          <ClipboardList className="h-5 w-5" />
          Free Quote
        </a>
      </div>
    </div>
  );
}

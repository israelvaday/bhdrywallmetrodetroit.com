"use client";

// HOLIDAY-NOTICE sukkot-2026: temporary homepage banner. Delete this file, the marked
// lines in app/page.tsx, and the marked homepage lastmod pin in lib/sitemap-urls.ts once the
// holiday is over. The post /blog/sukkot-2026/ is permanent and stays.
import { useEffect, useState } from "react";
import Link from "next/link";

// Safety net only: if the banner is still deployed when the office reopens, hide it on the
// client after mount. The server HTML always renders it, so hydration cannot mismatch.
const REOPENS_AT = Date.parse("2026-09-28T09:00:00-04:00");

export function HolidayNoticeSukkot2026() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (Date.now() >= REOPENS_AT) setShow(false);
  }, []);

  if (!show) return null;

  return (
    <aside aria-label="Sukkot closure notice" className="border-b border-brass-500/30 bg-brass-500/10">
      <p className="mx-auto max-w-7xl px-4 py-3 text-center text-sm text-ink-100 md:px-6">
        <strong className="font-semibold text-brass-300">Closed for Sukkot.</strong>{" "}
        We are closed Saturday, September 26 and Sunday, September 27, and reopen Monday, September 28 at 9:00 AM. Chag Sameach!{" "}
        <Link
          href="/blog/sukkot-2026"
          className="font-semibold text-brass-300 underline underline-offset-4 hover:text-brass-200"
        >
          Holiday hours
        </Link>
      </p>
    </aside>
  );
}

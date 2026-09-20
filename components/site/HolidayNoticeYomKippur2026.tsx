"use client";

// HOLIDAY-NOTICE yom-kippur-2026: temporary homepage banner. Delete this file, the marked
// lines in app/page.tsx, and the marked homepage lastmod pin in lib/sitemap-urls.ts once the
// holiday is over. The post /blog/yom-kippur-2026/ is permanent and stays.
import { useEffect, useState } from "react";
import Link from "next/link";

// Safety net only: if the banner is still deployed when the office reopens, hide it on the
// client after mount. The server HTML always renders it, so hydration cannot mismatch.
const REOPENS_AT = Date.parse("2026-09-22T09:00:00-04:00");

export function HolidayNoticeYomKippur2026() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (Date.now() >= REOPENS_AT) setShow(false);
  }, []);

  if (!show) return null;

  return (
    <aside aria-label="Yom Kippur closure notice" className="border-b border-brass-500/30 bg-brass-500/10">
      <p className="mx-auto max-w-7xl px-4 py-3 text-center text-sm text-ink-100 md:px-6">
        <strong className="font-semibold text-brass-300">Closed for Yom Kippur.</strong>{" "}
        We are closed Sunday, September 20 and Monday, September 21, and reopen Tuesday, September 22 at 9:00 AM. Wishing an easy and meaningful fast.{" "}
        <Link
          href="/blog/yom-kippur-2026"
          className="font-semibold text-brass-300 underline underline-offset-4 hover:text-brass-200"
        >
          Holiday hours
        </Link>
      </p>
    </aside>
  );
}

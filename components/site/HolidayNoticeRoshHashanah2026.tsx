"use client";

// HOLIDAY-NOTICE rosh-hashanah-2026: temporary homepage banner. Delete this file and the
// marked lines in app/page.tsx once the holiday is over.
import { useEffect, useState } from "react";
import Link from "next/link";

// Safety net only: if the banner is still deployed when the office reopens, hide it on the
// client after mount. The server HTML always renders it, so hydration cannot mismatch.
const REOPENS_AT = Date.parse("2026-09-14T09:00:00-04:00");

export function HolidayNoticeRoshHashanah2026() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (Date.now() >= REOPENS_AT) setShow(false);
  }, []);

  if (!show) return null;

  return (
    <aside aria-label="Rosh Hashanah closure notice" className="border-b border-brass-500/30 bg-brass-500/10">
      <p className="mx-auto max-w-7xl px-4 py-3 text-center text-sm text-ink-100 md:px-6">
        <strong className="font-semibold text-brass-300">Closed for Rosh Hashanah.</strong>{" "}
        We are closed Saturday, September 12 and Sunday, September 13, and reopen Monday, September 14 at 9:00 AM. Shana Tova!{" "}
        <Link
          href="/blog/happy-rosh-hashanah-2026"
          className="font-semibold text-brass-300 underline underline-offset-4 hover:text-brass-200"
        >
          Holiday hours
        </Link>
      </p>
    </aside>
  );
}

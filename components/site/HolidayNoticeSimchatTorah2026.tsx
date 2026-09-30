"use client";

// HOLIDAY-NOTICE simchat-torah-2026: temporary homepage banner. Delete this file, the marked
// lines in app/page.tsx, and the marked homepage lastmod pin in lib/sitemap-urls.ts once the
// holiday is over (Sunday 2026-10-04 after havdalah).
import { useEffect, useState } from "react";

// Safety net only: if the banner is still deployed when the office reopens, hide it on the
// client after mount. The server HTML always renders it, so hydration cannot mismatch.
const REOPENS_AT = Date.parse("2026-10-05T09:00:00-04:00");

export function HolidayNoticeSimchatTorah2026() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (Date.now() >= REOPENS_AT) setShow(false);
  }, []);

  if (!show) return null;

  return (
    <aside
      aria-label="Shemini Atzeret and Simchat Torah closure notice"
      data-holiday-notice="simchat-torah-2026"
      className="border-b border-brass-500/30 bg-brass-500/10"
    >
      <p className="mx-auto max-w-7xl px-4 py-3 text-center text-sm text-ink-100 md:px-6">
        <strong className="font-semibold text-brass-300">Closed for Shemini Atzeret and Simchat Torah.</strong>{" "}
        We are closed Saturday, October 3 and Sunday, October 4, and reopen Monday, October 5 at 9:00 AM. Chag Sameach!
      </p>
    </aside>
  );
}

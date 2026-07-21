"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    _paq?: unknown[][];
  }
}

/**
 * Matomo counts one page view when its snippet first runs. This site navigates
 * client-side between prerendered pages, so every route change after the first
 * would otherwise go uncounted. Report those to the same queue the snippet uses.
 */
export function MatomoRouteTracker() {
  const pathname = usePathname();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // The inline snippet already tracked the landing page.
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    const paq = window._paq;
    if (!paq) return;

    paq.push(["setCustomUrl", window.location.href]);
    paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
    paq.push(["trackPageView"]);
    paq.push(["enableLinkTracking"]);
  }, [pathname]);

  return null;
}

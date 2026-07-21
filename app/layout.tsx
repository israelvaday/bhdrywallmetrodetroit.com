import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { BIZ } from "@/lib/business";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { MobileDock } from "@/components/site/MobileDock";
import { MatomoRouteTracker } from "@/components/site/MatomoRouteTracker";
import { localBusinessJsonLd } from "@/lib/schema";

const MATOMO_SNIPPET = `
  var _paq = window._paq = window._paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
  _paq.push(["setCookieDomain", "*.bhdrywallmetrodetroit.com"]);
  _paq.push(["setDomains", ["*.bhdrywallmetrodetroit.com"]]);
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="https://matomo.alphalockandsafe.com/matomo/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '23']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
`;

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "optional", adjustFontFallback: true });
// Jakarta = display-font for headlines (LCP target). Use "optional" so the
// fallback paint is locked-in for the LCP — eliminates the font-swap repaint
// that was pushing mobile LCP to ~2.9s. Jakarta still loads in the background
// and applies on subsequent page views from cache.
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "optional", adjustFontFallback: true });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "optional", adjustFontFallback: true });

export const metadata: Metadata = {
  metadataBase: new URL(BIZ.url),
  title: {
    default: `${BIZ.name} — Metro Detroit Drywall Contractor`,
    template: `%s — ${BIZ.name}`,
  },
  description:
    `${BIZ.name} — licensed & insured drywall hang, finish, repair, and commercial work across Metro Detroit. Free estimates — call ${BIZ.phone}.`,
  keywords: [
    "drywall contractor Detroit",
    "drywall repair Metro Detroit",
    "basement drywall Michigan",
    "commercial drywall Wayne County",
    "Level 5 finish Detroit",
  ],
  openGraph: {
    type: "website",
    siteName: BIZ.name,
    url: BIZ.url,
    locale: "en_US",
    title: `${BIZ.name} — Metro Detroit Drywall Contractor`,
    description:
      "Licensed & insured drywall hang, finish, repair, and commercial work across Wayne, Oakland & Macomb counties.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: `${BIZ.name} — Metro Detroit drywall contractor`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BIZ.name} — Metro Detroit drywall contractor`,
    description: "Licensed Metro Detroit drywall. Sun–Thu 9am–5pm · Fri 9am–12pm. Licensed & insured.",
    images: ["/opengraph-image.png"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0E12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${inter.variable} ${jakarta.variable} ${mono.variable}`}>
      <body className="font-sans bg-ink-950 text-ink-50 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileDock />
        <Toaster position="top-center" theme="dark" richColors />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        {/* Matomo */}
        <script dangerouslySetInnerHTML={{ __html: MATOMO_SNIPPET }} />
        <noscript>
          <p>
            <img
              referrerPolicy="no-referrer-when-downgrade"
              src="https://matomo.alphalockandsafe.com/matomo/matomo.php?idsite=23&rec=1"
              style={{ border: 0 }}
              alt=""
            />
          </p>
        </noscript>
        <MatomoRouteTracker />
        {/* End Matomo Code */}
      </body>
    </html>
  );
}

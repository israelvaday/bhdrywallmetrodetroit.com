// Single source of truth for NAP, hours, license, links.
export const BIZ = {
  name: "BH Drywall Metro Detroit",
  legalName: "BH Drywall Metro Detroit",
  tagline: "Licensed & Insured Drywall — Free Estimates Across Metro Detroit",
  phone: "(313) 236-4558",
  phoneE164: "+13132364558",
  phoneHref: "tel:+13132364558",
  whatsappHref: "https://wa.me/13132364558",
  email: "info@bhdrywallmetrodetroit.com",
  emailHref: "mailto:info@bhdrywallmetrodetroit.com",
  /** Shown in trust badges (contractor credentials). */
  licenseId: "Insured",
  /** Legacy field name used in templates — displays contractor credential line. */
  bsis: "Insured",
  url: "https://bhdrywallmetrodetroit.com",
  address: {
    street: "Metro Detroit Service Area",
    locality: "Detroit",
    region: "MI",
    postalCode: "48201",
    country: "US",
    full: "Metro Detroit, MI",
  },
  geo: { lat: 42.3314, lng: -83.0458 },
  /** Wayne / Oakland / Macomb — geolocation + map bounds */
  metroBounds: {
    minLat: 42.15,
    maxLat: 42.75,
    minLng: -83.65,
    maxLng: -82.45,
  },
  /** Default embed map center (full tri-county view) */
  metroMap: { lat: 42.45, lng: -83.05, zoom: 10 },
  hours247: false,
  hours: [
    { day: 0, open: "00:00", close: "00:00", label: "Sunday", closed: true },
    { day: 1, open: "07:00", close: "18:00", label: "Monday" },
    { day: 2, open: "07:00", close: "18:00", label: "Tuesday" },
    { day: 3, open: "07:00", close: "18:00", label: "Wednesday" },
    { day: 4, open: "07:00", close: "18:00", label: "Thursday" },
    { day: 5, open: "07:00", close: "18:00", label: "Friday" },
    { day: 6, open: "08:00", close: "14:00", label: "Saturday" },
  ] as const,
  social: {
    google: "",
    yelp: "",
    facebook: "",
    instagram: "",
    tiktok: "",
  },
};

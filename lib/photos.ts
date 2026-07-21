import photosJson from "@/content/photos.json";

export type Photo = {
  id: string;
  src: string;
  alt: string;
  category: string;
  kind: "work" | "trust" | "brand" | "review" | "hero";
  services: string[];
  width: number;
  height: number;
  ratio: number;
  orientation: "landscape" | "portrait" | "square";
  bytes: number;
  source: string;
};

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const PHOTOS = (photosJson as Photo[]).map((p) => ({
  ...p,
  src: BASE_PATH && p.src.startsWith("/") ? `${BASE_PATH}${p.src}` : p.src,
}));

export const PHOTOS_BY_ID: Record<string, Photo> = Object.fromEntries(
  PHOTOS.map((p) => [p.id, p])
);

export const WORK_PHOTOS = PHOTOS.filter((p) => p.kind === "work");
export const BRAND_PHOTOS = PHOTOS.filter((p) => p.kind === "brand");
export const REVIEW_PHOTOS = PHOTOS.filter((p) => p.kind === "review");
export const LICENSE_PHOTO = PHOTOS.find((p) => p.id === "logo-master-on-navy");

export function photosForService(slug: string): Photo[] {
  return PHOTOS.filter(
    (p) => p.services.includes(slug) && p.kind !== "trust" && p.kind !== "brand"
  );
}

/** Prefer AI-generated branded hero photo, fall back to first real work photo. */
export function serviceHero(slug: string): Photo | undefined {
  const hero = PHOTOS.find((p) => p.id === `service-hero-${slug}`);
  if (hero) return hero;
  return WORK_PHOTOS.find((p) => p.services.includes(slug));
}

export const LOGO_PHOTO  = PHOTOS.find((p) => p.id === "logo-master-on-navy");
export const LOGO_ICON_PHOTO = PHOTOS.find((p) => p.id === "logo-icon-square");

/** Deterministic 4-photo pick for an area-page hash. */
export function photosForArea(seed: string, count = 4): Photo[] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  const start = Math.abs(h) % WORK_PHOTOS.length;
  const out: Photo[] = [];
  for (let i = 0; i < count; i++) {
    out.push(WORK_PHOTOS[(start + i * 7) % WORK_PHOTOS.length]);
  }
  return out;
}

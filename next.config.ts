import type { NextConfig } from "next";

const isExport = process.env.NEXT_EXPORT === "1";
const isServer = process.env.SERVER_BUILD === "1";
const basePath = isExport ? "" : "";

const config: NextConfig = {
  reactStrictMode: true,
  images: isExport
    ? { unoptimized: true }
    : { formats: ["image/avif", "image/webp"] },
  ...(isServer ? { output: "standalone" as const } : {}),
  ...(isExport ? { output: "export" as const, trailingSlash: true } : {}),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default config;

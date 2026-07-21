import { ImageResponse } from "next/og";
import { BrandMark } from "@/lib/brand-mark";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #0B0E12 0%, #121820 100%)",
        }}
      >
        <BrandMark boxSize={148} radius={32} emojiSize={72} />
      </div>
    ),
    { ...size }
  );
}

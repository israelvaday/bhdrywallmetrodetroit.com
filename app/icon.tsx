import { ImageResponse } from "next/og";
import { BrandMark } from "@/lib/brand-mark";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B0E12",
        }}
      >
        <BrandMark boxSize={28} radius={7} emojiSize={16} />
      </div>
    ),
    { ...size }
  );
}

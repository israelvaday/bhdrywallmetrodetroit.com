/** Shared mark for favicon, apple touch icon, and OG-adjacent assets (ImageResponse / next/og). */
export function BrandMark({
  emojiSize,
  radius,
  boxSize,
}: {
  emojiSize: number;
  radius: number;
  boxSize: number;
}) {
  return (
    <div
      style={{
        width: boxSize,
        height: boxSize,
        borderRadius: radius,
        background: "linear-gradient(135deg, #C9A24A 0%, #8A6A1F 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 24px rgba(201,162,74,0.35)",
        border: "2px solid rgba(233,208,138,0.45)",
      }}
    >
      <div style={{ fontSize: emojiSize, lineHeight: 1, marginTop: -2 }}>🧱</div>
    </div>
  );
}

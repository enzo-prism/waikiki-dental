import { ImageResponse } from "next/og";

export const alt = "Waikiki Dental — IV sedation and restorative care in Roseville, CA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0b2140",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#fdfcfa",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              background: "#b23e2d",
            }}
          />
          <div style={{ fontSize: 28, letterSpacing: 4, textTransform: "uppercase" }}>
            Waikiki Dental
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 64, lineHeight: 1.05, maxWidth: 900 }}>
            Dentistry that feels like a deep breath.
          </div>
          <div style={{ fontSize: 28, color: "#8badde" }}>
            IV sedation · Implants · Same-day crowns · Roseville, CA
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

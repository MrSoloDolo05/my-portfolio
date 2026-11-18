import { ImageResponse } from "next/og";

export const alt = "Tyrone Owen's developer portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: 38,
          backgroundColor: "#0a0d0b",
          color: "#f2f4ef",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "42px 48px",
            border: "2px solid #354236",
            backgroundColor: "#101511",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "#79f54a",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 4,
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                marginRight: 16,
                backgroundColor: "#79f54a",
              }}
            />
            PERSONAL_ARCHIVE
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                color: "#79f54a",
                fontSize: 22,
                letterSpacing: 5,
              }}
            >
              DEVELOPER PORTFOLIO
            </div>
            <div
              style={{
                marginTop: 16,
                fontSize: 76,
                fontWeight: 700,
                letterSpacing: -3,
              }}
            >
              TYRONE OWEN
            </div>
            <div
              style={{
                marginTop: 16,
                color: "#a3b2a4",
                fontSize: 26,
              }}
            >
              Projects, skills &amp; experiments
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid #354236",
              paddingTop: 18,
              color: "#a3b2a4",
              fontSize: 18,
              letterSpacing: 2,
            }}
          >
            <span>GROWING UP WITH THE FUTURE</span>
            <span>PORTFOLIO SYSTEM // 01</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

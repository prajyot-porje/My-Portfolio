import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Get parameters
    const title = searchParams.get("title") || "Engineering Logs";
    const readTime = searchParams.get("readTime") || "3 min read";

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#fafafa",
          padding: "80px",
          border: "16px solid #0a0a0a",
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#0a0a0a",
                letterSpacing: "-0.02em",
                fontFamily: "sans-serif",
              }}
            >
              Prajyot Porje
            </span>
            <span
              style={{
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#737373",
                fontFamily: "monospace",
                marginTop: "4px",
              }}
            >
              Product Engineer
            </span>
          </div>
          <div
            style={{
              backgroundColor: "#e5e5e5",
              borderRadius: "9999px",
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#0a0a0a",
                fontFamily: "monospace",
              }}
            >
              LOGS
            </span>
          </div>
        </div>

        {/* Title Area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "40px",
            marginBottom: "40px",
            maxWidth: "900px",
          }}
        >
          <span
            style={{
              fontSize: "56px",
              fontWeight: "bold",
              color: "#0a0a0a",
              lineHeight: 1.15,
              fontFamily: "Georgia, serif",
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </span>
        </div>

        {/* Footer Metadata */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderTop: "2px solid #e5e5e5",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                fontSize: "14px",
                fontFamily: "monospace",
                color: "#737373",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {readTime}
            </span>
            <span
              style={{
                width: "4px",
                height: "4px",
                backgroundColor: "#e5e5e5",
                borderRadius: "50%",
                marginLeft: "12px",
                marginRight: "12px",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                fontFamily: "monospace",
                color: "#737373",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              www.prajyotporje.in
            </span>
          </div>

          <span
            style={{
              fontSize: "14px",
              fontFamily: "monospace",
              color: "#737373",
              letterSpacing: "0.08em",
            }}
          >
            {"01 // WORK"}
          </span>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    console.error(e);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

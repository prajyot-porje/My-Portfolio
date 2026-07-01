import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const color = searchParams.get("color") || "0d0d0d";
  const username = searchParams.get("username") || "prajyot-porje";

  try {
    const res = await fetch(`https://ghchart.rshah.org/${color}/${username}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!res.ok) {
      return new NextResponse("Failed to fetch GitHub chart", { status: res.status });
    }

    const svgText = await res.text();
    return new NextResponse(svgText, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error in github-contributions proxy route:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

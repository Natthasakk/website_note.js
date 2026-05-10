import { NextRequest, NextResponse } from "next/server";
import { readImagesConfig, writeImagesConfig } from "@/lib/productImageStore";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function GET() {
  try {
    const config = await readImagesConfig();
    return NextResponse.json(config, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("Failed to read images config:", err);
    return NextResponse.json({});
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token || !verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId, images } = await req.json();
  if (!productId || !Array.isArray(images)) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  try {
    const config = await readImagesConfig();
    config[productId] = images;
    await writeImagesConfig(config);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to save images config:", err);
    const message = err instanceof Error ? err.message : "Failed to save.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

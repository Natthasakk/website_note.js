import { NextRequest, NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

const CONTAINER_NAME = "product-images";
const CONFIG_BLOB = "images-config.json";

type ImagesConfig = Record<string, string[]>;

async function getContainerClient() {
  const cs = process.env.AZURE_STORAGE_CONNECTION_STRING;
  if (!cs) throw new Error("Storage not configured.");
  const container = BlobServiceClient.fromConnectionString(cs).getContainerClient(CONTAINER_NAME);
  await container.createIfNotExists();
  return container;
}

async function readConfig(container: ReturnType<typeof BlobServiceClient.prototype.getContainerClient>): Promise<ImagesConfig> {
  try {
    const blob = container.getBlockBlobClient(CONFIG_BLOB);
    const download = await blob.downloadToBuffer();
    return JSON.parse(download.toString());
  } catch {
    return {};
  }
}

async function writeConfig(
  container: ReturnType<typeof BlobServiceClient.prototype.getContainerClient>,
  config: ImagesConfig
) {
  const blob = container.getBlockBlobClient(CONFIG_BLOB);
  const body = JSON.stringify(config);
  await blob.upload(body, Buffer.byteLength(body), {
    blobHTTPHeaders: { blobContentType: "application/json" },
  });
}

// GET /api/products/images — returns { productId: [url, ...] }
export async function GET() {
  try {
    const container = await getContainerClient();
    const config = await readConfig(container);
    return NextResponse.json(config, {
      headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" },
    });
  } catch (err) {
    console.error("Failed to read images config:", err);
    return NextResponse.json({});
  }
}

// POST /api/products/images — { productId, images: [url, ...] }
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
    const container = await getContainerClient();
    const config = await readConfig(container);
    config[productId] = images;
    await writeConfig(container, config);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to save images config:", err);
    return NextResponse.json({ error: "Failed to save." }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";
import path from "node:path";
import crypto from "node:crypto";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const ALLOWED_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const CONTAINER_NAME = "product-images";

export async function POST(req: NextRequest) {
  // ── Auth check ──────────────────────────────────────────────────────────
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token || !verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── Parse form data ─────────────────────────────────────────────────────
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  // ── Validate MIME type ──────────────────────────────────────────────────
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, and WebP images are allowed." },
      { status: 415 }
    );
  }

  // ── Validate extension ──────────────────────────────────────────────────
  const originalExt = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXTS.has(originalExt)) {
    return NextResponse.json({ error: "Invalid file extension." }, { status: 415 });
  }

  // ── Validate size ───────────────────────────────────────────────────────
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json(
      { error: "File size exceeds 5 MB limit." },
      { status: 413 }
    );
  }

  // ── Read & validate magic bytes ─────────────────────────────────────────
  const buffer = Buffer.from(await file.arrayBuffer());
  if (!hasValidMagicBytes(buffer, file.type)) {
    return NextResponse.json(
      { error: "File content does not match declared type." },
      { status: 415 }
    );
  }

  // ── Upload to Azure Blob Storage ────────────────────────────────────────
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  if (!connectionString) {
    return NextResponse.json({ error: "Storage not configured." }, { status: 500 });
  }

  const safeExt = originalExt === ".jpg" ? ".jpg" : originalExt;
  const blobName = `products/${crypto.randomUUID()}${safeExt}`;

  const containerClient = BlobServiceClient
    .fromConnectionString(connectionString)
    .getContainerClient(CONTAINER_NAME);

  await containerClient.createIfNotExists({ access: "blob" });

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.uploadData(buffer, {
    blobHTTPHeaders: { blobContentType: file.type },
  });

  return NextResponse.json({ url: blockBlobClient.url, size: file.size });
}

// ── Magic byte validation ─────────────────────────────────────────────────────

function hasValidMagicBytes(buf: Buffer, mimeType: string): boolean {
  if (buf.length < 4) return false;
  switch (mimeType) {
    case "image/jpeg":
      return buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
    case "image/png":
      return (
        buf[0] === 0x89 &&
        buf[1] === 0x50 &&
        buf[2] === 0x4e &&
        buf[3] === 0x47
      );
    case "image/webp":
      return (
        buf.toString("ascii", 0, 4) === "RIFF" &&
        buf.toString("ascii", 8, 12) === "WEBP"
      );
    default:
      return false;
  }
}

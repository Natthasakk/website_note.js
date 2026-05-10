import { BlobServiceClient } from "@azure/storage-blob";

const CONTAINER_NAME = "product-images";
const CONFIG_BLOB = "images-config.json";

export type ImagesConfig = Record<string, string[]>;

function getContainerClient() {
  const cs = process.env.AZURE_STORAGE_CONNECTION_STRING;
  if (!cs) throw new Error("AZURE_STORAGE_CONNECTION_STRING is not set.");
  return BlobServiceClient.fromConnectionString(cs).getContainerClient(CONTAINER_NAME);
}

export async function readImagesConfig(): Promise<ImagesConfig> {
  try {
    const container = getContainerClient();
    const blob = container.getBlockBlobClient(CONFIG_BLOB);
    const buffer = await blob.downloadToBuffer();
    return JSON.parse(buffer.toString());
  } catch {
    return {};
  }
}

export async function writeImagesConfig(config: ImagesConfig): Promise<void> {
  const container = getContainerClient();
  await container.createIfNotExists();
  const blob = container.getBlockBlobClient(CONFIG_BLOB);
  const body = JSON.stringify(config);
  await blob.upload(body, Buffer.byteLength(body), {
    blobHTTPHeaders: { blobContentType: "application/json" },
    conditions: {},
  });
}

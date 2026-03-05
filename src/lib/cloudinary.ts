/**
 * Server-side Cloudinary upload utility.
 * Env vars required:
 *   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
 *   CLOUDINARY_API_KEY
 *   CLOUDINARY_API_SECRET
 */

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
}

export async function uploadToCloudinary(
  file: Buffer | string,
  options: {
    folder?: string;
    public_id?: string;
    resource_type?: "image" | "video" | "raw" | "auto";
  } = {},
): Promise<CloudinaryUploadResult> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary env vars are not configured. Please add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET to .env",
    );
  }

  const formData = new FormData();

  // Build signing params
  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign: Record<string, string | number> = {
    timestamp,
    folder: options.folder ?? "sarthigo",
  };
  if (options.public_id) paramsToSign.public_id = options.public_id;

  // Generate signature using crypto (Node built-in)
  const crypto = require("crypto") as typeof import("crypto");
  const sigString =
    Object.keys(paramsToSign)
      .sort()
      .map((k) => `${k}=${paramsToSign[k]}`)
      .join("&") + apiSecret;
  const signature = crypto.createHash("sha1").update(sigString).digest("hex");

  // Append fields
  formData.append("api_key", apiKey);
  formData.append("timestamp", String(timestamp));
  formData.append("folder", options.folder ?? "sarthigo");
  formData.append("signature", signature);
  if (options.public_id) formData.append("public_id", options.public_id);

  // File / base64
  if (typeof file === "string") {
    formData.append("file", file);
  } else {
    const blob = new Blob([new Uint8Array(file)]);
    formData.append("file", blob);
  }

  const resourceType = options.resource_type ?? "image";
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  const response = await fetch(url, { method: "POST", body: formData });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`Cloudinary upload failed: ${JSON.stringify(err)}`);
  }

  return response.json() as Promise<CloudinaryUploadResult>;
}

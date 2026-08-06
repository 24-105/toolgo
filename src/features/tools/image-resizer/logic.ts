export const MAX_FILE_SIZE = 20 * 1024 * 1024;
export const MAX_DIMENSION = 8_192;

export type ImageOutputType = "image/jpeg" | "image/png" | "image/webp";

export function validateResizeInput(width: number, height: number) {
  if (!Number.isInteger(width) || width < 1 || width > MAX_DIMENSION) {
    throw new Error(
      `幅は1〜${MAX_DIMENSION.toLocaleString("ja-JP")}pxで指定してください。`,
    );
  }
  if (!Number.isInteger(height) || height < 1 || height > MAX_DIMENSION) {
    throw new Error(
      `高さは1〜${MAX_DIMENSION.toLocaleString("ja-JP")}pxで指定してください。`,
    );
  }
}

export function outputExtension(type: ImageOutputType) {
  return type === "image/jpeg" ? "jpg" : type.slice("image/".length);
}

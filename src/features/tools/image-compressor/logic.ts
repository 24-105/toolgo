export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const MAX_DIMENSION = 4_096;

export type CompressionFileInput = {
  type: string;
  size: number;
};

export function validateCompressionInput(
  file: CompressionFileInput,
  quality: number,
  width?: number,
  height?: number,
) {
  if (!file.type.startsWith("image/")) {
    throw new Error("画像ファイルを選択してください。");
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("画像ファイルは10MB以下にしてください。");
  }
  if (!Number.isFinite(quality) || quality < 0.1 || quality > 1) {
    throw new Error("画質は0.1〜1.0の範囲で指定してください。");
  }
  if (
    width !== undefined &&
    (!Number.isInteger(width) || width < 1 || width > MAX_DIMENSION)
  ) {
    throw new Error(
      `画像の縦横は${MAX_DIMENSION.toLocaleString("ja-JP")}px以内にしてください。`,
    );
  }
  if (
    height !== undefined &&
    (!Number.isInteger(height) || height < 1 || height > MAX_DIMENSION)
  ) {
    throw new Error(
      `画像の縦横は${MAX_DIMENSION.toLocaleString("ja-JP")}px以内にしてください。`,
    );
  }
}

type BarcodeResult = { rawValue?: string };
type BarcodeDetectorLike = {
  detect: (source: ImageBitmapSource) => Promise<BarcodeResult[]>;
};
type BarcodeDetectorConstructor = new (options?: {
  formats?: string[];
}) => BarcodeDetectorLike;

export async function readQrCode(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("QRコードを含む画像ファイルを選択してください。");
  }
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("画像ファイルは10MB以下にしてください。");
  }

  const Detector = (
    globalThis as typeof globalThis & {
      BarcodeDetector?: BarcodeDetectorConstructor;
    }
  ).BarcodeDetector;
  if (!Detector) {
    throw new Error(
      "このブラウザは画像からのQRコード読み取りに対応していません。ChromeまたはEdgeなどの対応ブラウザで試してください。",
    );
  }

  const bitmap = await createImageBitmap(file);
  try {
    const results = await new Detector({ formats: ["qr_code"] }).detect(bitmap);
    const values = results.map((result) => result.rawValue).filter(Boolean) as string[];
    if (values.length === 0)
      throw new Error("画像からQRコードを見つけられませんでした。");
    return values;
  } finally {
    bitmap.close();
  }
}

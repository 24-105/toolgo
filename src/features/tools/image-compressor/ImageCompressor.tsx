"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@/components/ui";
import type { ToolComponentProps } from "../types";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_DIMENSION = 4_096;

export function ImageCompressor({}: ToolComponentProps) {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState("0.8");
  const [outputUrl, setOutputUrl] = useState("");
  const [outputSize, setOutputSize] = useState(0);
  const [error, setError] = useState("");
  useEffect(() => {
    return () => {
      if (outputUrl) URL.revokeObjectURL(outputUrl);
    };
  }, [outputUrl]);

  function compress() {
    if (!file) {
      setError("画像ファイルを選択してください。");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("画像ファイルを選択してください。");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("画像ファイルは10MB以下にしてください。");
      return;
    }
    const parsedQuality = Number(quality);
    if (!Number.isFinite(parsedQuality) || parsedQuality < 0.1 || parsedQuality > 1) {
      setError("画質は0.1〜1.0の範囲で指定してください。");
      return;
    }
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      if (image.naturalWidth > MAX_DIMENSION || image.naturalHeight > MAX_DIMENSION) {
        URL.revokeObjectURL(url);
        setError(
          `画像の縦横は${MAX_DIMENSION.toLocaleString("ja-JP")}px以内にしてください。`,
        );
        return;
      }
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext("2d");
      if (!context) {
        URL.revokeObjectURL(url);
        setError("画像を処理できませんでした。");
        return;
      }
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          if (!blob) {
            setError("画像を圧縮できませんでした。");
            return;
          }
          setOutputUrl(URL.createObjectURL(blob));
          setOutputSize(blob.size);
          setError("");
        },
        "image/jpeg",
        parsedQuality,
      );
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      setError("対応していない画像形式です。");
    };
    image.src = url;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>画像を圧縮</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="image-file">画像ファイル</Label>
          <Input
            id="image-file"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => {
              if (outputUrl) URL.revokeObjectURL(outputUrl);
              setFile(event.target.files?.[0] ?? null);
              setOutputUrl("");
              setOutputSize(0);
              setError("");
            }}
          />
        </div>
        <div className="max-w-xs space-y-2">
          <Label htmlFor="image-quality">画質（0.1〜1.0）</Label>
          <Input
            id="image-quality"
            type="number"
            min="0.1"
            max="1"
            step="0.1"
            value={quality}
            onChange={(event) => setQuality(event.target.value)}
          />
        </div>
        <Button onClick={compress}>圧縮する</Button>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        {outputUrl && (
          <div className="space-y-3">
            <p className="text-sm text-muted">
              圧縮後: {(outputSize / 1024).toFixed(1)}KB
            </p>
            <a
              className="text-link"
              href={outputUrl}
              download={`compressed-${file?.name ?? "image"}.jpg`}
            >
              圧縮した画像をダウンロード
            </a>
            {/* blob URLのプレビューはNext.jsの画像最適化対象外のため、標準要素を使います。 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={outputUrl}
              alt="圧縮後の画像"
              className="max-h-72 max-w-full rounded-md border border-border"
            />
          </div>
        )}
        <p className="text-sm leading-6 text-muted">
          JPEG・PNG・WebPに対応しています。10MB以下、縦横4,096px以内の画像をこのブラウザ内で処理します。元の画像は変更されません。透過部分は白になります。
        </p>
      </CardContent>
    </Card>
  );
}

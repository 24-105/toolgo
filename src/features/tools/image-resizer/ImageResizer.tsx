"use client";

import { useEffect, useRef, useState } from "react";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
} from "@/components/ui";
import type { ToolComponentProps } from "../types";
import {
  MAX_DIMENSION,
  MAX_FILE_SIZE,
  outputExtension,
  validateResizeInput,
  type ImageOutputType,
} from "./logic";

const outputOptions: Array<{ value: ImageOutputType; label: string }> = [
  { value: "image/jpeg", label: "JPEG" },
  { value: "image/png", label: "PNG" },
  { value: "image/webp", label: "WebP" },
];

export function ImageResizer({}: ToolComponentProps) {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [keepRatio, setKeepRatio] = useState(true);
  const [outputType, setOutputType] = useState<ImageOutputType>("image/jpeg");
  const [quality, setQuality] = useState("0.9");
  const [outputUrl, setOutputUrl] = useState("");
  const [outputSize, setOutputSize] = useState(0);
  const [error, setError] = useState("");
  const operationRef = useRef(0);

  useEffect(() => {
    return () => {
      operationRef.current += 1;
      if (outputUrl) URL.revokeObjectURL(outputUrl);
    };
  }, [outputUrl]);

  function selectFile(nextFile: File | null) {
    operationRef.current += 1;
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    setFile(nextFile);
    setOutputUrl("");
    setOutputSize(0);
    setError("");

    if (!nextFile || !nextFile.type.startsWith("image/")) {
      setWidth("");
      setHeight("");
      if (nextFile) setError("画像ファイルを選択してください。");
      return;
    }
    const url = URL.createObjectURL(nextFile);
    const operation = operationRef.current;
    const image = new Image();
    image.onload = () => {
      if (operation !== operationRef.current) {
        URL.revokeObjectURL(url);
        return;
      }
      setWidth(String(image.naturalWidth));
      setHeight(String(image.naturalHeight));
      URL.revokeObjectURL(url);
    };
    image.onerror = () => {
      if (operation !== operationRef.current) {
        URL.revokeObjectURL(url);
        return;
      }
      setError("画像の大きさを読み取れませんでした。");
      URL.revokeObjectURL(url);
    };
    image.src = url;
  }

  function updateWidth(value: string) {
    setWidth(value);
    if (!keepRatio || !file) return;
    const currentWidth = Number(width);
    const currentHeight = Number(height);
    const nextWidth = Number(value);
    if (currentWidth > 0 && currentHeight > 0 && nextWidth > 0) {
      setHeight(
        String(Math.max(1, Math.round((nextWidth / currentWidth) * currentHeight))),
      );
    }
  }

  function updateHeight(value: string) {
    setHeight(value);
    if (!keepRatio || !file) return;
    const currentWidth = Number(width);
    const currentHeight = Number(height);
    const nextHeight = Number(value);
    if (currentWidth > 0 && currentHeight > 0 && nextHeight > 0) {
      setWidth(
        String(Math.max(1, Math.round((nextHeight / currentHeight) * currentWidth))),
      );
    }
  }

  function resize() {
    if (!file) {
      setError("画像ファイルを選択してください。");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("画像ファイルは20MB以下にしてください。");
      return;
    }
    const nextWidth = Number(width);
    const nextHeight = Number(height);
    try {
      validateResizeInput(nextWidth, nextHeight);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "幅と高さを確認してください。");
      return;
    }
    const parsedQuality = Number(quality);
    if (!Number.isFinite(parsedQuality) || parsedQuality < 0.1 || parsedQuality > 1) {
      setError("画質は0.1〜1.0の範囲で指定してください。");
      return;
    }

    const operation = ++operationRef.current;
    const sourceUrl = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      if (operation !== operationRef.current) {
        URL.revokeObjectURL(sourceUrl);
        return;
      }
      const canvas = document.createElement("canvas");
      canvas.width = nextWidth;
      canvas.height = nextHeight;
      const context = canvas.getContext("2d");
      if (!context) {
        URL.revokeObjectURL(sourceUrl);
        setError("画像を処理できませんでした。");
        return;
      }
      if (outputType === "image/jpeg") {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, nextWidth, nextHeight);
      }
      context.drawImage(image, 0, 0, nextWidth, nextHeight);
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(sourceUrl);
          if (operation !== operationRef.current) return;
          if (!blob) {
            setError("画像を変換できませんでした。");
            return;
          }
          if (outputUrl) URL.revokeObjectURL(outputUrl);
          setOutputUrl(URL.createObjectURL(blob));
          setOutputSize(blob.size);
          setError("");
        },
        outputType,
        outputType === "image/png" ? undefined : parsedQuality,
      );
    };
    image.onerror = () => {
      URL.revokeObjectURL(sourceUrl);
      if (operation !== operationRef.current) return;
      setError("対応していない画像形式です。");
    };
    image.src = sourceUrl;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>画像のサイズを変更</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="resize-file">画像ファイル</Label>
          <Input
            id="resize-file"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => selectFile(event.target.files?.[0] ?? null)}
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="resize-width">幅（px）</Label>
            <Input
              id="resize-width"
              type="number"
              min="1"
              max={MAX_DIMENSION}
              value={width}
              onChange={(event) => updateWidth(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="resize-height">高さ（px）</Label>
            <Input
              id="resize-height"
              type="number"
              min="1"
              max={MAX_DIMENSION}
              value={height}
              onChange={(event) => updateHeight(event.target.value)}
            />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input
            type="checkbox"
            checked={keepRatio}
            onChange={(event) => setKeepRatio(event.target.checked)}
          />
          縦横比を維持する
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-semibold">
            <span className="tool-editor-field-label">保存形式</span>
            <Select
              value={outputType}
              onChange={(event) => setOutputType(event.target.value as ImageOutputType)}
            >
              {outputOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </label>
          <label className="space-y-2 text-sm font-semibold">
            <span className="tool-editor-field-label">画質（0.1〜1.0）</span>
            <Input
              id="resize-quality"
              type="number"
              min="0.1"
              max="1"
              step="0.1"
              value={quality}
              onChange={(event) => setQuality(event.target.value)}
            />
          </label>
        </div>
        <Button onClick={resize}>サイズを変更する</Button>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        {outputUrl && (
          <div className="space-y-3">
            <p className="text-sm text-muted">
              変換後: {(outputSize / 1024).toFixed(1)}KB
            </p>
            <a
              className="text-link"
              href={outputUrl}
              download={`resized-${file?.name.replace(/\.[^.]+$/, "") ?? "image"}.${outputExtension(outputType)}`}
            >
              変換した画像をダウンロード
            </a>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={outputUrl}
              alt="サイズ変更後の画像"
              className="max-h-72 max-w-full rounded-md border border-border"
            />
          </div>
        )}
        <p className="text-sm leading-6 text-muted">
          JPEG・PNG・WebPに対応しています。20MB以下、縦横
          {MAX_DIMENSION.toLocaleString("ja-JP")}
          px以内の画像をこのブラウザ内で処理します。
        </p>
      </CardContent>
    </Card>
  );
}

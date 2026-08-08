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
  Select,
} from "@/components/ui";
import type { ToolComponentProps } from "../types";
import {
  buildPrintSvg,
  MAX_FILE_SIZE,
  MAX_PHOTOS,
  PHOTO_COUNTS,
  PRINT_SIZES,
  type PrintPhoto,
  type PrintSizeKey,
} from "./logic";

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("画像を読み込めませんでした。"));
    reader.readAsDataURL(file);
  });
}

function readImageSize(dataUrl: string) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const image = new Image();
    image.onload = () =>
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => reject(new Error("画像の大きさを読み取れませんでした。"));
    image.src = dataUrl;
  });
}

async function readPhoto(file: File): Promise<PrintPhoto> {
  if (!file.type.match(/^image\/(jpeg|png|webp)$/u)) {
    throw new Error("JPEG、PNG、WebPの画像を選択してください。");
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("1枚あたりの画像は20MB以下にしてください。");
  }
  const dataUrl = await readFileAsDataUrl(file);
  const size = await readImageSize(dataUrl);
  return { name: file.name, dataUrl, ...size };
}

export function PhotoPrintLayout({}: ToolComponentProps) {
  const [photos, setPhotos] = useState<PrintPhoto[]>([]);
  const [sizeKey, setSizeKey] = useState<PrintSizeKey>("a4-portrait");
  const [photosPerPage, setPhotosPerPage] = useState("4");
  const [outputUrl, setOutputUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (outputUrl) URL.revokeObjectURL(outputUrl);
    };
  }, [outputUrl]);

  async function selectPhotos(files: FileList | null) {
    setOutputUrl("");
    setError("");
    const selected = Array.from(files ?? []);
    if (selected.length === 0) {
      setPhotos([]);
      return;
    }
    if (selected.length > MAX_PHOTOS) {
      setPhotos([]);
      setError(`画像は${MAX_PHOTOS}枚まで選択してください。`);
      return;
    }
    try {
      setPhotos(await Promise.all(selected.map(readPhoto)));
    } catch (cause) {
      setPhotos([]);
      setError(cause instanceof Error ? cause.message : "画像を読み込めませんでした。");
    }
  }

  function changeSize(nextSizeKey: PrintSizeKey) {
    setSizeKey(nextSizeKey);
    setOutputUrl("");
  }

  function changePhotosPerPage(value: string) {
    setPhotosPerPage(value);
    setOutputUrl("");
  }

  function createLayout() {
    if (photos.length === 0) {
      setError("画像を1枚以上選択してください。");
      return;
    }
    try {
      const svg = buildPrintSvg(photos, sizeKey, Number(photosPerPage));
      if (outputUrl) URL.revokeObjectURL(outputUrl);
      setOutputUrl(URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" })));
      setError("");
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "レイアウトを作成できませんでした。",
      );
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>写真を印刷用に配置</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="photo-print-files">画像ファイル（最大18枚）</Label>
          <Input
            id="photo-print-files"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={(event) => void selectPhotos(event.target.files)}
          />
          <p className="text-xs text-muted">
            画像は外部へ送信せず、このブラウザ内で処理します。
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-2 text-sm font-semibold">
            <span className="tool-editor-field-label">用紙サイズ</span>
            <Select
              value={sizeKey}
              onChange={(event) => changeSize(event.target.value as PrintSizeKey)}
            >
              {Object.entries(PRINT_SIZES).map(([key, size]) => (
                <option key={key} value={key}>
                  {size.label}
                </option>
              ))}
            </Select>
          </label>
          <label className="block space-y-2 text-sm font-semibold">
            <span className="tool-editor-field-label">1ページに配置する枚数</span>
            <Select
              value={photosPerPage}
              onChange={(event) => changePhotosPerPage(event.target.value)}
            >
              {PHOTO_COUNTS.map((count) => (
                <option key={count} value={count}>
                  {count}枚
                </option>
              ))}
            </Select>
          </label>
        </div>
        <Button onClick={createLayout}>印刷レイアウトを作成する</Button>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        {outputUrl && (
          <div className="space-y-3">
            <div className="space-y-1 text-sm text-muted">
              <p>
                {photos.length}枚を{PRINT_SIZES[sizeKey].label}
                に配置しました。画像は中央で切り抜いて枠に合わせています。
              </p>
              <p>
                用紙サイズ：横{PRINT_SIZES[sizeKey].widthMm}mm × 縦
                {PRINT_SIZES[sizeKey].heightMm}mm
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a className="text-link" href={outputUrl} download="photo-print-layout.svg">
                SVGをダウンロード
              </a>
              <a className="text-link" href={outputUrl} target="_blank" rel="noreferrer">
                印刷用画像を開く
              </a>
            </div>
            <div className="overflow-x-auto rounded-md border border-border bg-surface-muted p-3">
              <div className="relative mx-auto w-fit max-w-full pt-7">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-1 flex items-center gap-2 text-xs text-muted"
                >
                  <span className="h-px flex-1 bg-border" />
                  <span className="shrink-0">
                    用紙の横幅 {PRINT_SIZES[sizeKey].widthMm}mm
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={outputUrl}
                  alt="作成した写真印刷レイアウト"
                  className="mx-auto block h-auto max-h-[36rem] max-w-full rounded-md border border-border bg-white"
                />
              </div>
            </div>
            <p className="text-xs text-muted">
              白い範囲が印刷される用紙です。画面上の周囲の余白はプレビュー用で、SVGには含まれません。
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

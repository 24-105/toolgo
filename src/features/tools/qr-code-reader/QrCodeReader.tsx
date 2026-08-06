"use client";

import { useState } from "react";

import { CopyButton } from "@/components/tools";
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
import { readQrCode } from "./logic";

export function QrCodeReader({}: ToolComponentProps) {
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState("");

  async function read() {
    if (!file) {
      setError("QRコードを含む画像を選択してください。");
      return;
    }
    try {
      setResults(await readQrCode(file));
      setError("");
    } catch (cause) {
      setResults([]);
      setError(
        cause instanceof Error ? cause.message : "QRコードを読み取れませんでした。",
      );
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>画像からQRコードを読み取る</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="qr-reader-file">QRコードの画像</Label>
          <Input
            id="qr-reader-file"
            type="file"
            accept="image/*"
            onChange={(event) => {
              setFile(event.target.files?.[0] ?? null);
              setResults([]);
              setError("");
            }}
          />
        </div>
        <Button onClick={read}>読み取る</Button>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        {results.length > 0 && (
          <div className="space-y-3">
            {results.map((result, index) => (
              <div key={`${result}-${index}`} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">
                    読み取り結果{results.length > 1 ? ` ${index + 1}` : ""}
                  </p>
                  <CopyButton value={result} />
                </div>
                <p className="break-all rounded-md border border-border bg-surface-muted p-3 font-mono text-sm">
                  {result}
                </p>
              </div>
            ))}
          </div>
        )}
        <p className="text-sm leading-6 text-muted">
          画像の読み取りはブラウザ内で行います。カメラ撮影ではなく、保存済みの画像を選択する方式です。
        </p>
      </CardContent>
    </Card>
  );
}

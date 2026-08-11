"use client";

import QRCode from "qrcode";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Textarea,
} from "@/components/ui";
import type { ToolComponentProps } from "../types";
import { getQrCodeInputError } from "./logic";

export function QrCodeGenerator({}: ToolComponentProps) {
  const [input, setInput] = useState("");
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    if (!input || getQrCodeInputError(input)) {
      return () => {
        active = false;
      };
    }

    QRCode.toDataURL(input, { width: 320, margin: 2, errorCorrectionLevel: "M" })
      .then((url) => {
        if (active) {
          setDataUrl(url);
          setError("");
        }
      })
      .catch(() => {
        if (active) {
          setDataUrl("");
          setError("QRコードを生成できませんでした。入力内容を確認してください。");
        }
      });

    return () => {
      active = false;
    };
  }, [input]);

  function updateInput(value: string) {
    setInput(value);
    if (!value) {
      setDataUrl("");
      setError("");
    } else if (getQrCodeInputError(value)) {
      setDataUrl("");
      setError(getQrCodeInputError(value));
    } else {
      setError("");
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)]">
      <Card>
        <CardHeader className="tool-editor-card-header">
          <CardTitle className="tool-editor-card-title">内容を入力</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            aria-label="QRコードにする文字やURL"
            value={input}
            onChange={(event) => updateInput(event.target.value)}
            placeholder="文字やURLを入力してください"
            className="tool-editor-field resize-none"
          />
          <Button
            type="button"
            variant="ghost"
            onClick={() => updateInput("")}
            disabled={!input}
          >
            クリア
          </Button>
          {error && (
            <p role="alert" className="text-sm font-semibold text-danger">
              {error}
            </p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="tool-editor-card-header">
          <CardTitle className="tool-editor-card-title">プレビュー</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="tool-editor-field grid place-items-center overflow-auto rounded-md border border-border bg-white p-4">
            {dataUrl ? (
              <Image
                src={dataUrl}
                alt="入力内容から生成したQRコード"
                width={240}
                height={240}
                unoptimized
              />
            ) : (
              <p className="text-sm text-muted">入力するとここに表示されます。</p>
            )}
          </div>
          {dataUrl && (
            <a
              className="inline-flex min-h-10 items-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90"
              href={dataUrl}
              download="toolgo-qr-code.png"
            >
              PNGをダウンロード
            </a>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

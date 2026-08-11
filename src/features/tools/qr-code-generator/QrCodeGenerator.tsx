"use client";

import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";

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
  const [outputUrl, setOutputUrl] = useState("");
  const [error, setError] = useState("");
  const outputUrlRef = useRef("");

  useEffect(() => {
    let active = true;

    if (outputUrlRef.current) {
      URL.revokeObjectURL(outputUrlRef.current);
      outputUrlRef.current = "";
    }

    if (!input || getQrCodeInputError(input)) {
      return () => {
        active = false;
        if (outputUrlRef.current) {
          URL.revokeObjectURL(outputUrlRef.current);
          outputUrlRef.current = "";
        }
      };
    }

    const canvas = document.createElement("canvas");

    QRCode.toCanvas(canvas, input, { width: 320, margin: 2, errorCorrectionLevel: "M" })
      .then(
        () =>
          new Promise<Blob>((resolve, reject) => {
            canvas.toBlob((blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error("QRコードを画像に変換できませんでした。"));
              }
            }, "image/png");
          }),
      )
      .then((blob) => {
        if (!active) return;
        const nextUrl = URL.createObjectURL(blob);
        outputUrlRef.current = nextUrl;
        setOutputUrl(nextUrl);
        setError("");
      })
      .catch(() => {
        if (active) {
          setError("QRコードを生成できませんでした。入力内容を確認してください。");
        }
      });

    return () => {
      active = false;
      if (outputUrlRef.current) {
        URL.revokeObjectURL(outputUrlRef.current);
        outputUrlRef.current = "";
      }
    };
  }, [input]);

  function clearOutputUrl() {
    if (outputUrlRef.current) {
      URL.revokeObjectURL(outputUrlRef.current);
      outputUrlRef.current = "";
    }
    setOutputUrl("");
  }

  function updateInput(value: string) {
    clearOutputUrl();
    setInput(value);
    if (!value) {
      setError("");
    } else if (getQrCodeInputError(value)) {
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
            {outputUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={outputUrl}
                alt="入力内容から生成したQRコード"
                width={240}
                height={240}
                className="h-auto w-60 max-w-full"
              />
            ) : (
              <p className="text-sm text-muted">入力するとここに表示されます。</p>
            )}
          </div>
          {outputUrl && (
            <a
              className="inline-flex min-h-10 items-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90"
              href={outputUrl}
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

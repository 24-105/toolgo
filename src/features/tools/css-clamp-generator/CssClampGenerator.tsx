"use client";

import { useState, type CSSProperties } from "react";
import { CopyButton } from "@/components/tools";
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
import { createClamp, type ClampUnit, type ClampResult } from "./logic";

const PROPERTY_OPTIONS = [
  { value: "font-size", label: "font-size（文字サイズ）" },
  { value: "padding", label: "padding（内側の余白）" },
  { value: "margin", label: "margin（外側の余白）" },
  { value: "gap", label: "gap（要素間の余白）" },
  { value: "line-height", label: "line-height（行の高さ）" },
] as const;

export function CssClampGenerator({}: ToolComponentProps) {
  const [property, setProperty] = useState("font-size");
  const [unit, setUnit] = useState<ClampUnit>("px");
  const [minViewport, setMinViewport] = useState("320");
  const [maxViewport, setMaxViewport] = useState("1440");
  const [minValue, setMinValue] = useState("16");
  const [maxValue, setMaxValue] = useState("24");
  const [result, setResult] = useState<ClampResult | null>(null);
  const [error, setError] = useState("");

  function generate() {
    try {
      setResult(
        createClamp({
          minViewport: Number(minViewport),
          maxViewport: Number(maxViewport),
          minValue: Number(minValue),
          maxValue: Number(maxValue),
          unit,
        }),
      );
      setError("");
    } catch (cause) {
      setResult(null);
      setError(cause instanceof Error ? cause.message : "CSSを生成できませんでした。");
    }
  }

  const previewStyle: CSSProperties = result
    ? property === "font-size"
      ? { fontSize: result.value }
      : property === "padding"
        ? { padding: result.value }
        : property === "margin"
          ? { margin: result.value }
          : { fontSize: "1.25rem" }
    : {};

  return (
    <Card>
      <CardHeader>
        <CardTitle>CSSのclamp()を生成</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-semibold">
            <span className="tool-editor-field-label">CSSプロパティ</span>
            <Select
              value={property}
              onChange={(event) => setProperty(event.target.value)}
            >
              {PROPERTY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </label>
          <label className="space-y-2 text-sm font-semibold">
            <span className="tool-editor-field-label">値の単位</span>
            <Select
              value={unit}
              onChange={(event) => setUnit(event.target.value as ClampUnit)}
            >
              <option value="px">px</option>
              <option value="rem">rem</option>
            </Select>
          </label>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="clamp-min-viewport">最小画面幅（px）</Label>
            <Input
              id="clamp-min-viewport"
              type="number"
              min="1"
              value={minViewport}
              onChange={(event) => setMinViewport(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clamp-max-viewport">最大画面幅（px）</Label>
            <Input
              id="clamp-max-viewport"
              type="number"
              min="1"
              value={maxViewport}
              onChange={(event) => setMaxViewport(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clamp-min-value">最小値（{unit}）</Label>
            <Input
              id="clamp-min-value"
              type="number"
              min="0"
              step="0.01"
              value={minValue}
              onChange={(event) => setMinValue(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clamp-max-value">最大値（{unit}）</Label>
            <Input
              id="clamp-max-value"
              type="number"
              min="0"
              step="0.01"
              value={maxValue}
              onChange={(event) => setMaxValue(event.target.value)}
            />
          </div>
        </div>
        <Button onClick={generate}>CSSを生成する</Button>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        {result && (
          <div className="space-y-4" aria-live="polite">
            <div className="space-y-2 rounded-md border border-border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold">生成したCSS</p>
                <CopyButton value={`${property}: ${result.css};`} />
              </div>
              <code className="block overflow-x-auto rounded bg-surface-muted p-3 text-sm">
                {property}: {result.css};
              </code>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold">プレビュー</p>
              <div className="overflow-hidden rounded-md border border-border p-4">
                <p style={previewStyle}>画面幅に合わせて変化するサンプル</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

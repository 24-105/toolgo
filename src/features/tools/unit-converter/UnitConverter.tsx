"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
} from "@/components/ui";
import type { ToolComponentProps } from "../types";
import { convertUnit, type UnitCategory } from "./logic";

const units: Record<UnitCategory, { value: string; label: string }[]> = {
  length: [
    { value: "mm", label: "ミリメートル" },
    { value: "cm", label: "センチメートル" },
    { value: "m", label: "メートル" },
    { value: "km", label: "キロメートル" },
  ],
  weight: [
    { value: "g", label: "グラム" },
    { value: "kg", label: "キログラム" },
  ],
  temperature: [
    { value: "c", label: "摂氏（℃）" },
    { value: "f", label: "華氏（℉）" },
  ],
  volume: [
    { value: "ml", label: "ミリリットル" },
    { value: "l", label: "リットル" },
  ],
};

export function UnitConverter({}: ToolComponentProps) {
  const [category, setCategory] = useState<UnitCategory>("length");
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("km");
  const [error, setError] = useState("");
  const options = units[category];
  const result = useMemo(() => {
    try {
      return { value: convertUnit(Number(value), category, from, to), error: "" };
    } catch (cause) {
      return {
        value: undefined,
        error: cause instanceof Error ? cause.message : "単位を変換できませんでした。",
      };
    }
  }, [category, from, to, value]);
  function changeCategory(next: UnitCategory) {
    setCategory(next);
    setFrom(units[next][0].value);
    setTo(units[next][1]?.value ?? units[next][0].value);
    setError("");
  }
  const displayError = error || result.error;
  return (
    <Card>
      <CardHeader>
        <CardTitle>単位を変換</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <label className="block max-w-sm space-y-2 text-sm font-semibold">
          <span className="tool-editor-field-label">種類</span>
          <Select
            value={category}
            onChange={(event) => changeCategory(event.target.value as UnitCategory)}
          >
            <option value="length">長さ</option>
            <option value="weight">重さ</option>
            <option value="temperature">温度</option>
            <option value="volume">容量</option>
          </Select>
        </label>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="unit-value">数値</Label>
            <Input
              id="unit-value"
              type="number"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </div>
          <label className="space-y-2 text-sm font-semibold">
            <span className="tool-editor-field-label">変換前</span>
            <Select value={from} onChange={(event) => setFrom(event.target.value)}>
              {options.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </Select>
          </label>
          <label className="space-y-2 text-sm font-semibold">
            <span className="tool-editor-field-label">変換後</span>
            <Select value={to} onChange={(event) => setTo(event.target.value)}>
              {options.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </Select>
          </label>
        </div>
        {displayError && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {displayError}
          </p>
        )}
        {result.value !== undefined && !displayError && (
          <p
            className="rounded-md border border-border bg-surface-muted p-4 text-lg font-semibold"
            aria-live="polite"
          >
            {Number(value).toLocaleString("ja-JP")} {from} ={" "}
            {result.value.toLocaleString("ja-JP", { maximumFractionDigits: 6 })} {to}
          </p>
        )}
        <p className="text-sm leading-6 text-muted">
          入力した数値はこのブラウザ内で変換します。単位の定義や表示は一般的な換算方法に基づいています。
        </p>
      </CardContent>
    </Card>
  );
}

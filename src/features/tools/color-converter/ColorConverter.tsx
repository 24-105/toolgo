"use client";

import { useState } from "react";
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
import { convertColor, type ColorValues } from "./logic";

export function ColorConverter({}: ToolComponentProps) {
  const [input, setInput] = useState("#149eca");
  const [output, setOutput] = useState<ColorValues | null>(null);
  const [error, setError] = useState("");
  function run() {
    try {
      setOutput(convertColor(input));
      setError("");
    } catch (cause) {
      setOutput(null);
      setError(cause instanceof Error ? cause.message : "色を変換できませんでした。");
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>カラーコードを変換</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-w-md space-y-2">
          <Label htmlFor="color-input">HEX、RGBまたはHSL</Label>
          <Input
            id="color-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="#149eca、rgb(20, 158, 202) または hsl(193, 82%, 44%)"
          />
        </div>
        <Button onClick={run}>変換する</Button>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        {output && (
          <dl className="grid gap-3 sm:grid-cols-3">
            {Object.entries(output).map(([key, value]) => (
              <div
                key={key}
                className="rounded-md border border-border bg-surface-muted p-3"
              >
                <dt className="text-xs text-muted">{key.toUpperCase()}</dt>
                <dd className="mt-1 break-all font-mono text-sm">{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </CardContent>
    </Card>
  );
}

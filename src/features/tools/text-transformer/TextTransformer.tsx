"use client";

import { useState } from "react";

import { CopyButton } from "@/components/tools";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  Select,
  Textarea,
} from "@/components/ui";
import type { ToolComponentProps } from "../types";
import { transformText, type TextTransform } from "./logic";

const transformOptions: Array<{ value: TextTransform; label: string }> = [
  { value: "full-to-half", label: "全角を半角へ変換" },
  { value: "half-to-full", label: "半角を全角へ変換" },
  { value: "upper", label: "英字を大文字へ変換" },
  { value: "lower", label: "英字を小文字へ変換" },
  { value: "trim-lines", label: "各行の前後の空白を削除" },
  { value: "remove-line-breaks", label: "改行を空白に変換" },
];

export function TextTransformer({}: ToolComponentProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [transform, setTransform] = useState<TextTransform>("full-to-half");

  function run() {
    setOutput(transformText(input, transform));
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader className="tool-editor-card-header">
          <CardTitle className="tool-editor-card-title">変換する文章</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="tool-editor-field-label" htmlFor="text-transform-input">
              入力
            </Label>
            <Textarea
              id="text-transform-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="変換する文章を入力してください"
              className="tool-editor-field resize-none"
            />
          </div>
          <label className="block space-y-2 text-sm font-semibold">
            <span className="tool-editor-field-label">変換方法</span>
            <Select
              value={transform}
              onChange={(event) => setTransform(event.target.value as TextTransform)}
            >
              {transformOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </label>
          <div className="flex flex-wrap gap-2">
            <Button onClick={run}>変換する</Button>
            <Button
              variant="ghost"
              onClick={() => {
                setInput("");
                setOutput("");
              }}
            >
              クリア
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="tool-editor-card-header">
          <CardTitle className="tool-editor-card-title">変換結果</CardTitle>
          <CopyButton value={output} />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="tool-editor-field-label text-sm font-semibold text-foreground">
              変換結果
            </p>
            <Textarea
              aria-label="文字変換の結果"
              readOnly
              value={output}
              placeholder="ここに変換結果が表示されます"
              className="tool-editor-field resize-none"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

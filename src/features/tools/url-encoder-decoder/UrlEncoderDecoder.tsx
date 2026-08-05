"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Select,
  Textarea,
} from "@/components/ui";
import type { ToolComponentProps } from "../types";
import { decodeUrl, encodeUrl, type UrlEncodeMode } from "./logic";

export function UrlEncoderDecoder({}: ToolComponentProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<UrlEncodeMode>("url");
  function run(action: "encode" | "decode") {
    try {
      setOutput(action === "encode" ? encodeUrl(input, mode) : decodeUrl(input, mode));
      setError("");
    } catch {
      setOutput("");
      setError("URLとして解釈できない文字列です。入力内容を確認してください。");
    }
  }
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader className="tool-editor-card-header">
          <CardTitle>入力</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            aria-label="URLまたは文字列"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="https://example.com/検索"
            className="h-72 min-h-72 resize-none"
            spellCheck={false}
          />
          <label className="block max-w-md space-y-2 text-sm font-semibold">
            <span className="block">変換する範囲</span>
            <Select
              value={mode}
              onChange={(event) => setMode(event.target.value as UrlEncodeMode)}
            >
              <option value="url">URL全体（https://や/を保持）</option>
              <option value="component">URLの一部（検索語・パラメーター）</option>
            </Select>
          </label>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => run("encode")}>エンコード</Button>
            <Button variant="secondary" onClick={() => run("decode")}>
              デコード
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setInput("");
                setOutput("");
                setError("");
              }}
            >
              クリア
            </Button>
          </div>
          {error && (
            <p role="alert" className="text-sm font-semibold text-danger">
              {error}
            </p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="tool-editor-card-header">
          <CardTitle>結果</CardTitle>
          <CopyButton value={output} />
        </CardHeader>
        <CardContent>
          <Textarea
            aria-label="変換結果"
            readOnly
            value={output}
            placeholder="ここに結果が表示されます"
            className="h-72 min-h-72 resize-none font-mono text-sm"
          />
        </CardContent>
      </Card>
    </div>
  );
}

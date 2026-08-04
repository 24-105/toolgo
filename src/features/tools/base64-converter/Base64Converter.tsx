"use client";

import { useState } from "react";
import { CopyButton } from "@/components/tools";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Textarea,
} from "@/components/ui";
import type { ToolComponentProps } from "../types";
import { decodeBase64, encodeBase64 } from "./logic";

export function Base64Converter({}: ToolComponentProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  function run(action: "encode" | "decode") {
    try {
      setOutput(action === "encode" ? encodeBase64(input) : decodeBase64(input));
      setError("");
    } catch {
      setOutput("");
      setError("Base64として解釈できません。入力内容を確認してください。");
    }
  }
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>入力</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            aria-label="変換する文字列"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="ここに文字列を入力してください"
            className="min-h-56"
          />
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => run("encode")}>Base64に変換</Button>
            <Button variant="secondary" onClick={() => run("decode")}>
              Base64から戻す
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
        <CardHeader className="flex flex-row items-center justify-between gap-3">
          <CardTitle>結果</CardTitle>
          <CopyButton value={output} />
        </CardHeader>
        <CardContent>
          <Textarea
            aria-label="変換結果"
            readOnly
            value={output}
            placeholder="ここに結果が表示されます"
            className="min-h-56 font-mono text-sm"
          />
        </CardContent>
      </Card>
    </div>
  );
}

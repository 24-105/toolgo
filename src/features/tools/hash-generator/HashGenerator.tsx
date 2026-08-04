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
import { createHash } from "./logic";

export function HashGenerator({}: ToolComponentProps) {
  const [input, setInput] = useState("");
  const [algorithm, setAlgorithm] = useState<"SHA-256" | "SHA-512">("SHA-256");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  async function run() {
    try {
      setOutput(await createHash(input, algorithm));
      setError("");
    } catch {
      setOutput("");
      setError("ハッシュを生成できませんでした。");
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>ハッシュを生成</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          aria-label="ハッシュ化する文字列"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="ここに文字列を入力してください"
          className="min-h-40"
        />
        <label className="block max-w-xs space-y-2 text-sm font-semibold">
          <span>アルゴリズム</span>
          <Select
            value={algorithm}
            onChange={(event) =>
              setAlgorithm(event.target.value as "SHA-256" | "SHA-512")
            }
          >
            <option>SHA-256</option>
            <option>SHA-512</option>
          </Select>
        </label>
        <div className="flex flex-wrap gap-2">
          <Button onClick={run}>生成する</Button>
          <CopyButton value={output} />
        </div>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        <Textarea
          aria-label="ハッシュの生成結果"
          readOnly
          value={output}
          placeholder="ここに結果が表示されます"
          className="min-h-28 font-mono text-sm"
        />
      </CardContent>
    </Card>
  );
}

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
  Textarea,
} from "@/components/ui";
import type { ToolComponentProps } from "../types";
import { generateUuidList } from "./logic";

export function UuidGenerator({}: ToolComponentProps) {
  const [count, setCount] = useState("5");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  function generate() {
    try {
      setOutput(generateUuidList(Number(count)));
      setError("");
    } catch (cause) {
      setOutput("");
      setError(cause instanceof Error ? cause.message : "UUIDを生成できませんでした。");
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>UUIDを生成</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-w-xs space-y-2">
          <Label htmlFor="uuid-count">生成する個数（1〜100）</Label>
          <Input
            id="uuid-count"
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(event) => setCount(event.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={generate}>生成する</Button>
          <CopyButton value={output} />
        </div>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        <Textarea
          aria-label="UUIDの生成結果"
          readOnly
          value={output}
          placeholder="ここにUUIDが表示されます"
          className="min-h-64 font-mono text-sm"
        />
      </CardContent>
    </Card>
  );
}

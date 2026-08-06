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
import { formatJson, minifyJson } from "./logic";

const initialJson = '{\n  "name": "ToolGo",\n  "free": true\n}';

export function JsonFormatter({}: ToolComponentProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState("2");

  function run(action: "format" | "minify") {
    const result =
      action === "format" ? formatJson(input, Number(indent)) : minifyJson(input);

    if (result.ok) {
      setOutput(result.value);
      setError("");
    } else {
      setOutput("");
      setError(result.message);
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader className="tool-editor-card-header">
          <CardTitle className="tool-editor-card-title">入力</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="tool-editor-field-label" htmlFor="json-input">
              JSON文字列
            </Label>
            <Textarea
              id="json-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={initialJson}
              className="tool-editor-field resize-none font-mono text-sm"
              spellCheck={false}
            />
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <label className="space-y-2 text-sm font-semibold">
              <span className="tool-editor-field-label">インデント</span>
              <Select value={indent} onChange={(event) => setIndent(event.target.value)}>
                <option value="2">2スペース</option>
                <option value="4">4スペース</option>
              </Select>
            </label>
            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={() => run("format")}>
                整形する
              </Button>
              <Button type="button" variant="secondary" onClick={() => run("minify")}>
                圧縮する
              </Button>
              <Button
                type="button"
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
          </div>
          {error && (
            <p
              role="alert"
              className="whitespace-pre-line text-sm font-semibold text-danger"
            >
              {error}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="tool-editor-card-header">
          <CardTitle className="tool-editor-card-title">結果</CardTitle>
          <CopyButton value={output} />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="tool-editor-field-label text-sm font-semibold text-foreground">
              JSON結果
            </p>
            <pre className="tool-editor-field overflow-auto rounded-md border border-border bg-surface-muted p-4 font-mono text-sm leading-6">
              {output || "ここに結果が表示されます。"}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

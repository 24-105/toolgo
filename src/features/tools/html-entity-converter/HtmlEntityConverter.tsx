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
import { convertHtmlEntities, type HtmlEntityMode } from "./logic";

export function HtmlEntityConverter({}: ToolComponentProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<HtmlEntityMode>("encode");

  function convert() {
    setOutput(convertHtmlEntities(input, mode));
  }

  function clear() {
    setInput("");
    setOutput("");
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader className="tool-editor-card-header">
          <CardTitle className="tool-editor-card-title">変換する文字列</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            aria-label="HTMLエンティティ変換の入力"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={'例：<p class="title">& hello</p>'}
            className="tool-editor-field min-h-56 resize-y font-mono text-sm"
            spellCheck={false}
          />
          <label className="block max-w-md space-y-2 text-sm font-semibold">
            <span>変換方法</span>
            <Select
              value={mode}
              onChange={(event) => setMode(event.target.value as HtmlEntityMode)}
            >
              <option value="encode">HTMLエンティティへ変換</option>
              <option value="decode">HTMLエンティティから戻す</option>
            </Select>
          </label>
          <div className="flex flex-wrap gap-2">
            <Button onClick={convert}>変換する</Button>
            <Button variant="ghost" onClick={clear}>
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
          <Textarea
            aria-label="HTMLエンティティ変換の結果"
            readOnly
            value={output}
            placeholder="ここに変換結果が表示されます"
            className="tool-editor-field min-h-56 resize-y font-mono text-sm"
            spellCheck={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}

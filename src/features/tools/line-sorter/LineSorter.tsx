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
import { sortAndDeduplicateLines, type LineSortOrder } from "./logic";

export function LineSorter({}: ToolComponentProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [order, setOrder] = useState<LineSortOrder>("ascending");
  const [removeEmptyLines, setRemoveEmptyLines] = useState(false);
  const [removeDuplicates, setRemoveDuplicates] = useState(true);

  function sort() {
    setOutput(
      sortAndDeduplicateLines(input, { order, removeEmptyLines, removeDuplicates }),
    );
  }

  function clear() {
    setInput("");
    setOutput("");
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader className="tool-editor-card-header">
          <CardTitle className="tool-editor-card-title">並べ替える行</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            aria-label="並べ替える行の入力"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={"例：\napple\nbanana\napple"}
            className="tool-editor-field min-h-56 resize-y font-mono text-sm"
            spellCheck={false}
          />
          <label className="block max-w-md space-y-2 text-sm font-semibold">
            <span>並べ替え順</span>
            <Select
              value={order}
              onChange={(event) => setOrder(event.target.value as LineSortOrder)}
            >
              <option value="ascending">昇順（A→Z・小さい順）</option>
              <option value="descending">降順（Z→A・大きい順）</option>
            </Select>
          </label>
          <div className="space-y-3 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={removeDuplicates}
                onChange={(event) => setRemoveDuplicates(event.target.checked)}
              />
              重複する行を削除する
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={removeEmptyLines}
                onChange={(event) => setRemoveEmptyLines(event.target.checked)}
              />
              空行を削除する
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={sort}>並べ替える</Button>
            <Button variant="ghost" onClick={clear}>
              クリア
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="tool-editor-card-header">
          <CardTitle className="tool-editor-card-title">処理結果</CardTitle>
          <CopyButton value={output} />
        </CardHeader>
        <CardContent>
          <Textarea
            aria-label="行の並べ替え結果"
            readOnly
            value={output}
            placeholder="ここに処理結果が表示されます"
            className="tool-editor-field min-h-56 resize-y font-mono text-sm"
            spellCheck={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}

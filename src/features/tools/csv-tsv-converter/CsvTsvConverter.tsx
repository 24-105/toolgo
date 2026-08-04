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
import { parseDelimited, stringifyDelimited } from "./logic";

const TAB_DELIMITER = "\t";

export function CsvTsvConverter({}: ToolComponentProps) {
  const [input, setInput] = useState("");
  const [source, setSource] = useState<"," | "\t">(",");
  const [destination, setDestination] = useState<"," | "\t">("\t");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  function run() {
    try {
      setOutput(stringifyDelimited(parseDelimited(input, source), destination));
      setError("");
    } catch {
      setOutput("");
      setError("データを変換できませんでした。");
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>CSV・TSVを変換</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          aria-label="変換する表データ"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="ここにCSVまたはTSVを貼り付けてください"
          className="min-h-48 font-mono text-sm"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-semibold">
            <span className="block">入力形式</span>
            <Select
              value={source}
              onChange={(event) => setSource(event.target.value as "," | "\t")}
            >
              <option value=",">CSV（カンマ区切り）</option>
              <option value={TAB_DELIMITER}>TSV（タブ区切り）</option>
            </Select>
          </label>
          <label className="space-y-2 text-sm font-semibold">
            <span className="block">出力形式</span>
            <Select
              value={destination}
              onChange={(event) => setDestination(event.target.value as "," | "\t")}
            >
              <option value=",">CSV（カンマ区切り）</option>
              <option value={TAB_DELIMITER}>TSV（タブ区切り）</option>
            </Select>
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={run}>変換する</Button>
          <CopyButton value={output} />
        </div>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        <Textarea
          aria-label="変換結果"
          readOnly
          value={output}
          placeholder="ここに結果が表示されます"
          className="min-h-48 font-mono text-sm"
        />
      </CardContent>
    </Card>
  );
}

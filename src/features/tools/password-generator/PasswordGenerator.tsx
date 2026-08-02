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
} from "@/components/ui";
import type { ToolComponentProps } from "../types";
import { generatePassword, SYMBOL_CHARACTERS } from "./logic";

const choices = [
  ["uppercase", "大文字（A-Z）"],
  ["lowercase", "小文字（a-z）"],
  ["numbers", "数字（0-9）"],
  ["symbols", "記号"],
] as const;

export function PasswordGenerator({}: ToolComponentProps) {
  const [length, setLength] = useState("20");
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function generate() {
    try {
      setPassword(generatePassword({ length: Number(length), ...options }));
      setError("");
    } catch (cause) {
      setPassword("");
      setError(
        cause instanceof Error ? cause.message : "パスワードを生成できませんでした。",
      );
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>設定</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="max-w-xs space-y-2">
          <Label htmlFor="password-length">長さ</Label>
          <Input
            id="password-length"
            type="number"
            min="4"
            max="128"
            value={length}
            onChange={(event) => setLength(event.target.value)}
          />
        </div>
        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold">使う文字</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {choices.map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={options[key]}
                  onChange={(event) =>
                    setOptions({ ...options, [key]: event.target.checked })
                  }
                />
                {label}
              </label>
            ))}
          </div>
          <p className="text-sm leading-6 text-muted">
            記号にチェックを入れた場合は、次の記号を使います。
            <code className="mt-1 block break-all rounded-md bg-surface-muted px-2 py-1 font-mono text-xs">
              {SYMBOL_CHARACTERS}
            </code>
          </p>
        </fieldset>
        <div className="flex flex-wrap gap-2">
          <Button type="button" onClick={generate}>
            生成する
          </Button>
          <CopyButton value={password} />
        </div>
        {error && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {error}
          </p>
        )}
        <div className="space-y-2">
          <Label htmlFor="generated-password">生成結果</Label>
          <Input
            id="generated-password"
            readOnly
            value={password}
            placeholder="生成結果がここに表示されます"
            className="font-mono"
          />
        </div>
        <p className="text-sm leading-6 text-muted">
          暗号学的に安全な乱数を、このブラウザ内で使用しています。
        </p>
      </CardContent>
    </Card>
  );
}

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
import { scaleRecipe, type RecipeResult } from "./logic";

const sampleIngredients =
  "鶏もも肉, 300, g\nしょうゆ, 2, 大さじ\nみりん, 1, 大さじ\n砂糖, 1, 小さじ";

export function RecipePortionCalculator({}: ToolComponentProps) {
  const [originalServings, setOriginalServings] = useState("2");
  const [targetServings, setTargetServings] = useState("4");
  const [ingredients, setIngredients] = useState(sampleIngredients);
  const [result, setResult] = useState<RecipeResult>();
  const [error, setError] = useState("");

  function calculate() {
    try {
      setResult(
        scaleRecipe(ingredients, Number(originalServings), Number(targetServings)),
      );
      setError("");
    } catch (cause) {
      setResult(undefined);
      setError(
        cause instanceof Error ? cause.message : "料理の分量を換算できませんでした。",
      );
    }
  }

  const output = result?.lines.join("\n") ?? "";

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)]">
      <Card>
        <CardHeader>
          <CardTitle>レシピの分量を入力</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="recipe-original-servings">元の人数</Label>
              <Input
                id="recipe-original-servings"
                type="number"
                min="1"
                max="1000"
                step="1"
                value={originalServings}
                onChange={(event) => setOriginalServings(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipe-target-servings">作る人数</Label>
              <Input
                id="recipe-target-servings"
                type="number"
                min="1"
                max="1000"
                step="1"
                value={targetServings}
                onChange={(event) => setTargetServings(event.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipe-ingredients">材料</Label>
            <Textarea
              id="recipe-ingredients"
              aria-describedby="recipe-ingredients-help"
              value={ingredients}
              onChange={(event) => setIngredients(event.target.value)}
              placeholder={sampleIngredients}
              className="min-h-44 font-mono"
            />
            <p id="recipe-ingredients-help" className="text-sm leading-6 text-muted">
              1行に1材料ずつ「材料名, 分量,
              単位」で入力します。分量は数値または分数で入力してください。
            </p>
          </div>
          <Button onClick={calculate}>分量を換算する</Button>
          {error && (
            <p role="alert" className="text-sm font-semibold text-danger">
              {error}
            </p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex-row items-center justify-between gap-3">
          <CardTitle>換算結果</CardTitle>
          <CopyButton value={output} />
        </CardHeader>
        <CardContent>
          {result ? (
            <pre
              className="whitespace-pre-wrap rounded-md border border-border bg-surface-muted p-4 text-sm leading-7"
              aria-live="polite"
            >
              {output}
            </pre>
          ) : (
            <p className="text-sm leading-6 text-muted">換算結果がここに表示されます。</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

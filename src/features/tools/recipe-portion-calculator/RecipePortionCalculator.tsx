"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

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
import { scaleRecipe, type RecipeIngredient, type RecipeResult } from "./logic";

const initialIngredients: RecipeIngredient[] = [
  { name: "鶏もも肉", amount: "300", unit: "g" },
  { name: "しょうゆ", amount: "2", unit: "大さじ" },
  { name: "みりん", amount: "1", unit: "大さじ" },
  { name: "砂糖", amount: "1", unit: "小さじ" },
];

export function RecipePortionCalculator({}: ToolComponentProps) {
  const [originalServings, setOriginalServings] = useState("2");
  const [targetServings, setTargetServings] = useState("4");
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>(initialIngredients);
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

  function updateIngredient(index: number, field: keyof RecipeIngredient, value: string) {
    setIngredients((current) =>
      current.map((ingredient, ingredientIndex) =>
        ingredientIndex === index ? { ...ingredient, [field]: value } : ingredient,
      ),
    );
  }

  function addIngredient() {
    setIngredients((current) => [...current, { name: "", amount: "", unit: "" }]);
  }

  function removeIngredient(index: number) {
    setIngredients((current) =>
      current.length === 1
        ? current
        : current.filter((_, ingredientIndex) => ingredientIndex !== index),
    );
  }

  const output = result?.lines.join("\n") ?? "";

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)]">
      <Card>
        <CardHeader>
          <CardTitle>何人分にする？</CardTitle>
          <p className="text-sm leading-6 text-muted">
            レシピに書いてある人数と、作りたい人数を入力してください。
          </p>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="recipe-original-servings">レシピの人数</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="recipe-original-servings"
                  type="number"
                  min="1"
                  max="1000"
                  step="1"
                  value={originalServings}
                  onChange={(event) => setOriginalServings(event.target.value)}
                />
                <span className="shrink-0 text-sm text-muted">人分</span>
              </div>
              <p className="text-xs leading-5 text-muted">レシピに書いてある人数</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipe-target-servings">作りたい人数</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="recipe-target-servings"
                  type="number"
                  min="1"
                  max="1000"
                  step="1"
                  value={targetServings}
                  onChange={(event) => setTargetServings(event.target.value)}
                />
                <span className="shrink-0 text-sm text-muted">人分</span>
              </div>
              <p className="text-xs leading-5 text-muted">実際に作りたい人数</p>
            </div>
          </div>

          <div className="recipe-ingredients">
            <div className="recipe-ingredients-header">
              <div>
                <h3 className="text-sm font-semibold">材料</h3>
                <p className="mt-1 text-sm leading-6 text-muted">
                  材料名・分量・単位を、それぞれの欄に入力してください。
                </p>
              </div>
              <Button variant="secondary" size="sm" onClick={addIngredient}>
                <Plus size={16} aria-hidden="true" />
                材料を追加
              </Button>
            </div>

            <div className="recipe-ingredient-list">
              {ingredients.map((ingredient, index) => {
                const nameId = `recipe-ingredient-${index}-name`;
                const amountId = `recipe-ingredient-${index}-amount`;
                const unitId = `recipe-ingredient-${index}-unit`;

                return (
                  <div className="recipe-ingredient-row" key={index}>
                    <div className="recipe-ingredient-field">
                      <Label htmlFor={nameId}>材料名</Label>
                      <Input
                        id={nameId}
                        value={ingredient.name}
                        onChange={(event) =>
                          updateIngredient(index, "name", event.target.value)
                        }
                        placeholder="例：鶏もも肉"
                      />
                    </div>
                    <div className="recipe-ingredient-quantity">
                      <div className="recipe-ingredient-field">
                        <Label htmlFor={amountId}>分量</Label>
                        <Input
                          id={amountId}
                          type="text"
                          value={ingredient.amount}
                          onChange={(event) =>
                            updateIngredient(index, "amount", event.target.value)
                          }
                          placeholder="例：300、1/2、少々"
                        />
                      </div>
                      <div className="recipe-ingredient-field">
                        <Label htmlFor={unitId}>単位（任意）</Label>
                        <Input
                          id={unitId}
                          value={ingredient.unit}
                          onChange={(event) =>
                            updateIngredient(index, "unit", event.target.value)
                          }
                          placeholder="例：g、大さじ、個"
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="recipe-ingredient-remove"
                      aria-label={`${index + 1}つ目の材料を削除`}
                      onClick={() => removeIngredient(index)}
                      disabled={ingredients.length === 1}
                    >
                      <Trash2 size={16} aria-hidden="true" />
                    </Button>
                  </div>
                );
              })}
            </div>

            <p className="text-xs leading-5 text-muted">
              数字や分数は人数に合わせて換算します。「少々」「適量」など、数字でない分量はそのまま表示します。
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
        <CardHeader className="flex-row items-start justify-between gap-3">
          <div>
            <CardTitle>換算結果</CardTitle>
            {result && (
              <p className="mt-1 text-sm leading-6 text-muted">
                {result.originalServings}人分 → {result.targetServings}人分（
                {formatRatio(result.ratio)}倍）
              </p>
            )}
          </div>
          <CopyButton value={output} />
        </CardHeader>
        <CardContent>
          {result ? (
            <ul className="recipe-result-list" aria-live="polite">
              {result.ingredients.map((ingredient, index) => (
                <li className="recipe-result-item" key={`${ingredient.name}-${index}`}>
                  <span>{ingredient.name}</span>
                  <span className="recipe-result-amount">
                    {ingredient.amount}
                    {ingredient.unit && ` ${ingredient.unit}`}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm leading-6 text-muted">換算結果がここに表示されます。</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function formatRatio(ratio: number) {
  return ratio.toLocaleString("ja-JP", {
    maximumFractionDigits: 3,
    useGrouping: false,
  });
}

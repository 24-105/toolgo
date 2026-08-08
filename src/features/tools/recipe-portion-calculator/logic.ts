export type RecipeIngredient = {
  name: string;
  amount: string;
  unit: string;
};

export type RecipeResult = {
  ratio: number;
  originalServings: number;
  targetServings: number;
  ingredients: RecipeIngredient[];
  lines: string[];
};

export function scaleRecipe(
  ingredients: RecipeIngredient[],
  originalServings: number,
  targetServings: number,
): RecipeResult {
  validateServings(originalServings, "レシピの人数");
  validateServings(targetServings, "作りたい人数");

  if (ingredients.length === 0) {
    throw new Error("材料を1つ以上入力してください。");
  }

  const ratio = targetServings / originalServings;
  const scaledIngredients = ingredients.map((ingredient, index) => {
    const name = ingredient.name.trim();
    const amount = ingredient.amount.trim();
    const unit = ingredient.unit.trim();

    if (!name) {
      throw new Error(`${index + 1}つ目の材料名を入力してください。`);
    }
    if (!amount) {
      throw new Error(`${index + 1}つ目の材料の分量を入力してください。`);
    }

    const numericAmount = parseAmount(amount);
    if (
      numericAmount !== undefined &&
      (numericAmount <= 0 || numericAmount > 1_000_000)
    ) {
      throw new Error(`${index + 1}つ目の分量は0より大きい数値で入力してください。`);
    }

    return {
      name,
      amount: numericAmount === undefined ? amount : formatAmount(numericAmount * ratio),
      unit,
    };
  });

  return {
    ratio,
    originalServings,
    targetServings,
    ingredients: scaledIngredients,
    lines: scaledIngredients.map(formatIngredient),
  };
}

function validateServings(value: number, label: string) {
  if (!Number.isInteger(value) || value < 1 || value > 1_000) {
    throw new Error(`${label}は1〜1,000人の整数で入力してください。`);
  }
}

function parseAmount(value: string) {
  if (/^\d+(?:\.\d+)?\s*\/\s*\d+(?:\.\d+)?$/u.test(value)) {
    const [numerator, denominator] = value.split("/").map(Number);
    return denominator === 0 ? undefined : numerator / denominator;
  }

  const amount = Number(value);
  return Number.isFinite(amount) ? amount : undefined;
}

function formatAmount(value: number) {
  return value.toLocaleString("ja-JP", {
    maximumFractionDigits: 3,
    useGrouping: false,
  });
}

function formatIngredient({ name, amount, unit }: RecipeIngredient) {
  return [name, amount, unit].filter(Boolean).join(" ");
}

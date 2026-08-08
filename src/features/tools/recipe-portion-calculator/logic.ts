export type RecipeResult = {
  ratio: number;
  lines: string[];
};

export function scaleRecipe(
  input: string,
  originalServings: number,
  targetServings: number,
): RecipeResult {
  validateServings(originalServings, "元の人数");
  validateServings(targetServings, "作る人数");

  const sourceLines = input
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter(Boolean);
  if (sourceLines.length === 0) {
    throw new Error("材料を1行以上入力してください。");
  }

  const lines = sourceLines.map((line, index) => {
    const parts = line.split(/[,，、]/u).map((part) => part.trim());
    if (parts.length !== 3 || parts.some((part) => !part)) {
      throw new Error(
        `${index + 1}行目は「材料名, 分量, 単位」の形式で入力してください。`,
      );
    }

    const amount = parseAmount(parts[1]);
    if (amount === undefined || amount <= 0 || amount > 1_000_000) {
      throw new Error(`${index + 1}行目の分量は0より大きい数値で入力してください。`);
    }

    return `${parts[0]}, ${formatAmount(amount * (targetServings / originalServings))}, ${parts[2]}`;
  });

  return { ratio: targetServings / originalServings, lines };
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

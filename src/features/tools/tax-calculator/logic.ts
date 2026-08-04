export type TaxMode = "beforeTax" | "afterTax";
export type TaxResult = { beforeTax: number; tax: number; afterTax: number };

export function calculateTax(amount: number, rate: number, mode: TaxMode): TaxResult {
  if (!Number.isFinite(amount) || amount < 0 || amount > 100_000_000) {
    throw new Error("金額は0円〜1億円の範囲で入力してください。");
  }
  if (rate !== 0.08 && rate !== 0.1) {
    throw new Error("税率を選択してください。");
  }

  if (mode === "beforeTax") {
    const beforeTax = Math.round(amount);
    const tax = Math.round(beforeTax * rate);
    return { beforeTax, tax, afterTax: beforeTax + tax };
  }

  const afterTax = Math.round(amount);
  const tax = Math.round((afterTax * rate) / (1 + rate));
  return { beforeTax: afterTax - tax, tax, afterTax };
}

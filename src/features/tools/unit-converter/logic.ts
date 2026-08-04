export type UnitCategory = "length" | "weight" | "temperature" | "volume";

const factors = {
  length: { mm: 0.001, cm: 0.01, m: 1, km: 1_000 },
  weight: { g: 1, kg: 1_000 },
  volume: { ml: 1, l: 1_000 },
} as const;

export function convertUnit(
  value: number,
  category: UnitCategory,
  from: string,
  to: string,
) {
  if (!Number.isFinite(value) || Math.abs(value) > 1_000_000_000) {
    throw new Error("数値は-10億〜10億の範囲で入力してください。");
  }
  if (category === "temperature") {
    if (!["c", "f"].includes(from) || !["c", "f"].includes(to)) {
      throw new Error("温度の単位を選択してください。");
    }
    const celsius = from === "c" ? value : (value - 32) * (5 / 9);
    return to === "c" ? celsius : celsius * (9 / 5) + 32;
  }

  const categoryFactors = factors[category];
  if (!(from in categoryFactors) || !(to in categoryFactors)) {
    throw new Error("単位を選択してください。");
  }
  return (
    (value * categoryFactors[from as keyof typeof categoryFactors]) /
    categoryFactors[to as keyof typeof categoryFactors]
  );
}

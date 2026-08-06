export type PercentageOperation = "ratio" | "of" | "change" | "discount";

export function calculatePercentage(
  operation: PercentageOperation,
  first: number,
  second: number,
) {
  if (!Number.isFinite(first) || !Number.isFinite(second)) {
    throw new Error("数値を入力してください。");
  }

  switch (operation) {
    case "ratio":
      if (second === 0) throw new Error("全体の数は0以外を入力してください。");
      return { label: "割合", value: (first / second) * 100, suffix: "%" };
    case "of":
      return { label: "計算結果", value: (first * second) / 100, suffix: "" };
    case "change":
      if (first === 0) throw new Error("変化前の数は0以外を入力してください。");
      return { label: "増減率", value: ((second - first) / first) * 100, suffix: "%" };
    case "discount":
      if (second < 0 || second > 100)
        throw new Error("割引率は0〜100%で指定してください。");
      return { label: "割引後の価格", value: first * (1 - second / 100), suffix: "" };
  }
}

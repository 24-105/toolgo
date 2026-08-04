export type BillSplitResult = {
  baseAmount: number;
  remainder: number;
  amounts: number[];
};

export function splitBill(total: number, people: number): BillSplitResult {
  if (!Number.isInteger(total) || total < 0 || total > 100_000_000) {
    throw new Error("合計金額は0円〜1億円の整数で入力してください。");
  }
  if (!Number.isInteger(people) || people < 1 || people > 100) {
    throw new Error("人数は1〜100人の範囲で入力してください。");
  }

  const baseAmount = Math.floor(total / people);
  const remainder = total % people;
  const amounts = Array.from(
    { length: people },
    (_, index) => baseAmount + (index < remainder ? 1 : 0),
  );
  return { baseAmount, remainder, amounts };
}

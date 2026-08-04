export type DateCalculation = {
  resultDate: string;
  daysBetween: number;
};

export function calculateDate(
  startDate: string,
  days: number,
  operation: "add" | "subtract",
  endDate: string,
): DateCalculation {
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  if (!start || !end) throw new Error("正しい日付を入力してください。");
  if (!Number.isInteger(days) || days < 0 || days > 100_000) {
    throw new Error("日数は0〜100,000日の整数で入力してください。");
  }

  const result = new Date(start.getTime());
  result.setUTCDate(result.getUTCDate() + (operation === "add" ? days : -days));
  return {
    resultDate: formatDate(result),
    daysBetween: Math.round(Math.abs(end.getTime() - start.getTime()) / 86_400_000),
  };
}

function parseDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/u.test(value)) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
    ? date
    : undefined;
}

function formatDate(date: Date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
}

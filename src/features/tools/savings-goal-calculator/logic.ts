export type SavingsMode = "monthly" | "deadline";

export type SavingsInput = {
  mode: SavingsMode;
  targetAmount: number;
  currentAmount: number;
  monthlyAmount?: number;
  deadline?: string;
  today: string;
};

export type SavingsResult = {
  mode: SavingsMode;
  achieved: boolean;
  remainingAmount: number;
  monthlyAmount: number;
  months: number;
  targetDate: string;
};

const MAX_AMOUNT = 1_000_000_000;

export function calculateSavings(input: SavingsInput): SavingsResult {
  if (input.mode !== "monthly" && input.mode !== "deadline") {
    throw new Error("計算方法を選択してください。");
  }
  validateAmount(input.targetAmount, "目標金額", 1);
  validateAmount(input.currentAmount, "現在の貯金額", 0);

  const today = parseDate(input.today);
  if (!today) {
    throw new Error("今日の日付を正しく入力してください。");
  }

  let deadline: Date | undefined;
  if (input.mode === "monthly") {
    validateAmount(input.monthlyAmount, "毎月の積立額", 1);
  } else {
    deadline = parseDate(input.deadline);
    if (!deadline) {
      throw new Error("目標日を正しく入力してください。");
    }
  }

  const remainingAmount = Math.max(input.targetAmount - input.currentAmount, 0);
  if (remainingAmount === 0) {
    return {
      mode: input.mode,
      achieved: true,
      remainingAmount: 0,
      monthlyAmount: 0,
      months: 0,
      targetDate: formatDate(today),
    };
  }

  if (input.mode === "monthly") {
    const months = Math.ceil(remainingAmount / input.monthlyAmount!);
    return {
      mode: input.mode,
      achieved: false,
      remainingAmount,
      monthlyAmount: input.monthlyAmount!,
      months,
      targetDate: formatDate(addMonths(today, months)),
    };
  }

  if (!deadline) {
    throw new Error("目標日を正しく入力してください。");
  }
  if (deadline <= today) {
    throw new Error("目標日は今日より後の日付を入力してください。");
  }

  const months = Math.max(1, monthDifference(today, deadline));
  return {
    mode: input.mode,
    achieved: false,
    remainingAmount,
    monthlyAmount: Math.ceil(remainingAmount / months),
    months,
    targetDate: formatDate(deadline),
  };
}

function validateAmount(value: number | undefined, label: string, minimum: number) {
  if (
    value === undefined ||
    !Number.isSafeInteger(value) ||
    value < minimum ||
    value > MAX_AMOUNT
  ) {
    throw new Error(
      `${label}は${minimum.toLocaleString("ja-JP")}円〜10億円の整数で入力してください。`,
    );
  }
}

function parseDate(value: string | undefined) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/u.test(value)) return undefined;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
    ? date
    : undefined;
}

function addMonths(date: Date, months: number) {
  const firstOfMonth = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1),
  );
  const lastDay = new Date(
    Date.UTC(firstOfMonth.getUTCFullYear(), firstOfMonth.getUTCMonth() + 1, 0),
  ).getUTCDate();

  return new Date(
    Date.UTC(
      firstOfMonth.getUTCFullYear(),
      firstOfMonth.getUTCMonth(),
      Math.min(date.getUTCDate(), lastDay),
    ),
  );
}

function monthDifference(start: Date, end: Date) {
  return (
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    end.getUTCMonth() -
    start.getUTCMonth()
  );
}

function formatDate(date: Date) {
  return `${date.getUTCFullYear()}年${date.getUTCMonth() + 1}月${date.getUTCDate()}日`;
}

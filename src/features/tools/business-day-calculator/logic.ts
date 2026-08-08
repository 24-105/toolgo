import { getHolidayCalendar } from "../holiday-calendar/logic";

export type BusinessDayOperation = "add" | "subtract";

export type BusinessDayResult = {
  resultDate: string;
  calendarDays: number;
};

export function calculateBusinessDate(
  startDate: string,
  businessDays: number,
  operation: BusinessDayOperation,
): BusinessDayResult {
  if (operation !== "add" && operation !== "subtract") {
    throw new Error("計算方法を選択してください。");
  }
  const start = parseDate(startDate);
  if (!start || start.getUTCFullYear() < 2000 || start.getUTCFullYear() > 2099) {
    throw new Error("基準日は2000〜2099年の正しい日付を入力してください。");
  }
  if (!Number.isInteger(businessDays) || businessDays < 0 || businessDays > 100_000) {
    throw new Error("営業日数は0〜100,000日の整数で入力してください。");
  }
  if (businessDays === 0) {
    return { resultDate: formatDate(start), calendarDays: 0 };
  }

  const holidayCache = new Map<number, Set<string>>();
  const direction = operation === "add" ? 1 : -1;
  const result = new Date(start.getTime());
  let remaining = businessDays;
  let calendarDays = 0;

  while (remaining > 0) {
    result.setUTCDate(result.getUTCDate() + direction);
    calendarDays += 1;
    if (result.getUTCFullYear() < 2000 || result.getUTCFullYear() > 2099) {
      throw new Error("計算結果が対応範囲外になりました。日数を減らしてください。");
    }
    if (isBusinessDay(result, holidayCache)) remaining -= 1;
  }

  return { resultDate: formatDate(result), calendarDays };
}

function isBusinessDay(date: Date, holidayCache: Map<number, Set<string>>) {
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;

  const year = date.getUTCFullYear();
  let holidays = holidayCache.get(year);
  if (!holidays) {
    holidays = new Set(getHolidayCalendar(year).entries.map((entry) => entry.date));
    holidayCache.set(year, holidays);
  }
  return !holidays.has(formatDate(date, true));
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

function formatDate(date: Date, iso = false) {
  const value = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
  if (iso) return value;
  return `${date.getUTCFullYear()}年${date.getUTCMonth() + 1}月${date.getUTCDate()}日`;
}

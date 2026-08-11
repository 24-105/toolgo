export type TimestampUnit = "seconds" | "milliseconds";

export type TimestampToDateResult = {
  milliseconds: number;
  iso: string;
  local: string;
};

export type DateTimeToTimestampResult = {
  milliseconds: number;
  seconds: number;
  iso: string;
};

export function timestampToDate(
  input: string,
  unit: TimestampUnit,
): TimestampToDateResult {
  const value = input.trim();

  if (!value) {
    throw new Error("タイムスタンプを入力してください。");
  }

  const timestamp = Number(value);
  const milliseconds = unit === "seconds" ? timestamp * 1000 : timestamp;

  if (!Number.isFinite(timestamp) || !Number.isSafeInteger(timestamp)) {
    throw new Error("タイムスタンプは安全な範囲の整数で入力してください。");
  }

  const date = new Date(milliseconds);

  if (Number.isNaN(date.getTime())) {
    throw new Error("日付に変換できないタイムスタンプです。");
  }

  return {
    milliseconds,
    iso: date.toISOString(),
    local: date.toLocaleString("ja-JP", {
      dateStyle: "medium",
      timeStyle: "medium",
    }),
  };
}

export function dateTimeLocalToTimestamp(input: string): DateTimeToTimestampResult {
  const match =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?$/u.exec(input);

  if (!match) {
    throw new Error("日時を選択してください。");
  }

  const [, year, month, day, hours, minutes, seconds = "0", fraction = ""] = match;
  const millisecondsPart = fraction.padEnd(3, "0");
  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hours),
    Number(minutes),
    Number(seconds),
    Number(millisecondsPart || "0"),
  );

  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() !== Number(month) - 1 ||
    date.getDate() !== Number(day) ||
    date.getHours() !== Number(hours) ||
    date.getMinutes() !== Number(minutes) ||
    date.getSeconds() !== Number(seconds)
  ) {
    throw new Error("存在しない日時です。入力内容を確認してください。");
  }

  const milliseconds = date.getTime();

  return {
    milliseconds,
    seconds: Math.floor(milliseconds / 1000),
    iso: date.toISOString(),
  };
}

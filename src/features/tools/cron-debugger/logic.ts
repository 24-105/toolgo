type CronField = {
  values: Set<number>;
  isAny: boolean;
};

export type ParsedCron = {
  source: string;
  minute: CronField;
  hour: CronField;
  dayOfMonth: CronField;
  month: CronField;
  dayOfWeek: CronField;
};

const FIELD_RANGES = [
  [0, 59],
  [0, 23],
  [1, 31],
  [1, 12],
  [0, 6],
] as const;

function parseField(
  value: string,
  min: number,
  max: number,
  isWeekday = false,
): CronField {
  const values = new Set<number>();
  const pieces = value.split(",");
  if (pieces.some((piece) => piece.trim() === "")) {
    throw new Error("カンマの位置を確認してください。");
  }

  for (const rawPiece of pieces) {
    const piece = rawPiece.trim();
    const stepParts = piece.split("/");
    if (stepParts.length > 2)
      throw new Error(`「${piece}」の間隔指定が正しくありません。`);
    const base = stepParts[0];
    const step = stepParts[1] === undefined ? 1 : Number(stepParts[1]);
    if (!Number.isInteger(step) || step < 1) {
      throw new Error(`「${piece}」の間隔は1以上の整数で指定してください。`);
    }

    let start = min;
    let end = max;
    if (base !== "*") {
      const range = base.match(/^(\d+)-(\d+)$/u);
      if (range) {
        start = Number(range[1]);
        end = Number(range[2]);
      } else if (/^\d+$/u.test(base)) {
        start = Number(base);
        end = start;
      } else {
        throw new Error(`「${piece}」の指定を確認してください。`);
      }
    }
    if (start < min || end > max || start > end) {
      throw new Error(`${min}〜${max}の範囲で指定してください。`);
    }
    for (let current = start; current <= end; current += step) {
      values.add(isWeekday && current === 7 ? 0 : current);
    }
  }

  return {
    values,
    isAny: isWeekday ? values.size === 7 : values.size === max - min + 1,
  };
}

export function parseCronExpression(expression: string): ParsedCron {
  const fields = expression.trim().split(/\s+/u);
  if (fields.length !== 5) {
    throw new Error("Cron式は「分 時 日 月 曜日」の5項目で入力してください。");
  }
  const parsed = {
    minute: parseField(fields[0], ...FIELD_RANGES[0]),
    hour: parseField(fields[1], ...FIELD_RANGES[1]),
    dayOfMonth: parseField(fields[2], ...FIELD_RANGES[2]),
    month: parseField(fields[3], ...FIELD_RANGES[3]),
    dayOfWeek: parseField(fields[4], 0, 7, true),
  };
  return {
    source: expression.trim(),
    minute: parsed.minute,
    hour: parsed.hour,
    dayOfMonth: parsed.dayOfMonth,
    month: parsed.month,
    dayOfWeek: parsed.dayOfWeek,
  };
}

function includes(field: CronField, value: number) {
  return field.values.has(value);
}

export function cronMatches(date: Date, cron: ParsedCron) {
  if (!includes(cron.minute, date.getMinutes())) return false;
  if (!includes(cron.hour, date.getHours())) return false;
  if (!includes(cron.month, date.getMonth() + 1)) return false;

  const matchesDayOfMonth = includes(cron.dayOfMonth, date.getDate());
  const matchesDayOfWeek = includes(cron.dayOfWeek, date.getDay());
  const matchesDay =
    cron.dayOfMonth.isAny && cron.dayOfWeek.isAny
      ? true
      : cron.dayOfMonth.isAny
        ? matchesDayOfWeek
        : cron.dayOfWeek.isAny
          ? matchesDayOfMonth
          : matchesDayOfMonth || matchesDayOfWeek;
  return matchesDay;
}

export function getNextCronRuns(cron: ParsedCron, from = new Date(), count = 5) {
  const runs: Date[] = [];
  const cursor = new Date(from);
  cursor.setSeconds(0, 0);
  cursor.setMinutes(cursor.getMinutes() + 1);
  const maxMinutes = 366 * 24 * 60;

  for (let checked = 0; checked < maxMinutes && runs.length < count; checked += 1) {
    if (cronMatches(cursor, cron)) runs.push(new Date(cursor));
    cursor.setMinutes(cursor.getMinutes() + 1);
  }
  if (runs.length < count) {
    throw new Error("1年以内に次回実行時刻を見つけられませんでした。");
  }
  return runs;
}

function describeValues(field: CronField) {
  return [...field.values].sort((left, right) => left - right).join("、");
}

function sortedValues(field: CronField) {
  return [...field.values].sort((left, right) => left - right);
}

function regularStep(values: number[]) {
  if (values.length < 2) return null;
  const step = values[1] - values[0];
  if (step < 1) return null;
  return values.every((value, index) => index === 0 || value - values[index - 1] === step)
    ? step
    : null;
}

function describeWeekdays(field: CronField) {
  const values = sortedValues(field);
  if (values.length === 5 && values.every((value, index) => value === index + 1)) {
    return "平日";
  }
  if (values.length === 1)
    return `毎週${["日", "月", "火", "水", "木", "金", "土"][values[0]]}曜日`;
  return `毎週${values.map((value) => ["日", "月", "火", "水", "木", "金", "土"][value]).join("・")}曜日`;
}

function describeCalendar(cron: ParsedCron) {
  const months = describeValues(cron.month);
  const days = describeValues(cron.dayOfMonth);
  if (cron.month.isAny && cron.dayOfMonth.isAny && cron.dayOfWeek.isAny) return "毎日";
  if (cron.dayOfMonth.isAny && !cron.dayOfWeek.isAny) {
    const weekday = describeWeekdays(cron.dayOfWeek);
    return cron.month.isAny ? weekday : `${months}月の${weekday}`;
  }
  if (!cron.dayOfMonth.isAny && cron.dayOfWeek.isAny) {
    return cron.month.isAny ? `毎月${days}日` : `毎年${months}月${days}日`;
  }
  if (!cron.month.isAny)
    return `毎年${months}月${days}日または${describeWeekdays(cron.dayOfWeek)}`;
  return `毎月${days}日または${describeWeekdays(cron.dayOfWeek)}`;
}

function describeTime(cron: ParsedCron) {
  const minutes = sortedValues(cron.minute);
  const hours = sortedValues(cron.hour);
  if (cron.hour.isAny && cron.minute.isAny) return "毎分";
  if (cron.hour.isAny) {
    if (minutes.length === 1 && minutes[0] === 0) return "毎時";
    const step = regularStep(minutes);
    return step ? `${step}分おき` : `毎時${minutes.join("分、")}分`;
  }

  const hourText =
    hours.length > 1 &&
    hours.every((value, index) => index === 0 || value === hours[index - 1] + 1)
      ? `${hours[0]}時から${hours[hours.length - 1]}時まで`
      : `${hours.join("時・")}時`;
  if (cron.minute.isAny) return `${hourText}は毎分`;
  if (minutes.length === 1 && minutes[0] === 0) return hourText;
  const step = regularStep(minutes);
  if (step && hours.length > 1) return `${hourText}${step}分おき`;
  if (hours.length > 1) {
    const minuteText =
      minutes.length === 1
        ? `各${minutes[0]}分`
        : minutes.map((minute) => `${minute}分`).join("・");
    return `${hourText}の${minuteText}`;
  }
  return `${hourText}${minutes.join("分、")}分`;
}

export function describeCron(cron: ParsedCron) {
  const calendar = describeCalendar(cron);
  const time = describeTime(cron);
  if (time === "毎分" || time === "毎時") {
    return `${calendar === "毎日" ? "" : `${calendar}は`}${time}実行`;
  }
  if (time.endsWith("おき")) return `${calendar}、${time}に実行`;
  return `${calendar}${calendar === "毎日" ? "" : "の"}${time}に実行`;
}

export function formatCronRuns(runs: Date[]) {
  return runs
    .map((run) =>
      new Intl.DateTimeFormat("ja-JP", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(run),
    )
    .join("\n");
}

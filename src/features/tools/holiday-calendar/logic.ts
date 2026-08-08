export type HolidayKind = "holiday" | "substitute" | "citizen";

export type HolidayEntry = {
  date: string;
  name: string;
  kind: HolidayKind;
};

export type HolidaySpan = {
  start: string;
  end: string;
  days: number;
};

export type HolidayCalendar = {
  year: number;
  entries: HolidayEntry[];
  longWeekends: HolidaySpan[];
};

export function getHolidayCalendar(year: number): HolidayCalendar {
  if (!Number.isInteger(year) || year < 2000 || year > 2099) {
    throw new Error("年は2000〜2099年の整数で入力してください。");
  }

  const entries = createBaseHolidays(year);
  const holidayDates = new Map(entries.map((entry) => [entry.date, entry]));
  addCitizenHolidays(year, holidayDates);
  addSubstituteHolidays(year, holidayDates);

  const sortedEntries = [...holidayDates.values()].sort((left, right) =>
    left.date.localeCompare(right.date),
  );
  return {
    year,
    entries: sortedEntries,
    longWeekends: findLongWeekends(year, holidayDates),
  };
}

function createBaseHolidays(year: number): HolidayEntry[] {
  const entries: HolidayEntry[] = [
    holiday(year, 1, 1, "元日"),
    nthWeekday(year, 1, 1, 2, "成人の日"),
    holiday(year, 2, 11, "建国記念の日"),
    holiday(year, 4, 29, "昭和の日"),
    holiday(year, 5, 3, "憲法記念日"),
    holiday(year, 5, 4, "みどりの日"),
    holiday(year, 5, 5, "こどもの日"),
    holiday(year, 11, 3, "文化の日"),
    holiday(year, 11, 23, "勤労感謝の日"),
    holiday(year, 3, springEquinoxDay(year), "春分の日"),
    holiday(year, 9, autumnEquinoxDay(year), "秋分の日"),
  ];

  if (year >= 2020) entries.push(holiday(year, 2, 23, "天皇誕生日"));

  if (year === 2020) {
    entries.push(holiday(year, 7, 23, "海の日"));
    entries.push(holiday(year, 8, 10, "山の日"));
    entries.push(holiday(year, 7, 24, "スポーツの日"));
    entries.push(nthWeekday(year, 9, 1, 3, "敬老の日"));
  } else if (year === 2021) {
    entries.push(holiday(year, 7, 22, "海の日"));
    entries.push(holiday(year, 8, 8, "山の日"));
    entries.push(holiday(year, 7, 23, "スポーツの日"));
    entries.push(nthWeekday(year, 9, 1, 3, "敬老の日"));
  } else {
    entries.push(
      year >= 2003 ? nthWeekday(year, 7, 1, 3, "海の日") : holiday(year, 7, 20, "海の日"),
    );
    if (year >= 2016) entries.push(holiday(year, 8, 11, "山の日"));
    entries.push(
      year >= 2003
        ? nthWeekday(year, 9, 1, 3, "敬老の日")
        : holiday(year, 9, 15, "敬老の日"),
    );
    entries.push(
      year >= 2000
        ? nthWeekday(year, 10, 1, 2, year >= 2020 ? "スポーツの日" : "体育の日")
        : holiday(year, 10, 10, "体育の日"),
    );
  }

  return entries.filter(
    (entry, index, all) =>
      all.findIndex((candidate) => candidate.date === entry.date) === index,
  );
}

function addCitizenHolidays(year: number, holidays: Map<string, HolidayEntry>) {
  for (const date of datesInYear(year).slice(1, -1)) {
    const key = formatDate(date);
    if (date.getUTCDay() === 0 || holidays.has(key)) continue;

    const previous = formatDate(addDays(date, -1));
    const next = formatDate(addDays(date, 1));
    if (holidays.has(previous) && holidays.has(next)) {
      holidays.set(key, { date: key, name: "休日", kind: "citizen" });
    }
  }
}

function addSubstituteHolidays(year: number, holidays: Map<string, HolidayEntry>) {
  const originalHolidays = [...holidays.values()].filter(
    (entry) => entry.kind === "holiday",
  );
  for (const entry of originalHolidays) {
    const date = parseDate(entry.date);
    if (!date || date.getUTCDay() !== 0) continue;

    let substitute = addDays(date, 1);
    while (substitute.getUTCFullYear() === year && holidays.has(formatDate(substitute))) {
      substitute = addDays(substitute, 1);
    }
    if (substitute.getUTCFullYear() === year) {
      const key = formatDate(substitute);
      holidays.set(key, { date: key, name: "休日", kind: "substitute" });
    }
  }
}

function findLongWeekends(year: number, holidays: Map<string, HolidayEntry>) {
  const spans: HolidaySpan[] = [];
  let start: Date | undefined;

  for (const date of [...datesInYear(year), undefined]) {
    const isDayOff = date
      ? date.getUTCDay() === 0 || date.getUTCDay() === 6 || holidays.has(formatDate(date))
      : false;
    if (date && isDayOff && !start) start = date;
    if ((!isDayOff || !date) && start) {
      const end = date ? addDays(date, -1) : new Date(Date.UTC(year, 11, 31));
      const days = Math.round((end.getTime() - start.getTime()) / 86_400_000) + 1;
      if (days >= 3) spans.push({ start: formatDate(start), end: formatDate(end), days });
      start = undefined;
    }
  }
  return spans;
}

function nthWeekday(
  year: number,
  month: number,
  weekday: number,
  occurrence: number,
  name: string,
) {
  const first = new Date(Date.UTC(year, month - 1, 1));
  const day = 1 + ((weekday - first.getUTCDay() + 7) % 7) + (occurrence - 1) * 7;
  return holiday(year, month, day, name);
}

function holiday(year: number, month: number, day: number, name: string): HolidayEntry {
  return {
    date: formatDate(new Date(Date.UTC(year, month - 1, day))),
    name,
    kind: "holiday",
  };
}

function springEquinoxDay(year: number) {
  return Math.floor(20.8431 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
}

function autumnEquinoxDay(year: number) {
  return Math.floor(23.2488 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
}

function datesInYear(year: number) {
  const dates: Date[] = [];
  for (
    let day = new Date(Date.UTC(year, 0, 1));
    day.getUTCFullYear() === year;
    day = addDays(day, 1)
  ) {
    dates.push(day);
  }
  return dates;
}

function parseDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function addDays(date: Date, days: number) {
  const next = new Date(date.getTime());
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function formatDate(date: Date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
}

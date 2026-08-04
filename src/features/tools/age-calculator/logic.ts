export type AgeResult = {
  age: number;
  daysUntilBirthday: number;
  nextBirthday: string;
};

export function calculateAge(birthDate: string, referenceDate: string): AgeResult {
  const birth = parseDate(birthDate);
  const reference = parseDate(referenceDate);

  if (!birth || !reference) {
    throw new Error("誕生日と今日の日付を正しく入力してください。");
  }

  if (birth > reference) {
    throw new Error("誕生日は今日より前の日付を入力してください。");
  }

  let age = reference.getFullYear() - birth.getFullYear();
  const birthdayThisYear = birthdayForYear(reference.getFullYear(), birth);

  if (reference < birthdayThisYear) {
    age -= 1;
  }

  const nextBirthday =
    reference < birthdayThisYear
      ? birthdayThisYear
      : birthdayForYear(reference.getFullYear() + 1, birth);

  return {
    age,
    daysUntilBirthday: Math.round(
      (nextBirthday.getTime() - reference.getTime()) / (24 * 60 * 60 * 1000),
    ),
    nextBirthday: formatDate(nextBirthday),
  };
}

function parseDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/u.test(value)) {
    return undefined;
  }

  const [year, month, day] = value.split("-").map(Number);
  const parsed = dateOf(year, month - 1, day);

  return parsed.getFullYear() === year &&
    parsed.getMonth() === month - 1 &&
    parsed.getDate() === day
    ? parsed
    : undefined;
}

function dateOf(year: number, month: number, day: number) {
  return new Date(Date.UTC(year, month, day));
}

function birthdayForYear(year: number, birth: Date) {
  const isLeapDay = birth.getMonth() === 1 && birth.getDate() === 29;

  if (isLeapDay && !isLeapYear(year)) {
    return dateOf(year, 1, 28);
  }

  return dateOf(year, birth.getMonth(), birth.getDate());
}

function isLeapYear(year: number) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function formatDate(date: Date) {
  return `${date.getUTCFullYear()}年${date.getUTCMonth() + 1}月${date.getUTCDate()}日`;
}

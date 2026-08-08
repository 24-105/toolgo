export type SleepResult = {
  totalMinutes: number;
  hours: number;
  minutes: number;
  crossesMidnight: boolean;
};

export function calculateSleep(bedtime: string, wakeTime: string): SleepResult {
  const bedMinutes = parseTime(bedtime);
  const wakeMinutes = parseTime(wakeTime);
  if (bedMinutes === undefined || wakeMinutes === undefined) {
    throw new Error("就寝時刻と起床時刻を正しく入力してください。");
  }
  if (bedMinutes === wakeMinutes) {
    throw new Error("就寝時刻と起床時刻は異なる時刻を入力してください。");
  }

  const crossesMidnight = wakeMinutes < bedMinutes;
  const totalMinutes = crossesMidnight
    ? wakeMinutes + 24 * 60 - bedMinutes
    : wakeMinutes - bedMinutes;

  return {
    totalMinutes,
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
    crossesMidnight,
  };
}

function parseTime(value: string) {
  if (!/^\d{2}:\d{2}$/u.test(value)) return undefined;

  const [hours, minutes] = value.split(":").map(Number);
  if (hours > 23 || minutes > 59) return undefined;
  return hours * 60 + minutes;
}

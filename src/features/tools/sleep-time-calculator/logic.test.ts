import { describe, expect, it } from "vitest";

import { calculateSleep } from "./logic";

describe("calculateSleep", () => {
  it("日付をまたぐ睡眠時間を計算する", () => {
    expect(calculateSleep("23:00", "07:30")).toEqual({
      totalMinutes: 510,
      hours: 8,
      minutes: 30,
      crossesMidnight: true,
    });
  });

  it("同じ時刻を拒否する", () => {
    expect(() => calculateSleep("08:00", "08:00")).toThrow();
  });
});

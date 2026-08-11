import { describe, expect, it } from "vitest";

import { getHolidayCalendar } from "./logic";

describe("getHolidayCalendar", () => {
  it("祝日を日付順に返す", () => {
    const calendar = getHolidayCalendar(2024);

    expect(calendar.year).toBe(2024);
    expect(calendar.entries[0]).toMatchObject({ date: "2024-01-01", name: "元日" });
    expect(calendar.entries.some((entry) => entry.name === "成人の日")).toBe(true);
    expect(
      calendar.entries.every(
        (entry, index, entries) => index === 0 || entry.date >= entries[index - 1].date,
      ),
    ).toBe(true);
  });

  it("対応範囲外の年を拒否する", () => {
    expect(() => getHolidayCalendar(1999)).toThrow();
  });
});

import { describe, expect, it } from "vitest";

import { calculateDate } from "./logic";

describe("calculateDate", () => {
  it("日数を加算し、日付間の日数を返す", () => {
    expect(calculateDate("2024-01-01", 10, "add", "2024-01-10")).toEqual({
      resultDate: "2024-01-11",
      daysBetween: 9,
    });
  });

  it("不正な日数を拒否する", () => {
    expect(() => calculateDate("2024-01-01", -1, "add", "2024-01-10")).toThrow();
  });
});

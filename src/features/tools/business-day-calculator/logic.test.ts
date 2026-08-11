import { describe, expect, it } from "vitest";

import { calculateBusinessDate } from "./logic";

describe("calculateBusinessDate", () => {
  it("営業日数0では基準日を返す", () => {
    expect(calculateBusinessDate("2024-07-01", 0, "add")).toEqual({
      resultDate: "2024年7月1日",
      calendarDays: 0,
    });
  });

  it("土日を飛ばして営業日を加算する", () => {
    expect(calculateBusinessDate("2024-07-05", 1, "add").resultDate).toBe("2024年7月8日");
  });
});

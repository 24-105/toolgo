import { describe, expect, it } from "vitest";

import { calculateAge } from "./logic";

describe("calculateAge", () => {
  it("基準日時点の年齢と次の誕生日を計算する", () => {
    expect(calculateAge("2000-07-01", "2024-06-30")).toMatchObject({
      age: 23,
      daysUntilBirthday: 1,
      nextBirthday: "2024年7月1日",
    });
  });

  it("誕生日が基準日より後ならエラーにする", () => {
    expect(() => calculateAge("2025-01-01", "2024-01-01")).toThrow();
  });
});

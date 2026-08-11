import { describe, expect, it } from "vitest";

import { cronMatches, describeCron, parseCronExpression } from "./logic";

describe("Cron式", () => {
  it("平日9時のCron式を解析して説明する", () => {
    const cron = parseCronExpression("0 9 * * 1-5");

    expect(cron.minute.values.has(0)).toBe(true);
    expect(cron.hour.values.has(9)).toBe(true);
    expect(describeCron(cron)).toContain("平日");
    expect(cronMatches(new Date(2024, 6, 1, 9, 0), cron)).toBe(true);
  });

  it("5項目でないCron式を拒否する", () => {
    expect(() => parseCronExpression("0 9 * *")).toThrow();
  });
});

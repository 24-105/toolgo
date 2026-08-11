import { describe, expect, it } from "vitest";

import { dateTimeLocalToTimestamp, timestampToDate } from "./logic";

describe("timestampToDate", () => {
  it("秒単位のUnixタイムスタンプをISO形式へ変換する", () => {
    expect(timestampToDate("1719792000", "seconds")).toMatchObject({
      milliseconds: 1719792000000,
      iso: "2024-07-01T00:00:00.000Z",
    });
  });

  it("ミリ秒単位のUnixタイムスタンプを変換する", () => {
    expect(timestampToDate("0", "milliseconds").iso).toBe("1970-01-01T00:00:00.000Z");
  });

  it("空入力や整数でない値を拒否する", () => {
    expect(() => timestampToDate("", "seconds")).toThrow("入力してください");
    expect(() => timestampToDate("1.5", "seconds")).toThrow("整数");
  });
});

describe("dateTimeLocalToTimestamp", () => {
  it("端末の現地時間として日時を変換する", () => {
    const expected = new Date(2024, 6, 1, 0, 0, 0, 0).getTime();

    expect(dateTimeLocalToTimestamp("2024-07-01T00:00")).toMatchObject({
      milliseconds: expected,
      seconds: Math.floor(expected / 1000),
    });
  });

  it("存在しない日付を拒否する", () => {
    expect(() => dateTimeLocalToTimestamp("2024-02-30T00:00")).toThrow("存在しない日時");
  });
});

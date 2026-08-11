import { describe, expect, it } from "vitest";

import { compareLines } from "./logic";

describe("compareLines", () => {
  it("追加・削除・共通の行を比較する", () => {
    expect(compareLines("a\nb", "a\nc")).toEqual([
      { type: "same", value: "a" },
      { type: "removed", value: "b" },
      { type: "added", value: "c" },
    ]);
  });

  it("行数上限を超えた入力を拒否する", () => {
    expect(() => compareLines("a\n".repeat(501), "b\n".repeat(500))).toThrow();
  });
});

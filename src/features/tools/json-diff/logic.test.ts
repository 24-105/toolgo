import { describe, expect, it } from "vitest";

import { compareJson, diffLinesToText } from "./logic";

describe("JSON差分比較", () => {
  it("JSONの追加・削除差分を返す", () => {
    const lines = compareJson('{"a":1}', '{"a":2}');

    expect(lines).toEqual([
      { type: "same", text: "{" },
      { type: "removed", text: '  "a": 1' },
      { type: "added", text: '  "a": 2' },
      { type: "same", text: "}" },
    ]);
    expect(diffLinesToText(lines)).toContain('-  "a": 1');
  });

  it("不正なJSONを拒否する", () => {
    expect(() => compareJson("{", "{}")).toThrow();
  });
});

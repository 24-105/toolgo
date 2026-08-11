import { describe, expect, it } from "vitest";

import { sortAndDeduplicateLines } from "./logic";

describe("sortAndDeduplicateLines", () => {
  it("行を昇順に並べ、重複行と空行を削除する", () => {
    expect(
      sortAndDeduplicateLines("banana\napple\nbanana\n\ncherry", {
        order: "ascending",
        removeEmptyLines: true,
        removeDuplicates: true,
      }),
    ).toBe("apple\nbanana\ncherry");
  });

  it("降順では逆順に並べる", () => {
    expect(
      sortAndDeduplicateLines("2\n10\n1", {
        order: "descending",
        removeEmptyLines: false,
        removeDuplicates: false,
      }),
    ).toBe("10\n2\n1");
  });

  it("重複削除を無効にすると同じ行を残す", () => {
    expect(
      sortAndDeduplicateLines("a\na", {
        order: "ascending",
        removeEmptyLines: false,
        removeDuplicates: false,
      }),
    ).toBe("a\na");
  });
});

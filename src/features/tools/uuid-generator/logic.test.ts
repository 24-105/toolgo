import { describe, expect, it } from "vitest";

import { generateUuidList } from "./logic";

describe("generateUuidList", () => {
  it("指定個数のUUIDを改行区切りで生成する", () => {
    const values = generateUuidList(3).split("\n");

    expect(values).toHaveLength(3);
    expect(
      values.every((value) =>
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu.test(
          value,
        ),
      ),
    ).toBe(true);
  });

  it("個数の範囲外を拒否する", () => {
    expect(() => generateUuidList(0)).toThrow();
  });
});

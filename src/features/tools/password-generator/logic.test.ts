import { describe, expect, it } from "vitest";

import { generatePassword } from "./logic";

describe("generatePassword", () => {
  it("指定した文字種を含むパスワードを生成する", () => {
    const password = generatePassword({
      length: 8,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
    });

    expect(password).toHaveLength(8);
    expect(password).toMatch(/[A-Z]/u);
    expect(password).toMatch(/[a-z]/u);
    expect(password).toMatch(/[0-9]/u);
    expect(password).toMatch(/[!#$%&()*+,-./:;<=>?@[\\\]^_{|}~]/u);
  });

  it("文字種を1つも選ばない場合を拒否する", () => {
    expect(() =>
      generatePassword({
        length: 8,
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: false,
      }),
    ).toThrow();
  });
});

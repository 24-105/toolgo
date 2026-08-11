import { describe, expect, it } from "vitest";

import { createHash } from "./logic";

describe("createHash", () => {
  it("SHA-256のハッシュを生成する", async () => {
    await expect(createHash("hello", "SHA-256")).resolves.toBe(
      "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
    );
  });

  it("SHA-512のハッシュを生成する", async () => {
    await expect(createHash("hello", "SHA-512")).resolves.toHaveLength(128);
  });
});

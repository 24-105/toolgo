import { describe, expect, it } from "vitest";

import { readQrCode } from "./logic";

describe("readQrCode", () => {
  it("画像以外のファイルを拒否する", async () => {
    const file = new File(["text"], "sample.txt", { type: "text/plain" });

    await expect(readQrCode(file)).rejects.toThrow("画像ファイル");
  });

  it("画像ファイルが大きすぎる場合を拒否する", async () => {
    const file = new File([new Uint8Array(10 * 1024 * 1024 + 1)], "large.png", {
      type: "image/png",
    });

    await expect(readQrCode(file)).rejects.toThrow("10MB以下");
  });
});

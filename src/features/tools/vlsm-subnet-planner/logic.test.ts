import { describe, expect, it } from "vitest";

import { formatVlsmPlan, parseHostCounts, planVlsm } from "./logic";

describe("VLSMサブネット設計", () => {
  it("必要ホスト数を解析してサブネットを割り当てる", () => {
    expect(parseHostCounts("50, 20")).toEqual([50, 20]);
    const plan = planVlsm("192.168.1.0/24", "50,20");

    expect(plan.allocations[0]).toMatchObject({
      request: 50,
      prefix: 26,
      network: "192.168.1.0",
    });
    expect(plan.allocations[1]).toMatchObject({
      request: 20,
      prefix: 27,
      network: "192.168.1.64",
    });
    expect(formatVlsmPlan(plan)).toContain("192.168.1.0/26");
  });

  it("不正なIPv4ネットワークを拒否する", () => {
    expect(() => planVlsm("192.168.1.999/24", "10")).toThrow();
  });
});

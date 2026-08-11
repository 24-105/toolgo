import { describe, expect, it } from "vitest";

import { calculateFuelCost } from "./logic";

describe("calculateFuelCost", () => {
  it("片道の燃料費を計算する", () => {
    expect(
      calculateFuelCost({
        distance: 100,
        fuelEfficiency: 10,
        fuelPrice: 170,
        tripType: "oneWay",
      }),
    ).toMatchObject({ totalDistance: 100, fuelAmount: 10, fuelCost: 1_700 });
  });

  it("往復では距離を2倍にする", () => {
    expect(
      calculateFuelCost({
        distance: 100,
        fuelEfficiency: 10,
        fuelPrice: 170,
        tripType: "roundTrip",
      }).totalDistance,
    ).toBe(200);
  });
});

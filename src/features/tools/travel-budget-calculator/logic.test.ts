import { describe, expect, it } from "vitest";

import { calculateTravelBudget } from "./logic";

describe("calculateTravelBudget", () => {
  it("旅行費用の内訳と1人あたり金額を計算する", () => {
    expect(
      calculateTravelBudget({
        people: 2,
        nights: 1,
        transportPerPerson: 10_000,
        lodgingPerNight: 20_000,
        foodPerPersonPerDay: 5_000,
        activitiesTotal: 3_000,
        otherTotal: 1_000,
        budgetLimit: 70_000,
      }),
    ).toEqual({
      transportTotal: 20_000,
      lodgingTotal: 20_000,
      foodTotal: 20_000,
      activitiesTotal: 3_000,
      otherTotal: 1_000,
      total: 64_000,
      perPerson: 32_000,
      budgetDifference: 6_000,
    });
  });

  it("人数を検証する", () => {
    expect(() =>
      calculateTravelBudget({
        people: 0,
        nights: 1,
        transportPerPerson: 1,
        lodgingPerNight: 1,
        foodPerPersonPerDay: 1,
        activitiesTotal: 0,
        otherTotal: 0,
      }),
    ).toThrow();
  });
});

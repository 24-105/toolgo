export type TravelBudgetInput = {
  people: number;
  nights: number;
  transportPerPerson: number;
  lodgingPerNight: number;
  foodPerPersonPerDay: number;
  activitiesTotal: number;
  otherTotal: number;
  budgetLimit?: number;
};

export type TravelBudgetResult = {
  transportTotal: number;
  lodgingTotal: number;
  foodTotal: number;
  activitiesTotal: number;
  otherTotal: number;
  total: number;
  perPerson: number;
  budgetDifference?: number;
};

export function calculateTravelBudget(input: TravelBudgetInput): TravelBudgetResult {
  if (!Number.isInteger(input.people) || input.people < 1 || input.people > 100) {
    throw new Error("人数は1〜100人の整数で入力してください。");
  }
  if (!Number.isInteger(input.nights) || input.nights < 0 || input.nights > 365) {
    throw new Error("宿泊数は0〜365泊の整数で入力してください。");
  }
  validateYen(input.transportPerPerson, "交通費（1人）");
  validateYen(input.lodgingPerNight, "宿泊費（1泊）");
  validateYen(input.foodPerPersonPerDay, "食費（1人1日）");
  validateYen(input.activitiesTotal, "レジャー費");
  validateYen(input.otherTotal, "その他の費用");
  if (input.budgetLimit !== undefined) validateYen(input.budgetLimit, "予算上限");

  const transportTotal = input.transportPerPerson * input.people;
  const lodgingTotal = input.lodgingPerNight * input.nights;
  const foodTotal = input.foodPerPersonPerDay * input.people * (input.nights + 1);
  const total =
    transportTotal + lodgingTotal + foodTotal + input.activitiesTotal + input.otherTotal;

  return {
    transportTotal,
    lodgingTotal,
    foodTotal,
    activitiesTotal: input.activitiesTotal,
    otherTotal: input.otherTotal,
    total,
    perPerson: Math.ceil(total / input.people),
    budgetDifference:
      input.budgetLimit === undefined ? undefined : input.budgetLimit - total,
  };
}

function validateYen(value: number, label: string) {
  if (!Number.isSafeInteger(value) || value < 0 || value > 1_000_000_000) {
    throw new Error(`${label}は0円〜10億円の整数で入力してください。`);
  }
}

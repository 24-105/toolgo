export type FuelTripType = "oneWay" | "roundTrip";

export type FuelCostInput = {
  distance: number;
  fuelEfficiency: number;
  fuelPrice: number;
  tripType: FuelTripType;
};

export type FuelCostResult = {
  totalDistance: number;
  fuelAmount: number;
  fuelCost: number;
  costPerKilometer: number;
};

export function calculateFuelCost(input: FuelCostInput): FuelCostResult {
  if (input.tripType !== "oneWay" && input.tripType !== "roundTrip") {
    throw new Error("走行方法を選択してください。");
  }
  if (
    !Number.isFinite(input.distance) ||
    input.distance <= 0 ||
    input.distance > 1_000_000
  ) {
    throw new Error("走行距離は0より大きく、100万km以下で入力してください。");
  }
  if (
    !Number.isFinite(input.fuelEfficiency) ||
    input.fuelEfficiency <= 0 ||
    input.fuelEfficiency > 100
  ) {
    throw new Error("燃費は0より大きく、100km/L以下で入力してください。");
  }
  if (
    !Number.isFinite(input.fuelPrice) ||
    input.fuelPrice <= 0 ||
    input.fuelPrice > 10_000
  ) {
    throw new Error("ガソリン単価は1〜10,000円/Lの範囲で入力してください。");
  }

  const multiplier = input.tripType === "roundTrip" ? 2 : 1;
  const totalDistance = input.distance * multiplier;
  const fuelAmount = totalDistance / input.fuelEfficiency;
  const fuelCost = Math.round(fuelAmount * input.fuelPrice);

  return {
    totalDistance,
    fuelAmount,
    fuelCost,
    costPerKilometer: fuelCost / totalDistance,
  };
}

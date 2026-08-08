export type ComparableUnit = "g" | "kg" | "ml" | "l" | "個" | "枚" | "cm" | "m";

export type UnitPriceProduct = {
  price: number;
  quantity: number;
  unit: ComparableUnit;
};

export type UnitPriceResult = {
  baseUnit: string;
  productAUnitPrice: number;
  productBUnitPrice: number;
  better: "a" | "b" | "tie";
  savingRate: number;
};

const unitDefinitions: Record<
  ComparableUnit,
  { category: string; factor: number; baseUnit: string }
> = {
  g: { category: "weight", factor: 1, baseUnit: "g" },
  kg: { category: "weight", factor: 1_000, baseUnit: "g" },
  ml: { category: "volume", factor: 1, baseUnit: "ml" },
  l: { category: "volume", factor: 1_000, baseUnit: "ml" },
  個: { category: "count", factor: 1, baseUnit: "個" },
  枚: { category: "count-sheet", factor: 1, baseUnit: "枚" },
  cm: { category: "length", factor: 1, baseUnit: "cm" },
  m: { category: "length", factor: 100, baseUnit: "cm" },
};

export function compareUnitPrices(
  productA: UnitPriceProduct,
  productB: UnitPriceProduct,
): UnitPriceResult {
  validateProduct(productA, "商品A");
  validateProduct(productB, "商品B");

  const definitionA = unitDefinitions[productA.unit];
  const definitionB = unitDefinitions[productB.unit];
  if (definitionA.category !== definitionB.category) {
    throw new Error("商品Aと商品Bは同じ種類の単位で入力してください。");
  }

  const productAUnitPrice = productA.price / (productA.quantity * definitionA.factor);
  const productBUnitPrice = productB.price / (productB.quantity * definitionB.factor);
  const better =
    productAUnitPrice === productBUnitPrice
      ? "tie"
      : productAUnitPrice < productBUnitPrice
        ? "a"
        : "b";
  const higher = Math.max(productAUnitPrice, productBUnitPrice);
  const lower = Math.min(productAUnitPrice, productBUnitPrice);

  return {
    baseUnit: definitionA.baseUnit,
    productAUnitPrice,
    productBUnitPrice,
    better,
    savingRate: higher === 0 ? 0 : ((higher - lower) / higher) * 100,
  };
}

function validateProduct(product: UnitPriceProduct, label: string) {
  if (
    !Number.isSafeInteger(product.price) ||
    product.price < 1 ||
    product.price > 1_000_000_000
  ) {
    throw new Error(`${label}の価格は1円〜10億円の整数で入力してください。`);
  }
  if (
    !Number.isFinite(product.quantity) ||
    product.quantity <= 0 ||
    product.quantity > 1_000_000_000
  ) {
    throw new Error(`${label}の内容量は0より大きい数値で入力してください。`);
  }
  if (!Object.hasOwn(unitDefinitions, product.unit)) {
    throw new Error(`${label}の単位を選択してください。`);
  }
}

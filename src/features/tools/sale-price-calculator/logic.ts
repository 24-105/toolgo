export type SalePriceInput = {
  price: number;
  quantity: number;
  discountRate: number;
  taxRate: number;
};

export type SalePriceResult = {
  originalTotal: number;
  discountAmount: number;
  discountedTotal: number;
  taxAmount: number;
  total: number;
};

export function calculateSalePrice(input: SalePriceInput): SalePriceResult {
  if (
    !Number.isSafeInteger(input.price) ||
    input.price < 1 ||
    input.price > 100_000_000
  ) {
    throw new Error("商品の価格は1円〜1億円の整数で入力してください。");
  }
  if (!Number.isInteger(input.quantity) || input.quantity < 1 || input.quantity > 1_000) {
    throw new Error("個数は1〜1,000個の整数で入力してください。");
  }
  if (
    !Number.isFinite(input.discountRate) ||
    input.discountRate < 0 ||
    input.discountRate > 100
  ) {
    throw new Error("割引率は0〜100%で入力してください。");
  }
  if (![0, 0.08, 0.1].includes(input.taxRate)) {
    throw new Error("消費税率を選択してください。");
  }

  const originalTotal = input.price * input.quantity;
  const discountAmount = Math.round((originalTotal * input.discountRate) / 100);
  const discountedTotal = originalTotal - discountAmount;
  const taxAmount = Math.round(discountedTotal * input.taxRate);

  return {
    originalTotal,
    discountAmount,
    discountedTotal,
    taxAmount,
    total: discountedTotal + taxAmount,
  };
}

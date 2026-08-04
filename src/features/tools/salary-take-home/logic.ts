export type SalaryInput = {
  monthlyGross: number;
  prefecture: string;
  age40Plus: boolean;
  dependents: number;
  residentTax: number;
  actualSocialInsurance?: number;
  actualIncomeTax?: number;
  otherDeductions?: number;
};

export type SalaryResult = {
  socialInsurance: number;
  incomeTax: number;
  residentTax: number;
  otherDeductions: number;
  takeHome: number;
};

const PENSION_RATE = 0.0915;
const EMPLOYMENT_INSURANCE_RATE = 0.005;
const CHILD_SUPPORT_RATE = 0.0023;
const CARE_INSURANCE_RATE = 0.0162;

// 協会けんぽ令和8年度の都道府県単位保険料率（2026年4月分から）。
// https://www.kyoukaikenpo.or.jp/about/business/insurance_rate/rate_prefectures/r08/
export const PREFECTURE_RATES: Record<string, number> = {
  北海道: 0.1028,
  青森県: 0.0985,
  岩手県: 0.0951,
  宮城県: 0.101,
  秋田県: 0.1001,
  山形県: 0.0975,
  福島県: 0.095,
  茨城県: 0.0952,
  栃木県: 0.0982,
  群馬県: 0.0968,
  埼玉県: 0.0967,
  千葉県: 0.0973,
  東京都: 0.0985,
  神奈川県: 0.0992,
  新潟県: 0.0921,
  富山県: 0.0959,
  石川県: 0.097,
  福井県: 0.0971,
  山梨県: 0.0955,
  長野県: 0.0963,
  岐阜県: 0.098,
  静岡県: 0.0961,
  愛知県: 0.0993,
  三重県: 0.0977,
  滋賀県: 0.0988,
  京都府: 0.0989,
  大阪府: 0.1013,
  兵庫県: 0.1012,
  奈良県: 0.0991,
  和歌山県: 0.1006,
  鳥取県: 0.0986,
  島根県: 0.0994,
  岡山県: 0.1005,
  広島県: 0.0978,
  山口県: 0.1015,
  徳島県: 0.1024,
  香川県: 0.1002,
  愛媛県: 0.0998,
  高知県: 0.1005,
  福岡県: 0.1011,
  佐賀県: 0.1055,
  長崎県: 0.1006,
  熊本県: 0.1008,
  大分県: 0.1008,
  宮崎県: 0.0977,
  鹿児島県: 0.1013,
  沖縄県: 0.0944,
};

export function calculateTakeHome(input: SalaryInput): SalaryResult {
  if (
    !Number.isFinite(input.monthlyGross) ||
    input.monthlyGross <= 0 ||
    input.monthlyGross > 10_000_000
  ) {
    throw new Error("額面月収は1円〜1,000万円の範囲で入力してください。");
  }
  if (!(input.prefecture in PREFECTURE_RATES)) {
    throw new Error("都道府県を選択してください。");
  }
  if (
    !Number.isInteger(input.dependents) ||
    input.dependents < 0 ||
    input.dependents > 20
  ) {
    throw new Error("扶養人数は0〜20人の範囲で入力してください。");
  }
  if (
    !Number.isFinite(input.residentTax) ||
    input.residentTax < 0 ||
    input.residentTax > 1_000_000
  ) {
    throw new Error("住民税は0円〜100万円の範囲で入力してください。");
  }
  for (const value of [
    input.actualSocialInsurance,
    input.actualIncomeTax,
    input.otherDeductions,
  ]) {
    if (
      value !== undefined &&
      (!Number.isFinite(value) || value < 0 || value > 1_000_000)
    ) {
      throw new Error("控除額は0円〜100万円の範囲で入力してください。");
    }
  }

  const careRate = input.age40Plus ? CARE_INSURANCE_RATE : 0;
  const socialInsurance =
    input.actualSocialInsurance ??
    roundYen(
      input.monthlyGross *
        ((PREFECTURE_RATES[input.prefecture] + CHILD_SUPPORT_RATE + careRate) / 2 +
          PENSION_RATE +
          EMPLOYMENT_INSURANCE_RATE),
    );
  const annualGross = input.monthlyGross * 12;
  const annualSocialInsurance = socialInsurance * 12;
  const salaryIncomeDeduction = Math.max(650_000, annualGross * 0.3 + 80_000);
  const taxableIncome = Math.max(
    0,
    annualGross -
      salaryIncomeDeduction -
      annualSocialInsurance -
      620_000 -
      input.dependents * 380_000,
  );
  const incomeTax = input.actualIncomeTax ?? roundYen((taxableIncome * 0.05) / 12);
  const otherDeductions = input.otherDeductions ?? 0;
  const takeHome = roundYen(
    input.monthlyGross -
      socialInsurance -
      incomeTax -
      input.residentTax -
      otherDeductions,
  );

  return {
    socialInsurance,
    incomeTax,
    residentTax: input.residentTax,
    otherDeductions,
    takeHome,
  };
}

function roundYen(value: number) {
  return Math.max(0, Math.round(value));
}

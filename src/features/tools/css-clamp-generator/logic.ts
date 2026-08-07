export type ClampUnit = "px" | "rem";

export type ClampOptions = {
  minViewport: number;
  maxViewport: number;
  minValue: number;
  maxValue: number;
  unit: ClampUnit;
};

export type ClampResult = {
  value: string;
  css: string;
  slope: number;
  intercept: number;
};

function formatNumber(value: number) {
  const rounded = Math.round(value * 10_000) / 10_000;
  return Object.is(rounded, -0) ? "0" : String(rounded);
}

export function createClamp(options: ClampOptions): ClampResult {
  const { minViewport, maxViewport, minValue, maxValue, unit } = options;
  if (![minViewport, maxViewport, minValue, maxValue].every(Number.isFinite)) {
    throw new Error("数値を正しく入力してください。");
  }
  if (minViewport < 1 || maxViewport <= minViewport) {
    throw new Error("画面幅は1以上で、最大値を最小値より大きくしてください。");
  }
  if (minValue < 0 || maxValue < minValue) {
    throw new Error("サイズは0以上で、最大値を最小値以上にしてください。");
  }

  const slope = (maxValue - minValue) / (maxViewport - minViewport);
  const intercept = minValue - slope * minViewport;
  const slopeVw = slope * 100;
  const preferred =
    intercept === 0
      ? `${formatNumber(slopeVw)}vw`
      : `${formatNumber(intercept)}${unit} ${slopeVw < 0 ? "-" : "+"} ${formatNumber(Math.abs(slopeVw))}vw`;
  const value = `clamp(${formatNumber(minValue)}${unit}, ${preferred}, ${formatNumber(maxValue)}${unit})`;
  return {
    value,
    css: value,
    slope,
    intercept,
  };
}

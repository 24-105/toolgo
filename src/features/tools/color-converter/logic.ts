export type ColorValues = { hex: string; rgb: string; hsl: string };

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function convertColor(value: string): ColorValues {
  const normalized = value.trim();
  if (/^rgb\s*\(/iu.test(normalized)) return colorFromRgb(normalized);
  if (/^hsl\s*\(/iu.test(normalized)) return colorFromHsl(normalized);
  return colorFromHex(normalized);
}

function colorFromHex(value: string): ColorValues {
  const normalized = value.replace(/^#/, "");
  if (!/^[0-9a-f]{3}$|^[0-9a-f]{6}$/iu.test(normalized)) {
    throw new Error("3桁または6桁のHEXカラーを入力してください。");
  }

  const hex =
    normalized.length === 3
      ? normalized
          .split("")
          .map((character) => character + character)
          .join("")
      : normalized;
  const [red, green, blue] = [0, 2, 4].map((index) =>
    parseInt(hex.slice(index, index + 2), 16),
  );
  return createColorValues(red, green, blue);
}

export function colorFromRgb(value: string) {
  const match = value.match(/^\s*rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/iu);
  if (!match) throw new Error("rgb(0, 0, 0)の形式で入力してください。");
  const [red, green, blue] = match.slice(1).map(Number);
  if ([red, green, blue].some((channel) => channel < 0 || channel > 255)) {
    throw new Error("RGBの各値は0〜255で指定してください。");
  }
  return createColorValues(red, green, blue);
}

export function colorFromHsl(value: string) {
  const match = value.match(
    /^\s*hsl\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*\)\s*$/iu,
  );
  if (!match) throw new Error("hsl(0, 0%, 0%)の形式で入力してください。");
  const hue = Number(match[1]);
  const saturation = Number(match[2]);
  const lightness = Number(match[3]);
  if (saturation > 100 || lightness > 100) {
    throw new Error("彩度と明度は0〜100%で指定してください。");
  }

  const h = (((hue % 360) + 360) % 360) / 60;
  const s = saturation / 100;
  const l = lightness / 100;
  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const x = chroma * (1 - Math.abs((h % 2) - 1));
  const rgb =
    h < 1
      ? [chroma, x, 0]
      : h < 2
        ? [x, chroma, 0]
        : h < 3
          ? [0, chroma, x]
          : h < 4
            ? [0, x, chroma]
            : h < 5
              ? [x, 0, chroma]
              : [chroma, 0, x];
  const m = l - chroma / 2;
  return createColorValues(
    ...(rgb.map((channel) => Math.round((channel + m) * 255)) as [
      number,
      number,
      number,
    ]),
  );
}

function createColorValues(red: number, green: number, blue: number): ColorValues {
  const hex = [red, green, blue]
    .map((channel) => clamp(Math.round(channel), 0, 255).toString(16).padStart(2, "0"))
    .join("");
  const normalized = [red, green, blue].map((channel) => clamp(channel, 0, 255) / 255);
  const max = Math.max(...normalized);
  const min = Math.min(...normalized);
  const lightness = (max + min) / 2;
  const difference = max - min;
  let hue = 0;
  let saturation = 0;

  if (difference !== 0) {
    saturation = difference / (1 - Math.abs(2 * lightness - 1));
    if (max === normalized[0]) {
      hue = 60 * (((normalized[1] - normalized[2]) / difference) % 6);
    } else if (max === normalized[1]) {
      hue = 60 * ((normalized[2] - normalized[0]) / difference + 2);
    } else {
      hue = 60 * ((normalized[0] - normalized[1]) / difference + 4);
    }
  }

  return {
    hex: `#${hex.toUpperCase()}`,
    rgb: `rgb(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)})`,
    hsl: `hsl(${Math.round((hue + 360) % 360)}, ${Math.round(saturation * 100)}%, ${Math.round(lightness * 100)}%)`,
  };
}

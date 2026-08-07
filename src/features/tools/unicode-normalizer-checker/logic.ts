export type NormalizationForm = "NFC" | "NFD" | "NFKC" | "NFKD";

export type NormalizationResult = {
  form: NormalizationForm;
  value: string;
  changed: boolean;
  codePoints: string[];
};

export type SuspiciousCharacter = {
  character: string;
  looksLike: string;
  codePoint: string;
};

export type UnicodeAnalysis = {
  original: string;
  originalCodePoints: string[];
  forms: NormalizationResult[];
  suspiciousCharacters: SuspiciousCharacter[];
};

export const NORMALIZATION_FORMS: NormalizationForm[] = ["NFC", "NFD", "NFKC", "NFKD"];

const CONFUSABLES = new Map<string, string>([
  ["а", "a"],
  ["е", "e"],
  ["о", "o"],
  ["р", "p"],
  ["с", "c"],
  ["х", "x"],
  ["у", "y"],
  ["Α", "A"],
  ["Β", "B"],
  ["Ε", "E"],
  ["Η", "H"],
  ["Ι", "I"],
  ["Κ", "K"],
  ["Μ", "M"],
  ["Ν", "N"],
  ["Ο", "O"],
  ["Ρ", "P"],
  ["Τ", "T"],
  ["Χ", "X"],
  ["Υ", "Y"],
]);

function formatCodePoint(character: string) {
  return `U+${(character.codePointAt(0) ?? 0).toString(16).toUpperCase().padStart(4, "0")}`;
}

function codePoints(value: string) {
  return Array.from(value, formatCodePoint);
}

function hasLatin(value: string) {
  return Array.from(value).some((character) => {
    const point = character.codePointAt(0) ?? 0;
    return (point >= 0x41 && point <= 0x5a) || (point >= 0x61 && point <= 0x7a);
  });
}

function hasOtherScript(value: string) {
  return Array.from(value).some((character) => {
    const point = character.codePointAt(0) ?? 0;
    return (point >= 0x370 && point <= 0x3ff) || (point >= 0x400 && point <= 0x4ff);
  });
}

function findSuspiciousCharacters(value: string) {
  const hasMixedScript = hasLatin(value) && hasOtherScript(value);
  if (!hasMixedScript) return [];
  const seen = new Set<string>();
  const suspicious: SuspiciousCharacter[] = [];
  for (const character of Array.from(value)) {
    const looksLike = CONFUSABLES.get(character);
    if (!looksLike || seen.has(character)) continue;
    seen.add(character);
    suspicious.push({ character, looksLike, codePoint: formatCodePoint(character) });
  }
  return suspicious;
}

export function analyzeUnicode(value: string): UnicodeAnalysis {
  const forms = NORMALIZATION_FORMS.map((form) => {
    const normalized = value.normalize(form);
    return {
      form,
      value: normalized,
      changed: normalized !== value,
      codePoints: codePoints(normalized),
    };
  });
  return {
    original: value,
    originalCodePoints: codePoints(value),
    forms,
    suspiciousCharacters: findSuspiciousCharacters(value),
  };
}

export type PasswordOptions = {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

export const SYMBOL_CHARACTERS = "!#$%&()*+,-./:;<=>?@[\\]^_{|}~";

const characterSets = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: SYMBOL_CHARACTERS,
} as const;

export function generatePassword(options: PasswordOptions): string {
  const selectedSets = (
    Object.keys(characterSets) as Array<keyof typeof characterSets>
  ).filter((key) => options[key]);

  if (selectedSets.length === 0) {
    throw new Error("文字の種類を1つ以上選択してください。");
  }

  if (options.length < selectedSets.length) {
    throw new Error("文字の種類の数以上の長さを指定してください。");
  }

  const allCharacters = selectedSets.map((key) => characterSets[key]).join("");
  const passwordCharacters = selectedSets.map((key) =>
    randomCharacter(characterSets[key]),
  );

  while (passwordCharacters.length < options.length) {
    passwordCharacters.push(randomCharacter(allCharacters));
  }

  for (let index = passwordCharacters.length - 1; index > 0; index -= 1) {
    const swapIndex = secureRandomIndex(index + 1);
    [passwordCharacters[index], passwordCharacters[swapIndex]] = [
      passwordCharacters[swapIndex],
      passwordCharacters[index],
    ];
  }

  return passwordCharacters.join("");
}

function randomCharacter(characters: string) {
  return characters[secureRandomIndex(characters.length)];
}

function secureRandomIndex(max: number) {
  const values = new Uint32Array(1);
  const limit = Math.floor(0xffffffff / max) * max;

  do {
    crypto.getRandomValues(values);
  } while (values[0] >= limit);

  return values[0] % max;
}

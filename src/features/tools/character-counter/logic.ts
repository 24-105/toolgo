export type CharacterCount = {
  withSpaces: number;
  withoutSpaces: number;
  words: number;
  lines: number;
};

export function countCharacters(input: string): CharacterCount {
  const characters = Array.from(input);
  const words = input.trim() ? input.trim().split(/\s+/u).length : 0;
  const lines = input ? input.split(/\r?\n/u).length : 0;

  return {
    withSpaces: characters.length,
    withoutSpaces: characters.filter((character) => !/\s/u.test(character)).length,
    words,
    lines,
  };
}

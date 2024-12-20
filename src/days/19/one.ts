import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

function available(pattern: string, towels: string[]): boolean {
  if (pattern.length === 0) return true;

  const patternTowels = towels.filter((towel) => pattern.includes(towel));

  if (patternTowels.length === 0) return false;

  const largestTowel = Math.max(...patternTowels.map((towel) => towel.length));

  for (let i = largestTowel; i > 0; i--) {
    const part = pattern.slice(0, i);
    if (!patternTowels.includes(part)) continue;
    if (available(pattern.slice(i), towels)) return true;
  }

  return false;
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  let patterns: string[] = [];
  let towels: string[] = [];

  const [top, bot] = input.split("\n\n");

  towels = top.split(", ");
  patterns = bot.split("\n");

  return patterns.reduce(
    (total, pattern) => total + (available(pattern, towels) ? 1 : 0),
    0
  );
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(19);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

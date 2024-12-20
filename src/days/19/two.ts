import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

function available(
  pattern: string,
  towels: string[],
  cache: Map<string, number>
): number {
  if (cache.has(pattern)) return cache.get(pattern)!;

  if (pattern.length === 0) return 1;

  const possibleTowels = towels.filter((towel) => pattern.startsWith(towel));

  const count = possibleTowels.reduce(
    (total, towel) =>
      total + available(pattern.slice(towel.length), towels, cache),
    0
  );

  cache.set(pattern, count);

  return count;
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  let patterns: string[] = [];
  let towels: string[] = [];

  const [top, bot] = input.split("\n\n");

  towels = top.split(", ");
  patterns = bot.split("\n");

  return patterns.reduce(
    (total, pattern) => total + available(pattern, towels, new Map()),
    0
  );
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(19);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

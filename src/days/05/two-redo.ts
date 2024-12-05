import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

let rules: Record<number, number[]> = {};

/* -------------------------------------------------------------------------- */

function addRule(rule: number[]) {
  rules[rule[0]] = [...(rules[rule[0]] ?? []), rule[1]];
}

function sortByRules(a: number, b: number): number {
  if (!!rules[a] && rules[a].includes(b)) return -1;
  return 1;
}

/* -------------------------------------------------------------------------- */

// Inspired by Rob Habraken's solution: https://github.com/robhabraken/advent-of-code-2024/blob/main/solutions/05/part-2/Program.cs
function findSolution(input: string): number {
  const [rawRules, rawUpdates] = input.split("\n\n");

  rawRules.split("\n").forEach((rule) => {
    addRule(rule.split("|").map(Number));
  });

  return rawUpdates.split("\n").reduce((sum, rawUpdate) => {
    const pages = rawUpdate.split(",").map(Number).sort(sortByRules);

    // We didn't need to sort this update
    if (pages.join(",") === rawUpdate) return sum;

    // We did need to sort this update
    return (sum += pages[Math.floor(pages.length / 2)]);
  }, 0);
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(5);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

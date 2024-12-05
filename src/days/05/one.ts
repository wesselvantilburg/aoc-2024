import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

let ruleBook: { before: number; after: number }[] = [];

/* -------------------------------------------------------------------------- */

function createRuleBook(rules: string[]) {
  rules.forEach((rule) => {
    const [before, after] = rule.split("|").map(Number);
    ruleBook.push({ before, after });
  });
}

function updateCompliesToRules(pages: number[]): boolean {
  const rules = ruleBook.filter((rule) => {
    return pages.includes(rule.before) && pages.includes(rule.after);
  });

  const rulesPassed = rules.reduce((count, rule) => {
    const { before, after } = rule;

    return (count += pages.indexOf(before) < pages.indexOf(after) ? 1 : 0);
  }, 0);

  return rulesPassed === rules.length;
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  const [rawRules, rawUpdates] = input
    .split("\n\n")
    .map((line) => line.split("\n"));

  createRuleBook(rawRules);

  const updates = rawUpdates.map((update) => update.split(",").map(Number));

  const correctUpdates = updates.filter((update) => {
    return updateCompliesToRules(update);
  });

  return correctUpdates.reduce((sum, update) => {
    return (sum += update[Math.floor(update.length / 2)]);
  }, 0);
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(5);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

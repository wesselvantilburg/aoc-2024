import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

type Rule = { before: number; after: number };

/* -------------------------------------------------------------------------- */

let ruleBook: Rule[] = [];

/* -------------------------------------------------------------------------- */

function createRuleBook(rules: string[]) {
  rules.forEach((rule) => {
    const [before, after] = rule.split("|").map(Number);
    ruleBook.push({ before, after });
  });
}

function getRulesByPages(pages: number[]): Rule[] {
  return ruleBook.filter((rule) => {
    return pages.includes(rule.before) && pages.includes(rule.after);
  });
}

function updateCompliesToRules(pages: number[]): boolean {
  const rules = getRulesByPages(pages);

  const rulesPassed = rules.reduce((count, rule) => {
    const { before, after } = rule;

    return (count += pages.indexOf(before) < pages.indexOf(after) ? 1 : 0);
  }, 0);

  return rulesPassed === rules.length;
}

function applyRule(pages: number[], rule: Rule): number[] {
  return pages.sort((a, b) => {
    if (rule.before === a && rule.after === b) return -1;
    if (rule.after === a && rule.before === b) return 1;
    return 0;
  });
}

function fix(pages: number[]): number[] {
  const rules = getRulesByPages(pages);

  const fixed = rules.reduce((acc, rule) => {
    return applyRule(acc, rule);
  }, pages);

  if (!updateCompliesToRules(fixed)) fix(fixed);

  return fixed;
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  const [rawRules, rawUpdates] = input
    .split("\n\n")
    .map((line) => line.split("\n"));

  createRuleBook(rawRules);

  const updates = rawUpdates.map((update) => update.split(",").map(Number));

  const incorrectUpdates = updates.filter((update) => {
    return !updateCompliesToRules(update);
  });

  const correctUpdates = incorrectUpdates.map(fix);

  return correctUpdates.reduce((sum, update) => {
    return (sum += update[Math.floor(update.length / 2)]);
  }, 0);
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(5);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

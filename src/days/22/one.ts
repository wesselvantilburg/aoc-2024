import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

function mix(a: number, b: number): number {
  return Number(BigInt(a) ^ BigInt(b));
}

function prune(a: number): number {
  return a % 16777216;
}

function process(secret: number): number {
  let a = prune(mix(secret, secret * 64));
  let b = prune(mix(a, Math.floor(a / 32)));
  let c = prune(mix(b, b * 2048));
  return c;
}

function evolve(secret: number, count: number): number {
  let result = secret;
  for (let i = 0; i < count; i++) {
    result = process(result);
  }
  return result;
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  let results = [];

  const secrets = input.split("\n").map(Number);

  for (const secret of secrets) {
    results.push(evolve(secret, 2000));
  }

  return results.reduce((sum, result) => sum + result, 0);
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(22);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

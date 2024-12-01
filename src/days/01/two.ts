import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  const inputLines = input.split("\n");

  const left: number[] = [];
  const right: number[] = [];

  inputLines.forEach((line) => {
    const [l, r] = line.split("   ");
    left.push(Number(l));
    right.push(Number(r));
  });

  let result = 0;

  const occurences: Record<number, number> = {};

  right.forEach((locationID) => {
    occurences[locationID] = (occurences[locationID] ?? 0) + 1;
  });

  left.forEach((locationID) => {
    result += locationID * (occurences[locationID] ?? 0);
  });

  return result;
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(1);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  const inputLines = input.split("\n");

  let result = 0;

  return result;
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(1);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

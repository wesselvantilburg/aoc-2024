import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  const inputLines = input.split("\n");

  const left: number[] = [];
  const right: number[] = [];

  for (let i = 0; i < inputLines.length; i++) {
    const [a, b] = inputLines[i].split("   ");
    left.push(Number(a));
    right.push(Number(b));
  }

  let sum = 0;

  for (let i = 0; i < left.length; i++) {
    const occurance = right.filter((r) => r === left[i]).length;
    sum += left[i] * occurance;
  }

  return sum;
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(1);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

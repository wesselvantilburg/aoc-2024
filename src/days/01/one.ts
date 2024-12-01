import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  const inputLines = input.split("\n");

  const left = [];
  const right = [];

  for (let i = 0; i < inputLines.length; i++) {
    const [a, b] = inputLines[i].split("   ");
    left.push(Number(a));
    right.push(Number(b));
  }

  const sortedLeft = left.sort();
  const sortedRight = right.sort();

  let sum = 0;

  for (let i = 0; i < sortedLeft.length; i++) {
    sum += Math.abs(sortedLeft[i] - sortedRight[i]);
  }

  return sum;
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(1);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

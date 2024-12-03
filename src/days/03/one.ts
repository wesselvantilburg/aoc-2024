import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

const multiplicatioRegEx = /mul\(\d{1,3},\d{1,3}\)/g;

/* -------------------------------------------------------------------------- */

function extractMultiplication(mul: string): Array<number> {
  return mul.replace("mul(", "").replace(")", "").split(",").map(Number);
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  const multiplications = input.match(multiplicatioRegEx);

  if (!multiplications) return 0;

  return multiplications.reduce((sum, mul) => {
    const [x, y] = extractMultiplication(mul);
    return (sum += x * y);
  }, 0);
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(3);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

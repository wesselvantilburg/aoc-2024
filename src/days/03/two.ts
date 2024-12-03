import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

const operationRegEx = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;

/* -------------------------------------------------------------------------- */

function extractMultiplication(mul: string): Array<number> {
  return mul.replace("mul(", "").replace(")", "").split(",").map(Number);
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  const operations = input.match(operationRegEx);

  if (!operations) return 0;

  let operationEnabled = true;

  return operations.reduce((sum, operation) => {
    if (operation.includes("do()")) operationEnabled = true;
    if (operation.includes("don't()")) operationEnabled = false;

    if (operation.includes("mul")) {
      const [x, y] = extractMultiplication(operation);
      return operationEnabled ? (sum += x * y) : sum;
    }
    return sum;
  }, 0);
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(3);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

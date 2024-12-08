import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

function canSolve(target: number, numbers: number[]): boolean {
  // One number left and our target is equal to that number this equation is solvable
  if (numbers.length === 1) return target === numbers[0];

  // We go from the back to the front
  const lastNumber = numbers[numbers.length - 1];

  // 1. Target divisble by last number (* operation)
  if (
    target % lastNumber === 0 &&
    canSolve(target / lastNumber, numbers.slice(0, numbers.length - 1))
  ) {
    return true;
  }

  // 2. Target greater than last number (+ operation)
  if (
    target > lastNumber &&
    canSolve(target - lastNumber, numbers.slice(0, numbers.length - 1))
  ) {
    return true;
  }

  // 3. Target as string ends with last number as string (|| operation)
  const targetString = target.toString();
  const lastString = lastNumber.toString();

  if (
    targetString.length > lastString.length &&
    targetString.endsWith(lastString) &&
    canSolve(
      Number(
        targetString.substring(0, targetString.length - lastString.length)
      ),
      numbers.slice(0, numbers.length - 1)
    )
  ) {
    return true;
  }

  return false;
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  let total = 0;

  input.split("\n").map((line) => {
    const [t, n] = line.split(": ");
    const target = Number(t);
    const numbers = n.split(" ").map(Number);
    if (canSolve(target, numbers)) total += target;
  });

  return total;
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(7);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

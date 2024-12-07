import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

type Equation = { goal: number; numbers: number[] };

/* -------------------------------------------------------------------------- */

const operations = ["+", "*", "||"];

/* -------------------------------------------------------------------------- */

let equations: Array<Equation> = [];

/* -------------------------------------------------------------------------- */

function solve(goal: number, total: number, numbers: number[]): boolean {
  const current = numbers[0];
  const remaining = numbers.slice(1);

  for (let i = 0; i < operations.length; i++) {
    const operation = operations[i];
    const newTotal =
      operation === "+"
        ? total + current
        : operation === "*"
        ? total * current
        : Number(total.toString() + current.toString());

    // If we reached the goal and we have no numbers remaining, we have a correct equation
    if (newTotal === goal && remaining.length === 0) return true;

    // If we have not reached the end (goal or remaining numbers)
    if (newTotal <= goal && remaining.length > 0) {
      // If we can solve the remainder, the equation is solvable
      // Otherwise we go continue with the next operation
      if (solve(goal, newTotal, remaining)) return true;
      else continue;
    }
  }
  // If we didn't return true already,
  // we tried all possibilites of the equation and they were not solvable.
  return false;
}

function canSolve(equation: Equation): boolean {
  return solve(equation.goal, equation.numbers[0], equation.numbers.slice(1));
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  input.split("\n").map((line) => {
    const [result, numbers] = line.split(":");
    equations.push({
      goal: Number(result),
      numbers: numbers.trim().split(" ").map(Number),
    });
  });

  return equations.reduce((sum, equation) => {
    return (sum += canSolve(equation) ? equation.goal : 0);
  }, 0);
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(7);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

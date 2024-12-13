import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

type Machine = {
  a: { x: number; y: number };
  b: { x: number; y: number };
  prize: { x: number; y: number };
};

/* -------------------------------------------------------------------------- */

const machines: Machine[] = [];
const prices: number[] = [];

/* -------------------------------------------------------------------------- */

function getCombinations(
  machine: Machine
): { a: number; b: number; price: number }[] {
  let combinations: { a: number; b: number; price: number }[] = [];

  for (let i = 1; i <= 100; i++) {
    const amount = machine.a.x * i;
    const remaining = machine.prize.x - amount;

    if (remaining < machine.b.x) break;
    // The remaining amount is larger than b.x

    if (remaining % machine.b.x !== 0) continue;
    // The remaining amount can be divised by b.x

    const amountOfBPresses = remaining / machine.b.x;

    if (amountOfBPresses > 100) continue;
    // The amount of presses is below or equal to 100

    const combination = {
      a: i,
      b: amountOfBPresses,
      price: i * 3 + amountOfBPresses,
    };

    combinations.push(combination);
  }
  return combinations;
}

function findMinimumPrice(machine: Machine) {
  const combinations = getCombinations(machine);

  if (combinations.length === 0) return;

  // For each combination we found in the x's we will check if we can also solve the y's (preferably the cheapest x option)
  const sortedCombinations = combinations.sort((a, b) => a.price - b.price);
  for (const combination of sortedCombinations) {
    if (
      machine.a.y * combination.a + machine.b.y * combination.b ===
      machine.prize.y
    ) {
      prices.push(combination.price);
      break;
    }
  }
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  input.split("\n\n").map((block) => {
    let machine = {
      a: { x: 0, y: 0 },
      b: { x: 0, y: 0 },
      prize: { x: 0, y: 0 },
    };
    block.split("\n").forEach((line) => {
      if (line.startsWith("Button A")) {
        const [left, right] = line.split("Button A: ")[1].split(", ");
        machine.a.x = Number(left.split("+")[1]);
        machine.a.y = Number(right.split("+")[1]);
      }
      if (line.startsWith("Button B")) {
        const [left, right] = line.split("Button B: ")[1].split(", ");
        machine.b.x = Number(left.split("+")[1]);
        machine.b.y = Number(right.split("+")[1]);
      }
      if (line.startsWith("Prize")) {
        const [left, right] = line.split("Prize: ")[1].split(", ");
        machine.prize.x = Number(left.split("=")[1]);
        machine.prize.y = Number(right.split("=")[1]);
      }
    });
    machines.push(machine);
  });

  for (const machine of machines) {
    findMinimumPrice(machine);
  }

  return prices.reduce((count, price) => {
    return count + price;
  }, 0);
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(13);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

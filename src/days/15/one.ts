import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

const instructionMap = { "^": [0, -1], ">": [1, 0], v: [0, 1], "<": [-1, 0] };

/* -------------------------------------------------------------------------- */

let warehouse: string[][] = [];
let instructions: string[] = [];

let robotPosition: number[] = [0, 0];

/* -------------------------------------------------------------------------- */

function drawWarehouse() {
  for (const row of warehouse) {
    console.log(row.join(""));
  }
}

function moveTile(from: number[], to: number[]) {
  warehouse[to[1]][to[0]] = warehouse[from[1]][from[0]];
  warehouse[from[1]][from[0]] = ".";
  if (warehouse[to[1]][to[0]] === "@") {
    robotPosition = [to[0], to[1]];
  }
  return true;
}

function move(from: number[], direction: number[]): boolean {
  const dx = from[0] + direction[0];
  const dy = from[1] + direction[1];

  const destinationTile = warehouse[dy][dx];

  switch (destinationTile) {
    case ".":
      return moveTile(from, [dx, dy]);
    case "O":
      if (move([dx, dy], direction)) {
        return moveTile(from, [dx, dy]);
      }
      return false;
    case "#":
    default:
      return false;
  }
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  const [top, bot] = input.split("\n\n");

  warehouse = top.split("\n").map((line, row) =>
    line.split("").map((char, col) => {
      if (char === "@") {
        robotPosition = [col, row];
      }
      return char;
    })
  );
  instructions = bot.replaceAll("\n", "").split("");

  while (instructions.length > 0) {
    const instruction = instructions.shift() as "^" | ">" | "v" | "<";
    const direction = instructionMap[instruction];
    move(robotPosition, direction);
  }

  let total = 0;
  for (let y = 1; y < warehouse.length - 1; y++) {
    for (let x = 1; x < warehouse[0].length - 1; x++) {
      if (warehouse[y][x] === "O") {
        total += 100 * y + x;
      }
    }
  }

  return total;
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(15);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

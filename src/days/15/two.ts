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

function moveTile(from: number[], direction: number[]): boolean {
  const dx = from[0] + direction[0];
  const dy = from[1] + direction[1];

  const destinationTile = warehouse[dy][dx];

  switch (destinationTile) {
    case ".":
      warehouse[dy][dx] = warehouse[from[1]][from[0]];
      warehouse[from[1]][from[0]] = ".";
      if (warehouse[dy][dx] === "@") {
        robotPosition = [dx, dy];
      }
      return true;
    case "[":
      if (direction[0] === -1) {
        if (moveTile([dx, dy], direction)) return moveTile(from, direction);
      }
      if (moveTile([dx + 1, dy], direction) && moveTile([dx, dy], direction)) {
        return moveTile(from, direction);
      }
    case "]":
      if (direction[0] === 1) {
        if (moveTile([dx, dy], direction)) return moveTile(from, direction);
      }
      if (moveTile([dx - 1, dy], direction) && moveTile([dx, dy], direction)) {
        return moveTile(from, direction);
      }
  }
  return false;
}

function canMove(from: number[], direction: number[]): boolean {
  const dx = from[0] + direction[0];
  const dy = from[1] + direction[1];

  const destinationTile = warehouse[dy][dx];

  if (destinationTile === ".") return true;

  if (destinationTile === "#") return false;

  if (destinationTile === "]") {
    // If we want to go right and the destination is "]", we are "["
    if (direction[0] === 1) {
      return canMove([dx, dy], direction);
    }
    return canMove([dx - 1, dy], direction) && canMove([dx, dy], direction);
  }
  if (destinationTile === "[") {
    // If we want to go left and the destination is "[", we are "]"
    if (direction[0] === -1) {
      return canMove([dx, dy], direction);
    }
    return canMove([dx, dy], direction) && canMove([dx + 1, dy], direction);
  }

  return false;
}

function move(from: number[], direction: number[]) {
  if (canMove(from, direction)) {
    moveTile(from, direction);
  }
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  const [top, bot] = input.split("\n\n");

  warehouse = top.split("\n").map((line, row) =>
    line.split("").flatMap((char, col) => {
      if (char === "@") {
        robotPosition = [col * 2, row];
        return [char, "."];
      }
      if (char === "#") {
        return ["#", "#"];
      }
      if (char === "O") {
        return ["[", "]"];
      }
      return [char, char];
    })
  );
  instructions = bot.replaceAll("\n", "").split("");

  while (instructions.length > 0) {
    const instruction = instructions.shift() as "^" | ">" | "v" | "<";
    move(robotPosition, instructionMap[instruction]);
  }

  let total = 0;
  for (let y = 1; y < warehouse.length - 1; y++) {
    for (let x = 1; x < warehouse[0].length - 1; x++) {
      if (warehouse[y][x] === "[") {
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

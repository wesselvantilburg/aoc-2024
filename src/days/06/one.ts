import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

const directionMap: Record<string, number[]> = {
  "^": [0, -1],
  ">": [1, 0],
  v: [0, 1],
  "<": [-1, 0],
};

/* -------------------------------------------------------------------------- */

let grid: string[][] = [];
let elf = "^";
let position: number[] = [0, 0];
let positionsVisited: Set<string> = new Set();

/* -------------------------------------------------------------------------- */

function rotate() {
  switch (elf) {
    case "^":
      elf = ">";
      break;
    case ">":
      elf = "v";
      break;
    case "v":
      elf = "<";
      break;
    case "<":
      elf = "^";
      break;
  }
}

function move(direction: number[]): boolean {
  const nextPos = [position[0] + direction[0], position[1] + direction[1]];
  if (grid[nextPos[1]][nextPos[0]] === "#") {
    rotate();
    return false;
  }
  position = nextPos;
  return true;
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  grid = input.split("\n").map((line, row) => {
    const chars = line.split("");
    chars.forEach((char, col) => {
      if (!Object.keys(directionMap).includes(char)) return;
      elf = char;
      position = [col, row];
      positionsVisited.add([col, row].join(","));
    });
    return chars;
  });

  while (position[1] < grid.length - 1 && position[0] < grid[0].length - 1) {
    if (move(directionMap[elf])) {
      positionsVisited.add(position.join(","));
    }
  }

  return positionsVisited.size;
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(6);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

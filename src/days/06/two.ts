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
let startPosition: number[] = [0, 0];
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

function move(grid: string[][], direction: number[]): boolean {
  const nextPos = [position[0] + direction[0], position[1] + direction[1]];
  if (!isOnGrid(grid, nextPos)) {
    position = nextPos;
    return false;
  }
  if (grid[nextPos[1]][nextPos[0]] === "#") {
    rotate();
    return false;
  }
  position = nextPos;
  return true;
}

function isOnGrid(grid: string[][], position: number[]): boolean {
  return (
    position[1] < grid.length &&
    position[0] < grid[0].length &&
    position[1] >= 0 &&
    position[0] >= 0
  );
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  // Setup grid and guard elf
  grid = input.split("\n").map((line, row) => {
    const chars = line.split("");
    chars.forEach((char, col) => {
      if (!Object.keys(directionMap).includes(char)) return;
      elf = char;
      startPosition = [col, row];
      position = startPosition;
      positionsVisited.add(startPosition.join(","));
    });
    return chars;
  });

  while (isOnGrid(grid, position)) {
    if (move(grid, directionMap[elf])) {
      positionsVisited.add(position.join(","));
    }
  }

  return [...positionsVisited].reduce((count, pos) => {
    if (pos === startPosition.join(",")) return count;
    // Reset position and direction
    position = startPosition;
    elf = "^";

    // Add obstruction
    const gridCopy = grid.map((row) => [...row]);
    gridCopy[Number(pos.split(",")[1])][Number(pos.split(",")[0])] = "#";

    let posWithDir: Set<string> = new Set();

    while (isOnGrid(gridCopy, position)) {
      move(gridCopy, directionMap[elf]);

      if (posWithDir.has(position.join(",") + elf)) {
        return (count += 1);
      } else {
        posWithDir.add(position.join(",") + elf);
      }
    }
    return count;
  }, 0);
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(6);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

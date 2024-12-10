import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

/* -------------------------------------------------------------------------- */

let grid: number[][] = [];
let trailheads: number[][] = [];

/* -------------------------------------------------------------------------- */

function isOnGrid(position: number[]): boolean {
  // Y outside bounds
  if (position[1] < 0 || position[1] > grid.length - 1) return false;
  // X outside bounds
  if (position[0] < 0 || position[0] > grid[0].length - 1) return false;

  return true;
}

function getTrailScore(trailhead: number[]): number {
  let ninesFound: Set<string> = new Set();

  function getScore(position: number[]) {
    if (grid[position[1]][position[0]] === 9) {
      ninesFound.add(position.join(","));
      return;
    }

    directions.forEach((direction) => {
      const goToX = position[0] + direction[0];
      const goToY = position[1] + direction[1];

      if (isOnGrid([goToX, goToY])) {
        if (grid[goToY][goToX] - grid[position[1]][position[0]] === 1) {
          getScore([goToX, goToY]);
        }
      }
    });
  }

  getScore(trailhead);

  return ninesFound.size;
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  grid = input.split("\n").map((line, row) =>
    line.split("").map((char, col) => {
      if (char === "0") {
        trailheads.push([col, row]);
      }
      return Number(char);
    })
  );

  return trailheads.reduce((total, trailhead) => {
    return (total += getTrailScore(trailhead));
  }, 0);
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(10);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

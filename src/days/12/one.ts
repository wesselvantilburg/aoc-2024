import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

type Region = {
  area: number;
  perimeter: number;
};

/* -------------------------------------------------------------------------- */

const directions = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const visited: Set<string> = new Set();

/* -------------------------------------------------------------------------- */

let grid: string[][] = [];

let regions: Region[] = [];

/* -------------------------------------------------------------------------- */

function isOnGrid(position: number[]): boolean {
  // Y outside bounds
  if (position[1] < 0 || position[1] > grid.length - 1) return false;
  // X outside bounds
  if (position[0] < 0 || position[0] > grid[0].length - 1) return false;

  return true;
}

function getNeighbour(
  position: number[],
  direction: number[]
): string | undefined {
  const dx = position[0] + direction[0];
  const dy = position[1] + direction[1];

  if (!isOnGrid([dx, dy])) return undefined;

  return grid[dy][dx];
}

function getRegion(start: number[]) {
  // We've been here before, so we already have this region mapped
  if (visited.has(`${start[0]}-${start[1]}`)) {
    return;
  }

  let plant = grid[start[1]][start[0]];
  let region = { area: 0, perimeter: 0 };

  function walk(position: number[]) {
    if (!isOnGrid(position)) return;

    const key = `${position[0]}-${position[1]}`;

    if (visited.has(key)) return;
    if (grid[position[1]][position[0]] !== plant) return;

    visited.add(key);
    region.area += 1;

    for (const direction of directions) {
      const neighbour = getNeighbour(position, direction);
      if (neighbour !== plant) {
        region.perimeter += 1;
      }

      walk([position[0] + direction[0], position[1] + direction[1]]);
    }
  }

  walk(start);

  regions.push(region);
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  grid = input.split("\n").map((line) => line.split(""));

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      getRegion([col, row]);
    }
  }

  return regions.reduce((total, region) => {
    return total + region.area * region.perimeter;
  }, 0);
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(12);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

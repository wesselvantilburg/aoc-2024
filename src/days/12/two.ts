import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

type Region = {
  area: number;
  sides: number;
};

type Direction = "up" | "right" | "down" | "left";

type Perimeter = {
  x: number;
  y: number;
  direction: Direction;
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

function countHorizontalSides(perimeters: Perimeter[]): number {
  let sides = 1;
  for (let i = 1; i < perimeters.length; i++) {
    if (
      perimeters[i].x - perimeters[i - 1].x !== 1 ||
      perimeters[i].y !== perimeters[i - 1].y
    ) {
      sides += 1;
    }
  }
  return sides;
}

function countVerticalSides(perimeters: Perimeter[]): number {
  let sides = 1;
  for (let i = 1; i < perimeters.length; i++) {
    if (
      perimeters[i].y - perimeters[i - 1].y !== 1 ||
      perimeters[i].x !== perimeters[i - 1].x
    ) {
      sides += 1;
    }
  }
  return sides;
}

function countSides(perimeters: Perimeter[]): number {
  const tops = perimeters
    .filter((perimeter) => perimeter.direction === "up")
    .sort((a, b) => {
      if (a.y === b.y) {
        return a.x - b.x;
      }
      return a.y - b.y;
    });

  const bottoms = perimeters
    .filter((perimeter) => perimeter.direction === "down")
    .sort((a, b) => {
      if (a.y === b.y) {
        return a.x - b.x;
      }
      return a.y - b.y;
    });

  let topSides = countHorizontalSides(tops);
  let bottomSides = countHorizontalSides(bottoms);

  const rights = perimeters
    .filter((perimeter) => perimeter.direction === "right")
    .sort((a, b) => {
      if (a.x === b.x) {
        return a.y - b.y;
      }
      return a.x - b.x;
    });
  const lefts = perimeters
    .filter((perimeter) => perimeter.direction === "left")
    .sort((a, b) => {
      if (a.x === b.x) {
        return a.y - b.y;
      }
      return a.x - b.x;
    });

  const rightSides = countVerticalSides(rights);
  const leftSides = countVerticalSides(lefts);

  return topSides + rightSides + bottomSides + leftSides;
}

function getRegion(start: number[]) {
  // We've been here before, so we already have this region mapped
  if (visited.has(`${start[0]}-${start[1]}`)) {
    return;
  }

  let plant = grid[start[1]][start[0]];
  let region: Region = { area: 0, sides: 0 };
  let perimeters: Perimeter[] = [];

  function walk(position: number[]) {
    if (!isOnGrid(position)) return;

    const key = `${position[0]}-${position[1]}`;

    if (visited.has(key)) return;
    if (grid[position[1]][position[0]] !== plant) return;

    if (visited) visited.add(key);
    region.area += 1;

    for (let i = 0; i < directions.length; i++) {
      const neighbour = getNeighbour(position, directions[i]);
      if (neighbour !== plant) {
        const direction: Direction =
          i === 0 ? "up" : i === 1 ? "right" : i === 2 ? "down" : "left";
        const perimeter = {
          x: position[0],
          y: position[1],
          direction,
        };
        perimeters.push(perimeter);
      }

      walk([position[0] + directions[i][0], position[1] + directions[i][1]]);
    }

    return true;
  }

  walk(start);

  region.sides = countSides(perimeters);

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
    return total + region.area * region.sides;
  }, 0);
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(12);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

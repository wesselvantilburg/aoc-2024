import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

type Coordinate = { x: number; y: number };

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

/* -------------------------------------------------------------------------- */

let matrix: string[][] = [];

/* -------------------------------------------------------------------------- */

function jumpToCell(
  from: Coordinate,
  direction: Coordinate,
  distance: number = 1
): string {
  return (
    matrix[from.y + direction.y * distance]?.[
      from.x + direction.x * distance
    ] ?? ""
  );
}

function findMasFromCoord(coord: Coordinate): number {
  return directions.reduce((count, direction) => {
    const [x, y] = direction;

    if (jumpToCell(coord, { x, y }) !== "M") return count;
    if (jumpToCell(coord, { x, y }, 2) !== "A") return count;
    if (jumpToCell(coord, { x, y }, 3) !== "S") return count;

    return (count += 1);
  }, 0);
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  matrix = input.split("\n").map((line) => line.split(""));

  let found = 0;

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const char = matrix[y][x];
      if (char === "X") {
        // We found a start point, check the surroundings for "MAS"
        found += findMasFromCoord({ x, y });
      }
    }
  }

  return found;
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(4);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

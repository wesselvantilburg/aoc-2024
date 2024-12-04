import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

type Coordinate = { x: number; y: number };

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

function isXMas(coord: Coordinate): boolean {
  const d1 =
    jumpToCell(coord, { x: -1, y: -1 }) + jumpToCell(coord, { x: 1, y: 1 });
  const d2 =
    jumpToCell(coord, { x: 1, y: -1 }) + jumpToCell(coord, { x: -1, y: 1 });

  return (d1 === "MS" || d1 === "SM") && (d2 === "MS" || d2 === "SM");
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  matrix = input.split("\n").map((line) => line.split(""));

  let found = 0;

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const char = matrix[y][x];
      if (char === "A") {
        // We found a start point, check the surroundings for "MAS"
        found += isXMas({ x, y }) ? 1 : 0;
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

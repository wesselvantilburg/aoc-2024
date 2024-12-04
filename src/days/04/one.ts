import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

type Coordinate = { x: number; y: number };

const directions: Record<string, Coordinate> = {
  u: { x: 0, y: -1 },
  ur: { x: 1, y: -1 },
  r: { x: 1, y: 0 },
  dr: { x: 1, y: 1 },
  d: { x: 0, y: 1 },
  dl: { x: -1, y: 1 },
  l: { x: -1, y: 0 },
  ul: { x: -1, y: -1 },
};

/* -------------------------------------------------------------------------- */

function getCellInDirection(
  matrix: string[][],
  coord: Coordinate,
  direction: Coordinate
): string {
  return matrix[coord.y + direction.y]?.[coord.x + direction.x] ?? "";
}

function findMasFromCoord(matrix: string[][], startCoord: Coordinate): number {
  return Object.entries(directions).reduce((count, [_, directionCoord]) => {
    let mas = "";
    mas += getCellInDirection(matrix, startCoord, directionCoord);
    mas += getCellInDirection(matrix, startCoord, {
      x: directionCoord.x * 2,
      y: directionCoord.y * 2,
    });
    mas += getCellInDirection(matrix, startCoord, {
      x: directionCoord.x * 3,
      y: directionCoord.y * 3,
    });
    return (count += mas === "MAS" ? 1 : 0);
  }, 0);
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  const inputMatrix = input.split("\n").map((line) => line.split(""));

  let found = 0;

  for (let y = 0; y < inputMatrix.length; y++) {
    for (let x = 0; x < inputMatrix[y].length; x++) {
      const char = inputMatrix[y][x];
      if (char === "X") {
        // We found a start point, check the surroundings for "MAS"
        found += findMasFromCoord(inputMatrix, { x, y });
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

import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

type Coordinate = { x: number; y: number };

const directions: Record<string, Coordinate> = {
  ur: { x: 1, y: -1 },
  dr: { x: 1, y: 1 },
  dl: { x: -1, y: 1 },
  ul: { x: -1, y: -1 },
};

const diagonalMS = ["MS", "SM"];

/* -------------------------------------------------------------------------- */

function getCellInDirection(
  matrix: string[][],
  coord: Coordinate,
  direction: Coordinate
): string {
  return matrix[coord.y + direction.y]?.[coord.x + direction.x] ?? "";
}

function findXMasFromCoord(matrix: string[][], startCoord: Coordinate): number {
  let ulDiagonal =
    getCellInDirection(matrix, startCoord, directions.ul) +
    getCellInDirection(matrix, startCoord, directions.dr);

  let urDiagonal =
    getCellInDirection(matrix, startCoord, directions.ur) +
    getCellInDirection(matrix, startCoord, directions.dl);

  return diagonalMS.includes(ulDiagonal) && diagonalMS.includes(urDiagonal)
    ? 1
    : 0;
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  const inputMatrix = input.split("\n").map((line) => line.split(""));

  let found = 0;

  for (let y = 0; y < inputMatrix.length; y++) {
    for (let x = 0; x < inputMatrix[y].length; x++) {
      const char = inputMatrix[y][x];
      if (char === "A") {
        // We found a start point, check for "MAS" in an X pattern
        found += findXMasFromCoord(inputMatrix, { x, y });
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

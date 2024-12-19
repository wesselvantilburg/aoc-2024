import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

type Point = { x: number; y: number };
type Node = { point: Point; distance: number };

/* -------------------------------------------------------------------------- */

const directions = [
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
];

/* -------------------------------------------------------------------------- */

function drawGrid(grid: string[][]) {
  for (const row of grid) {
    console.log(row.join(""));
  }
}

function createGrid(size: number, bytes: number[][]): string[][] {
  // Create empty grid
  let grid: string[][] = [];
  for (let y = 0; y < size; y++) {
    let row = [];
    for (let x = 0; x < size; x++) {
      row.push(".");
    }
    grid.push(row);
  }

  // Add first # of fallen bytes
  for (const byte of bytes) {
    grid[byte[1]][byte[0]] = "#";
  }

  return grid;
}

function dijkstra(grid: string[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;

  const isValid = (x: number, y: number): boolean =>
    x >= 0 && x < cols && y >= 0 && y < rows && grid[y][x] === ".";

  const distances: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(Infinity)
  );
  const visited = new Set<string>();

  const priorityQueue: Node[] = [{ point: { x: 0, y: 0 }, distance: 0 }];
  distances[0][0] = 0;

  const serialize = (point: Point) => `${point.x},${point.y}`;

  while (priorityQueue.length > 0) {
    priorityQueue.sort((a, b) => a.distance - b.distance);
    const { point, distance } = priorityQueue.shift()!;
    const { x, y } = point;

    if (visited.has(serialize(point))) continue;
    visited.add(serialize(point));

    if (x === cols - 1 && y === rows - 1) return distance;

    for (const direction of directions) {
      const nx = x + direction.x;
      const ny = y + direction.y;

      if (isValid(nx, ny) && !visited.has(serialize({ x: nx, y: ny }))) {
        const newDistance = distance + 1;
        if (newDistance < distances[ny][nx]) {
          distances[ny][nx] = newDistance;
          priorityQueue.push({
            point: { x: nx, y: ny },
            distance: newDistance,
          });
        }
      }
    }
  }

  return -1;
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): string {
  // Parse input bytes
  const bytes: number[][] = input
    .split("\n")
    .map((line) => line.split(",").map(Number));

  const gridSize = 71;
  const byteAmount = 1024;

  let blockingByte = [0, 0];
  for (let i = 1; i < bytes.length - byteAmount; i++) {
    const grid = createGrid(gridSize, bytes.slice(0, byteAmount + i));
    if (dijkstra(grid) === -1) {
      blockingByte = bytes[byteAmount - 1 + i];
      break;
    }
  }

  return blockingByte.join(",");
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(18);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

let grid: string[][] = [];
let antennas: Record<string, number[][]> = {};
let antinodes: Set<string> = new Set();

/* -------------------------------------------------------------------------- */

function isOnGrid(position: number[]): boolean {
  // Y outside bounds
  if (position[1] < 0 || position[1] > grid.length - 1) return false;
  // X outside bounds
  if (position[0] < 0 || position[0] > grid[0].length - 1) return false;

  return true;
}

function canPlaceAntinode(pos: number[]): boolean {
  if (!isOnGrid(pos)) return false;

  // Antinode already exists at location
  if (antinodes.has(pos.join(","))) return false;

  return true;
}

function placeAntinodeIfPossible(position: number[]) {
  if (canPlaceAntinode(position)) antinodes.add(position.join(","));
}

function placeAntinodes(l1: number[], l2: number[]) {
  // Every antenna can now also be an antinode (if possible)
  placeAntinodeIfPossible(l1);
  placeAntinodeIfPossible(l2);

  const dx = l2[0] - l1[0];
  const dy = l2[1] - l1[1];

  // Possible antinodes in direction 1
  let nextPos = [l1[0] - dx, l1[1] - dy];
  while (isOnGrid(nextPos)) {
    placeAntinodeIfPossible(nextPos);
    nextPos = [nextPos[0] - dx, nextPos[1] - dy];
  }

  // Possible antinodes in direction 2
  nextPos = [l2[0] + dx, l2[1] + dy];
  while (isOnGrid(nextPos)) {
    placeAntinodeIfPossible(nextPos);
    nextPos = [nextPos[0] + dx, nextPos[1] + dy];
  }
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  grid = input.split("\n").map((line, r) => {
    const chars = line.split("");
    for (let c = 0; c < chars.length; c++) {
      if (chars[c] !== ".") {
        antennas[chars[c]] = [...(antennas[chars[c]] ?? []), [c, r]];
      }
    }
    return chars;
  });

  Object.keys(antennas).forEach((antenna) => {
    // For each location of the antenna we look for the opposing antennas,
    // We try to place an antinode in both opposing positions plus their delta
    for (let i = 0; i < antennas[antenna].length; i++) {
      let currentLocation = antennas[antenna][i];
      for (let j = 0; j < antennas[antenna].length; j++) {
        if (i === j) continue;
        let tryLocation = antennas[antenna][j];
        placeAntinodes(currentLocation, tryLocation);
      }
    }
  });

  return antinodes.size;
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(8);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

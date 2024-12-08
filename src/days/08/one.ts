import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

let grid: string[][] = [];
let antennas: Record<string, number[][]> = {};
let antinodes: Set<string> = new Set();

/* -------------------------------------------------------------------------- */

function canPlaceAntinode(pos: number[]): boolean {
  // Y outside bounds
  if (pos[1] < 0 || pos[1] > grid.length - 1) return false;
  // X outside bounds
  if (pos[0] < 0 || pos[0] > grid[0].length - 1) return false;

  // Antinode already exists at location
  if (antinodes.has(pos.join(","))) return false;

  return true;
}

function placeAntinodes(l1: number[], l2: number[]) {
  const dx = l2[0] - l1[0];
  const dy = l2[1] - l1[1];

  // Possible antinode locations
  const pos1 = [l1[0] - dx, l1[1] - dy];
  const pos2 = [l2[0] + dx, l2[1] + dy];

  if (canPlaceAntinode(pos1)) antinodes.add(pos1.join(","));
  if (canPlaceAntinode(pos2)) antinodes.add(pos2.join(","));
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
    // For each location of the antenna we try to look for an opposing antenna,
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

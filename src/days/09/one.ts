import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  let id = 0;
  let blocks: string[] = [];

  input
    .split("")
    .map(Number)
    .map((num, index) => {
      for (let i = 0; i < num; i++) {
        blocks.push(index % 2 === 0 ? id.toString() : ".");
      }
      if (index % 2 === 0) {
        id += 1;
      }
    });

  for (let i = blocks.length - 1; i >= 0; i--) {
    if (blocks[i] === ".") continue;

    let freeIndex = blocks.findIndex((spot) => spot === ".");
    if (freeIndex > i) break;
    blocks[freeIndex] = blocks[i];
    blocks[i] = ".";
  }

  return blocks.reduce((sum, spot, index) => {
    if (spot === ".") return sum;
    return (sum += Number(spot) * index);
  }, 0);
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(9);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

let blocks: string[] = [];

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  let id = 0;
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

    // First and last occurence of the number
    let lastIndex = blocks.findLastIndex((num) => num === blocks[i]);
    let firstIndex = blocks.findIndex((num) => num === blocks[i]);

    // Since we're working with indices we have to add 1 (e.g. 1 - 0 = 1, but that means two occurences)
    let amount = lastIndex - firstIndex + 1;

    let freeSpace = 0;

    for (let j = 0; j < blocks.length; j++) {
      // If looking for free spaces ends up behind our first occurence index, we can not fit it in
      if (j >= firstIndex) break;

      // Free spot
      if (blocks[j] === ".") {
        freeSpace += 1;
        if (freeSpace >= amount) {
          for (let k = 0; k < amount; k++) {
            blocks[j - k] = blocks[i];
            blocks[firstIndex + k] = ".";
          }
          freeSpace = 0;
          break;
        }
      } else {
        freeSpace = 0;
      }
    }
    i = firstIndex;
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

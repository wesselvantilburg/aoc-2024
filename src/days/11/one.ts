import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

const BLINK_AMOUNT = 25;

/* -------------------------------------------------------------------------- */

function blink(stones: number[]): number[] {
  return stones.reduce((newStones, stone) => {
    const stoneString = stone.toString();
    const stoneLength = stoneString.length;
    if (stone === 0) {
      newStones.push(1);
      return newStones;
    }
    if (stoneLength % 2 === 0) {
      const middle = stoneLength / 2;

      newStones.push(Number(stoneString.slice(0, middle)));
      newStones.push(Number(stoneString.slice(middle)));
      return newStones;
    }
    newStones.push(stone * 2024);
    return newStones;
  }, [] as number[]);
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  const stones = input.split(" ").map(Number);

  let newStones = stones;

  for (let i = 0; i < BLINK_AMOUNT; i++) {
    newStones = blink(newStones);
  }
  return newStones.length;
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(11);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

const BLINK_AMOUNT = 75;

/* -------------------------------------------------------------------------- */

const stoneResults: Record<string, number> = {};

/* -------------------------------------------------------------------------- */

function blink(stone: number): number[] {
  const stoneString = stone.toString();
  const stoneLength = stoneString.length;

  if (stone === 0) return [1];

  if (stoneLength % 2 === 0) {
    const middle = stoneLength / 2;
    return [
      Number(stoneString.slice(0, middle)),
      Number(stoneString.slice(middle)),
    ];
  }

  return [stone * 2024];
}

function countStones(
  stones: number[],
  currentBlink: number,
  maxBlinks: number
): number {
  if (currentBlink === maxBlinks) return stones.length;

  return stones.reduce((total, stone) => {
    const key = `${stone}-${currentBlink}`;

    if (stoneResults[key] !== undefined) {
      return total + stoneResults[key];
    }

    const stoneCount = countStones(blink(stone), currentBlink + 1, maxBlinks);
    stoneResults[key] = stoneCount;

    return total + stoneCount;
  }, 0);
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  const stones = input.split(" ").map(Number);

  return stones.reduce((total, stone) => {
    return total + countStones([stone], 0, BLINK_AMOUNT);
  }, 0);
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(11);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

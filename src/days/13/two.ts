import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

type Machine = {
  a: { x: number; y: number };
  b: { x: number; y: number };
  prize: { x: number; y: number };
};

/* -------------------------------------------------------------------------- */

const machines: Machine[] = [];
const prices: number[] = [];

/* -------------------------------------------------------------------------- */

/**
 * It's easiest to explain what happens using the math I used to get to this solution
 *
 * Example used:
 * ```
 * Button A: X+94, Y+34
 * Button B: X+22, Y+67
 * Prize: X=8400, Y=5400
 * ```
 */
function findMinimumPrice(machine: Machine) {
  const xEquation = [machine.a.x, machine.prize.x];
  // xEquation = 94A + 22B = 8400 (We don't add b.x in the code, because we will cancel this out later on)

  const yEquation = [machine.a.y, machine.prize.y];
  // yEquation = 34A + 67B = 5400 (We don't add b.y in the code, because we will cancel this out later on)

  // We are going to cancel out the B value, so we can extract the A value.
  // (Where A value and B value are the amount of times we press A or B button)

  // To cancel out we need to make the B values equal in both equations,
  // so we multiply the whole equation by the opposing B value.

  // (94A + 22B) * 67 = 8400 * 67
  xEquation[0] = xEquation[0] * machine.b.y;
  xEquation[1] = xEquation[1] * machine.b.y;
  // 6298A + 1474B = 562800

  // (34A + 67B) * 22 = 5400 * 22
  yEquation[0] = yEquation[0] * machine.b.x;
  yEquation[1] = yEquation[1] * machine.b.x;
  // 748A + 1474B = 118800

  // 6298A + 1474B = 562800 - (748A + 1474B = 118800)
  // Note that we cancel out the 1474B, that's why we didn't need it in the first place (see line 30 & 32)
  const resultEquation = [
    xEquation[0] - yEquation[0],
    xEquation[1] - yEquation[1],
  ];
  // 5550A = 444000

  // A = 444000 / 5550
  const pressedA = resultEquation[1] / resultEquation[0];
  // A = 80

  // Check if A is a round value
  if (pressedA % 1 !== 0) return;

  // 94A + 22B = 8400
  // 22B = 8400 - 94A
  // 22B = 8400 - 94 * 80
  // 22B = 8400 - 7520
  // 22B = 880
  // B = 880 / 22
  const pressedB = (machine.prize.x - machine.a.x * pressedA) / machine.b.x;
  // B = 40

  // Check if B is a round value
  if (pressedB % 1 !== 0) return;

  // Round values for A and B means we can solve the equation and get the prize
  prices.push(pressedA * 3 + pressedB);
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  input.split("\n\n").map((block) => {
    let machine = {
      a: { x: 0, y: 0 },
      b: { x: 0, y: 0 },
      prize: { x: 0, y: 0 },
    };
    block.split("\n").forEach((line) => {
      if (line.startsWith("Button A")) {
        const [left, right] = line.split("Button A: ")[1].split(", ");
        machine.a.x = Number(left.split("+")[1]);
        machine.a.y = Number(right.split("+")[1]);
      }
      if (line.startsWith("Button B")) {
        const [left, right] = line.split("Button B: ")[1].split(", ");
        machine.b.x = Number(left.split("+")[1]);
        machine.b.y = Number(right.split("+")[1]);
      }
      if (line.startsWith("Prize")) {
        const [left, right] = line.split("Prize: ")[1].split(", ");
        machine.prize.x = 10000000000000 + Number(left.split("=")[1]);
        machine.prize.y = 10000000000000 + Number(right.split("=")[1]);
      }
    });
    machines.push(machine);
  });

  for (const machine of machines) {
    findMinimumPrice(machine);
  }

  return prices.reduce((count, price) => {
    return count + price;
  }, 0);
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(13);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

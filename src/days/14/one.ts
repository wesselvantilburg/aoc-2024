import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

const time = 100; // seconds
const width = 101;
const height = 103;

/* -------------------------------------------------------------------------- */

let robots: { position: number[]; velocity: number[] }[] = [];

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  robots = input.split("\n").map((line) => {
    const [left, right] = line.split(" ");
    return {
      position: left.split("p=")[1].split(",").map(Number),
      velocity: right.split("v=")[1].split(",").map(Number),
    };
  });

  for (let i = 0; i < time; i++) {
    for (const robot of robots) {
      robot.position[0] =
        (robot.position[0] + robot.velocity[0] + width) % width;
      robot.position[1] =
        (robot.position[1] + robot.velocity[1] + height) % height;
    }
  }

  let quadrants = [0, 0, 0, 0];
  const middleWidth = Math.floor(width / 2);
  const middleHeight = Math.floor(height / 2);

  for (const robot of robots) {
    if (robot.position[0] === middleWidth || robot.position[1] === middleHeight)
      continue;
    if (robot.position[0] < middleWidth && robot.position[1] < middleHeight) {
      quadrants[0] = quadrants[0] + 1;
      continue;
    }
    if (robot.position[0] > middleWidth && robot.position[1] < middleHeight) {
      quadrants[1] = quadrants[1] + 1;
      continue;
    }
    if (robot.position[0] < middleWidth && robot.position[1] > middleHeight) {
      quadrants[2] = quadrants[2] + 1;
      continue;
    }
    if (robot.position[0] > middleWidth && robot.position[1] > middleHeight) {
      quadrants[3] = quadrants[3] + 1;
      continue;
    }
  }
  return quadrants.reduce((factor, quadrant) => {
    return factor * quadrant;
  }, 1);
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(14);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

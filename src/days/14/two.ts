import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

// I incremented this with 100, looked for a pattern in the terminal, and finally found it at 7051 seconds
const time = 7100; // seconds
const width = 101;
const height = 103;

/* -------------------------------------------------------------------------- */

let robots: { position: number[]; velocity: number[] }[] = [];

/* -------------------------------------------------------------------------- */

function drawGrid(title: string) {
  let grid: string[][] = [];
  for (let y = 0; y < height; y++) {
    grid.push([]);
    for (let x = 0; x < width; x++) {
      grid[y].push(" ");
    }
  }

  for (const robot of robots) {
    grid[robot.position[1]][robot.position[0]] = "X";
  }

  console.log("");
  console.log(`-------------------- ${title} --------------------`);
  for (let y = 0; y < grid.length; y++) {
    console.log(grid[y].join(""));
  }
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  robots = input.split("\n").map((line) => {
    const [left, rigt] = line.split(" ");
    return {
      position: left.split("p=")[1].split(",").map(Number),
      velocity: rigt.split("v=")[1].split(",").map(Number),
    };
  });

  for (let i = 0; i < time; i++) {
    for (const robot of robots) {
      robot.position[0] =
        (robot.position[0] + robot.velocity[0] + width) % width;
      robot.position[1] =
        (robot.position[1] + robot.velocity[1] + height) % height;
    }
    if (i > time - 101) drawGrid(`${i + 1} s`);
  }
  return 0;
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(14);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

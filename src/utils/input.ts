import path from "path";
import fs from "fs";

/* -------------------------------------------------------------------------- */

const BASE_URL = "https://adventofcode.com";
const YEAR = "2024";
const FILE_NAME = "input.txt";

/* -------------------------------------------------------------------------- */

function getInputPathByDay(day: number): string {
  const paddedDay = day.toString().padStart(2, "0");
  const pathName = path.join("src/days", paddedDay, FILE_NAME);
  return path.resolve(pathName);
}

async function fetchInput(day: number): Promise<string> {
  const url = `${BASE_URL}/${YEAR}/day/${day}/input`;
  const response = await fetch(url, {
    headers: {
      cookie: `session=${process.env.AOC_SESSION_TOKEN}`,
    },
  });
  return (await response.text()).trimEnd();
}

/* -------------------------------------------------------------------------- */

export async function fetchInputByDay(day: number): Promise<string> {
  const inputPath = getInputPathByDay(day);
  const inputExists = fs.existsSync(inputPath);

  const input = inputExists
    ? fs.readFileSync(inputPath, "utf-8")
    : await fetchInput(day);

  if (!inputExists) {
    console.log("inputPath", JSON.stringify(inputPath, null, 2));
    fs.writeFileSync(inputPath, input);
  }

  return input;
}

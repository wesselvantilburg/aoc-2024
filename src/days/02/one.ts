import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

function reportIsValid(report: number[]): boolean {
  const isIncreasing = report[0] < report[1];
  return report.every((_, index) => {
    if (isIncreasing && report[index] > report[index + 1]) return false;
    if (!isIncreasing && report[index] < report[index + 1]) return false;

    const diff = Math.abs(report[index + 1] - report[index]);
    if (diff < 1 || diff > 3) return false;
    return true;
  });
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  const inputLines = input.split("\n");
  const reports = inputLines.map((line) => line.split(" ").map(Number));

  return reports.reduce((count, report) => {
    return (count += reportIsValid(report) ? 1 : 0);
  }, 0);
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(2);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

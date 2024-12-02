import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

function levelIsSafe(
  level: number,
  nextLevel: number,
  isIncreasing: boolean
): boolean {
  if (isIncreasing && level > nextLevel) return false;
  if (!isIncreasing && level < nextLevel) return false;

  const diff = Math.abs(nextLevel - level);
  if (diff < 1 || diff > 3) return false;
  return true;
}

function reportIsValid(report: number[]): boolean {
  const isIncreasing = report[0] < report[1];

  return report.every((_, index) =>
    levelIsSafe(report[index], report[index + 1], isIncreasing)
  );
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  const inputLines = input.split("\n");
  const reports = inputLines.map((line) => line.split(" ").map(Number));

  return reports.reduce((count, report) => {
    let reportValid = reportIsValid(report);

    // If report is not valid, we should try to remove any level
    // and validate the damped report
    if (!reportValid) {
      for (let i = 0; i < report.length; i++) {
        const dampedReport = report.filter((_, index) => i !== index);
        const dampedReportIsValid = reportIsValid(dampedReport);
        if (dampedReportIsValid) reportValid = true;
      }
    }

    return (count += reportValid ? 1 : 0);
  }, 0);
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(2);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

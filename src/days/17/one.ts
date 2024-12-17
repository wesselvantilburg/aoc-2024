import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

let registerA = 0;
let registerB = 0;
let registerC = 0;
let program: number[] = [];

let instructionPointer = 0;

let output: number[] = [];

/* -------------------------------------------------------------------------- */

function getComboOperand(operand: number): number {
  if (operand <= 3) return operand;
  if (operand === 4) return registerA;
  if (operand === 5) return registerB;
  if (operand === 6) return registerC;
  throw new Error("7 is reserved and will not appear in a valid program");
}

function performOperation(operation: number, operand: number): number {
  if (operation === 0) {
    registerA = Math.trunc(registerA / Math.pow(2, getComboOperand(operand)));
    return instructionPointer + 2;
  }
  if (operation === 1) {
    registerB = registerB ^ operand;
    return instructionPointer + 2;
  }
  if (operation === 2) {
    registerB = getComboOperand(operand) % 8;
    return instructionPointer + 2;
  }
  if (operation === 3) {
    if (registerA === 0) {
      return instructionPointer + 2;
    }
    return operand;
  }
  if (operation === 4) {
    registerB = registerB ^ registerC;
    return instructionPointer + 2;
  }
  if (operation === 5) {
    output.push(
      ...String(getComboOperand(operand) % 8)
        .split("")
        .map(Number)
    );
    return instructionPointer + 2;
  }
  if (operation === 6) {
    registerB = Math.trunc(registerA / Math.pow(2, getComboOperand(operand)));
    return instructionPointer + 2;
  }
  if (operation === 7) {
    registerC = Math.trunc(registerA / Math.pow(2, getComboOperand(operand)));
    return instructionPointer + 2;
  }
  return instructionPointer + 2;
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): string {
  const [top, bot] = input.split("\n\n");

  top.split("\n").forEach((line) => {
    if (line.startsWith("Register A")) {
      registerA = Number(line.split(": ")[1]);
    }
    if (line.startsWith("Register B")) {
      registerB = Number(line.split(": ")[1]);
    }
    if (line.startsWith("Register C")) {
      registerC = Number(line.split(": ")[1]);
    }
  });

  program = bot.replace("Program: ", "").split(",").map(Number);

  while (instructionPointer + 1 < program.length) {
    const operation = program[instructionPointer];
    const operand = program[instructionPointer + 1];

    instructionPointer = performOperation(operation, operand);
  }

  return output.join(",");
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(17);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

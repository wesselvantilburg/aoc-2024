import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

function mix(a: number, b: number): number {
  return Number(BigInt(a) ^ BigInt(b));
}

function prune(a: number): number {
  return a % 16777216;
}

function process(secret: number): number {
  secret = prune(mix(secret, secret * 64));
  secret = prune(mix(secret, Math.floor(secret / 32)));
  secret = prune(mix(secret, secret * 2048));
  return secret;
}

function evolve(
  secret: number,
  count: number,
  sequenceResults: Map<string, number>
) {
  // All prices and their difference to price - 1 in this secret
  const prices: { price: number; difference: number }[] = [];
  // Set of unique sequences for this secret
  const sequences: Set<string> = new Set();

  let current = secret;
  let price = secret % 10;

  for (let i = 0; i < count; i++) {
    let newResult = process(current);
    let newPrice = newResult % 10;

    let priceDifference = newPrice - price;
    prices.push({ price: newPrice, difference: priceDifference });

    // If we're at i >= 3, we have a sequence of 4 prices
    if (i >= 3) {
      // Create the sequence string
      let sequence = prices
        .slice(i - 3, i + 1)
        .map((price) => price.difference)
        .join(",");

      // If we have not found this sequence before, we add it to the result Map and the sequence Set
      if (!sequences.has(sequence)) {
        sequenceResults.set(
          sequence,
          (sequenceResults.get(sequence) ?? 0) + newPrice
        );
        sequences.add(sequence);
      }
    }

    current = newResult;
    price = newPrice;
  }
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  const secrets = input.split("\n").map(Number);

  // Map with each sequence and the sum of it's result over all secrets
  const sequenceResults: Map<string, number> = new Map();

  for (const secret of secrets) {
    evolve(secret, 2000, sequenceResults);
  }

  let prices = [...sequenceResults].map((result) => result[1]);

  return Math.max(...prices);
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(22);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

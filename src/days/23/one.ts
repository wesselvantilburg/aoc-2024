import { duration, fetchInputByDay } from "@utils";

/* -------------------------------------------------------------------------- */

function getParties(
  computer: string,
  connectionMap: Map<string, string[]>,
  parties: Set<string>
) {
  for (const connection of connectionMap.get(computer)!) {
    for (const secondConnection of connectionMap.get(connection)!) {
      for (const thirdConnection of connectionMap.get(secondConnection)!) {
        if (thirdConnection === computer) {
          let party = [computer, connection, secondConnection].sort().join(",");
          parties.add(party);
        }
      }
    }
  }
}

/* -------------------------------------------------------------------------- */

function findSolution(input: string): number {
  const connections = input.split("\n");

  const connectionMap: Map<string, string[]> = new Map();

  for (const connection of connections) {
    const [start, end] = connection.split("-");
    connectionMap.set(start, [...(connectionMap.get(start) ?? []), end]);
    connectionMap.set(end, [...(connectionMap.get(end) ?? []), start]);
  }

  const parties: Set<string> = new Set();
  for (const connection of connectionMap.keys()) {
    getParties(connection, connectionMap, parties);
  }

  return [...parties].reduce((count, party) => {
    const containsT =
      party.split(",").filter((c) => c.startsWith("t")).length > 0;
    return count + (containsT ? 1 : 0);
  }, 0);
}

/* -------------------------------------------------------------------------- */

const rawInput = await fetchInputByDay(23);
const result = duration(findSolution)(rawInput);

/* -------------------------------------------------------------------------- */

console.log(result);

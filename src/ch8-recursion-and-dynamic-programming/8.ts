import permutationsWODups from "./7";

// permutations with dups - same as ch8 problem 7 but with duplicates
export default function permutationsWDups(str: string = ""): Array<string> {
  const permutationsWithoutDups = permutationsWODups(str);
  const resultSet: Set<string> = new Set([...permutationsWithoutDups]);
  const result: Array<string> = [];

  resultSet.forEach(permutation => result.push(permutation));

  return result;
}
// TODO: optimize
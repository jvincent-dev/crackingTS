// permutations without dups - compute all permutations of a string of unique chars
export default function permutationsWODups(str: string = ""): Array<string> {
  if (str.length <= 1) {
    return [str];
  }

  const lastChar: string = str[str.length - 1];
  const permutations: Array<string> = permutationsWODups(str.substring(0, str.length - 1));
  const newPermutations: Array<string> = [];

  if (lastChar !== undefined) {
    permutations.forEach(perm => {
      for (let i: number = 0; i <= perm.length; i++) {
        const newPermutation: string = perm.substring(0, i) + lastChar + perm.substring(i); // substring is not inclusive last index

        newPermutations.push(newPermutation);
      }
    });
  }

  return newPermutations;
}
// plan: split str for easy handling > remove the last char of the string and find permutations for the rest of the substring recursively until there
//  is 1 or less chars > for each permutation, create a new permutation by inserting the last char on every index of the permutation and add it to 
//  the result > return the result > join() each results to turn them back to strings > I cleaned it up to not use split
// time: O(n!), space: O(n) for each call stack ???
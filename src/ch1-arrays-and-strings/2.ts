// compare strings if they are permutations of each other
// time: O(n); space: O(n)
export function isPermutationMap(str1: string, str2: string): boolean {
  if (str1.length !== str2.length) {
    return false;
  }

  const map: Map<string, number> = new Map();

  for (let i: number = 0; i < str1.length; i++) {
    const char: string = str1[i];
    const charCount: number = map.get(char) || 0;

    map.set(char, charCount + 1);
  }

  for (let i: number = 0; i < str2.length; i++) {
    const char: string = str2[i];
    const charCount: number = map.get(char) || 0;

    if (charCount > 1) {
      map.set(char, charCount - 1);
    } else if (charCount === 1) {
      map.delete(char);
    } else {
      return false;
    }
  }

  return map.size === 0;
}
// time: O(n log n); space: O(1)
export function isPermutationSort(str1: string, str2: string): boolean {
  // if different len: return false; sort strings and see if they're eq
  if (str1.length !== str2.length) {
    return false;
  }

  str1 = str1.split("").sort().join("");
  str2 = str2.split("").sort().join("");

  return str1 === str2;
}

// -- tests
// true: [
//   ['abcdefghi', 'ihgfedcba'],
//   ['1a1', 'a11'],
//   ['1234567812345678', '8877665544332211'],
//   ['icarraci', 'carcarii']
// ]
// false: [
//   ['abcdefghiz', 'ihgfedcbaa'],
//   ['1a1', '11'],
//   ['1122334455667788', '9911223344556677'],
//   ['45678', '1239']
// ]
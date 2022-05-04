// palindrome permutation - check if string is a permutation of a palindrome
// time: O(n); space: O(n)
export function isPalindromePermutation(str: string): boolean {
  const chars: Set<string> = new Set();

  for (let i: number = 0; i<str.length; i++) {
    const char: string = str[i];

    if (chars.has(char)) {
      chars.delete(char);
    } else if (char !== " ") {
      chars.add(char);
    }
  }

  return chars.size <= 1;
}

// true [
//   ' ',
//   '   ',
//   'aabb',
//   'ab a b',
//   ' a b a b ',
//   'sasadfgsadfghjk;hjk;sadfghjk;dfghjk;',
//   'sa sadfgsadfgh jk;hjkz;sadfg hjk;dfghjk;'
// ]
// false [
//   'abcadef',
//   '1234567890',
//   'a b'
// ]
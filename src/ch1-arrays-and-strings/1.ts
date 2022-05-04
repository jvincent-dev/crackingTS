// check if string contains unique characters
// time: O(n); space: O(n)
export function isUniqueSet(input: string): boolean {
  const chars: Set<string> = new Set();

  for (let i: number = 0; i < input.length; i++) {
    const char: string = input[i];

    if (chars.has(char)) {
      return false;
    } else {
      chars.add(char);
    }
  }

  return true;
}

// time: O(n log n); space: O(1)
export function isUniqueSort(input: string): boolean {
  input = input.split("").sort().join("");

  for (let i: number = 1; i < input.length - 1; i++) {
    if (input[i] === input[i - 1]) {
      return false;
    }
  }

  return true;
}

// -- tests
// true: ['abcdefghi', 'jklpoiuqwerzxcvmnsadf', '1234567890', 'AaBbCcDdeFg1234567890(*&^%$#@!)']
// false: ['abcadef', 'aaaaaaaaaa', 'abcdefghijklmnopqrstuvwxyza', '1234567890asdklf1', '!@#$%^&*()(*#($&#(*$&#*($&#()))))']
// String Compression
// time: O(n); space: O(n)
export function stringCompression(str: string): string {
  const result: Array<string> = [];
  let counter: number = 1;
  let prevChar: string = str[0];

  for (let i: number = 1; i < str.length; i++) {
    const char = str[i];

    if (prevChar !== char) {
      result.push(prevChar + counter);
      prevChar = char;
      counter = 1;
    } else {
      counter++;
    }
  }

  const lastChar = str[str.length - 1];
  const lastCharCount: number = prevChar !== str[str.length - 1]
    ? 1
    : counter;

  result.push(lastChar + lastCharCount);

  if (result.length * 2 < str.length) {
    return result.join(""); // using str += recreates a whole new string
  }

  return str;
}

// -- test
// [
//   'a',
//   'aa',
//   'abc',
//   'aabbcc',
//   'ababababccab'
// ]

// [
//   { arg: 'aaa', out: '3a' },
//   { arg: 'bbbbbb', out: '6b' },
//   { arg: 'abbbbbbc', out: '1a6b1c' },
//   { arg: 'aaabccc', out: '3a1b3c' },
//   { arg: 'hhellllllllooooo!', out: '2h1e8l5o1!' },
//   { arg: 'woorrrllllddddd', out: '1w2o3r4l5d' }
// ]
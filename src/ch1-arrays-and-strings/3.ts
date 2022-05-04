// replace all spaces in a string with %20
export function URLify(url: Array<string>): void {
  const result: Array<string> = url.join("").replace(/ /g, "%20").split("");

  for (let i: number = 0; i < result.length; i++) {
    url[i] = result[i];
  }
}

export function URLifyInPlace(url: Array<string>): void {
  const lastIndex: number = url.length - 1;
  let spaceCount: number = 0;

  for (let i: number = 0; i < url.length; i++) {
    const char: string = url[i];

    if (char === " ") {
      spaceCount++;
    }
  }

  const paddedLastIndex: number = lastIndex + (spaceCount * 2);

  // loop from the end and update char as we go with two pointers
  for (let i: number = lastIndex, j: number = paddedLastIndex; i >= 0; i--, j--) {
    const urlChar: string = url[i];

    if (urlChar === " ") {
      url[j] = "0"; // j
      url[--j] = "2"; // j - 1
      url[--j] = "%"; // j - 2
    } else {
      url[j] = urlChar;
    }
  }
}

// --- tests (make sure to split to use an array in place)
// [
//   'nospaces',
//   ' ',
//   '   ',
//   ' firstSpace',
//   'lastSpace ',
//   '  surroundedBySpaces  ',
//   'middle  spaces',
//   ' l o t s   o f   s p a c e ',
//   'http://www.google.com/',
//   'http://www.google.com/search?q=something really really funny'
// ]
// recursive multiply - Write a recursive function to multiply two positive integers without using *. 
//  You can use addition, subtraction, and bit shifting, but minimize the number operations.
export default function recursiveMultiply(intA: number, intB: number): number {
  if (intA > intB) {
    return recursiveMultiply(intB, intA);
  } else if (intA === 0) {
    return 0;
  } else if (intA === 1) {
    return intB;
  }

  return intB + recursiveMultiply(intA - 1, intB); // 🤷‍♂️
}

// 3 * 4 = 12
// right shift = * 2; left shift = / 2 ???
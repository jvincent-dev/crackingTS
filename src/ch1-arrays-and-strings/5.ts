// One Edit Away
// time: O(n); space: O(1)
export function isOneAway(str1: string, str2: string): boolean {
  // return if one edit away
  // cases: has same length, has length - 1, has length + 1
  if (str1 === str2) { // 0 edit
    return true;
  } else if (Math.abs(str1.length - str2.length) > 1) {
    return false;
  } // handle more than or less than one of current length

  let editCount: number = 0;

  for (let i: number = 0, j: number = 0; i < str1.length && j < str2.length; i++, j++) {
    const char1: string = str1[i];
    const char2: string = str2[j];

    if (editCount > 1) {
      return false;
    } else if (char1 !== char2) {
      if (str1.length < str2.length) {
        j++;
      } else if (str1.length > str2.length) {
        i++;
      }

      editCount++;
    }
  }

  return true;
}

// true : [
//   ['pale', 'ple'],
//   ['pales', 'pale'],
//   ['pale', 'bale'],
//   ['pale', 'pxle'],
//   ['pale', 'pate'],
//   ['pale', 'pald'],
//   ['answers', 'answer'],
//   ['technology', 'etechnology']
// ]
// false : [
//   ['pale', 'pl'],
//   ['paless', 'pale'],
//   ['pale', 'bales'],
//   ['abcdefghiz', 'ihgfedcbaa'],
//   ['1122334455667788', '9911223344556677'],
//   ['45678', '1239'],
//   ['abcd', 'dcba']
// ]